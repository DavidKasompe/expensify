'use client';

import { useEffect, useState } from 'react';

type Log = {
  id: string; action: string; entityType: string; entityId: string;
  createdAt: string;
  user: { name: string; role: string };
};

const actionColors: Record<string, string> = {
  LOGIN: 'bg-blue-100 text-blue-700',
  PROJECT_CREATED: 'bg-purple-100 text-purple-700',
  PROJECT_UPDATED: 'bg-yellow-100 text-yellow-700',
  PROJECT_DELETED: 'bg-red-100 text-red-600',
  TRANSACTION_CREATED: 'bg-gray-100 text-gray-700',
  TRANSACTION_APPROVED: 'bg-green-100 text-green-700',
  TRANSACTION_REJECTED: 'bg-red-100 text-red-700',
  USER_CREATED: 'bg-indigo-100 text-indigo-700',
};

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/audit-logs').then(r => r.json()).then((data) => {
      setLogs(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Audit Logs</h1>
        <p className="text-gray-500 text-sm mt-1">Every financial action recorded with full accountability.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Loading logs…</div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">🕵️</div>
            <p className="text-gray-500 text-sm">No audit logs yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Timestamp', 'User', 'Role', 'Action', 'Entity'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-900">{log.user.name}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{log.user.role.replace('_', ' ')}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${actionColors[log.action] ?? 'bg-gray-100 text-gray-600'}`}>
                        {log.action.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs font-mono truncate max-w-xs">
                      {log.entityType}:{log.entityId.slice(0, 8)}…
                    </td>
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
