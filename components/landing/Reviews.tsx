const testimonials = [
  {
    stars: 5,
    title: '"This is exactly what we needed for our field projects."',
    quote:
      'Managing field expenses used to mean chasing paper receipts for weeks. With Tora, our finance team sees every transaction the moment it is submitted — and approvals happen in hours, not days.',
    name: 'Sarah K.',
    role: 'Finance Officer – Demo',
  },
  {
    stars: 5,
    title: '"Reviewing and approving transactions has never been this clean."',
    quote:
      'The approval workflow is simple but structured. I can see the project, the amount, the receipt — everything I need to make a decision. The audit trail gives our organization the accountability we need.',
    name: 'James M.',
    role: 'Project Manager – Demo',
  },
  {
    stars: 5,
    title: '"Finally, a system built for how field teams actually work."',
    quote:
      'Submitting expenses from the field is straightforward. I take a photo of the receipt, fill in the details, and submit. My finance officer sees it immediately. No more paper forms, no more delays.',
    name: 'Aisha L.',
    role: 'Field Officer – Demo',
  },
];

export default function Reviews() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10">
          Built for real teams,
          <br />
          real accountability
        </h2>

        {/* Scrollable review cards */}
        <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory mb-10">
          {testimonials.map((r, i) => (
            <div
              key={i}
              className="snap-start flex-shrink-0 w-72 md:w-80 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <span key={j} className="text-[#00A86B] text-sm">★</span>
                ))}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{r.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-6">{r.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#00A86B]/20 flex items-center justify-center text-[#00A86B] font-bold text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{r.name}</div>
                  <div className="text-xs text-gray-400">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* System stats */}
        <div className="flex flex-col sm:flex-row items-center gap-8 pt-6 border-t border-gray-200">
          {[
            { label: 'Roles Supported', value: '3' },
            { label: 'Transaction Categories', value: '6+' },
            { label: 'Built With', value: 'Next.js' },
          ].map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="text-2xl font-black text-[#00A86B]">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
