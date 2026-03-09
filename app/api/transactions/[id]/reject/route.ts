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

  const body = await req.json().catch(() => ({}));
  const note = body.note ?? '';

  const tx = await db.transaction.findUnique({
    where: { id },
    include: { createdBy: { select: { email: true, name: true } }, project: { select: { name: true } } },
  });
  if (!tx) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (tx.status !== 'PENDING') {
    return NextResponse.json({ error: 'Only PENDING transactions can be rejected' }, { status: 422 });
  }

  const updated = await db.transaction.update({
    where: { id },
    data: { status: 'REJECTED', approvedById: session.user.id, approvedAt: new Date(), note },
  });

  await db.auditLog.create({
    data: {
      userId: session.user.id,
      action: 'TRANSACTION_REJECTED',
      entityType: 'Transaction',
      entityId: id,
      meta: JSON.stringify({ note }),
    },
  });

  await sendEmail({
    to: tx.createdBy.email,
    subject: `Transaction Rejected: $${tx.amount}`,
    html: `
      <h2>Transaction Update</h2>
      <p>Your transaction for <strong>$${tx.amount}</strong> in project <strong>${tx.project.name}</strong> has been rejected by ${session.user.name}.</p>
      ${note ? `<p><strong>Reason:</strong> ${note}</p>` : ''}
      <p>Please review and submit a new transaction if necessary.</p>
    `,
  });

  return NextResponse.json(updated);
}
