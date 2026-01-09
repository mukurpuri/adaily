import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Your First Salary: A Simple Plan | Adaily Guide',
  description: 'A calm, practical guide for new earners in India. Learn how to manage your first salary with a 5-step plan covering savings, emergency funds, and investments.',
  keywords: [
    'first salary tips India',
    'how to manage first salary',
    'first job money tips',
    'salary management for beginners',
    'first salary investment',
    'new earner guide India',
  ],
  openGraph: {
    title: 'Your First Salary: A Simple Plan | Adaily',
    description: 'A calm, practical guide for new earners in India.',
    url: 'https://adaily.in/guides/first-salary',
    type: 'article',
  },
};

// FAQ Schema for SEO
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much should I save from my first salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aim to save at least 20% of your salary. Start with whatever you can, even 10% is a good beginning. The key is to build the habit early.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I invest my first salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Build an emergency fund first (3-6 months of expenses), then start investing. Even ₹500/month in a simple index fund SIP is a great start.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the 50-30-20 rule?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 50-30-20 rule suggests: 50% for needs (rent, bills), 30% for wants (entertainment, shopping), and 20% for savings and investments.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I contribute to EPF or opt out?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EPF is excellent for long-term savings with tax benefits and employer matching. It is strongly recommended to continue contributing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much emergency fund do I need as a new earner?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Start with a goal of 3 months of expenses. Build up to 6 months over time. Keep this in a savings account or liquid fund for easy access.',
      },
    },
  ],
};

const steps = [
  {
    number: 1,
    title: 'Open a salary account',
    description: 'If your company provides one, use it. Otherwise, choose a zero-balance account with good digital banking.',
    tip: 'Look for accounts with sweep-in FD for better interest on idle money.',
    icon: '🏦',
  },
  {
    number: 2,
    title: 'Set up auto-transfer for savings',
    description: 'The day your salary arrives, automatically move 20% to a separate account. What you don\'t see, you won\'t spend.',
    tip: 'Even 10% is fine to start. Increase by 1% every 3 months.',
    icon: '💳',
  },
  {
    number: 3,
    title: 'Build your emergency fund first',
    description: 'Before investing anywhere, save 3 months of expenses in a liquid, accessible form. This is your safety net.',
    tip: 'Keep this in a savings account or liquid mutual fund, not FDs with lock-in.',
    icon: '🛡️',
  },
  {
    number: 4,
    title: 'Understand your EPF',
    description: 'If you\'re salaried, you\'re probably contributing to EPF. It\'s tax-free and your employer matches it. Let it grow.',
    tip: 'Check your EPF balance on epfindia.gov.in with your UAN.',
    icon: '👔',
  },
  {
    number: 5,
    title: 'Start a small SIP',
    description: 'Once you have an emergency fund, start investing ₹500-1000/month in a simple index fund. Consistency beats timing.',
    tip: 'Nifty 50 index funds are a good starting point. Don\'t overthink this.',
    icon: '📈',
  },
];

const avoidList = [
  'Don\'t buy a car or expensive gadgets in month one',
  'Don\'t co-sign loans for friends or relatives',
  'Don\'t invest in things you don\'t understand',
  'Don\'t skip health insurance if your company provides it',
  'Don\'t ignore your PF and tax documents',
  'Don\'t feel pressured to "treat everyone" every payday',
];

const checklist = [
  'Salary account opened',
  'Auto-transfer set up (even ₹5,000/month)',
  'Emergency fund goal set (3 months expenses)',
  'EPF/UAN details noted',
  'Basic health insurance confirmed',
  'First SIP started (after emergency fund)',
];

export default function FirstSalaryGuidePage() {
  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-emerald-50/50 via-white to-white">
        {/* Header */}
        <header className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
              <Image 
                src="/logo.svg" 
                alt="Adaily" 
                width={32} 
                height={32} 
                className="w-7 h-7 sm:w-8 sm:h-8"
              />
              <span className="text-lg sm:text-xl font-bold text-gray-900">Adaily</span>
            </Link>
            <Link
              href="/tools"
              className="text-xs sm:text-sm text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-1 font-semibold"
            >
              ← All Tools
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium mb-6">
              <span className="text-lg">📖</span>
              Guide for New Earners
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Your first salary: a simple plan
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Congrats on the job! Here's a calm, no-pressure guide to handling your first paycheck wisely.
            </p>
          </div>
        </section>

        {/* 5-Step Plan */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              The 5-Step Starter Plan
            </h2>
            <div className="space-y-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="bg-white rounded-2xl shadow-lg shadow-gray-100 border border-gray-100 p-6 sm:p-8"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{step.icon}</span>
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                        <p className="text-sm text-emerald-700">
                          <span className="font-medium">💡 Tip:</span> {step.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What to Avoid */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-50 rounded-2xl border border-red-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                Common First-Salary Mistakes
              </h2>
              <ul className="space-y-3">
                {avoidList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-red-800">
                    <span className="text-red-400 mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Starter Checklist */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl shadow-blue-200">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                Your Starter Checklist
              </h2>
              <p className="text-blue-100 mb-6 text-sm">
                Print this or screenshot it. Check off each item over your first 3-6 months.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {checklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                    <div className="w-5 h-5 rounded border-2 border-white/50 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTAs to Tools */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Helpful Tools for You
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/tools/emergency-fund-planner"
                className="bg-white rounded-2xl shadow-lg shadow-gray-100 border border-gray-100 p-6 hover:shadow-xl transition-shadow group"
              >
                <span className="text-3xl block mb-3">🛡️</span>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  Emergency Fund Planner
                </h3>
                <p className="text-sm text-gray-500">Calculate how much safety net you need</p>
              </Link>
              <Link
                href="/invest"
                className="bg-white rounded-2xl shadow-lg shadow-gray-100 border border-gray-100 p-6 hover:shadow-xl transition-shadow group"
              >
                <span className="text-3xl block mb-3">🎯</span>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                  Investment Explorer
                </h3>
                <p className="text-sm text-gray-500">Find the right investment for your goals</p>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, i) => (
                <details
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
                >
                  <summary className="p-5 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-between">
                    {faq.name}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.acceptedAnswer.text}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-500 mb-6">
              Remember: there's no perfect way to do this. Start simple, stay consistent, and adjust as you learn.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
            >
              ← Explore All Tools
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 sm:px-6 py-8 border-t border-gray-100">
          <div className="text-center text-gray-400 text-sm">
            Made with ❤️ in India • © {new Date().getFullYear()} Adaily
          </div>
        </footer>
      </div>
    </>
  );
}

