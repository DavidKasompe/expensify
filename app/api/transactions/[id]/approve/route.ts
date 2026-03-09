import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/email';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.user.role !== 'ADMIN' && session.user.role !== 'FINANCE_OFFICER') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;

  const tx = await db.transaction.findUnique({
    where: { id },
    include: { createdBy: { select: { email: true, name: true } }, project: { select: { name: true } } },
  });
  if (!tx) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (tx.status !== 'PENDING') {
    return NextResponse.json({ error: 'Only PENDING transactions can be approved' }, { status: 422 });
  }

  const updated = await db.transaction.update({
    where: { id },
    data: { status: 'APPROVED', approvedById: session.user.id, approvedAt: new Date() },
  });

  await db.auditLog.create({
    data: { userId: session.user.id, action: 'TRANSACTION_APPROVED', entityType: 'Transaction', entityId: id },
  });

  await sendEmail({
    to: tx.createdBy.email,
    subject: `Transaction Approved: $${tx.amount}`,
    html: `
      <h2>Good news!</h2>
      <p>Your transaction for <strong>$${tx.amount}</strong> in project <strong>${tx.project.name}</strong> has been approved by ${session.user.name}.</p>
      <p>Thank you for keeping your expenses up to date.</p>
    `,
  });

  return NextResponse.json(updated);
}
