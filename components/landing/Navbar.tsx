import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#002419] px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <span className="text-[#00A86B] text-2xl font-black tracking-tight">Tora</span>
        <span className="text-white/40 text-xs font-medium hidden sm:block">
          Field Finance Tracker
        </span>
      </div>
      <Link href="/login" className="btn-green text-sm px-5 py-2">
        Request Demo
      </Link>
    </nav>
  );
}
