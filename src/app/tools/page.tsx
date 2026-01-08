import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Free Financial Tools - Adaily',
  description: 'Free, no-signup financial tools for Indians. Emergency fund calculator, investment explorer, money mistakes checker, government schemes guide, and more.',
  keywords: [
    'free financial tools India',
    'investment calculator',
    'emergency fund calculator',
    'money management tools',
    'personal finance tools free',
  ],
  openGraph: {
    title: 'Free Financial Tools - Adaily',
    description: 'Simple, free tools to help you make better money decisions.',
    url: 'https://adaily.in/tools',
  },
};

const tools = [
  {
    href: '/invest',
    name: 'Investment Explorer',
    description: 'Find the best investment options based on your goals, timeline, and risk comfort.',
    icon: '🎯',
    badge: 'Popular',
    badgeColor: 'bg-orange-100 text-orange-700',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    href: '/tools/emergency-fund-planner',
    name: 'Emergency Fund Planner',
    description: 'Calculate how much emergency fund you need based on your expenses and situation.',
    icon: '🛡️',
    badge: null,
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    href: '/tools/safety-growth-split',
    name: 'Safety vs Growth Split',
    description: 'Find the right balance between safe and growth investments for your profile.',
    icon: '⚖️',
    badge: null,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    href: '/tools/money-mistakes-checker',
    name: 'Money Mistakes Checker',
    description: 'A gentle self-assessment to spot common money habits that might be holding you back.',
    icon: '🔍',
    badge: null,
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    href: '/tools/government-schemes',
    name: 'Government Schemes Explorer',
    description: 'Discover government-backed investment options like PPF, NPS, SCSS based on your profile.',
    icon: '🏛️',
    badge: null,
    gradient: 'from-blue-500 to-cyan-500',
  },
];

const guides = [
  {
    href: '/guides/first-salary',
    name: 'Your First Salary Guide',
    description: 'A calm, practical 5-step plan for new earners in India.',
    icon: '📖',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

export default function ToolsPage() {
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
          <Link
            href="/"
            className="text-xs sm:text-sm text-gray-500 hover:text-orange-500 transition-colors"
          >
            ← Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            No signup • 100% Free • Privacy first
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Free Financial Tools
          </h1>
          <p className="text-xl text-gray-600">
            Simple, focused tools to help you understand your money better.
            <br />
            <span className="font-medium text-gray-900">Made for India.</span>
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-6">
            Interactive Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white rounded-2xl shadow-md shadow-gray-100 border border-gray-100 p-6 hover:shadow-xl hover:border-gray-200 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                    {tool.icon}
                  </div>
                  {tool.badge && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {tool.description}
                </p>
                <div className="mt-4 text-sm text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Try it →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-6">
            Guides
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group bg-white rounded-2xl shadow-md shadow-gray-100 border border-gray-100 p-6 hover:shadow-xl hover:border-gray-200 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${guide.gradient} flex items-center justify-center text-2xl shadow-lg mb-4`}>
                  {guide.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {guide.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {guide.description}
                </p>
                <div className="mt-4 text-sm text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Read guide →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-8 text-center">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Why are these tools free?
            </h2>
            <p className="text-blue-700 leading-relaxed">
              We believe everyone deserves access to simple financial education. 
              These tools don't sell you anything, don't collect your personal data, 
              and don't require signup. Just open, use, and learn.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <span className="flex items-center gap-2 text-sm text-blue-600">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No login required
              </span>
              <span className="flex items-center gap-2 text-sm text-blue-600">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No data collection
              </span>
              <span className="flex items-center gap-2 text-sm text-blue-600">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No product pushing
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="container mx-auto px-4 sm:px-6 py-8">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
          >
            ← Back to Home
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
  );
}

