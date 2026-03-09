import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const project = await db.project.findUnique({
    where: { id },
    include: {
      createdBy: { select: { id: true, name: true } },
      transactions: {
        include: { createdBy: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const spent = await db.transaction.aggregate({
    where: { projectId: id, status: 'APPROVED' },
    _sum: { amount: true },
  });

  return NextResponse.json({ ...project, spent: spent._sum.amount ?? 0 });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const { name, location, budget, startDate, endDate } = body;

  const project = await db.project.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(location && { location }),
      ...(budget && { budget: parseFloat(budget) }),
      ...(startDate && { startDate: new Date(startDate) }),
      ...(endDate && { endDate: new Date(endDate) }),
    },
  });

  await db.auditLog.create({
    data: { userId: session.user.id, action: 'PROJECT_UPDATED', entityType: 'Project', entityId: id },
  });

  return NextResponse.json(project);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;

  await db.project.delete({ where: { id } });

  await db.auditLog.create({
    data: { userId: session.user.id, action: 'PROJECT_DELETED', entityType: 'Project', entityId: id },
  });

  return NextResponse.json({ success: true });
}
