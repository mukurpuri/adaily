import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Government Schemes Made Simple | Adaily',
  description: 'A simple guide to understanding government-backed investment schemes in India: PPF, NPS, SCSS, SSY, and more.',
  openGraph: {
    title: 'Government Schemes Made Simple - Adaily',
    description: 'A simple guide to government-backed investment options.',
    url: 'https://adaily.in/learn/government-schemes-simple',
  },
};

export default function GovernmentSchemeSimplePage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Government Schemes Made Simple</h1>
            <p className="text-gray-600">Understanding your safest investment options.</p>
          </div>

          {/* TL;DR */}
          <section className="mb-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h2 className="font-bold text-blue-900 mb-3">TL;DR</h2>
            <p className="text-blue-800 text-sm leading-relaxed">
              Government schemes are backed by the Indian government. Very safe, but often have lock-in periods. 
              PPF and EPF are great for long-term. NPS is for retirement with extra tax benefits. 
              SCSS is for senior citizens. Choose based on your age, goal, and how long you can lock money.
            </p>
          </section>

          {/* Quick Overview */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Overview</h2>
            <div className="space-y-4">
              {[
                { name: 'PPF', full: 'Public Provident Fund', best: 'Long-term savings + tax saving', lock: '15 years' },
                { name: 'EPF', full: 'Employee Provident Fund', best: 'Salaried employees\' retirement', lock: 'Till 58 years' },
                { name: 'NPS', full: 'National Pension System', best: 'Retirement + extra ₹50K tax deduction', lock: 'Till 60 years' },
                { name: 'SCSS', full: 'Senior Citizens Savings Scheme', best: 'Regular income for 60+ age', lock: '5 years' },
                { name: 'SSY', full: 'Sukanya Samriddhi Yojana', best: 'Savings for girl child', lock: 'Till daughter is 21' },
                { name: 'NSC', full: 'National Savings Certificate', best: 'Medium-term safe saving', lock: '5 years' },
              ].map((scheme, i) => (
                <div key={i} className="p-4 bg-white rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">{scheme.name}</span>
                    <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">Lock: {scheme.lock}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{scheme.full}</p>
                  <p className="text-sm text-gray-600">Best for: {scheme.best}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Step by Step */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">How to Choose</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Check your goal', desc: 'Retirement? Tax saving? Girl child\'s future? Each scheme has a purpose.' },
                { step: 2, title: 'Consider lock-in', desc: 'PPF is 15 years. NPS is till 60. Make sure you won\'t need the money.' },
                { step: 3, title: 'See if you qualify', desc: 'SCSS is only for 60+. SSY needs a girl child under 10. EPF is for salaried.' },
                { step: 4, title: 'Understand the tax angle', desc: 'Most give 80C benefits. NPS gives extra ₹50K. But check taxability at withdrawal.' },
                { step: 5, title: 'Start small', desc: 'PPF needs minimum ₹500/year. You can always increase later.' },
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
                  'Opening PPF without understanding the 15-year commitment',
                  'Ignoring EPF (it\'s free money from employer matching)',
                  'Not claiming the extra ₹50K NPS deduction',
                  'Withdrawing EPF when changing jobs (let it grow)',
                  'Thinking government = low returns (PPF often beats FD post-tax)',
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
                  'Understood which schemes I\'m eligible for',
                  'Checked lock-in periods',
                  'Calculated potential tax savings',
                  'Opened account (bank or post office)',
                  'Set up yearly contribution reminder',
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
              <Link href="/tools/government-schemes" className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-2xl block mb-2">🏛️</span>
                <span className="text-sm font-medium text-gray-900">Schemes Explorer</span>
              </Link>
              <Link href="/invest" className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-2xl block mb-2">🎯</span>
                <span className="text-sm font-medium text-gray-900">Investment Explorer</span>
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

