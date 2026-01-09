// Glossary Terms Registry for Adaily
// Single source of truth for all financial terms

export interface GlossaryTerm {
  slug: string;
  term: string;
  shortDefinition: string;
  simpleExplanation: string;
  example: string;
  commonMistakes?: string[];
  relatedTerms: string[]; // slugs
  relatedTools: string[]; // routes
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: 'fd',
    term: 'Fixed Deposit (FD)',
    shortDefinition: 'Money locked with a bank for fixed returns.',
    simpleExplanation: `A Fixed Deposit is one of the simplest ways to save money in India. You give your money to a bank for a fixed period (like 1 year or 5 years), and the bank gives you guaranteed interest in return.

The interest rate is decided when you open the FD and doesn't change, even if market rates go up or down. This makes FDs very predictable and safe.

Most banks in India offer FDs. You can open one online through your bank's app or by visiting a branch. The minimum amount varies but is usually ₹1,000 to ₹10,000.`,
    example: 'You deposit ₹1,00,000 in a 1-year FD at 7% interest. After 1 year, you get back ₹1,07,000 (before tax on interest).',
    commonMistakes: [
      'Breaking FD early and paying penalty',
      'Not comparing rates across banks',
      'Ignoring tax on FD interest',
    ],
    relatedTerms: ['rd', 'ppf', 'liquid-fund'],
    relatedTools: ['/invest', '/tools/emergency-fund-planner'],
  },
  {
    slug: 'rd',
    term: 'Recurring Deposit (RD)',
    shortDefinition: 'Monthly savings with fixed returns.',
    simpleExplanation: `A Recurring Deposit is like a FD, but instead of depositing a lump sum, you deposit a fixed amount every month. It's great for building a savings habit.

At the end of the period (usually 6 months to 10 years), you get back all your deposits plus interest. The interest rate is similar to FD rates.

RDs are perfect if you want to save ₹5,000 or ₹10,000 every month towards a goal like a vacation or buying something expensive.`,
    example: 'You save ₹5,000/month in a 2-year RD at 6.5% interest. After 2 years, you get approximately ₹1,30,000 (your ₹1,20,000 deposits + interest).',
    commonMistakes: [
      'Missing monthly payments (some banks charge penalty)',
      'Not setting up auto-debit for convenience',
    ],
    relatedTerms: ['fd', 'sip'],
    relatedTools: ['/invest'],
  },
  {
    slug: 'ppf',
    term: 'Public Provident Fund (PPF)',
    shortDefinition: 'Government-backed 15-year savings with tax benefits.',
    simpleExplanation: `PPF is a long-term savings scheme backed by the Government of India. It's one of the safest investment options available.

You can invest up to ₹1.5 lakh per year, and the entire amount qualifies for tax deduction under Section 80C. The interest earned is also tax-free, making it an "EEE" (Exempt-Exempt-Exempt) investment.

The main catch is the 15-year lock-in period. Partial withdrawals are allowed after 7 years, but you can't take all the money out until maturity.`,
    example: 'You invest ₹1,50,000 per year for 15 years at 7.1% interest. Your total investment of ₹22.5 lakh grows to approximately ₹40+ lakh, completely tax-free.',
    commonMistakes: [
      'Expecting liquidity (15-year lock-in is strict)',
      'Not investing the full ₹1.5 lakh limit',
      'Forgetting to extend after 15 years',
    ],
    relatedTerms: ['epf', 'nps', 'elss'],
    relatedTools: ['/invest', '/tools/government-schemes'],
  },
  {
    slug: 'epf',
    term: 'Employee Provident Fund (EPF)',
    shortDefinition: 'Retirement savings deducted from your salary.',
    simpleExplanation: `EPF is a mandatory retirement savings scheme for salaried employees in India. Every month, 12% of your basic salary is deducted and deposited into your EPF account. Your employer also contributes an equal amount.

The money earns interest (around 8%) and is meant for retirement. You can withdraw it when you leave a job or retire.

EPF is one of the best retirement tools because of the employer contribution and decent interest rate.`,
    example: 'If your basic salary is ₹30,000, ₹3,600 goes to EPF from you and ₹3,600 from your employer every month (₹7,200 total).',
    commonMistakes: [
      'Withdrawing EPF when switching jobs (better to transfer)',
      'Not linking Aadhaar to EPF account',
    ],
    relatedTerms: ['ppf', 'nps', 'vpf'],
    relatedTools: ['/tools/government-schemes'],
  },
  {
    slug: 'sip',
    term: 'Systematic Investment Plan (SIP)',
    shortDefinition: 'Monthly investing in mutual funds.',
    simpleExplanation: `SIP is a way to invest in mutual funds by putting in a fixed amount every month (like ₹1,000 or ₹5,000) instead of investing a large sum at once.

The main benefit is "rupee cost averaging": when prices are low, your SIP buys more units; when prices are high, it buys fewer. Over time, this averages out the cost and reduces timing risk.

You can start a SIP with as little as ₹500/month in most mutual funds through apps like Groww, Zerodha, or Paytm Money.`,
    example: 'You invest ₹5,000/month via SIP in an index fund for 10 years. If the fund grows at 12% annually, your ₹6 lakh investment could grow to approximately ₹11.5 lakh.',
    commonMistakes: [
      'Stopping SIP during market crashes (that is actually the best time)',
      'Choosing funds based on past 1-year returns only',
      'Not reviewing fund performance annually',
    ],
    relatedTerms: ['mutual-fund', 'index-fund', 'elss'],
    relatedTools: ['/invest'],
  },
  {
    slug: 'mutual-fund',
    term: 'Mutual Fund',
    shortDefinition: 'Pooled money invested by a professional fund manager.',
    simpleExplanation: `A mutual fund collects money from many investors and invests it in stocks, bonds, or other assets. A professional fund manager decides where to invest.

There are many types: equity funds (stocks), debt funds (bonds), hybrid funds (mix), and more. Each has different risk levels and potential returns.

Mutual funds are regulated by SEBI and are a good way to invest in the stock market without picking individual stocks yourself.`,
    example: 'You invest ₹10,000 in an equity mutual fund. The fund manager uses this money (along with money from thousands of other investors) to buy shares of companies like HDFC, Infosys, TCS, etc.',
    commonMistakes: [
      'Judging funds by recent 1-year returns',
      'Not understanding the expense ratio',
      'Investing in too many similar funds',
    ],
    relatedTerms: ['sip', 'index-fund', 'elss', 'nav'],
    relatedTools: ['/invest'],
  },
  {
    slug: 'index-fund',
    term: 'Index Fund',
    shortDefinition: 'A mutual fund that tracks a market index like Nifty 50.',
    simpleExplanation: `An index fund is a type of mutual fund that simply copies a market index (like Nifty 50 or Sensex) instead of trying to beat it.

Because there's no active stock-picking, index funds have very low fees (expense ratio of 0.1% to 0.5%). Over the long term, most actively managed funds fail to beat index funds after fees.

Index funds are ideal for long-term investing (5+ years) and are recommended by many financial experts for beginners.`,
    example: 'A Nifty 50 index fund owns shares of all 50 companies in the Nifty 50. If Nifty goes up 12%, your investment also goes up approximately 12%.',
    commonMistakes: [
      'Expecting to beat the market (index funds match it)',
      'Choosing high-expense index funds (compare expense ratios)',
      'Investing for short term (equity is volatile)',
    ],
    relatedTerms: ['mutual-fund', 'sip', 'elss'],
    relatedTools: ['/invest', '/tools/safety-growth-split'],
  },
  {
    slug: 'elss',
    term: 'ELSS (Equity Linked Savings Scheme)',
    shortDefinition: 'Tax-saving mutual fund with 3-year lock-in.',
    simpleExplanation: `ELSS is a type of equity mutual fund that gives you tax benefits under Section 80C. You can claim deduction up to ₹1.5 lakh per year.

The lock-in period is only 3 years, which is the shortest among all 80C options. After 3 years, you can redeem the money.

Since ELSS invests in stocks, there's risk, but also potential for good returns over the long term. It's a good option if you want tax savings plus equity exposure.`,
    example: 'You invest ₹50,000 in ELSS. You save up to ₹15,600 in taxes (at 31.2% tax bracket). After 3 years, you redeem the investment, which could have grown to ₹65,000 or more.',
    commonMistakes: [
      'Redeeming immediately after lock-in (consider holding longer)',
      'Not comparing different ELSS funds',
      'Investing only for tax saving, not for growth',
    ],
    relatedTerms: ['mutual-fund', 'ppf', 'tax-saving'],
    relatedTools: ['/invest', '/tools/government-schemes'],
  },
  {
    slug: 'nps',
    term: 'National Pension System (NPS)',
    shortDefinition: 'Government retirement scheme with extra tax benefits.',
    simpleExplanation: `NPS is a retirement savings scheme run by the government. You invest during your working years, and at retirement (age 60), you get a pension.

The main attraction is the extra tax benefit under Section 80CCD(1B): you can claim additional ₹50,000 deduction beyond the ₹1.5 lakh 80C limit.

NPS invests in a mix of equity, bonds, and government securities. You can choose your own allocation or let them decide based on your age.`,
    example: 'You invest ₹50,000/year in NPS and save ₹15,600 in taxes (at 31.2% bracket). At retirement, you can withdraw 60% as lump sum and must use 40% to buy an annuity (monthly pension).',
    commonMistakes: [
      'Forgetting the 40% annuity rule at retirement',
      'Not reviewing asset allocation periodically',
      'Ignoring the extra 80CCD(1B) benefit',
    ],
    relatedTerms: ['ppf', 'epf', 'elss'],
    relatedTools: ['/invest', '/tools/government-schemes'],
  },
  {
    slug: 'liquid-fund',
    term: 'Liquid Fund',
    shortDefinition: 'Mutual fund for parking money short-term.',
    simpleExplanation: `A liquid fund is a type of debt mutual fund that invests in very short-term instruments (like treasury bills, commercial paper). It's designed for parking money for days to weeks.

The main benefit is quick access: you can withdraw money within 1-2 business days (some funds offer instant redemption up to ₹50,000).

Returns are usually 4-6%, slightly better than a savings account, but not guaranteed like FD.`,
    example: 'You park ₹2 lakh in a liquid fund while deciding where to invest. After 3 months, you earned approximately ₹3,000 in returns and can withdraw anytime.',
    commonMistakes: [
      'Expecting high returns (it is for safety, not growth)',
      'Not understanding exit load (some funds charge for early exit)',
      'Using for very short periods where savings account is simpler',
    ],
    relatedTerms: ['fd', 'emergency-fund', 'debt-fund'],
    relatedTools: ['/invest', '/tools/emergency-fund-planner'],
  },
  {
    slug: 'emergency-fund',
    term: 'Emergency Fund',
    shortDefinition: 'Money saved for unexpected expenses.',
    simpleExplanation: `An emergency fund is a savings buffer for unexpected situations like job loss, medical emergencies, or urgent repairs. It's not for planned expenses or investments.

The general rule is to save 3-6 months of your monthly expenses. If you spend ₹40,000/month, you should have ₹1.2 to ₹2.4 lakh set aside.

Keep it in liquid, accessible places: savings account for 1-2 months' worth, and liquid funds or sweep-in FDs for the rest.`,
    example: 'Your monthly expenses are ₹35,000. You save 4 months of expenses = ₹1,40,000 in a mix of savings account and liquid fund.',
    commonMistakes: [
      'Investing emergency fund in stocks (too risky)',
      'Not having one before investing in other assets',
      'Using it for non-emergencies like vacations',
    ],
    relatedTerms: ['liquid-fund', 'fd', 'savings-account'],
    relatedTools: ['/tools/emergency-fund-planner', '/tools/money-mistakes-checker'],
  },
  {
    slug: 'nav',
    term: 'NAV (Net Asset Value)',
    shortDefinition: 'Price per unit of a mutual fund.',
    simpleExplanation: `NAV is the price of one unit of a mutual fund. It's calculated by dividing the total value of all the fund's investments by the number of units.

When you invest ₹10,000 in a mutual fund with NAV of ₹100, you get 100 units. If NAV rises to ₹120, your investment is now worth ₹12,000.

NAV is updated daily after market close. Don't confuse a "low NAV" with being cheap; what matters is how much NAV grows over time.`,
    example: 'A fund has ₹1,000 crore in assets and 10 crore units. NAV = ₹1,000 cr ÷ 10 cr units = ₹100 per unit.',
    commonMistakes: [
      'Thinking low NAV means the fund is cheaper or better',
      'Comparing NAVs of different funds (meaningless)',
    ],
    relatedTerms: ['mutual-fund', 'sip'],
    relatedTools: ['/invest'],
  },
  {
    slug: 'compounding',
    term: 'Compounding',
    shortDefinition: 'Earning returns on your returns.',
    simpleExplanation: `Compounding is when you earn interest not just on your original investment, but also on the interest you've already earned. It's like a snowball effect.

The longer you stay invested, the more powerful compounding becomes. This is why starting early matters so much in investing.

Albert Einstein reportedly called compounding "the eighth wonder of the world."`,
    example: 'You invest ₹1,00,000 at 10% annual return. Year 1: ₹1,10,000. Year 2: ₹1,21,000 (10% on ₹1.1L, not ₹1L). Year 10: ₹2,59,000. Year 20: ₹6,72,000!',
    commonMistakes: [
      'Not starting early enough',
      'Withdrawing returns instead of reinvesting',
      'Underestimating how time affects growth',
    ],
    relatedTerms: ['sip', 'mutual-fund'],
    relatedTools: ['/invest'],
  },
  {
    slug: 'inflation',
    term: 'Inflation',
    shortDefinition: 'Rising prices that reduce your money\'s value.',
    simpleExplanation: `Inflation is the rate at which prices of goods and services increase over time. In India, inflation typically runs around 5-7% per year.

If inflation is 6% and your savings account gives 3.5%, you're actually losing purchasing power. This is why it's important to invest, not just save.

When planning investments, always think about "real returns" (returns minus inflation).`,
    example: 'A thali that costs ₹100 today might cost ₹134 after 5 years at 6% inflation. Your ₹100 note stays ₹100, but buys less food.',
    commonMistakes: [
      'Ignoring inflation when planning for long-term goals',
      'Keeping all money in low-interest savings accounts',
    ],
    relatedTerms: ['compounding', 'fd'],
    relatedTools: ['/invest'],
  },
  {
    slug: 'tax-saving',
    term: 'Tax Saving (80C)',
    shortDefinition: 'Investments that reduce your taxable income.',
    simpleExplanation: `Section 80C of the Income Tax Act allows you to claim deductions up to ₹1.5 lakh per year on certain investments. This reduces your taxable income.

Popular 80C options include: PPF, ELSS, NPS (partly), EPF, NSC, tax-saving FDs, life insurance premiums, and children's tuition fees.

If you're in the 30% tax bracket, investing ₹1.5 lakh in 80C saves you approximately ₹46,800 in taxes.`,
    example: 'Income: ₹12 lakh. You invest ₹1.5 lakh in PPF. Taxable income becomes ₹10.5 lakh. Tax saved: approximately ₹46,800.',
    commonMistakes: [
      'Rushing 80C investments in March',
      'Buying unnecessary insurance just for tax saving',
      'Not considering lock-in periods of different options',
    ],
    relatedTerms: ['ppf', 'elss', 'nps'],
    relatedTools: ['/invest', '/tools/government-schemes'],
  },
];

// Helper functions
export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((term) => term.slug === slug);
}

export function getAllSlugs(): string[] {
  return glossaryTerms.map((term) => term.slug);
}

export function getRelatedTerms(slug: string): GlossaryTerm[] {
  const term = getTermBySlug(slug);
  if (!term) return [];
  return term.relatedTerms
    .map((relatedSlug) => getTermBySlug(relatedSlug))
    .filter((t): t is GlossaryTerm => t !== undefined);
}

export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return glossaryTerms.filter(
    (term) =>
      term.term.toLowerCase().includes(lowerQuery) ||
      term.shortDefinition.toLowerCase().includes(lowerQuery) ||
      term.slug.includes(lowerQuery)
  );
}

