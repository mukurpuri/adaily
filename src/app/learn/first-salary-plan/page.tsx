import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'First Salary Plan - Step by Step Guide | Adaily',
  description: 'A calm, practical guide for managing your first salary in India. Step-by-step plan, common mistakes to avoid, and a simple checklist.',
  openGraph: {
    title: 'First Salary Plan - Adaily',
    description: 'A calm, practical guide for managing your first salary.',
    url: 'https://adaily.in/learn/first-salary-plan',
  },
  alternates: {
    canonical: 'https://adaily.in/learn/first-salary-plan',
  },
};

export default function FirstSalaryPlanPage() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-emerald-50/30 via-white to-white">
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5">
            <Image 
              src="/logo.svg" 
              alt="Adaily" 
              width={32} 
              height={32} 
              className="w-7 h-7 sm:w-8 sm:h-8"
            />
            <span className="text-lg sm:text-xl font-bold text-gray-900">Adaily</span>
          </Link>
          <Link href="/tools" className="text-xs sm:text-sm text-gray-500 hover:text-orange-500">← All Tools</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium mb-4">
              📖 Learning Path
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">First Salary Plan</h1>
            <p className="text-gray-600">A calm, step-by-step approach for new earners.</p>
          </div>

          {/* TL;DR */}
          <section className="mb-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h2 className="font-bold text-blue-900 mb-3">TL;DR</h2>
            <p className="text-blue-800 text-sm leading-relaxed">
              Set up auto-savings first, build an emergency fund before investing, understand your EPF, 
              start a small SIP when ready, and don't rush big purchases. Take 6-12 months to get comfortable.
            </p>
          </section>

          {/* Step by Step */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Step-by-Step Plan</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Set up auto-transfer', desc: 'Move 10-20% of salary to a separate account the day it arrives. What you don\'t see, you won\'t spend.' },
                { step: 2, title: 'Build emergency fund', desc: 'Save 3 months of expenses in a savings account or liquid fund. This comes before investing.' },
                { step: 3, title: 'Understand your EPF', desc: 'Check your payslip for PF deduction. Your employer matches it. Let it grow.' },
                { step: 4, title: 'Get health insurance sorted', desc: 'If your company provides it, understand the coverage. If not, consider a basic plan.' },
                { step: 5, title: 'Start a small SIP', desc: 'Once emergency fund is ready, start ₹500-2000/month in an index fund. Consistency matters more than amount.' },
                { step: 6, title: 'Wait before big purchases', desc: 'Give yourself 6 months before buying a car, expensive gadgets, or taking loans.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Common Mistakes to Avoid</h2>
            <div className="bg-red-50 rounded-xl border border-red-100 p-6">
              <ul className="space-y-3">
                {[
                  'Buying a car in month one',
                  'Co-signing loans for others',
                  'Skipping health insurance',
                  'Investing without an emergency fund',
                  'Trying to "treat everyone" every payday',
                  'Ignoring EPF and tax documents',
                ].map((mistake, i) => (
                  <li key={i} className="flex items-start gap-2 text-red-800 text-sm">
                    <span className="text-red-400">✕</span>
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Checklist */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Simple Checklist</h2>
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
              <div className="space-y-3">
                {[
                  'Salary account opened',
                  'Auto-transfer set up',
                  'Emergency fund goal set (3 months)',
                  'EPF/UAN details noted',
                  'Health insurance checked',
                  'First SIP started (when ready)',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Related Tools</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/tools/emergency-fund-planner" className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-2xl block mb-2">🛡️</span>
                <span className="text-sm font-medium text-gray-900">Emergency Fund Planner</span>
              </Link>
              <Link href="/invest" className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-2xl block mb-2">🎯</span>
                <span className="text-sm font-medium text-gray-900">Investment Explorer</span>
              </Link>
            </div>
          </section>

          {/* Back */}
          <div className="text-center">
            <Link href="/tools" className="text-gray-500 hover:text-orange-500 text-sm">← Back to tools</Link>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 py-8 border-t border-gray-100">
        <div className="text-center text-gray-400 text-sm">Made with ❤️ in India • © {new Date().getFullYear()} Adaily</div>
      </footer>
    </div>
  );
}

