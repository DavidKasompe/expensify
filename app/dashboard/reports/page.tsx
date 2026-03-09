'use client';

import { useEffect, useState } from 'react';

type Summary = {
  totalBudget: number; totalSpent: number; remainingBudget: number;
  pendingCount: number; approvedTotal: number; approvedThisMonth: number;
  rejectedTotal: number;
  monthlySpend: { month: string; amount: number }[];
};

export default function ReportsPage() {
  const [data, setData] = useState<Summary | null>(null);

  useEffect(() => {
    fetch('/api/reports/summary').then((r) => r.json()).then(setData);
  }, []);

  if (!data) return <div className="text-sm text-gray-400 mt-10 text-center">Loading reports…</div>;

  const utilPct = data.totalBudget > 0 ? Math.round((data.totalSpent / data.totalBudget) * 100) : 0;
  const maxMonthly = Math.max(...data.monthlySpend.map((m) => m.amount), 1);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Reports</h1>
        <p className="text-gray-500 text-sm mt-1">Financial summary and spending trends.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Budget', value: `$${data.totalBudget.toLocaleString()}`, icon: '💰' },
          { label: 'Total Spent', value: `$${data.totalSpent.toLocaleString()}`, icon: '📤' },
          { label: 'Remaining', value: `$${data.remainingBudget.toLocaleString()}`, icon: '🏦' },
          { label: 'Pending', value: data.pendingCount, icon: '⏳' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-2xl mb-2">{c.icon}</div>
            <div className="text-xl font-black text-gray-900">{c.value}</div>
            <div className="text-xs text-gray-400 mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Budget utilization */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700">Budget Utilization</h2>
          <span className="text-sm font-black text-gray-900">{utilPct}%</span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div
            className={`h-full rounded-full transition-all ${utilPct > 90 ? 'bg-red-500' : utilPct > 70 ? 'bg-yellow-500' : 'bg-[#00A86B]'}`}
            style={{ width: `${Math.min(utilPct, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>Spent: ${data.totalSpent.toLocaleString()}</span>
          <span>Total: ${data.totalBudget.toLocaleString()}</span>
        </div>
      </div>

      {/* Monthly spending chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-5">Monthly Spending (Last 6 Months)</h2>
        {data.monthlySpend.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No spending data yet.</p>
        ) : (
          <div className="flex items-end gap-3 h-40">
            {data.monthlySpend.map((m) => {
              const h = Math.round((m.amount / maxMonthly) * 100);
              return (
                <div key={m.month} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-xs font-bold text-gray-700">${m.amount >= 1000 ? `${(m.amount / 1000).toFixed(1)}k` : m.amount}</span>
                  <div className="w-full bg-[#00A86B]/20 rounded-t-lg relative overflow-hidden" style={{ height: '96px' }}>
                    <div
                      className="absolute bottom-0 w-full bg-[#00A86B] rounded-t-lg transition-all"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{m.month.slice(5)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Status breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Transaction Status Breakdown</h2>
        <div className="space-y-3">
          {[
            { label: 'Approved', value: data.approvedTotal, color: 'bg-green-500' },
            { label: 'Pending', value: data.pendingCount, color: 'bg-yellow-500' },
            { label: 'Rejected', value: data.rejectedTotal, color: 'bg-red-500' },
          ].map((s) => {
            const total = data.approvedTotal + data.pendingCount + data.rejectedTotal;
            const pct = total > 0 ? Math.round((s.value / total) * 100) : 0;
            return (
              <div key={s.label}>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>{s.label}</span>
                  <span className="font-semibold">{s.value} ({pct}%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
