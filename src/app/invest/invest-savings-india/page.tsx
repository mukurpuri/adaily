import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'How to Invest Your Savings in India - Simple Guide | Adaily',
  description: 'A beginner-friendly guide to investing savings in India. Compare FDs, PPF, mutual funds, index funds, and more. Learn how to choose based on time and risk.',
  keywords: [
    'how to invest savings India',
    'where to invest money India',
    'best investment options India',
    'beginner investment guide',
    'FD vs mutual fund',
    'how to start investing India',
  ],
  openGraph: {
    title: 'How to Invest Your Savings in India - Simple Guide',
    description: 'A beginner-friendly guide to common investment options in India.',
    url: 'https://adaily.in/invest/invest-savings-india',
    type: 'article',
  },
  alternates: {
    canonical: 'https://adaily.in/invest/invest-savings-india',
  },
};

// FAQ Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the safest way to invest savings in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bank Fixed Deposits (FDs) up to ₹5 lakh are insured by DICGC. PPF and EPF are government-backed. These are commonly considered among the safest options.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I invest in FD or mutual funds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on your timeline. FDs are suitable for short-term (1-3 years) with guaranteed returns. Mutual funds may be considered for longer horizons (5+ years) where you can tolerate some volatility.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much should I invest from my salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A common suggestion is 20% of income, but start with whatever you can. Even 10% is better than nothing. The key is consistency.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an index fund and should I invest in it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An index fund mirrors a market index like Nifty 50. It offers diversification at low cost. Many beginners start here for long-term investing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is gold a good investment in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gold can be a hedge against inflation and provides diversification. SGBs (Sovereign Gold Bonds) offer a way to invest without physical storage.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum amount to start investing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can start a mutual fund SIP with as little as ₹500 per month. PPF requires minimum ₹500 per year. Start small and increase over time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I invest in NPS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NPS offers an additional ₹50,000 tax deduction beyond 80C. If you\'re looking for retirement savings with tax benefits and can lock money till 60, it may be worth considering.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if an investment is right for me?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Consider your timeline (when you need the money), risk comfort (can you handle drops), and goal. There\'s no universally "right" answer — it depends on your situation.',
      },
    },
  ],
};

const comparisonData = [
  { name: 'Fixed Deposit (FD)', risk: 'Low', timeline: '1-5 years', liquidity: 'Medium', taxBenefit: 'No (5-year FD has 80C)', typical: '6-7%' },
  { name: 'PPF', risk: 'Low', timeline: '15+ years', liquidity: 'Low', taxBenefit: 'Yes (80C + EEE)', typical: '7-8%' },
  { name: 'Liquid Funds', risk: 'Low', timeline: '<1 year', liquidity: 'High', taxBenefit: 'No', typical: '5-7%' },
  { name: 'Debt Funds', risk: 'Low-Medium', timeline: '1-3 years', liquidity: 'High', taxBenefit: 'No', typical: '6-8%' },
  { name: 'Balanced Funds', risk: 'Medium', timeline: '3-5 years', liquidity: 'High', taxBenefit: 'No', typical: '8-12%' },
  { name: 'Index Funds', risk: 'Medium-High', timeline: '5+ years', liquidity: 'High', taxBenefit: 'ELSS only', typical: '10-14%' },
  { name: 'Gold (SGB)', risk: 'Medium', timeline: '5-8 years', liquidity: 'Medium', taxBenefit: 'LTCG free if held', typical: 'Varies' },
  { name: 'NPS', risk: 'Medium', timeline: 'Till 60', liquidity: 'Low', taxBenefit: 'Yes (80C + 80CCD)', typical: '8-12%' },
];

