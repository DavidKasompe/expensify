import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NewTransactionForm } from '@/components/dashboard/NewTransactionForm';

async function getProjects() {
  const projects = await db.project.findMany({ orderBy: { name: 'asc' } });
  return Promise.all(projects.map(async (p) => {
    const agg = await db.transaction.aggregate({ where: { projectId: p.id, status: 'APPROVED' }, _sum: { amount: true } });
    return { id: p.id, name: p.name, budget: p.budget, spent: agg._sum.amount ?? 0 };
  }));
}

export default async function NewTransactionPage() {
  const session = await getServerSession(authOptions);
  const projects = await getProjects();

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">New Transaction</h1>
        <p className="text-gray-500 text-sm mt-1">
          Submit a field expense for <strong>{session?.user?.name}</strong>. It will be routed for approval.
        </p>
      </div>
      <NewTransactionForm projects={projects} />
    </div>
  );
}
