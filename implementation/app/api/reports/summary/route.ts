import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/implementation/lib/db';
import { requireRole } from '@/implementation/lib/permissions';

// ─── GET /api/reports/summary ──────────────────────────────────────────────
// Returns dashboard summary: total budget, total spent, remaining, counts
export async function GET(req: NextRequest) {
  const { user, error } = await requireRole('ADMIN', 'FINANCE_OFFICER');
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');

  const projectFilter = projectId ? { projectId } : {};

  // Total budget across all projects
  const projects = await db.project.findMany({
    select: { budget: true },
  });
  const totalBudget = projects.reduce((sum, p) => sum + Number(p.budget), 0);

  // Total approved spend
  const approvedAgg = await db.transaction.aggregate({
    where: { ...projectFilter, status: 'APPROVED' },
    _sum: { amount: true },
  });
  const totalSpent = Number(approvedAgg._sum.amount ?? 0);

  // Pending count
  const pendingCount = await db.transaction.count({
    where: { ...projectFilter, status: 'PENDING' },
  });

  // Approved this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const approvedThisMonth = await db.transaction.count({
    where: {
      ...projectFilter,
      status: 'APPROVED',
      approvedAt: { gte: startOfMonth },
    },
  });

  // Rejected total
  const rejectedCount = await db.transaction.count({
    where: { ...projectFilter, status: 'REJECTED' },
  });

  return NextResponse.json({
    totalBudget,
    totalSpent,
    remainingBudget: totalBudget - totalSpent,
    pendingCount,
    approvedThisMonth,
    rejectedCount,
  });
}
