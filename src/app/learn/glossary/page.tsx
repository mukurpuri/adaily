import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Financial Glossary - 30 Terms Explained Simply | Adaily',
  description: 'Understand common financial terms in plain language. FD, PPF, SIP, mutual funds, and more explained with simple examples for Indian investors.',
  keywords: [
    'financial terms India',
    'investment glossary',
    'what is SIP',
    'what is PPF',
    'mutual fund meaning',
    'investment terms for beginners',
  ],
  openGraph: {
    title: 'Financial Glossary - 30 Terms Explained Simply',
    description: 'Common financial terms explained in plain language with Indian examples.',
    url: 'https://adaily.in/learn/glossary',
  },
};

const glossaryTerms = [
  {
    term: 'FD (Fixed Deposit)',
    definition: 'Money you lock with a bank for a fixed time at a fixed interest rate.',
    example: 'Deposit ₹1 lakh for 1 year at 7% → Get ₹1.07 lakh at maturity.',
  },
  {
    term: 'RD (Recurring Deposit)',
    definition: 'Monthly savings where you deposit a fixed amount regularly.',
    example: 'Save ₹5,000/month for 2 years → Build a corpus of ~₹1.3 lakh.',
  },
  {
    term: 'PPF (Public Provident Fund)',
    definition: 'A government-backed long-term savings scheme with tax benefits.',
    example: 'Invest ₹1.5 lakh/year for 15 years → Grows tax-free to ~₹40+ lakh.',
  },
  {
    term: 'EPF (Employee Provident Fund)',
    definition: 'Retirement savings deducted from your salary, matched by employer.',
    example: '12% of ₹50,000 basic = ₹6,000/month from you + ₹6,000 from employer.',
  },
  {
    term: 'SIP (Systematic Investment Plan)',
    definition: 'Investing a fixed amount regularly (usually monthly) in mutual funds.',
    example: '₹5,000 SIP in an index fund for 10 years could grow to ₹10+ lakh.',
  },
  {
    term: 'Index Fund',
    definition: 'A mutual fund that mirrors a market index like Nifty 50.',
    example: 'Instead of picking stocks, you own a slice of India\'s top 50 companies.',
  },
  {
    term: 'Mutual Fund',
    definition: 'Money pooled from many investors, managed by professionals.',
    example: '1,000 people invest ₹1,000 each = ₹10 lakh fund managed together.',
  },
  {
    term: 'NAV (Net Asset Value)',
    definition: 'The per-unit price of a mutual fund.',
    example: 'If NAV is ₹100 and you invest ₹10,000, you get 100 units.',
  },
  {
    term: 'Liquidity',
    definition: 'How quickly you can convert an investment to cash.',
    example: 'Savings account = high liquidity. PPF = low liquidity (15-year lock-in).',
  },
  {
    term: 'Lock-in Period',
    definition: 'Time during which you cannot withdraw your money.',
    example: 'ELSS has a 3-year lock-in. PPF has 15 years (partial after 7).',
  },
  {
    term: 'Risk',
    definition: 'The chance that your investment could lose value.',
    example: 'FD = low risk (guaranteed). Stocks = high risk (can go up or down).',
  },
  {
    term: 'Returns',
    definition: 'The profit or loss you make on an investment.',
    example: 'Invested ₹1 lakh, now worth ₹1.2 lakh = 20% returns.',
  },
  {
    term: 'Inflation',
    definition: 'The rate at which prices increase over time, reducing money\'s value.',
    example: 'If inflation is 6%, ₹100 today buys what ₹94 will buy next year.',
  },
  {
    term: 'Compounding',
    definition: 'Earning returns on your returns — money growing on itself.',
    example: '₹1 lakh at 10% = ₹1.1L year 1, ₹1.21L year 2, ₹2.59L year 10.',
  },
  {
    term: 'Diversification',
    definition: 'Spreading money across different investments to reduce risk.',
    example: 'Instead of all in stocks, split between FD, mutual funds, and gold.',
  },
  {
    term: 'ELSS (Equity Linked Savings Scheme)',
    definition: 'A tax-saving mutual fund with a 3-year lock-in.',
    example: 'Invest ₹1.5 lakh → Save up to ₹46,800 in taxes under 80C.',
  },
  {
    term: 'NPS (National Pension System)',
    definition: 'A retirement savings scheme with tax benefits beyond 80C.',
    example: 'Extra ₹50,000 deduction under 80CCD(1B) on top of 80C limit.',
  },
  {
    term: 'SGB (Sovereign Gold Bonds)',
    definition: 'Government bonds that track gold prices plus pay interest.',
    example: 'Own gold without storing it. Get 2.5% interest + gold price gains.',
  },
  {
    term: 'STCG (Short-Term Capital Gains)',
    definition: 'Tax on profits from selling investments held for a short time.',
    example: 'Sell equity mutual fund within 1 year → 15% tax on profits.',
  },
  {
    term: 'LTCG (Long-Term Capital Gains)',
    definition: 'Tax on profits from selling investments held for longer periods.',
    example: 'Sell equity after 1 year → 10% tax on gains above ₹1 lakh.',
  },
  {
    term: 'Expense Ratio',
    definition: 'The annual fee charged by a mutual fund as a percentage.',
    example: '0.5% expense ratio on ₹1 lakh = ₹500/year fee deducted.',
  },
  {
    term: 'Debt Fund',
    definition: 'A mutual fund that invests in bonds and fixed-income securities.',
    example: 'Lower risk than equity funds. Returns typically 6-8% per year.',
  },
  {
    term: 'Equity',
    definition: 'Ownership in a company, usually through stocks.',
    example: 'Buying 10 shares of Reliance = owning a tiny piece of Reliance.',
  },
  {
    term: 'Portfolio',
    definition: 'Your collection of all investments.',
    example: 'Your portfolio: ₹2L in FD + ₹1L in mutual funds + ₹50K in PPF.',
  },
  {
    term: 'Asset Allocation',
    definition: 'How you divide money between different types of investments.',
    example: '60% equity, 30% debt, 10% gold = your asset allocation.',
  },
  {
    term: 'Rupee Cost Averaging',
    definition: 'Buying more units when prices are low through regular investing.',
    example: 'SIP of ₹5,000: Buy 50 units at ₹100, 100 units at ₹50 when market dips.',
  },
  {
    term: 'Emergency Fund',
    definition: 'Savings kept aside for unexpected expenses.',
    example: 'If expenses are ₹50K/month, keep ₹1.5-3L easily accessible.',
  },
  {
    term: 'Maturity',
    definition: 'When an investment period ends and you get your money back.',
    example: 'FD matures after 1 year. PPF matures after 15 years.',
  },
  {
    term: 'Nominee',
    definition: 'Person who receives your investment if something happens to you.',
    example: 'Add your spouse/parent as nominee in bank accounts and mutual funds.',
  },
  {
    term: 'KYC (Know Your Customer)',
    definition: 'Identity verification required before investing.',
    example: 'PAN + Aadhaar + photo + signature = KYC complete for mutual funds.',
  },
];

