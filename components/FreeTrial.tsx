'use client';

import { useState } from 'react';

const tabs = ['Employees', 'Business owners', 'Finance/Accounting'] as const;
type Tab = (typeof tabs)[number];

const steps: Record<Tab, { icon: string; step: string; desc: string }[]> = {
  Employees: [
    {
      icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__smartscan.svg',
      step: '1. Scan receipts',
      desc: 'Scan receipts via the mobile app, drag-and-drop, forwarding to receipts@expensify.com, or texting 47777.',
    },
    {
      icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__reports.svg',
      step: '2. Submit reports',
      desc: 'Concierge AI automatically categorizes and submits your expenses for reimbursement.',
    },
    {
      icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__sendmoney.svg',
      step: '3. Get reimbursed',
      desc: 'Get paid back directly to your bank account in as little as one business day.',
    },
  ],
  'Business owners': [
    {
      icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__rules.svg',
      step: '1. Set rules',
      desc: 'Set category limits and other expense rules to keep employee spend under control.',
    },
    {
      icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__approval.svg',
      step: '2. Approve reports',
      desc: 'Review and approve every expense report, or ask Concierge AI to only flag the outliers.',
    },
    {
      icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__bankconnect.svg',
      step: '3. Reimburse employees',
      desc: 'Pay employees back in as little as one business day.',
    },
  ],
  'Finance/Accounting': [
    {
      icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__envelopereceipt.svg',
      step: '1. Set rules',
      desc: 'Set category limits and other expense rules to keep employee spend under control.',
    },
    {
      icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__approval.svg',
      step: '2. Approve reports',
      desc: 'Review and approve every expense report, or ask Concierge AI to only flag the outliers.',
    },
    {
      icon: 'https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__monitor-remotesync.svg',
      step: '3. Sync accounting',
      desc: 'Automatically code, reconcile, and export expenses via a two-way sync with QuickBooks, Sage Intacct, NetSuite, Xero, and more.',
    },
  ],
};

export default function FreeTrial() {
  const [activeTab, setActiveTab] = useState<Tab>('Employees');

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">
          Try Expensify free for 30 days
        </h2>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full border-2 font-semibold text-sm transition-all ${
                activeTab === tab
                  ? 'border-[#00A86B] bg-[#00A86B] text-white'
                  : 'border-gray-200 text-gray-700 hover:border-[#00A86B] hover:text-[#00A86B]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {steps[activeTab].map((s) => (
            <div key={s.step} className="text-center p-6 rounded-2xl bg-gray-50 feature-card">
              <img
                src={s.icon}
                alt=""
                width={56}
                height={56}
                className="w-14 h-14 object-contain mx-auto mb-4"
              />
              <h3 className="text-base font-bold text-gray-900 mb-2">{s.step}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button type="button" className="btn-green px-8 py-3 text-sm rounded-full">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
