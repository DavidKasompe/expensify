import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import Link from 'next/link';

async function getSummary() {
  const projects = await db.project.findMany({ select: { budget: true } });
  const totalBudget = projects.reduce((s: number, p: { budget: number }) => s + p.budget, 0);

  const spentAgg = await db.transaction.aggregate({ where: { status: 'APPROVED' }, _sum: { amount: true } });
  const totalSpent = spentAgg._sum.amount ?? 0;

  const pending = await db.transaction.count({ where: { status: 'PENDING' } });
  const approved = await db.transaction.count({ where: { status: 'APPROVED' } });
  const rejected = await db.transaction.count({ where: { status: 'REJECTED' } });
  const projectCount = await db.project.count();

  const recentTx = await db.transaction.findMany({
    take: 6, orderBy: { createdAt: 'desc' },
    include: { project: { select: { name: true } }, createdBy: { select: { name: true } } },
  });

  return { totalBudget, totalSpent, remaining: totalBudget - totalSpent, pending, approved, rejected, projectCount, recentTx };
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  APPROVED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const data = await getSummary();
  const role = (session?.user as any)?.role;

  const cards = [
    { label: 'Total Budget', value: `$${data.totalBudget.toLocaleString()}`, icon: '/icons/icons8-budget-50.png', color: 'bg-blue-50 border-blue-100' },
    { label: 'Total Spent', value: `$${data.totalSpent.toLocaleString()}`, icon: '/icons/icons8-cash-receipt-50.png', color: 'bg-orange-50 border-orange-100' },
    { label: 'Remaining', value: `$${data.remaining.toLocaleString()}`, icon: '/icons/icons8-banknotes-50.png', color: 'bg-green-50 border-green-100' },
    { label: 'Pending Transactions', value: data.pending, icon: '/icons/icons8-billing-machine-50.png', color: 'bg-yellow-50 border-yellow-100' },
    { label: 'Approved', value: data.approved, icon: '/icons/icons8-atm-approve-50.png', color: 'bg-green-50 border-green-100' },
    { label: 'Active Projects', value: data.projectCount, icon: '/icons/icons8-company-assets-50.png', color: 'bg-purple-50 border-purple-100' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, <strong>{session?.user?.name}</strong></p>
        </div>
        {(role === 'ADMIN' || role === 'FIELD_OFFICER') && (
          <Link href="/dashboard/transactions/new" className="btn-green px-5 py-2.5 text-sm rounded-full">
            + New Transaction
          </Link>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className={`rounded-2xl border p-5 ${c.color}`}>
            <div className="flex items-center gap-3 mb-2">
              <img src={c.icon} alt="" width={28} height={28} className="w-7 h-7 object-contain" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{c.label}</span>
            </div>
            <div className="text-2xl font-black text-gray-900">{c.value}</div>
          </div>
        ))}
      </div>

      {/* Budget bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700">Overall Budget Utilization</h2>
          <span className="text-sm font-bold text-gray-900">
            {data.totalBudget > 0 ? Math.round((data.totalSpent / data.totalBudget) * 100) : 0}%
          </span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00A86B] rounded-full transition-all"
            style={{ width: `${data.totalBudget > 0 ? Math.min((data.totalSpent / data.totalBudget) * 100, 100) : 0}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>$0</span>
          <span>${data.totalBudget.toLocaleString()}</span>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-gray-700">Recent Transactions</h2>
          <Link href="/dashboard/transactions" className="text-xs text-[#00A86B] font-semibold hover:underline">View all →</Link>
        </div>
        <div className="space-y-3">
          {data.recentTx.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">No transactions yet.</p>
          )}
          {data.recentTx.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{tx.description}</p>
                <p className="text-xs text-gray-400">{tx.project.name} · {tx.createdBy.name}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-sm font-bold text-gray-800">${tx.amount.toLocaleString()}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColors[tx.status]}`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
