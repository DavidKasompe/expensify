'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', location: '', budget: '', startDate: '', endDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!res.ok) {
      const d = await res.json();
      setError(d.error ?? 'Something went wrong');
    } else {
      router.push('/dashboard/projects');
      router.refresh();
    }
  }

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">New Project</h1>
        <p className="text-gray-500 text-sm mt-1">Create a new field project with budget allocation.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: 'Project Name', key: 'name', type: 'text', placeholder: 'e.g. Northern Region Health Campaign' },
            { label: 'Location', key: 'location', type: 'text', placeholder: 'e.g. Nairobi, Kenya' },
            { label: 'Total Budget ($)', key: 'budget', type: 'number', placeholder: '48500' },
            { label: 'Start Date', key: 'startDate', type: 'date', placeholder: '' },
            { label: 'End Date', key: 'endDate', type: 'date', placeholder: '' },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              <input
                type={f.type}
                value={(form as any)[f.key]}
                onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                required
                placeholder={f.placeholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B] transition"
              />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="btn-green px-6 py-3 text-sm rounded-xl flex-1">
              {loading ? 'Creating...' : 'Create Project'}
            </button>
            <button type="button" onClick={() => router.back()} className="px-6 py-3 text-sm rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
