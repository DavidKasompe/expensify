const footerSections = [
  {
    title: 'Features',
    links: [
      { label: 'Field Expense Capture', href: '#' },
      { label: 'Project Budget Tracking', href: '#' },
      { label: 'Approval Workflow', href: '#' },
      { label: 'Receipt Upload', href: '#' },
      { label: 'Real-Time Reporting', href: '#' },
      { label: 'Role-Based Access', href: '#' },
      { label: 'Financial Reports', href: '#' },
      { label: 'Audit Logs', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'System Architecture', href: '#' },
      { label: 'Database ERD', href: '#' },
      { label: 'API Documentation', href: '#' },
      { label: 'GitHub Repository', href: '#' },
      { label: 'README', href: '#' },
    ],
  },
  {
    title: 'Learn More',
    links: [
      { label: 'About Tora', href: '#' },
      { label: 'Tech Stack', href: '#' },
      { label: 'Security Considerations', href: '#' },
      { label: 'Scalability Plan', href: '#' },
      { label: 'Demo Video', href: '#' },
    ],
  },
  {
    title: 'Get Access',
    links: [
      { label: 'Request Demo', href: '/login' },
      { label: 'Field Officer Login', href: '/login' },
      { label: 'Finance Officer Login', href: '/login' },
      { label: 'Admin Login', href: '/login' },
    ],
  },
];

const socialLinks = [
  { href: '#', label: 'GitHub', icon: '⌥' },
  { href: '#', label: 'LinkedIn', icon: 'in' },
  { href: '#', label: 'Twitter', icon: '𝕏' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[#00A86B] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              {section.title === 'Learn More' && (
                <div className="flex gap-3 mt-5">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-[#00A86B] hover:text-white transition-all"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              )}
              {section.title === 'Get Access' && (
                <p className="text-xs text-gray-400 mt-4">
                  ©2026 Tora – Field Finance Tracker
                  <br />
                  Demo MVP · Built with Next.js
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 border-t border-gray-200 pt-6 mb-6 leading-relaxed">
          Tora is a demonstration application built to showcase field expense management, project
          budget tracking, and multi-role approval workflows for NGOs and development organizations.
          This is a demo MVP and not a production financial system.
        </p>

        <div className="flex items-center gap-3">
          <span className="text-[#00A86B] font-black text-2xl tracking-tight">Tora</span>
          <span className="text-gray-400 text-xs">Field Finance Tracker · Next.js + PostgreSQL</span>
        </div>
      </div>
    </footer>
  );
}
