'use client';

import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string | React.ReactNode;
}

const leftFAQs: FAQItem[] = [
  {
    q: 'What is Expensify?',
    a: 'Expensify is an all-in-one expense management platform. You can track every receipt, manage expenses, and handle reimbursement, all with a couple of clicks.',
  },
  {
    q: 'Who is Expensify for?',
    a: 'Expensify is the perfect expense management tool for your entire team: Employees can scan receipts and get reimbursed fast. Employers can auto-approve and pay in clicks. Accounting can auto-import entries into their preferred software.',
  },
  {
    q: 'What kind of expenses can I track?',
    a: 'With Expensify, you can scan receipts, track mileage, and upload travel. You can also use it to pay bills and generate invoices.',
  },
  {
    q: "Can I use Expensify if my company doesn't use it?",
    a: "Yes! Employees and contractors can use Expensify to track and manage their expenses even if their company doesn't use Expensify. You can submit your expenses to your employer electronically or create a PDF that you can email.",
  },
  {
    q: 'How quickly can I get set up?',
    a: 'Expensify is ready to use in seconds! Just sign up with your email or phone number to open your account, and you can upload receipts right away!',
  },
];

const rightFAQs: FAQItem[] = [
  {
    q: 'What does Expensify integrate with?',
    a: 'Expensify integrates with QuickBooks, Xero, Oracle Netsuite, Sage Intacct, ADP, and Gusto, and 45+ more apps. Choose from accounting, finance, ERP, travel, tax, and many more software.',
  },
  {
    q: 'Can Expensify help with compliance?',
    a: 'Yes! Expensify allows you to streamline the auditing process by detecting duplicate receipts, ensuring correct exchange rates, and automatically checking transactions against company policies.',
  },
  {
    q: 'How do I upload expenses?',
    a: 'To upload expenses simply scan receipts via mobile app or swipe with your Expensify card. Expensify will automatically capture the amount, date, merchant, and more. You can also enter your payment information manually in a few seconds.',
  },
  {
    q: 'How much does it cost?',
    a: 'Expensify is completely free to use as an individual. For companies, plans start at $5 per member, but you can offset that cost with cash back from the Expensify Card.',
  },
  {
    q: 'How do I get started?',
    a: "Getting started with Expensify is easy! Just sign up with your email or phone number, and you can start uploading receipts and tracking expenses right away.",
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
