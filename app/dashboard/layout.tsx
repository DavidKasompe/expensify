import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import SessionProvider from '@/components/dashboard/SessionProvider';
import Sidebar from '@/components/dashboard/Sidebar';

export const metadata: Metadata = { title: 'Tora Dashboard' };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <SessionProvider session={session}>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </SessionProvider>
  );
}
