import { db } from '@/lib/db';
import Link from 'next/link';

async function getProjects() {
  const projects = await db.project.findMany({
    include: { createdBy: { select: { name: true } }, _count: { select: { transactions: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return Promise.all(projects.map(async (p) => {
    const agg = await db.transaction.aggregate({ where: { projectId: p.id, status: 'APPROVED' }, _sum: { amount: true } });
    return { ...p, spent: agg._sum.amount ?? 0 };
  }));
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Projects</h1>
          <p className="text-gray-500 text-sm mt-1">{projects.length} active project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/dashboard/projects/new" className="btn-green px-5 py-2.5 text-sm rounded-full">
          + New Project
        </Link>
      </div>

      {projects.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="text-4xl mb-3">🗂</div>
          <p className="text-gray-500 text-sm">No projects yet. Create the first one.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((p) => {
          const pct = p.budget > 0 ? Math.min(Math.round((p.spent / p.budget) * 100), 100) : 0;
          const over = p.spent > p.budget;
          return (
            <Link key={p.id} href={`/dashboard/projects/${p.id}`}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="font-bold text-gray-900 text-base">{p.name}</h2>
                    <p className="text-xs text-gray-400 mt-0.5">📍 {p.location}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${over ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                    {over ? 'Over budget' : `${pct}% used`}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                  <div><div className="text-sm font-bold text-gray-900">${p.budget.toLocaleString()}</div><div className="text-xs text-gray-400">Budget</div></div>
                  <div><div className="text-sm font-bold text-[#00A86B]">${p.spent.toLocaleString()}</div><div className="text-xs text-gray-400">Spent</div></div>
                  <div><div className="text-sm font-bold text-gray-700">{p._count.transactions}</div><div className="text-xs text-gray-400">Transactions</div></div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${over ? 'bg-red-500' : 'bg-[#00A86B]'}`} style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-3">Created by {p.createdBy.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
