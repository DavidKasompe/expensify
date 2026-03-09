import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/implementation/lib/db';
import { requireAuth, canViewAllTransactions } from '@/implementation/lib/permissions';
import { db as auditDb } from '@/implementation/lib/db';

// ─── GET /api/transactions ─────────────────────────────────────────────────
// ADMIN + FINANCE_OFFICER: see all transactions
// FIELD_OFFICER: see only their own
export async function GET(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');
  const status = searchParams.get('status');

  const where: Record<string, unknown> = {};
  if (!canViewAllTransactions(user!.role as any)) {
    where.createdById = user!.id;
  }
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

// ─── POST /api/transactions ────────────────────────────────────────────────
// All roles can create transactions
// Budget guard: approved spend + new amount <= project.budget
export async function POST(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  const body = await req.json();
  const { projectId, amount, category, description, date, receiptUrl } = body;

  // Validate required fields
  if (!projectId || !amount || !category || !description || !date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Budget guard
  const project = await db.project.findUnique({ where: { id: projectId } });
  if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

  const spent = await db.transaction.aggregate({
    where: { projectId, status: 'APPROVED' },
    _sum: { amount: true },
  });

  const totalSpent = Number(spent._sum.amount ?? 0);
  const remaining = Number(project.budget) - totalSpent;

  if (Number(amount) > remaining) {
    return NextResponse.json(
      { error: `Insufficient budget. Remaining: $${remaining.toFixed(2)}` },
      { status: 422 }
    );
  }

  const transaction = await db.transaction.create({
    data: {
      projectId,
      amount,
      category,
      description,
      date: new Date(date),
      receiptUrl,
      createdById: user!.id,
    },
  });

  // Audit log
  await auditDb.auditLog.create({
    data: {
      userId: user!.id,
      action: 'TRANSACTION_CREATED',
      entityType: 'Transaction',
      entityId: transaction.id,
      meta: JSON.stringify({ amount, category, projectId }),
    },
  });

  return NextResponse.json(transaction, { status: 201 });
}
