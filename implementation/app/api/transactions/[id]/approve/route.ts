import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/implementation/lib/db';
import { requireRole } from '@/implementation/lib/permissions';

// ─── PATCH /api/transactions/[id]/approve ──────────────────────────────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await requireRole('ADMIN', 'FINANCE_OFFICER');
  if (error) return error;

  const transaction = await db.transaction.findUnique({
    where: { id: params.id },
  });

  if (!transaction) {
    return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
  }

  if (transaction.status !== 'PENDING') {
    return NextResponse.json(
      { error: 'Only PENDING transactions can be approved' },
      { status: 422 }
    );
  }

  const updated = await db.transaction.update({
    where: { id: params.id },
    data: {
      status: 'APPROVED',
      approvedById: user!.id,
      approvedAt: new Date(),
    },
  });

  // Audit log
  await db.auditLog.create({
    data: {
      userId: user!.id,
      action: 'TRANSACTION_APPROVED',
      entityType: 'Transaction',
      entityId: params.id,
    },
  });

  return NextResponse.json(updated);
}