export default function InvestSavingsIndiaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
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

        {/* Article */}
        <article className="container mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-orange-500">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/invest" className="hover:text-orange-500">Invest</Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900">Guide</span>
            </nav>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              How to Invest Your Savings in India
            </h1>
            <p className="text-xl text-gray-600 mb-8">A simple guide for beginners</p>

            {/* TL;DR */}
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6 mb-10">
              <h2 className="font-bold text-blue-900 mb-3">TL;DR</h2>
              <ul className="text-blue-800 text-sm space-y-2">
                <li>• Start with an emergency fund before investing</li>
                <li>• For short-term (1-3 years): FDs, liquid funds, or debt funds</li>
                <li>• For long-term (5+ years): index funds, PPF, or NPS</li>
                <li>• No investment is "the best" — it depends on your timeline and risk comfort</li>
                <li>• Start small and learn as you go</li>
              </ul>
            </div>

            {/* Introduction */}
            <section className="mb-10">
              <p className="text-gray-700 leading-relaxed mb-4">
                If you've saved some money and want to make it grow, you're in the right place. 
                This guide covers common investment options available in India without overwhelming 
                you with jargon or pushing specific products.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Remember: there's no perfect answer. The right choice depends on when you need the 
                money, how much volatility you can handle, and what you're saving for.
              </p>
            </section>

            {/* Comparison Table */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Comparing Common Options</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 border border-gray-200 font-semibold">Option</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold">Risk</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold">Timeline</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold">Liquidity</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold">Tax Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 border border-gray-200 font-medium">{row.name}</td>
                        <td className="p-3 border border-gray-200">{row.risk}</td>
                        <td className="p-3 border border-gray-200">{row.timeline}</td>
                        <td className="p-3 border border-gray-200">{row.liquidity}</td>
                        <td className="p-3 border border-gray-200">{row.taxBenefit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                *Returns shown are historical ranges and not guaranteed. Past performance doesn't indicate future results.
              </p>
            </section>

            {/* How to choose based on time */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Choose Based on Timeline</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">Less than 1 year</h3>
                  <p className="text-sm text-gray-600">
                    Savings account, liquid funds, or ultra-short debt funds. You need money 
                    available quickly without much risk of loss.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">1-3 years</h3>
                  <p className="text-sm text-gray-600">
                    FDs, debt funds, or conservative hybrid funds. Some returns while keeping 
                    capital relatively protected.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">3-5 years</h3>
                  <p className="text-sm text-gray-600">
                    Balanced funds or a mix of debt and equity. You can take moderate risk 
                    as you have time to recover from short-term dips.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">5+ years</h3>
                  <p className="text-sm text-gray-600">
                    Index funds, equity mutual funds, PPF, or NPS. Longer horizons historically 
                    benefit from equity exposure despite short-term volatility.
                  </p>
                </div>
              </div>
            </section>

            {/* How to choose based on risk */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Choose Based on Risk Comfort</h2>
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <h3 className="font-semibold text-emerald-900 mb-2">Low risk tolerance</h3>
                  <p className="text-sm text-emerald-700">
                    You prefer certainty over potential higher returns. Consider FDs, PPF, 
                    debt funds, or liquid funds. Returns may be lower but more predictable.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <h3 className="font-semibold text-amber-900 mb-2">Medium risk tolerance</h3>
                  <p className="text-sm text-amber-700">
                    You can handle some ups and downs for potentially better returns. Consider 
                    balanced funds or a mix of equity and debt investments.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h3 className="font-semibold text-blue-900 mb-2">Higher risk tolerance</h3>
                  <p className="text-sm text-blue-700">
                    You understand markets fluctuate and can stay calm during drops. Index funds 
                    or equity mutual funds may suit your long-term goals.
                  </p>
                </div>
              </div>
            </section>

            {/* What most people get wrong */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Many People Get Wrong</h2>
              <ul className="space-y-4">
                {[
                  { mistake: 'Chasing last year\'s top performer', reality: 'Past returns don\'t guarantee future results. A fund that returned 40% last year might not repeat that.' },
                  { mistake: 'Keeping everything in savings account', reality: 'Savings accounts often don\'t beat inflation. For money you won\'t need for years, consider other options.' },
                  { mistake: 'Investing without an emergency fund', reality: 'If you need to sell investments during a market dip, you lock in losses. Build safety first.' },
                  { mistake: 'Stopping SIP when markets fall', reality: 'Falling markets mean you buy more units at lower prices. This often helps long-term returns.' },
                  { mistake: 'Looking for "the best" option', reality: 'There is no universally best investment. What\'s right depends on your specific situation.' },
                ].map((item, i) => (
                  <li key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="font-medium text-gray-900 mb-1">❌ {item.mistake}</p>
                    <p className="text-sm text-gray-600">→ {item.reality}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQs */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqSchema.mainEntity.map((faq, i) => (
                  <details key={i} className="bg-gray-50 rounded-xl overflow-hidden group">
                    <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-100 flex justify-between items-center">
                      {faq.name}
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-gray-600">{faq.acceptedAnswer.text}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* Disclaimer */}
            <section className="mb-10 p-6 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Disclaimer:</strong> This article is for educational purposes only and is not 
                financial advice. Investment decisions should be based on your individual circumstances. 
                Consider consulting a SEBI-registered financial advisor before investing. All investments 
                carry risk.
              </p>
            </section>

            {/* CTA */}
            <section className="text-center">
              <p className="text-gray-600 mb-6">Want to explore options based on your goals?</p>
              <Link
                href="/invest"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all hover:scale-105"
              >
                Try Investment Explorer →
              </Link>
            </section>
          </div>
        </article>

        {/* Footer */}
        <footer className="container mx-auto px-4 sm:px-6 py-8 border-t border-gray-100">
          <div className="text-center text-gray-400 text-sm">Made with ❤️ in India • © {new Date().getFullYear()} Adaily</div>
        </footer>
      </div>
    </>
  );
}

