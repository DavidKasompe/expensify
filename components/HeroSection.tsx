'use client';

import { useState } from 'react';

const qualifiers = [
  { id: 'individual', label: 'Organize my own expenses' },
  { id: 'vsb', label: 'Manage expenses for 1–9 employees' },
  { id: 'smb', label: 'Manage expenses for 10+ employees' },
];

export default function HeroSection() {
  const [selected, setSelected] = useState('');
  const [email, setEmail] = useState('');

  return (
    <section className="bg-[#002419] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        {/* Headline + Ratings */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            The <em className="not-italic text-[#00A86B]">easiest</em> way
            <br />to do your expenses
          </h1>
          {/* G2 rating */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src="https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/logo_G2.svg"
              width={32}
              alt="G2"
            />
            <img
              src="https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/stars5.svg"
              width={116}
              alt="5 stars"
            />
            <p className="text-sm text-gray-300">
              4,200+ <strong className="text-white">5-star</strong> reviews
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left column */}
          <div className="lg:w-1/2">
            {/* Bullet points */}
            <ul className="space-y-3 mb-8 text-gray-200 text-sm leading-relaxed">
              <li className="flex gap-2">
                <span className="text-[#00A86B] mt-0.5">✓</span>
                <span>
                  <strong className="text-white">All inclusive.</strong> AI-powered expenses,
                  travel, reimbursements, and corporate cards.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#00A86B] mt-0.5">✓</span>
                <span>
                  <strong className="text-white">Bring your own cards (BYOC).</strong> You
                  don&apos;t have to switch corporate cards to use Expensify.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#00A86B] mt-0.5">✓</span>
                <span>
                  <strong className="text-white">45+ integrations.</strong> QuickBooks,
                  NetSuite, Sage Intacct, Xero, Workday, Gusto, and so much more.
                </span>
              </li>
            </ul>

            {/* Qualifier */}
            <h3 className="text-base font-semibold mb-3 text-gray-200">I want to:</h3>
            <div className="space-y-2 mb-6">
              {qualifiers.map((q) => (
                <label
                  key={q.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    selected === q.id
                      ? 'border-[#00A86B] bg-[#00A86B]/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="qualifier"
                    value={q.id}
                    checked={selected === q.id}
                    onChange={() => setSelected(q.id)}
                    className="accent-[#00A86B]"
                  />
                  <span className="text-sm font-medium">{q.label}</span>
                </label>
              ))}
            </div>

            {/* Email signup */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or phone number"
                aria-label="Email or Phone"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#00A86B] transition-colors"
              />
              <button
                type="button"
                className="btn-green px-6 py-3 text-sm rounded-full"
              >
                Get Started
              </button>
            </div>

            {/* Google signup */}
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-400">Or get started with</p>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:shadow-lg transition-shadow"
                aria-label="Sign in with Google"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="20"
                  height="20"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right column – hero screenshot */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/hero_screenshot_f1.png"
              width={600}
              height={340}
              alt="Expensify dashboard"
              className="rounded-2xl shadow-2xl w-full max-w-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
