'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: '/icons/icons8-profit-analysis-50.png', exact: true },
  { href: '/dashboard/projects', label: 'Projects', icon: '/icons/icons8-company-assets-50.png' },
  { href: '/dashboard/transactions', label: 'Transactions', icon: '/icons/icons8-receipt-dollar-50.png' },
  { href: '/dashboard/reports', label: 'Reports', icon: '/icons/icons8-invoice-50.png', roles: ['ADMIN', 'FINANCE_OFFICER'] },
  { href: '/dashboard/audit-logs', label: 'Audit Logs', icon: '/icons/icons8-certificate-50.png', roles: ['ADMIN'] },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = (session?.user as any)?.role ?? '';

  const roleColors: Record<string, string> = {
    ADMIN: 'bg-purple-100 text-purple-700',
    FINANCE_OFFICER: 'bg-blue-100 text-blue-700',
    FIELD_OFFICER: 'bg-green-100 text-green-700',
  };

  const roleLabel: Record<string, string> = {
    ADMIN: 'Admin',
    FINANCE_OFFICER: 'Finance Officer',
    FIELD_OFFICER: 'Field Officer',
  };

  return (
    <aside className="w-60 shrink-0 bg-[#002419] text-white flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/" className="text-[#00A86B] text-2xl font-black tracking-tight">Tora</Link>
        <p className="text-gray-500 text-xs mt-0.5">Field Finance Tracker</p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          if (item.roles && !item.roles.includes(role)) return null;
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-[#00A86B] text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <img src={item.icon} alt="" width={18} height={18} className={`w-[18px] h-[18px] object-contain ${active ? 'brightness-0 invert' : 'opacity-60'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer: user info + sign out */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#00A86B]/20 flex items-center justify-center text-[#00A86B] font-bold text-sm">
            {session?.user?.name?.[0] ?? '?'}
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-white truncate">{session?.user?.name}</div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${roleColors[role] ?? 'bg-gray-100 text-gray-600'}`}>
              {roleLabel[role] ?? role}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full text-left text-xs text-gray-500 hover:text-red-400 transition px-1"
        >
          Sign out →
        </button>
      </div>
    </aside>
  );
}
