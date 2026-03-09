'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError('Invalid email or password.');
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  }

  const demoUsers = [
    { label: 'Admin', email: 'admin@tora.demo', role: 'Full Access' },
    { label: 'Finance Officer', email: 'finance@tora.demo', role: 'Approve Transactions' },
    { label: 'Field Officer', email: 'field@tora.demo', role: 'Create Transactions' },
  ];

  return (
    <div className="min-h-screen bg-[#002419] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-[#00A86B] text-4xl font-black tracking-tight mb-1">Tora</div>
          <p className="text-gray-400 text-sm">Field Finance Tracker</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-6">Sign in to your account</h1>

          {registered && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-4">
              Account created successfully. Please sign in.
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@tora.demo"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B] transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B] transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00A86B] text-white font-semibold py-3 rounded-xl text-sm hover:bg-[#009960] transition disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link href="/register" className="text-[#00A86B] font-semibold hover:underline">
              Sign up
            </Link>
          </p>

          {/* Demo users */}
          <div className="mt-6 border-t border-gray-100 pt-5">
            <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wider">Quick Access (Demo)</p>
            <div className="space-y-2">
              {demoUsers.map((u) => (
                <button
                  key={u.email}
                  type="button"
                  onClick={() => { setEmail(u.email); setPassword('demo1234'); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 hover:bg-[#00A86B]/10 hover:border-[#00A86B] border border-transparent transition text-left"
                >
                  <div>
                    <div className="text-xs font-semibold text-gray-900">{u.label}</div>
                    <div className="text-xs text-gray-400">{u.email}</div>
                  </div>
                  <span className="text-xs text-[#00A86B] font-medium">{u.role}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">Password: <code className="bg-gray-100 px-1 rounded">demo1234</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#002419] flex items-center justify-center text-white">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
