import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Our DNA - What Adaily Stands For',
  description: 'Adaily is a free, simple financial education platform for Indians. Learn about our philosophy, promises, and how we build tools differently.',
  openGraph: {
    title: 'Our DNA - What Adaily Stands For',
    description: 'Simple financial tools, built with care. No signup, no selling, no complexity.',
    url: 'https://adaily.in/about/dna',
  },
};

export default function DNAPage() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-orange-50/30 via-white to-white">
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
            href="/"
            className="text-xs sm:text-sm text-gray-500 hover:text-orange-500 transition-colors"
          >
            ← Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our DNA
            </h1>
            <p className="text-gray-600">
              What we believe and how we build.
            </p>
          </div>

          {/* Section 1: What Adaily Is */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">What Adaily is</h2>
            <p className="text-gray-600 leading-relaxed">
              Adaily is a free collection of simple financial tools built for people in India. 
              We help you understand your options — where to invest, how much to save, what 
              government schemes fit you — without overwhelming you with jargon or pushing 
              products. You come, you use, you learn. That's it.
            </p>
          </section>

          {/* Section 2: What Adaily Is Not */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">What Adaily is not</h2>
            <ul className="space-y-3">
              {[
                'Not a trading platform — we don\'t execute trades or manage your money',
                'Not a fintech app — no wallets, no payments, no bank integrations',
                'Not a lead generation site — we don\'t sell your data to anyone',
                'Not a subscription service — everything is free, always',
                'Not financial advice — we educate, we don\'t recommend specific actions',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <span className="text-gray-400 mt-0.5">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: Our Promise */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Our promise</h2>
            <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6">
              <ul className="space-y-4">
                {[
                  { icon: '🔓', text: 'Always free. No paywalls, no premium tiers, no "unlock for ₹99".' },
                  { icon: '🚫', text: 'No signup required. Use any tool without creating an account.' },
                  { icon: '🛡️', text: 'No data collection. We don\'t store what you enter. It stays in your browser.' },
                  { icon: '📖', text: 'Plain language only. If we can\'t explain it simply, we won\'t include it.' },
                  { icon: '🎯', text: 'Focused tools. Each tool does one thing well. No feature bloat.' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-emerald-800">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 4: How Our Tools Work */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">How our tools work</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Every Adaily tool follows the same simple pattern:
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="text-2xl mb-2">📝</div>
                <div className="font-semibold text-blue-900 text-sm">Your inputs</div>
                <p className="text-xs text-blue-600 mt-1">You tell us your situation</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold text-orange-900 text-sm">Your options</div>
                <p className="text-xs text-orange-600 mt-1">We show what fits</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="text-2xl mb-2">💡</div>
                <div className="font-semibold text-emerald-900 text-sm">Why it fits</div>
                <p className="text-xs text-emerald-600 mt-1">We explain the reasoning</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              We don't just give you an answer. We show you <em>why</em> something might 
              work for you based on what you told us. The goal is understanding, not blind following.
            </p>
          </section>

          {/* Section 5: Privacy & Data */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Privacy & data</h2>
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
              <p className="text-gray-700 leading-relaxed">
                <strong>In plain English:</strong> We don't collect your data. When you use our 
                tools, everything happens in your browser. We don't store your income, expenses, 
                age, or any inputs you provide. We don't use cookies to track you. We don't 
                have analytics that follow you around. We don't have a database of users because 
                we don't have users — we have visitors who use tools and leave.
              </p>
              <p className="text-gray-500 text-sm mt-4">
                The only data we might see is basic website traffic (which pages are popular), 
                and even that is anonymized.
              </p>
            </div>
          </section>

          {/* Section 6: Disclaimers */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Disclaimers</h2>
            <div className="bg-amber-50 rounded-2xl border border-amber-100 p-6">
              <p className="text-amber-800 leading-relaxed">
                Adaily is for <strong>educational purposes only</strong>. We provide general 
                information about financial concepts and investment options in India. This is 
                not financial advice, tax advice, or investment advice. We are not SEBI-registered 
                advisors. Before making any financial decisions, please consult with a qualified 
                financial planner or advisor who can assess your specific situation.
              </p>
              <p className="text-amber-700 text-sm mt-4">
                Past returns mentioned are historical and not indicative of future performance. 
                All investments carry risk.
              </p>
            </div>
          </section>

          {/* Section 7: For Whom */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Who is Adaily for?</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="text-2xl mb-2">🌱</div>
                <div className="font-semibold text-gray-900">Beginners</div>
                <p className="text-sm text-gray-500 mt-1">
                  New to investing and unsure where to start.
                </p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="text-2xl mb-2">💼</div>
                <div className="font-semibold text-gray-900">First salary earners</div>
                <p className="text-sm text-gray-500 mt-1">
                  Just started working and want to build good habits.
                </p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="text-2xl mb-2">🛡️</div>
                <div className="font-semibold text-gray-900">Cautious investors</div>
                <p className="text-sm text-gray-500 mt-1">
                  Prefer understanding before acting.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-lg shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all hover:scale-105"
            >
              Explore Our Tools
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 sm:px-6 py-8 border-t border-gray-100 mt-12">
        <div className="text-center text-gray-400 text-sm">
          Made with ❤️ in India • © {new Date().getFullYear()} Adaily
        </div>
      </footer>
    </div>
  );
}

