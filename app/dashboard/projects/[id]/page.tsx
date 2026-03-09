import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const project = await db.project.findUnique({
    where: { id },
    include: {
      createdBy: { select: { name: true } },
      transactions: {
        include: { createdBy: { select: { name: true } } },
        orderBy: { date: 'desc' },
      },
    },
  });

  if (!project) return notFound();

  const spent = project.transactions
    .filter((tx) => tx.status === 'APPROVED')
    .reduce((acc, tx) => acc + tx.amount, 0);
  const pending = project.transactions
    .filter((tx) => tx.status === 'PENDING')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const pct = project.budget > 0 ? Math.min(Math.round((spent / project.budget) * 100), 100) : 0;
  const over = spent > project.budget;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/dashboard/projects" className="hover:text-[#00A86B] transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{project.name}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900">{project.name}</h1>
          <p className="text-gray-500 text-sm mt-1">📍 {project.location}</p>
        </div>
        <Link href={`/dashboard/transactions/new?projectId=${project.id}`} className="btn-green px-5 py-2.5 text-sm rounded-full">
          + Add Expense
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Budget Overview Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Budget Overview</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <div className="text-gray-500 text-sm font-medium mb-1">Total Budget</div>
              <div className="text-2xl font-black text-gray-900">${project.budget.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm font-medium mb-1">Spent (Approved)</div>
              <div className="text-2xl font-black text-[#00A86B]">${spent.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm font-medium mb-1">Pending</div>
              <div className="text-2xl font-black text-yellow-500">${pending.toLocaleString()}</div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2 font-medium">
              <span className="text-gray-700">Utilization</span>
              <span className={over ? 'text-red-600' : 'text-[#00A86B]'}>
                {over ? 'Over budget' : `${pct}%`}
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${over ? 'bg-red-500' : 'bg-[#00A86B]'}`} 
                style={{ width: `${pct}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Project Details</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-gray-50 pb-3">
              <span className="text-gray-500">Dates</span>
              <span className="font-medium text-gray-900">
                {new Date(project.startDate).toLocaleDateString()} – {new Date(project.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-3">
              <span className="text-gray-500">Manager</span>
              <span className="font-medium text-gray-900">{project.createdBy.name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-3">
              <span className="text-gray-500">Transactions</span>
              <span className="font-medium text-gray-900">{project.transactions.length} total</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-gray-500">Created</span>
              <span className="font-medium text-gray-900">{new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h2>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {project.transactions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">💸</div>
            <p className="text-gray-500 text-sm">No transactions yet for this project.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider text-nowrap">Date</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider text-nowrap">Description</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider text-nowrap">Category</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider text-nowrap">Amount</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider text-nowrap">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider text-nowrap">Submitter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {project.transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className="px-5 py-4 font-medium text-gray-900 max-w-[200px] truncate">{tx.description}</td>
                    <td className="px-5 py-4 text-gray-500 text-nowrap">{tx.category.charAt(0) + tx.category.slice(1).toLowerCase()}</td>
                    <td className="px-5 py-4 font-bold text-gray-900 whitespace-nowrap">${tx.amount.toLocaleString()}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        tx.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 
                        tx.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-400 truncate max-w-[150px]">{tx.createdBy.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