const faqs = [
  {
    q: 'Why do I need to know these terms?',
    a: 'Understanding basic terms helps you make sense of what banks, apps, and advisors tell you. You don\'t need to memorize everything — just know where to look.',
  },
  {
    q: 'What\'s the difference between saving and investing?',
    a: 'Saving is keeping money safe (bank account, FD). Investing is putting money to work for growth (mutual funds, stocks). Saving is for short-term; investing is for long-term.',
  },
  {
    q: 'Is PPF better than FD?',
    a: 'They serve different purposes. PPF is for long-term (15 years) with tax benefits. FD is flexible (1-5 years) with no tax benefit. Choose based on when you need the money.',
  },
  {
    q: 'What\'s the safest investment in India?',
    a: 'Government-backed options like PPF, EPF, and bank FDs (up to ₹5L insured) are considered very safe. But "safe" often means lower returns.',
  },
  {
    q: 'Should I worry about STCG and LTCG?',
    a: 'Only if you\'re selling investments at a profit. For long-term SIPs, LTCG only applies to gains above ₹1 lakh/year. Most beginners don\'t need to worry much.',
  },
  {
    q: 'What\'s a good expense ratio for mutual funds?',
    a: 'Index funds typically have 0.1-0.5%. Actively managed funds can be 1-2%. Lower is generally better for similar performance.',
  },
  {
    q: 'How much emergency fund do I need?',
    a: 'A common suggestion is 3-6 months of expenses. If your job is unstable or you have dependents, lean towards 6+ months.',
  },
  {
    q: 'Can I lose money in mutual funds?',
    a: 'Yes, especially in the short term. Equity funds can drop 20-30% in a bad year. But historically, staying invested for 7-10+ years has been profitable.',
  },
  {
    q: 'What is the 80C tax deduction?',
    a: 'Section 80C lets you reduce taxable income by up to ₹1.5 lakh/year through investments like PPF, ELSS, EPF, life insurance, etc.',
  },
  {
    q: 'Where should I start as a complete beginner?',
    a: 'Start with an emergency fund in a savings account. Then explore PPF or a simple index fund SIP. Don\'t rush — understanding matters more than speed.',
  },
];

export default function GlossaryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 via-white to-white">
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
          <Link href="/tools" className="text-xs sm:text-sm text-gray-500 hover:text-orange-500 transition-colors">
            ← All Tools
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-medium mb-6">
            <span className="text-lg">📚</span>
            Learn
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Financial Glossary
          </h1>
          <p className="text-xl text-gray-600">
            30 common terms explained in plain language.
          </p>
        </div>
      </section>

      {/* Glossary */}
      <section className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {glossaryTerms.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-gray-900 mb-2">{item.term}</h3>
                <p className="text-gray-600 mb-3">{item.definition}</p>
                <div className="bg-gray-50 rounded-lg p-3 text-sm">
                  <span className="text-gray-500">Example:</span>{' '}
                  <span className="text-gray-700">{item.example}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
              >
                <summary className="p-5 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-between">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 sm:px-6 py-8">
        <div className="text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
          >
            ← Explore Tools
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

