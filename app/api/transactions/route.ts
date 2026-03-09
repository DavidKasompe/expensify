import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/email';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');
  const status = searchParams.get('status');

  const canSeeAll = session.user.role === 'ADMIN' || session.user.role === 'FINANCE_OFFICER';

  const where: Record<string, unknown> = {};
  if (!canSeeAll) where.createdById = session.user.id;
  if (projectId) where.projectId = projectId;
  if (status) where.status = status;

  const transactions = await db.transaction.findMany({
    where,
    include: {
      project: { select: { id: true, name: true } },
      createdBy: { select: { id: true, name: true, role: true } },
      approvedBy: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(transactions);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { projectId, amount, category, description, date, receiptUrl } = body;

  if (!projectId || !amount || !category || !description || !date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Budget guard
  const project = await db.project.findUnique({ where: { id: projectId } });
  if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

  const agg = await db.transaction.aggregate({
    where: { projectId, status: 'APPROVED' },
    _sum: { amount: true },
  });
  const spent = agg._sum.amount ?? 0;
  const remaining = project.budget - spent;

  if (parseFloat(amount) > remaining) {
    return NextResponse.json(
      { error: `Insufficient budget. Remaining: $${remaining.toFixed(2)}` },
      { status: 422 }
    );
  }

  const transaction = await db.transaction.create({
    data: {
      projectId,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date(date),
      receiptUrl: receiptUrl ?? null,
      createdById: session.user.id,
    },
  });

  await db.auditLog.create({
    data: {
      userId: session.user.id,
      action: 'TRANSACTION_CREATED',
      entityType: 'Transaction',
      entityId: transaction.id,
      meta: JSON.stringify({ amount, category, projectId }),
    },
  });

  // Notify Finance
  await sendEmail({
    to: 'finance@tora.demo',
    subject: `New Transaction Submitted: $${amount}`,
    html: `
      <h2>New Transaction Pending Approval</h2>
      <p><strong>Project ID:</strong> ${project.name}</p>
      <p><strong>Amount:</strong> $${amount}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Description:</strong> ${description}</p>
      ${receiptUrl ? `<p><a href="${receiptUrl}">View Receipt</a></p>` : ''}
      <p>Please review it in the Tora dashboard.</p>
    `,
  });

  return NextResponse.json(transaction, { status: 201 });
}
