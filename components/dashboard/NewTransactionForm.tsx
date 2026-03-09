'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const CATEGORIES = ['TRANSPORT', 'SUPPLIES', 'ALLOWANCE', 'ACCOMMODATION', 'COMMUNICATION', 'OTHER'];

type Props = { projects: { id: string; name: string; budget: number; spent: number }[] };

export function NewTransactionForm({ projects }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    projectId: '', amount: '', category: 'TRANSPORT', description: '', date: new Date().toISOString().split('T')[0],
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedProject = projects.find((p) => p.id === form.projectId);
  const remaining = selectedProject ? selectedProject.budget - selectedProject.spent : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    let receiptUrl = '';
    if (receiptFile && supabase) {
      const ext = receiptFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(fileName, receiptFile);

      if (uploadError) {
        setError('Failed to upload receipt: ' + uploadError.message);
        setLoading(false);
        return;
      }
      if (uploadData) {
        const { data: publicUrlData } = supabase.storage.from('receipts').getPublicUrl(fileName);
        receiptUrl = publicUrlData.publicUrl;
      }
    }

    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, receiptUrl }),
    });
    setLoading(false);
    if (!res.ok) {
      const d = await res.json();
      setError(d.error ?? 'Something went wrong');
    } else {
      router.push('/dashboard/transactions');
      router.refresh();
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Project */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
          <select
            value={form.projectId}
            onChange={(e) => setForm((p) => ({ ...p, projectId: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B] bg-white"
          >
            <option value="">Select a project…</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          {remaining !== null && (
            <p className={`text-xs mt-1 ${remaining < 0 ? 'text-red-500' : 'text-gray-400'}`}>
              Remaining budget: <strong>${remaining.toLocaleString()}</strong>
            </p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
          <input
            type="number" step="0.01" min="0.01"
            value={form.amount}
            onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
            required placeholder="0.00"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B] bg-white"
          >
            {CATEGORIES.map((c) => <option key={c}>{c.charAt(0) + c.slice(1).toLowerCase()}</option>)}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            required rows={3} placeholder="Describe what this expense is for…"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B] resize-none"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date" value={form.date}
            onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
          />
        </div>

        {/* Receipt Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Receipt (Optional)</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00A86B]/10 file:text-[#00A86B] hover:file:bg-[#00A86B]/20"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="btn-green px-6 py-3 text-sm rounded-xl flex-1 disabled:opacity-50">
            {loading ? 'Submitting…' : 'Submit Transaction'}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-3 text-sm rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
