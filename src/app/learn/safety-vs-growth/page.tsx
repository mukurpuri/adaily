import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Safety vs Growth Explained - When to Choose What | Adaily',
  description: 'Understand when to prioritize safe investments vs growth investments. A simple framework for Indian investors.',
  openGraph: {
    title: 'Safety vs Growth - Adaily',
    description: 'Understand when to prioritize safe investments vs growth.',
    url: 'https://adaily.in/learn/safety-vs-growth',
  },
};

export default function SafetyVsGrowthPage() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-purple-50/30 via-white to-white">
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
            <span className="inline-block px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-medium mb-4">📖 Learning Path</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Safety vs Growth</h1>
            <p className="text-gray-600">When to protect your money and when to grow it.</p>
          </div>

          {/* TL;DR */}
          <section className="mb-12 p-6 bg-purple-50 rounded-2xl border border-purple-100">
            <h2 className="font-bold text-purple-900 mb-3">TL;DR</h2>
            <p className="text-purple-800 text-sm leading-relaxed">
              Safety = money you can't afford to lose (emergency fund, short-term goals). 
              Growth = money you won't need for 5+ years. The split depends on your timeline, 
              risk comfort, and age. There's no perfect ratio — just what works for you.
            </p>
          </section>

          {/* Framework */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">The Simple Framework</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-2">🛡️ Safety</h3>
                <p className="text-sm text-blue-700 mb-3">Money that must be there when you need it.</p>
                <ul className="text-xs text-blue-600 space-y-1">
                  <li>• FD, RD</li>
                  <li>• PPF, EPF</li>
                  <li>• Liquid funds</li>
                  <li>• Debt funds</li>
                </ul>
              </div>
              <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-100">
                <h3 className="font-bold text-emerald-900 mb-2">📈 Growth</h3>
                <p className="text-sm text-emerald-700 mb-3">Money you can let ride through ups and downs.</p>
                <ul className="text-xs text-emerald-600 space-y-1">
                  <li>• Index funds</li>
                  <li>• Equity mutual funds</li>
                  <li>• ELSS</li>
                  <li>• Stocks (with experience)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Step by Step */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">How to Decide Your Split</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Identify your timeline', desc: 'Money needed in 1-3 years should be mostly safe. 5+ years can lean growth.' },
                { step: 2, title: 'Check your risk comfort', desc: 'Can you watch your investment drop 20% and not panic? Be honest.' },
                { step: 3, title: 'Consider your age', desc: 'Younger = more time to recover from drops. But age isn\'t the only factor.' },
                { step: 4, title: 'Start conservative', desc: 'If unsure, start with more safety. You can shift to growth as you learn.' },
                { step: 5, title: 'Review annually', desc: 'As goals and comfort change, adjust your split.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm flex-shrink-0">{item.step}</div>
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
                  'Going 100% equity without an emergency fund',
                  'Keeping everything in savings account for years',
                  'Changing allocation based on market news',
                  'Following someone else\'s exact ratio without thinking',
                  'Forgetting to rebalance as you get closer to goals',
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
                  'Emergency fund in safe instruments',
                  'Short-term goals (<3y) in safe instruments',
                  'Long-term goals (5y+) include some growth',
                  'Comfortable with my current split',
                  'Will review in 12 months',
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
              <Link href="/tools/safety-growth-split" className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-2xl block mb-2">⚖️</span>
                <span className="text-sm font-medium text-gray-900">Split Calculator</span>
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

