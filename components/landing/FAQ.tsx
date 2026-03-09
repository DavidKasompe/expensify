'use client';

import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

const leftFAQs: FAQItem[] = [
  {
    q: 'What is Tora?',
    a: 'Tora is a demo application designed to showcase how organizations can track field expenses and manage project finances in real time, with structured approval workflows and reporting.',
  },
  {
    q: 'Who is the system designed for?',
    a: 'NGOs, development organizations, and teams managing finances across multiple field locations — anywhere receipts and approvals happen outside a central office.',
  },
  {
    q: 'What financial data can be tracked?',
    a: 'Field expenses by category, project budget allocations, approval workflow status, monthly spending trends, and audit logs of every action.',
  },
  {
    q: 'Can multiple projects be monitored?',
    a: 'Yes. Tora supports multiple concurrent projects, each with its own budget, location, and team. Finance officers can view all projects in one dashboard.',
  },
  {
    q: 'How secure is the system?',
    a: 'Role-based access control ensures each user only sees and does what their role permits. All API routes validate the session server-side, and passwords are hashed with bcrypt.',
  },
];

const rightFAQs: FAQItem[] = [
  {
    q: 'Can I use Next.js for both frontend and backend?',
    a: 'Yes! Tora uses Next.js API Routes (App Router) for all backend logic — no separate Django or Express server needed. One codebase, one deployment.',
  },
  {
    q: 'What roles exist in the system?',
    a: 'Three roles: Field Officer (creates transactions), Finance Officer (approves/rejects transactions and views reports), and Administrator (full access including user management and audit logs).',
  },
  {
    q: 'Is there an audit trail?',
    a: 'Yes. Every financial action — transaction creation, approval, rejection, login — is logged with the user identity, timestamp, and relevant metadata.',
  },
  {
    q: 'Can I export reports?',
    a: 'Yes, the reports page supports CSV export of filtered expense data for use in donor reporting, project monitoring, or audits.',
  },
  {
    q: 'How do I get started?',
    a: 'Explore the live demo with pre-seeded user accounts for each role, or clone the GitHub repository and run it locally using the README setup guide.',
  },
];

function FAQItem({ q, a }: FAQItem) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 flex items-center justify-between gap-4 group"
      >
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#00A86B] transition-colors">
          {q}
        </h3>
        <span
          className={`text-[#00A86B] text-xl font-light transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        >
          ⌄
        </span>
      </button>
      <div className={`faq-answer ${open ? 'open' : ''}`}>
        <p className="text-sm text-gray-600 leading-relaxed pb-4">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10">FAQ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12">
          <div>{leftFAQs.map((item) => <FAQItem key={item.q} {...item} />)}</div>
          <div>{rightFAQs.map((item) => <FAQItem key={item.q} {...item} />)}</div>
        </div>
      </div>
    </section>
  );
}
