const footerSections = [
  {
    title: 'Features',
    links: [
      { label: 'Expense Management', href: 'https://use.expensify.com/expense-management' },
      { label: 'Spend Management', href: 'https://use.expensify.com/spend-management' },
      { label: 'Expense Reports', href: 'https://use.expensify.com/expense-reports' },
      { label: 'Company Credit Card', href: 'https://use.expensify.com/company-credit-card' },
      { label: 'Receipt Scanning App', href: 'https://use.expensify.com/receipt-scanning-app' },
      { label: 'Bill Pay', href: 'https://use.expensify.com/bills' },
      { label: 'Invoicing', href: 'https://use.expensify.com/invoices' },
      { label: 'Payroll', href: 'https://use.expensify.com/payroll' },
      { label: 'Travel', href: 'https://use.expensify.com/travel' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'ExpensifyApproved!', href: 'https://use.expensify.com/accountants' },
      { label: 'Press Kit', href: 'https://use.expensify.com/press-kit' },
      { label: 'Support', href: 'https://use.expensify.com/support' },
      { label: 'ExpensifyHelp', href: 'https://help.expensify.com/' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
    ],
  },
  {
    title: 'Learn more',
    links: [
      { label: 'About Expensify', href: 'https://we.are.expensify.com/how-we-got-here' },
      { label: 'Blog', href: 'https://blog.expensify.com/' },
      { label: 'Jobs', href: 'https://we.are.expensify.com/' },
      { label: 'Expensify.org', href: 'https://www.expensify.org' },
      { label: 'Investor Relations', href: 'https://ir.expensify.com' },
    ],
  },
  {
    title: 'Get Started',
    links: [
      { label: 'Create a new account', href: '#' },
      { label: 'Log in', href: '#' },
    ],
  },
];

const socialLinks = [
  { href: 'https://www.twitter.com/expensify', label: 'Twitter', icon: '𝕏' },
  { href: 'http://www.instagram.com/expensify', label: 'Instagram', icon: '📷' },
  { href: 'https://www.facebook.com/expensify', label: 'Facebook', icon: 'f' },
  { href: 'http://www.linkedin.com/company/expensify', label: 'LinkedIn', icon: 'in' },
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
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                      className="text-sm text-gray-600 hover:text-[#00A86B] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              {/* Social icons below "Learn more" */}
              {section.title === 'Learn more' && (
                <div className="flex gap-3 mt-5">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-[#00A86B] hover:text-white transition-all"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              )}
              {section.title === 'Get Started' && (
                <p className="text-xs text-gray-400 mt-4">
                  ©2008–2026 Expensify, Inc.
                  <br />
                  Money transmission is provided by Expensify Payments LLC (NMLS ID: 2017010).
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Fine print */}
        <p className="text-xs text-gray-400 border-t border-gray-200 pt-6 mb-6 leading-relaxed">
          The Expensify Visa® Commercial Card is issued by The Bancorp Bank, N.A. pursuant to a
          license from Visa U.S.A. Inc. and may not be used at all merchants that accept Visa cards.
          Apple® and the Apple logo® are trademarks of Apple Inc., registered in the U.S. and other
          countries. App Store is a service mark of Apple Inc. Google Play and the Google Play logo
          are trademarks of Google LLC.
        </p>

        {/* Footer logo */}
        <div className="flex justify-center md:justify-start">
          <img
            src="https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/expensify-footer-logo-green.svg"
            alt="Expensify"
            height={40}
            className="h-10 opacity-80"
          />
        </div>
      </div>
    </footer>
  );
}
