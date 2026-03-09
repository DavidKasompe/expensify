'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type Transaction = {
  id: string; amount: number; category: string;
  description: string; status: string; date: string;
  project: { id: string; name: string };
  createdBy: { name: string };
  approvedBy?: { name: string } | null;
  approvedAt?: string | null;
  receiptUrl?: string | null;
};

const statusColors: Record<string, string> = {
  PENDING:  'bg-yellow-100 text-yellow-700',
  APPROVED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
};

export default function TransactionsPage() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role;
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState('');

  async function load() {
    setLoading(true);
    const q = filter !== 'ALL' ? `?status=${filter}` : '';
    const res = await fetch(`/api/transactions${q}`);
    const data = await res.json();
    setTxs(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, [filter]); // eslint-disable-line

  async function act(id: string, action: 'approve' | 'reject', note?: string) {
    setActionId(id);
    await fetch(`/api/transactions/${id}/${action}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: note ?? '' }),
    });
    setActionId('');
    load();
  }

  const canApprove = role === 'ADMIN' || role === 'FINANCE_OFFICER';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Transactions</h1>
          <p className="text-gray-500 text-sm mt-1">{txs.length} transaction{txs.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/dashboard/transactions/new" className="btn-green px-5 py-2.5 text-sm rounded-full">
          + New Transaction
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${
              filter === f ? 'bg-[#00A86B] text-white border-[#00A86B]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#00A86B] hover:text-[#00A86B]'
            }`}
          >
            {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Loading…</div>
        ) : txs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">💸</div>
            <p className="text-gray-500 text-sm">No transactions found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Description', 'Project', 'Amount', 'Category', 'Date', 'Status', 'By', canApprove ? 'Actions' : ''].filter(Boolean).map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {txs.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-900 max-w-xs truncate">{tx.description}</td>
                    <td className="px-5 py-4 text-gray-500">{tx.project.name}</td>
                    <td className="px-5 py-4 font-bold text-gray-900">${tx.amount.toLocaleString()}</td>
                    <td className="px-5 py-4 text-gray-500">{tx.category.charAt(0) + tx.category.slice(1).toLowerCase()}</td>
                    <td className="px-5 py-4 text-gray-400">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      {tx.receiptUrl ? (
                        <a href={tx.receiptUrl} target="_blank" rel="noreferrer" className="text-[#00A86B] font-semibold text-xs hover:underline">
                          View
                        </a>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[tx.status] ?? ''}`}>{tx.status}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-400">{tx.createdBy.name}</td>
                    {canApprove && (
                      <td className="px-5 py-4">
                        {tx.status === 'PENDING' && (
                          <div className="flex gap-2">
                            <button
                              disabled={actionId === tx.id}
                              onClick={() => act(tx.id, 'approve')}
                              className="text-xs px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 font-semibold disabled:opacity-50 transition"
                            >
                              ✓ Approve
                            </button>
                            <button
                              disabled={actionId === tx.id}
                              onClick={() => act(tx.id, 'reject')}
                              className="text-xs px-3 py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 font-semibold disabled:opacity-50 transition"
                            >
                              ✗ Reject
                            </button>
                          </div>
                        )}
                      </td>
                    )}
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
