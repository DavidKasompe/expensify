'use client';

import { useState } from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: '/icons/icons8-add-receipt-50.png',
    title: 'Field Expense Capture',
    description:
      'Record expenses directly from field officers with location, category, and receipt attachments in real time.',
  },
  {
    icon: '/icons/icons8-budget-50.png',
    title: 'Project Budget Tracking',
    description:
      'Monitor budget allocations and spending progress across projects in real time with automated alerts.',
  },
  {
    icon: '/icons/icons8-atm-approve-50.png',
    title: 'Approval Workflow',
    description:
      'Finance officers can approve, reject, or review transactions through a structured, auditable workflow.',
  },
  {
    icon: '/icons/icons8-cash-receipt-50.png',
    title: 'Receipt Upload',
    description:
      'Attach receipts or supporting documents to each transaction for accountability and auditing purposes.',
  },
  {
    icon: '/icons/icons8-company-assets-50.png',
    title: 'Multi-Project Management',
    description:
      'Track financial activities across multiple field projects, teams, and locations from a single dashboard.',
  },
  {
    icon: '/icons/icons8-profit-analysis-50.png',
    title: 'Real-Time Reporting',
    description:
      'View spending summaries, budget utilization, and financial trends through live dashboards and charts.',
  },
  {
    icon: '/icons/icons8-card-security-50.png',
    title: 'Role-Based Access Control',
    description:
      'Secure access with roles: Field Officer, Finance Officer, and Administrator — each scoped appropriately.',
  },
  {
    icon: '/icons/icons8-invoice-50.png',
    title: 'Financial Reports',
    description:
      'Generate structured expense reports for project monitoring, donor reporting, and audits — export to CSV.',
  },
  {
    icon: '/icons/icons8-certificate-50.png',
    title: 'Audit Logs',
    description:
      'Every financial action is recorded with timestamps, user identity, and change details for full transparency.',
  },
];

const INITIAL_COUNT = 9;

export default function FeaturesGrid() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? features : features.slice(0, INITIAL_COUNT);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
          Core System Capabilities
        </h2>
        <p className="text-gray-500 text-sm mb-10">
          Everything your organization needs for transparent, accountable field finance management.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((feature) => (
            <div
              key={feature.title}
              className="feature-card p-5 rounded-2xl border border-gray-100 bg-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={feature.icon} alt="" width={32} height={32} className="w-8 h-8 object-contain" />
                <h3 className="text-base font-bold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#00A86B] text-[#00A86B] font-semibold text-sm hover:bg-[#00A86B] hover:text-white transition-all"
          >
            {showAll ? 'See Less' : 'See All Capabilities'}
          </button>
        </div>
      </div>
    </section>
  );
}
