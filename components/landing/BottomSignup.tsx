'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BottomSignup() {
  const [email, setEmail] = useState('');

  return (
    <section className="py-16 bg-[#003D2B] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left – copy */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
              Explore the Tora demo system to see how organizations can monitor expenses and manage
              project budgets more effectively
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Enter your email to get access to the live demo. Pre-seeded accounts are available
              for all three roles: Field Officer, Finance Officer, and Administrator.
            </p>
          </div>

          {/* Right – form */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email to request access"
                aria-label="Email"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#00A86B] transition-colors"
              />
              <Link href="/login" className="btn-green px-6 py-3 text-sm rounded-full whitespace-nowrap flex items-center justify-center">
                Explore the Demo
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-400">Or sign in with</p>
              <Link
                href="/login"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:shadow-lg transition-shadow"
                aria-label="Sign in with Google"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
