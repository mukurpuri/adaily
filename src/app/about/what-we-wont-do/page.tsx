import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "What We Won't Do - Adaily",
  description: 'Adaily will not give stock tips, push products, track you, or promise returns. Learn what we stand against and what we do instead.',
  openGraph: {
    title: "What Adaily Won't Do",
    description: 'Our commitment to keeping things simple and honest.',
    url: 'https://adaily.in/about/what-we-wont-do',
  },
};

const wontDoList = [
  {
    title: "Give stock tips or signals",
    explanation: "We don't tell you what to buy, when to buy, or when to sell. That's speculation, not education. We help you understand categories of investments, not pick winners.",
  },
  {
    title: "Push products",
    explanation: "We don't partner with brokers, AMCs, or banks. We don't earn commissions. When we mention an investment type, it's educational — not a recommendation to buy it.",
  },
  {
    title: "Track you",
    explanation: "We don't use cookies to follow you around. We don't build profiles. We don't know who you are, and we prefer it that way.",
  },
  {
    title: "Create urgency",
    explanation: 'You won\'t see "Act now!" or "Limited time!" here. Good financial decisions take time. We\'ll never pressure you to do anything fast.',
  },
  {
    title: "Promise returns",
    explanation: 'We don\'t say "earn 15% guaranteed" because that\'s not how investing works. We share historical ranges and remind you that past performance doesn\'t guarantee future results.',
  },
  {
    title: "Encourage day trading",
    explanation: "We believe in patience, not speculation. You won't find charts, technical analysis, or intraday strategies here. That's gambling dressed as investing.",
  },
];

const whatWeDoInstead = [
  {
    icon: '📖',
    title: 'Provide clarity',
    description: 'We explain options so you understand what exists and why something might or might not fit you.',
  },
  {
    icon: '🛠️',
    title: 'Build focused tools',
    description: 'Each tool does one thing well. Answer questions, see options, understand why.',
  },
  {
    icon: '📚',
    title: 'Offer learning resources',
    description: 'Glossaries, guides, and explanations — all free, all in plain language.',
  },
];

export default function WhatWeWontDoPage() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-gray-50 via-white to-white">
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
          <Link href="/" className="text-xs sm:text-sm text-gray-500 hover:text-orange-500 transition-colors">
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
              What we won't do
            </h1>
            <p className="text-gray-600">
              Some things we've decided not to do. On purpose.
            </p>
          </div>

          {/* Won't Do List */}
          <section className="mb-16">
            <div className="space-y-6">
              {wontDoList.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0 font-bold">
                      ✕
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What We Do Instead */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              What we do instead
            </h2>
            <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6">
              <div className="space-y-6">
                {whatWeDoInstead.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-emerald-900 mb-1">{item.title}</h3>
                      <p className="text-emerald-700 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Closing */}
          <section className="text-center">
            <p className="text-gray-500 mb-8">
              This isn't about being against things. It's about staying focused on what actually helps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about/dna"
                className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
              >
                Read our DNA →
              </Link>
              <Link
                href="/tools"
                className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
              >
                Explore tools
              </Link>
            </div>
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

