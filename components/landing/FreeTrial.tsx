'use client';

import { useState } from 'react';

const tabs = ['Field Officers', 'Finance Officers', 'Administrators'] as const;
type Tab = (typeof tabs)[number];

const steps: Record<Tab, { icon: string; step: string; desc: string }[]> = {
  'Field Officers': [
    { icon: '/icons/icons8-add-receipt-50.png', step: '1. Capture Expenses', desc: 'Field officers record transactions and attach receipts directly from the field — no paperwork needed.' },
    { icon: '/icons/icons8-create-order-50.png', step: '2. Submit for Review', desc: 'Transactions are routed to finance officers for approval through the structured workflow.' },
    { icon: '/icons/icons8-check-dollar-50.png', step: '3. Track Status', desc: 'Field officers can view the real-time status of all their submitted transactions in one place.' },
  ],
  'Finance Officers': [
    { icon: '/icons/icons8-billing-50.png', step: '1. Review Submissions', desc: 'Pending transactions appear instantly in the Finance dashboard with all supporting details.' },
    { icon: '/icons/icons8-atm-approve-50.png', step: '2. Approve or Reject', desc: 'One-click approval or rejection with an optional note — all actions are logged with your identity.' },
    { icon: '/icons/icons8-profit-analysis-50.png', step: '3. Monitor Budgets', desc: 'Track budget utilization per project in real time and generate reports for stakeholders.' },
  ],
  'Administrators': [
    { icon: '/icons/icons8-company-assets-50.png', step: '1. Set Up Projects', desc: 'Create projects with budget allocations, locations, and timelines. Assign team members to each.' },
    { icon: '/icons/icons8-broker-50.png', step: '2. Manage Users', desc: 'Create and assign roles (Field Officer, Finance Officer) to control who can access what.' },
    { icon: '/icons/icons8-certificate-50.png', step: '3. Review Audit Logs', desc: 'Full audit trail of every action — who did what, when, and on which transaction or project.' },
  ],
};

export default function FreeTrial() {
  const [activeTab, setActiveTab] = useState<Tab>('Field Officers');

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
          How the System Works
        </h2>
        <p className="text-gray-500 text-sm mb-8">Different roles, one connected workflow.</p>

        <div className="flex flex-wrap gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full border-2 font-semibold text-sm transition-all ${
                activeTab === tab ? 'border-[#00A86B] bg-[#00A86B] text-white' : 'border-gray-200 text-gray-700 hover:border-[#00A86B] hover:text-[#00A86B]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {steps[activeTab].map((s) => (
            <div key={s.step} className="text-center p-6 rounded-2xl bg-gray-50 feature-card">
              <img src={s.icon} alt="" width={48} height={48} className="w-12 h-12 object-contain mx-auto mb-4" />
              <h3 className="text-base font-bold text-gray-900 mb-2">{s.step}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button type="button" className="btn-green px-8 py-3 text-sm rounded-full">
            Explore the Demo
          </button>
        </div>
      </div>
    </section>
  );
}
