import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.user.role !== 'ADMIN' && session.user.role !== 'FINANCE_OFFICER') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const projects = await db.project.findMany({ select: { budget: true } });
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);

  const spentAgg = await db.transaction.aggregate({
    where: { status: 'APPROVED' }, _sum: { amount: true }
  });
  const totalSpent = spentAgg._sum.amount ?? 0;

  const pendingCount = await db.transaction.count({ where: { status: 'PENDING' } });
  const approvedTotal = await db.transaction.count({ where: { status: 'APPROVED' } });
  const rejectedTotal = await db.transaction.count({ where: { status: 'REJECTED' } });

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const approvedThisMonth = await db.transaction.count({
    where: { status: 'APPROVED', approvedAt: { gte: startOfMonth } },
  });

  // Monthly spend last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const monthlyTxs = await db.transaction.findMany({
    where: { status: 'APPROVED', date: { gte: sixMonthsAgo } },
    select: { amount: true, date: true },
  });

  const monthMap: Record<string, number> = {};
  for (const tx of monthlyTxs) {
    const key = `${tx.date.getFullYear()}-${String(tx.date.getMonth() + 1).padStart(2, '0')}`;
    monthMap[key] = (monthMap[key] ?? 0) + tx.amount;
  }
  const monthlySpend = Object.entries(monthMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, amount]) => ({ month, amount }));

  return NextResponse.json({
    totalBudget,
    totalSpent,
    remainingBudget: totalBudget - totalSpent,
    pendingCount,
    approvedTotal,
    approvedThisMonth,
    rejectedTotal,
    monthlySpend,
  });
}
