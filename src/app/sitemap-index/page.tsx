import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllSlugs } from '@/lib/glossary/terms';

export const metadata: Metadata = {
  title: 'Site Index - All Pages | Adaily',
  description: 'Complete list of all pages on Adaily. Financial tools, guides, glossary terms, and educational content for Indian investors.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://adaily.in/sitemap-index',
  },
};

// All pages organized by category
const sitePages = {
  main: [
    { href: '/', label: 'Home', description: 'Adaily homepage' },
    { href: '/tools', label: 'All Tools', description: 'Browse all financial tools' },
    { href: '/glossary', label: 'Glossary', description: 'Financial terms explained' },
  ],
  tools: [
    { href: '/invest', label: 'Investment Explorer', description: 'Find investment options that fit your goals' },
    { href: '/tools/emergency-fund-planner', label: 'Emergency Fund Planner', description: 'Calculate your safety net' },
    { href: '/tools/safety-growth-split', label: 'Safety vs Growth Split', description: 'Balance your asset allocation' },
    { href: '/tools/money-mistakes-checker', label: 'Money Mistakes Checker', description: 'Spot common financial mistakes' },
    { href: '/tools/government-schemes', label: 'Government Schemes', description: 'Explore PPF, NPS, SCSS and more' },
  ],
  guides: [
    { href: '/guides/first-salary', label: 'First Salary Guide', description: 'A calm plan for new earners' },
    { href: '/invest/invest-savings-india', label: 'How to Invest Savings in India', description: 'Simple guide for beginners' },
  ],
  learn: [
    { href: '/learn/first-salary-plan', label: 'First Salary Plan', description: 'Step-by-step path for new earners' },
    { href: '/learn/beginner-investing-path', label: 'Beginner Investing Path', description: 'Start your investment journey' },
    { href: '/learn/safety-vs-growth', label: 'Safety vs Growth Guide', description: 'Understanding asset allocation' },
    { href: '/learn/government-schemes-simple', label: 'Government Schemes Explained', description: 'Simple guide to govt options' },
    { href: '/learn/glossary', label: 'Financial Glossary', description: '30 terms explained simply' },
  ],
  about: [
    { href: '/about/dna', label: 'Our Philosophy', description: 'What Adaily stands for' },
    { href: '/about/what-we-wont-do', label: 'What We Won\'t Do', description: 'Our commitments to users' },
  ],
};

export default function SitemapIndexPage() {
  const glossarySlugs = getAllSlugs();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5">
            <Image src="/logo.svg" alt="Adaily" width={32} height={32} className="w-7 h-7 sm:w-8 sm:h-8" />
            <span className="text-lg sm:text-xl font-bold text-gray-900">Adaily</span>
          </Link>
          <Link href="/" className="text-xs sm:text-sm text-gray-500 hover:text-orange-500 transition-colors">
            ← Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Site Index
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Complete list of all pages on Adaily. Use this page to discover all our free financial tools and educational content.
            </p>
          </div>

          {/* Main Pages */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              📍 Main Pages
            </h2>
            <ul className="space-y-2">
              {sitePages.main.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="group flex items-baseline gap-2 py-1 hover:text-orange-600 transition-colors">
                    <span className="font-medium text-gray-800 group-hover:text-orange-600">{page.label}</span>
                    <span className="text-gray-400 text-sm">—</span>
                    <span className="text-gray-500 text-sm">{page.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Tools */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              🛠️ Financial Tools
            </h2>
            <ul className="space-y-2">
              {sitePages.tools.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="group flex items-baseline gap-2 py-1 hover:text-orange-600 transition-colors">
                    <span className="font-medium text-gray-800 group-hover:text-orange-600">{page.label}</span>
                    <span className="text-gray-400 text-sm">—</span>
                    <span className="text-gray-500 text-sm">{page.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Guides */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              📖 Guides & Articles
            </h2>
            <ul className="space-y-2">
              {sitePages.guides.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="group flex items-baseline gap-2 py-1 hover:text-orange-600 transition-colors">
                    <span className="font-medium text-gray-800 group-hover:text-orange-600">{page.label}</span>
                    <span className="text-gray-400 text-sm">—</span>
                    <span className="text-gray-500 text-sm">{page.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Learning Paths */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              🎓 Learning Paths
            </h2>
            <ul className="space-y-2">
              {sitePages.learn.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="group flex items-baseline gap-2 py-1 hover:text-orange-600 transition-colors">
                    <span className="font-medium text-gray-800 group-hover:text-orange-600">{page.label}</span>
                    <span className="text-gray-400 text-sm">—</span>
                    <span className="text-gray-500 text-sm">{page.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* About */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              ℹ️ About Adaily
            </h2>
            <ul className="space-y-2">
              {sitePages.about.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="group flex items-baseline gap-2 py-1 hover:text-orange-600 transition-colors">
                    <span className="font-medium text-gray-800 group-hover:text-orange-600">{page.label}</span>
                    <span className="text-gray-400 text-sm">—</span>
                    <span className="text-gray-500 text-sm">{page.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Glossary Terms */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              📚 Glossary Terms ({glossarySlugs.length} terms)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {glossarySlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/glossary/${slug}`}
                  className="text-sm text-gray-600 hover:text-orange-600 transition-colors py-1"
                >
                  {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              ))}
            </div>
          </section>

          {/* Technical */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              🔧 Technical
            </h2>
            <ul className="space-y-2">
              <li>
                <a href="/sitemap.xml" className="text-gray-600 hover:text-orange-600 transition-colors">
                  sitemap.xml
                </a>
                <span className="text-gray-400 text-sm ml-2">— XML sitemap for search engines</span>
              </li>
              <li>
                <a href="/robots.txt" className="text-gray-600 hover:text-orange-600 transition-colors">
                  robots.txt
                </a>
                <span className="text-gray-400 text-sm ml-2">— Robot crawling rules</span>
              </li>
            </ul>
          </section>

          {/* Footer Note */}
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-gray-600 text-sm">
              All pages on Adaily are free to use. No signup required.
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

