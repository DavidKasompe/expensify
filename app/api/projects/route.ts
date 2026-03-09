import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const projects = await db.project.findMany({
    include: {
      createdBy: { select: { id: true, name: true } },
      _count: { select: { transactions: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Calculate spent for each project
  const withSpent = await Promise.all(
    projects.map(async (p) => {
      const agg = await db.transaction.aggregate({
        where: { projectId: p.id, status: 'APPROVED' },
        _sum: { amount: true },
      });
      return { ...p, spent: agg._sum.amount ?? 0 };
    })
  );

  return NextResponse.json(withSpent);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { name, location, budget, startDate, endDate } = body;
  if (!name || !location || !budget || !startDate || !endDate) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const project = await db.project.create({
    data: {
      name,
      location,
      budget: parseFloat(budget),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      createdById: session.user.id,
    },
  });

  await db.auditLog.create({
    data: { userId: session.user.id, action: 'PROJECT_CREATED', entityType: 'Project', entityId: project.id },
  });

  return NextResponse.json(project, { status: 201 });
}
