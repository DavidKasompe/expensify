const impacts = [
  {
    icon: '/icons/icons8-profit-50.png',
    stat: 'Visibility',
    title: 'Improved visibility of field expenses',
    desc: 'Finance teams see every transaction the moment it is captured — no more waiting for paper reports to arrive.',
    highlight: 'Real-time',
  },
  {
    icon: '/icons/icons8-atm-cancel-50.png',
    stat: 'Delays',
    title: 'Reduced delays in financial approvals',
    desc: 'Structured approval workflows replace informal chains of communication, cutting approval time dramatically.',
    highlight: 'Workflow',
  },
  {
    icon: '/icons/icons8-budget-50.png',
    stat: 'Budget',
    title: 'Better project budget monitoring',
    desc: 'Live budget utilization charts show how much has been spent and how much remains per project, instantly.',
    highlight: 'Live dashboards',
  },
  {
    icon: '/icons/icons8-certificate-50.png',
    stat: 'Accountability',
    title: 'Enhanced financial accountability across teams',
    desc: 'Every transaction is linked to a specific user, project, and timestamp — creating a complete audit trail.',
    highlight: 'Audit trail',
  },
  {
    icon: '/icons/icons8-invoice-50.png',
    stat: 'Reporting',
    title: 'Improved transparency for project reporting',
    desc: 'Generate structured reports for project monitoring, donor compliance, and financial audits in seconds.',
    highlight: 'Donor-ready reports',
  },
];

export default function CaseStudies() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">System Impact</h2>
        <p className="text-gray-500 text-sm mb-8">
          What Tora delivers for field finance teams.
        </p>
        <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory">
          {impacts.map((item, i) => (
            <div
              key={i}
              className="snap-start flex-shrink-0 w-72 md:w-80 rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="h-2 bg-[#00A86B]" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <img src={item.icon} alt="" width={36} height={36} className="w-9 h-9 object-contain" />
                  <div className="text-xl font-black text-[#00A86B]">{item.stat}</div>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                <span className="inline-block bg-[#00A86B]/10 text-[#00A86B] text-xs font-semibold px-3 py-1 rounded-full">
                  {item.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
