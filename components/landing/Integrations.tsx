export default function Integrations() {
  const stack = [
    { name: 'Next.js', desc: 'Frontend + API Routes', icon: '▲' },
    { name: 'TypeScript', desc: 'Type-safe codebase', icon: '𝙏𝙎' },
    { name: 'PostgreSQL', desc: 'Relational database', icon: '🐘' },
    { name: 'Prisma ORM', desc: 'Database access layer', icon: '🔷' },
    { name: 'NextAuth.js', desc: 'Authentication & sessions', icon: '🔐' },
    { name: 'Tailwind CSS', desc: 'Styling system', icon: '🎨' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#003D2B] p-10 md:p-14">
          {/* Background gradient */}
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-[#00A86B] to-transparent pointer-events-none" />
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
              Built on a Modern Stack
            </h2>
            <p className="text-gray-300 text-sm mb-8 max-w-lg">
              Tora uses Next.js for both the frontend and backend — clean, deployable, scalable.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stack.map((s) => (
                <div
                  key={s.name}
                  className="bg-white/10 border border-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors"
                >
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-white font-bold text-sm">{s.name}</div>
                  <div className="text-gray-400 text-xs mt-1">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
