const logos = [
  { text: 'NGO Finance', icon: '🌍' },
  { text: 'Field Teams', icon: '📍' },
  { text: 'Dev Organizations', icon: '🏢' },
  { text: 'Project Managers', icon: '📊' },
  { text: 'Finance Officers', icon: '💰' },
  { text: 'Field Officers', icon: '👷' },
  { text: 'Auditors', icon: '🔍' },
];

export default function LogoMarquee() {
  return (
    <section className="bg-[#002E22] py-10 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <h3 className="text-white/70 text-sm font-medium tracking-wide uppercase">
          Designed for NGOs, development organizations, and field-based finance teams
        </h3>
      </div>
      <div className="overflow-hidden">
        <div className="marquee-track">
          {logos.map((logo) => (
            <div
              key={logo.text}
              className="flex items-center justify-center gap-2 px-10 opacity-60 hover:opacity-100 transition-opacity"
            >
              <span className="text-2xl">{logo.icon}</span>
              <span className="text-white font-semibold text-sm whitespace-nowrap">{logo.text}</span>
            </div>
          ))}
          {logos.map((logo) => (
            <div
              key={`${logo.text}-dup`}
              className="flex items-center justify-center gap-2 px-10 opacity-60 hover:opacity-100 transition-opacity"
              aria-hidden
            >
              <span className="text-2xl">{logo.icon}</span>
              <span className="text-white font-semibold text-sm whitespace-nowrap">{logo.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
