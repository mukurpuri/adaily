import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Beginner Investing Path - Learn Step by Step | Adaily',
  description: 'A calm, structured path for beginners to learn investing in India. No jargon, no pressure, just understanding.',
  openGraph: {
    title: 'Beginner Investing Path - Adaily',
    description: 'A calm, structured path for beginners to learn investing.',
    url: 'https://adaily.in/learn/beginner-investing-path',
  },
};

export default function BeginnerInvestingPathPage() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-blue-50/30 via-white to-white">
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
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-4">📖 Learning Path</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Beginner Investing Path</h1>
            <p className="text-gray-600">Learn the basics before putting money anywhere.</p>
          </div>

          {/* TL;DR */}
          <section className="mb-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h2 className="font-bold text-blue-900 mb-3">TL;DR</h2>
            <p className="text-blue-800 text-sm leading-relaxed">
              Understand the difference between saving and investing. Start with safe options (FD, PPF). 
              Learn what mutual funds are. Try a small SIP in an index fund. Give yourself 1-2 years to learn 
              before considering direct stocks.
            </p>
          </section>

          {/* Step by Step */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Step-by-Step Plan</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Learn the vocabulary', desc: 'Understand terms like FD, SIP, mutual fund, risk, returns. Our glossary can help.' },
                { step: 2, title: 'Secure your base first', desc: 'Have an emergency fund and basic health insurance before investing.' },
                { step: 3, title: 'Start with safe options', desc: 'PPF, FD, or liquid funds. Low risk, easy to understand, builds confidence.' },
                { step: 4, title: 'Understand mutual funds', desc: 'Learn how they pool money, what NAV means, and how SIPs work.' },
                { step: 5, title: 'Try your first SIP', desc: 'Start with ₹500-1000/month in a Nifty 50 index fund. Watch it for 6 months.' },
                { step: 6, title: 'Learn about asset allocation', desc: 'Understand why mixing safe and growth investments matters.' },
                { step: 7, title: 'Consider direct stocks later', desc: 'Only after you\'re comfortable with mutual funds and have 2+ years experience.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm flex-shrink-0">{item.step}</div>
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
                  'Starting with stocks based on tips from friends',
                  'Checking portfolio daily and panicking at drops',
                  'Stopping SIP when market falls',
                  'Investing money you might need in 6 months',
                  'Chasing past returns ("this fund gave 30% last year!")',
                  'Ignoring fees and expense ratios',
                ].map((mistake, i) => (
                  <li key={i} className="flex items-start gap-2 text-red-800 text-sm"><span className="text-red-400">✕</span>{mistake}</li>
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
                  'Read the glossary',
                  'Emergency fund ready',
                  'Opened a demat/trading account',
                  'Completed KYC for mutual funds',
                  'Started first SIP',
                  'Tracking investments monthly (not daily)',
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
              <Link href="/invest" className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-2xl block mb-2">🎯</span>
                <span className="text-sm font-medium text-gray-900">Investment Explorer</span>
              </Link>
              <Link href="/learn/glossary" className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-2xl block mb-2">📚</span>
                <span className="text-sm font-medium text-gray-900">Glossary</span>
              </Link>
            </div>
          </section>

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

