'use client';

import { useState } from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
  link: string;
}

const features: Feature[] = [
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__money-receipt.svg',
    title: 'Expense management',
    description:
      'Automatically create, submit, approve, and reimburse expenses. Reports automatically sync with accounting.',
    link: 'https://use.expensify.com/expense-management',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__luggage.svg',
    title: 'Travel',
    description:
      'Book flights, hotels, cars, and rail right in the app. Every booking syncs with your expenses for total T&E.',
    link: 'https://use.expensify.com/travel',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__handcard.svg',
    title: 'Expensify Card',
    description:
      'The Expensify Visa® Commercial Card earns cash back on US purchases and lowers your Expensify bill.',
    link: 'https://use.expensify.com/company-credit-card',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__smartscan.svg',
    title: 'Receipt scanning',
    description:
      "Snap a photo, forward to receipts@expensify.com, or upload a file – we'll scan the details!",
    link: 'https://use.expensify.com/receipt-scanning-app',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__vertical-credit-cards.svg',
    title: 'Bring your own cards (BYOC)',
    description:
      'Link the corporate cards you already have for automatic reconciliation. 10k+ banks supported globally.',
    link: 'https://use.expensify.com/credit-card-import',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__earth.svg',
    title: 'Global reimbursements',
    description:
      'Reimburse employees or independent contractors anywhere in the world, in their local currency.',
    link: 'https://use.expensify.com/global-reimbursement',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__virtualcard.svg',
    title: 'Virtual cards',
    description:
      'Instantly issue unlimited virtual cards for employees, vendors, or projects. Free with every Expensify Card.',
    link: 'https://use.expensify.com/unlimited-virtual-cards',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__report-receipt.svg',
    title: 'Expense reports',
    description:
      'Submit, review, and approve expenses in seconds. Expensify handles the matching and policy checks.',
    link: 'https://use.expensify.com/expense-reports',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__concierge-bot.svg',
    title: 'AI-powered expenses',
    description:
      "Automate expense categorization, flag policy violations, enforce rules, and reduce manual errors with Expensify's Concierge AI.",
    link: 'https://use.expensify.com/ai-expense-management',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__piggybank.svg',
    title: 'Track expenses',
    description:
      'Capture and categorize receipts, card transactions, mileage, and more for tax purposes.',
    link: 'https://use.expensify.com/track-expenses',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__mobileapp.svg',
    title: 'Mobile app',
    description: 'Manage expenses, cards, and travel on the go. All functionality included.',
    link: 'https://use.expensify.com/expensify-mobile-app',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__commentbubbles.svg',
    title: 'Chat',
    description:
      'Chat directly on every expense to clear up any questions or confusion in realtime.',
    link: 'https://use.expensify.com/expensify-business-chat-app',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__coins.svg',
    title: 'Spend management',
    description:
      'Control company spend with smart limits, approvals, and visibility across every card and expense.',
    link: 'https://use.expensify.com/spend-management',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__chart.svg',
    title: 'Financial reporting',
    description:
      'Build tailored reports to analyze spend, identify trends, and support smarter business decisions.',
    link: 'https://use.expensify.com/custom-financial-reporting',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__moneyintowallet.svg',
    title: 'Budgets',
    description:
      'Set, track, and manage budgets across teams and departments. Control spend before it happens.',
    link: 'https://use.expensify.com/budgets',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__bill.svg',
    title: 'Bill pay',
    description:
      "Capture, approve, and pay bills with Expensify so you never miss a deadline.",
    link: 'https://use.expensify.com/bill-pay-app',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__invoice.svg',
    title: 'Invoices',
    description:
      'Create and send professional invoices, track payments, and get paid faster - all in Expensify.',
    link: 'https://use.expensify.com/invoicing-software',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__reimburse-indirect.svg',
    title: 'Travel reimbursement',
    description:
      'Automatically match receipts to travel expenses and reimburse employees faster for out-of-pocket spend.',
    link: 'https://use.expensify.com/travel-expense-reimbursement',
  },
  {
    icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__monitorsync.svg',
    title: 'Integrations',
    description:
      'Integrates with QuickBooks, NetSuite, Sage Intacct, Xero, Workday, Gusto, Uber, Lyft, and 45+ more.',
    link: 'https://use.expensify.com/all-integrations',
  },
];

const INITIAL_COUNT = 9;

export default function FeaturesGrid() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? features : features.slice(0, INITIAL_COUNT);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((feature) => (
            <div
              key={feature.title}
              className="feature-card p-5 rounded-2xl border border-gray-100 bg-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={feature.icon} alt="" width={36} height={36} className="w-9 h-9 object-contain" />
                <h3 className="text-base font-bold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">{feature.description}</p>
              <a
                href={feature.link}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-[#00A86B] font-semibold hover:underline"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#00A86B] text-[#00A86B] font-semibold text-sm hover:bg-[#00A86B] hover:text-white transition-all"
          >
            {showAll ? 'See Less Features' : 'See All Features'}
          </button>
        </div>
      </div>
    </section>
  );
}
