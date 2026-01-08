/**
 * Investment Buckets for Indian Markets
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * A comprehensive list of investment options available in India,
 * categorized by risk level, liquidity, and purpose.
 */

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type LiquidityLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type GoalType = 'SAFETY' | 'GROWTH' | 'INCOME' | 'TAX_SAVING';
export type TimeHorizon = 'SHORT' | 'MEDIUM' | 'LONG';

export interface InvestmentBucket {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: string;
  
  // Characteristics
  riskLevel: RiskLevel;
  liquidity: LiquidityLevel;
  minInvestment: number;
  expectedReturns: string;
  timeHorizon: TimeHorizon;
  lockInPeriod?: string;
  
  // Suitability
  goals: GoalType[];
  experienceRequired: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  effortPerWeek: string;
  
  // Details
  whatItIs: string;
  whyConsider: string[];
  warnings: string[];
  howToStart: string[];
  platforms: string[];
  
  // Tax info
  taxBenefit?: string;
  taxOnReturns?: string;
}

export const investmentBuckets: InvestmentBucket[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // LOW RISK - Safer Options
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'savings_account',
    name: 'High-Yield Savings Account',
    emoji: '🏦',
    description: 'Park money in high-interest savings accounts',
    category: 'Extremely Safe',
    riskLevel: 'LOW',
    liquidity: 'HIGH',
    minInvestment: 0,
    expectedReturns: '3-7% p.a.',
    timeHorizon: 'SHORT',
    goals: ['SAFETY'],
    experienceRequired: 'BEGINNER',
    effortPerWeek: '0 mins',
    whatItIs: 'A savings account with a bank that offers higher than average interest rates. Some digital banks offer up to 7% on savings.',
    whyConsider: [
      'Completely liquid - withdraw anytime',
      'Zero risk of capital loss',
      'DICGC insured up to ₹5 lakhs',
      'No effort required',
    ],
    warnings: [
      'Returns barely beat inflation',
      'Interest is fully taxable',
    ],
    howToStart: [
      'Compare interest rates across banks',
      'Consider Airtel Payments Bank, Jupiter, Fi for higher rates',
      'Open account online in minutes',
    ],
    platforms: ['Jupiter', 'Fi Money', 'Airtel Payments Bank', 'IndusInd Bank'],
    taxOnReturns: 'Interest taxed as per income slab',
  },
  {
    id: 'fd',
    name: 'Fixed Deposit (FD)',
    emoji: '🔒',
    description: 'Lock money for guaranteed returns',
    category: 'Extremely Safe',
    riskLevel: 'LOW',
    liquidity: 'LOW',
    minInvestment: 1000,
    expectedReturns: '6-8% p.a.',
    timeHorizon: 'SHORT',
    lockInPeriod: '7 days to 10 years',
    goals: ['SAFETY', 'INCOME'],
    experienceRequired: 'BEGINNER',
    effortPerWeek: '0 mins',
    whatItIs: 'You lend money to a bank for a fixed period and get guaranteed interest. Senior citizens get 0.5% extra.',
    whyConsider: [
      'Guaranteed returns - no market risk',
      'DICGC insured up to ₹5 lakhs per bank',
      'Higher rates than savings accounts',
      'Senior citizens get bonus rates',
    ],
    warnings: [
      'Premature withdrawal has penalty',
      'Interest is fully taxable',
      'TDS deducted if interest > ₹40,000/year',
    ],
    howToStart: [
      'Compare FD rates across banks and NBFCs',
      'Choose tenure based on when you need money',
      'Create FD through net banking or branch',
    ],
    platforms: ['Any Bank', 'Bajaj Finserv', 'Shriram Finance', 'Mahindra Finance'],
    taxOnReturns: 'Interest taxed as per income slab. TDS applicable.',
  },
  {
    id: 'liquid_fund',
    name: 'Liquid Mutual Fund',
    emoji: '💧',
    description: 'Park short-term money with better returns than savings',
    category: 'Very Safe',
    riskLevel: 'LOW',
    liquidity: 'HIGH',
    minInvestment: 500,
    expectedReturns: '5-7% p.a.',
    timeHorizon: 'SHORT',
    goals: ['SAFETY'],
    experienceRequired: 'BEGINNER',
    effortPerWeek: '0 mins',
    whatItIs: 'Mutual funds that invest in very short-term debt instruments. Money can be redeemed within 24 hours.',
    whyConsider: [
      'Slightly better returns than FD',
      'No lock-in period',
      'More tax-efficient than FD for longer holding',
      'Good for emergency fund',
    ],
    warnings: [
      'Not DICGC insured (but very low risk)',
      'Returns can vary slightly',
    ],
    howToStart: [
      'Open demat account on any platform',
      'Search for "Liquid Fund"',
      'Choose one with low expense ratio',
      'Start with any amount ₹500+',
    ],
    platforms: ['Groww', 'Zerodha Coin', 'Kuvera', 'Paytm Money'],
    taxOnReturns: 'Taxed at slab rate. More tax-efficient if held > 3 years.',
  },
  {
    id: 'ppf',
    name: 'Public Provident Fund (PPF)',
    emoji: '🏛️',
    description: 'Government-backed long-term savings with tax benefits',
    category: 'Extremely Safe',
    riskLevel: 'LOW',
    liquidity: 'LOW',
    minInvestment: 500,
    expectedReturns: '7-7.5% p.a.',
    timeHorizon: 'LONG',
    lockInPeriod: '15 years (partial withdrawal after 6 years)',
    goals: ['SAFETY', 'TAX_SAVING'],
    experienceRequired: 'BEGINNER',
    effortPerWeek: '0 mins',
    whatItIs: 'A government savings scheme with 15-year lock-in. Interest rate is set by government quarterly. Triple tax benefit (EEE).',
    whyConsider: [
      'Completely tax-free returns (EEE status)',
      'Section 80C deduction up to ₹1.5L',
      'Government guarantee',
      'Compounding magic over 15 years',
    ],
    warnings: [
      '15-year lock-in is very long',
      'Max ₹1.5L per year contribution',
      'Interest rate can change quarterly',
    ],
    howToStart: [
      'Open PPF account at any bank or post office',
      'Available online through most banks',
      'Invest minimum ₹500, maximum ₹1.5L per year',
    ],
    platforms: ['SBI', 'Post Office', 'ICICI', 'HDFC'],
    taxBenefit: 'Section 80C - up to ₹1.5L deduction',
    taxOnReturns: 'Completely tax-free (EEE)',
  },
  {
    id: 'nsc',
    name: 'National Savings Certificate (NSC)',
    emoji: '📜',
    description: 'Post office savings with tax benefit',
    category: 'Very Safe',
    riskLevel: 'LOW',
    liquidity: 'LOW',
    minInvestment: 1000,
    expectedReturns: '7-7.5% p.a.',
    timeHorizon: 'MEDIUM',
    lockInPeriod: '5 years',
    goals: ['SAFETY', 'TAX_SAVING'],
    experienceRequired: 'BEGINNER',
    effortPerWeek: '0 mins',
    whatItIs: 'A post office savings scheme with 5-year lock-in. Interest compounds annually but is paid at maturity.',
    whyConsider: [
      'Section 80C tax deduction',
      'Government guarantee',
      'Shorter lock-in than PPF',
      'Interest earned is also eligible for 80C',
    ],
    warnings: [
      '5-year lock-in',
      'Interest at maturity is taxable',
      'Cannot withdraw early except on death',
    ],
    howToStart: [
      'Visit any post office with KYC documents',
      'Available online through India Post',
      'No maximum investment limit',
    ],
    platforms: ['Post Office', 'India Post App'],
    taxBenefit: 'Section 80C - up to ₹1.5L deduction',
    taxOnReturns: 'Interest at maturity is taxable at slab rate',
  },
  {
    id: 'sgb',
    name: 'Sovereign Gold Bonds (SGB)',
    emoji: '🪙',
    description: 'Invest in gold with government backing + interest',
    category: 'Safe (Gold)',
    riskLevel: 'MEDIUM',
    liquidity: 'MEDIUM',
    minInvestment: 5000,
    expectedReturns: '2.5% interest + gold price movement',
    timeHorizon: 'LONG',
    lockInPeriod: '8 years (exit after 5 years allowed)',
    goals: ['SAFETY', 'GROWTH'],
    experienceRequired: 'BEGINNER',
    effortPerWeek: '0 mins',
    whatItIs: 'Government securities denominated in grams of gold. You get 2.5% annual interest plus returns based on gold price.',
    whyConsider: [
      '2.5% annual interest on top of gold returns',
      'No storage/purity concerns',
      'Tax-free if held till maturity',
      'Can be traded on stock exchange',
    ],
    warnings: [
      'Gold prices can fall',
      '8-year lock-in (5 years for early exit)',
      'Limited issue windows by RBI',
    ],
    howToStart: [
      'Buy during RBI issue windows (4-5 times per year)',
      'Or buy from stock exchange (NSE/BSE)',
      'Need demat account for exchange-traded SGBs',
    ],
    platforms: ['RBI Direct', 'Banks', 'Zerodha', 'Groww'],
    taxOnReturns: 'Tax-free if held till maturity. Otherwise capital gains tax.',
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // MEDIUM RISK - Balanced Options
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'debt_fund',
    name: 'Debt Mutual Funds',
    emoji: '📊',
    description: 'Mutual funds investing in bonds and fixed income',
    category: 'Moderate',
    riskLevel: 'MEDIUM',
    liquidity: 'HIGH',
    minInvestment: 500,
    expectedReturns: '6-9% p.a.',
    timeHorizon: 'MEDIUM',
    goals: ['SAFETY', 'INCOME'],
    experienceRequired: 'BEGINNER',
    effortPerWeek: '0 mins',
    whatItIs: 'Mutual funds that invest in government/corporate bonds. Different types: short duration, corporate bond, banking & PSU, etc.',
    whyConsider: [
      'Better returns than FD',
      'More tax-efficient than FD for 3+ years',
      'Professional management',
      'No lock-in period',
    ],
    warnings: [
      'Not guaranteed like FD',
      'Can have negative returns in rare cases',
      'Choose based on duration matching',
    ],
    howToStart: [
      'Start with low duration or banking & PSU funds',
      'Match fund duration to your investment horizon',
      'Invest via SIP or lump sum',
    ],
    platforms: ['Groww', 'Zerodha Coin', 'Kuvera', 'AMC websites'],
    taxOnReturns: 'Taxed at slab rate (new rules from 2023)',
  },
  {
    id: 'hybrid_fund',
    name: 'Hybrid/Balanced Funds',
    emoji: '⚖️',
    description: 'Mix of stocks and bonds for balanced growth',
    category: 'Moderate',
    riskLevel: 'MEDIUM',
    liquidity: 'HIGH',
    minInvestment: 500,
    expectedReturns: '8-12% p.a.',
    timeHorizon: 'MEDIUM',
    goals: ['GROWTH', 'SAFETY'],
    experienceRequired: 'BEGINNER',
    effortPerWeek: '5 mins',
    whatItIs: 'Funds that invest in both equity and debt. Balanced Advantage funds dynamically shift between equity and debt based on market conditions.',
    whyConsider: [
      'Best of both worlds',
      'Lower volatility than pure equity',
      'Automatic rebalancing',
      'Good for first-time equity investors',
    ],
    warnings: [
      'Returns lower than pure equity in bull markets',
      'Still has market risk',
    ],
    howToStart: [
      'Look for Balanced Advantage or Aggressive Hybrid funds',
      'Start SIP to average out entry points',
      'Good for 3-5 year horizon',
    ],
    platforms: ['Groww', 'Zerodha Coin', 'Kuvera', 'MF Central'],
    taxOnReturns: 'Equity taxation if 65%+ in stocks, else debt taxation',
  },
  {
    id: 'index_fund',
    name: 'Index Funds / ETFs',
    emoji: '📈',
    description: 'Low-cost way to invest in the entire market',
    category: 'Growth',
    riskLevel: 'MEDIUM',
    liquidity: 'HIGH',
    minInvestment: 100,
    expectedReturns: '10-14% p.a. (long term average)',
    timeHorizon: 'LONG',
    goals: ['GROWTH'],
    experienceRequired: 'BEGINNER',
    effortPerWeek: '0 mins',
    whatItIs: 'Funds that track an index like Nifty 50 or Sensex. No fund manager picking stocks - just buys all stocks in the index.',
    whyConsider: [
      'Lowest cost (expense ratio 0.1-0.2%)',
      'Beats most actively managed funds',
      'Simple and transparent',
      'Best for long-term wealth building',
    ],
    warnings: [
      'Market risk - can fall 30-50% in crashes',
      'No downside protection',
      'Requires patience for 7-10+ years',
    ],
    howToStart: [
      'Choose Nifty 50 or Nifty Next 50 index fund',
      'Look for lowest expense ratio',
      'Start SIP - even ₹100/month works',
    ],
    platforms: ['Groww', 'Zerodha Coin', 'Kuvera', 'UTI, Nippon, HDFC AMC'],
    taxOnReturns: '10% LTCG above ₹1L, 15% STCG',
  },
  {
    id: 'gold_etf',
    name: 'Gold ETF',
    emoji: '✨',
    description: 'Invest in gold without physical storage hassles',
    category: 'Moderate',
    riskLevel: 'MEDIUM',
    liquidity: 'HIGH',
    minInvestment: 500,
    expectedReturns: '8-10% p.a. (historical average)',
    timeHorizon: 'LONG',
    goals: ['SAFETY', 'GROWTH'],
    experienceRequired: 'BEGINNER',
    effortPerWeek: '0 mins',
    whatItIs: 'Exchange-traded funds backed by physical gold. Each unit represents a fixed amount of gold (usually 1 gram).',
    whyConsider: [
      'Easy to buy/sell on stock exchange',
      'No storage/purity worries',
      'Good for diversification',
      'Tracks gold prices accurately',
    ],
    warnings: [
      'No interest like SGB',
      'Capital gains tax applies',
      'Gold can underperform stocks for years',
    ],
    howToStart: [
      'Need demat account',
      'Buy during market hours like stocks',
      'SIP available through some platforms',
    ],
    platforms: ['Zerodha', 'Groww', 'Upstox', 'Angel One'],
    taxOnReturns: '20% LTCG with indexation for 3+ years',
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // HIGH RISK - Aggressive Growth
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'equity_mf',
    name: 'Equity Mutual Funds',
    emoji: '🚀',
    description: 'Professionally managed stock portfolios',
    category: 'Growth',
    riskLevel: 'HIGH',
    liquidity: 'HIGH',
    minInvestment: 500,
    expectedReturns: '12-18% p.a. (long term)',
    timeHorizon: 'LONG',
    goals: ['GROWTH'],
    experienceRequired: 'INTERMEDIATE',
    effortPerWeek: '15 mins',
    whatItIs: 'Funds that invest primarily in stocks. Types: Large Cap (safer), Mid Cap (growth), Small Cap (aggressive), Flexi Cap (flexible).',
    whyConsider: [
      'Higher return potential than index funds',
      'Professional stock selection',
      'Diversification across many stocks',
      'SIP helps average entry price',
    ],
    warnings: [
      'Can fall 40-60% in crashes',
      'Requires 7-10 year commitment',
      'Many funds underperform index',
      'Higher expense ratio than index funds',
    ],
    howToStart: [
      'Start with Flexi Cap or Large Cap for stability',
      'Research fund performance (5-10 years)',
      'Check expense ratio and fund manager track record',
      'Use SIP to reduce timing risk',
    ],
    platforms: ['Groww', 'Zerodha Coin', 'Kuvera', 'Paytm Money'],
    taxOnReturns: '10% LTCG above ₹1L, 15% STCG',
  },
  {
    id: 'elss',
    name: 'ELSS (Tax Saving Mutual Fund)',
    emoji: '💰',
    description: 'Equity fund with tax benefits under Section 80C',
    category: 'Growth + Tax Saving',
    riskLevel: 'HIGH',
    liquidity: 'LOW',
    minInvestment: 500,
    expectedReturns: '12-16% p.a. (long term)',
    timeHorizon: 'LONG',
    lockInPeriod: '3 years',
    goals: ['TAX_SAVING', 'GROWTH'],
    experienceRequired: 'BEGINNER',
    effortPerWeek: '5 mins',
    whatItIs: 'Equity mutual funds that qualify for Section 80C tax deduction. Shortest lock-in among all 80C options.',
    whyConsider: [
      'Section 80C deduction up to ₹1.5L',
      'Lowest lock-in (3 years) among 80C options',
      'Equity returns with tax benefit',
      'SIP investments each have separate 3-year lock-in',
    ],
    warnings: [
      '3-year lock-in per investment',
      'Market risk - can have losses',
      'Returns are taxable (LTCG)',
    ],
    howToStart: [
      'Choose ELSS fund with good 5-year track record',
      'Invest via SIP for rupee cost averaging',
      'Each SIP has its own 3-year lock-in',
    ],
    platforms: ['Groww', 'Zerodha Coin', 'Kuvera', 'MF Central'],
    taxBenefit: 'Section 80C - up to ₹1.5L deduction',
    taxOnReturns: '10% LTCG above ₹1L',
  },
  {
    id: 'direct_stocks',
    name: 'Direct Stock Investing',
    emoji: '📱',
    description: 'Buy and hold individual company stocks',
    category: 'Aggressive Growth',
    riskLevel: 'HIGH',
    liquidity: 'HIGH',
    minInvestment: 100,
    expectedReturns: 'Varies wildly: -50% to +100%+',
    timeHorizon: 'LONG',
    goals: ['GROWTH'],
    experienceRequired: 'ADVANCED',
    effortPerWeek: '2-5 hours',
    whatItIs: 'Buying shares of individual companies directly. You become a part-owner of the company.',
    whyConsider: [
      'Highest return potential',
      'You control what you own',
      'Can outperform mutual funds',
      'Dividends from some stocks',
    ],
    warnings: [
      'Requires significant research',
      'Individual stocks can go to zero',
      'Emotional discipline is crucial',
      'Most retail investors underperform index',
    ],
    howToStart: [
      'Open demat + trading account',
      'Start with large-cap, stable companies',
      'Never put all money in one stock',
      'Learn fundamental analysis basics',
    ],
    platforms: ['Zerodha', 'Groww', 'Upstox', 'Angel One', 'ICICI Direct'],
    taxOnReturns: '10% LTCG above ₹1L, 15% STCG',
  },
  {
    id: 'smallcap_mf',
    name: 'Small Cap Mutual Funds',
    emoji: '🎯',
    description: 'Invest in high-growth small companies',
    category: 'Aggressive Growth',
    riskLevel: 'HIGH',
    liquidity: 'HIGH',
    minInvestment: 500,
    expectedReturns: '15-25% p.a. (if you get timing right)',
    timeHorizon: 'LONG',
    goals: ['GROWTH'],
    experienceRequired: 'ADVANCED',
    effortPerWeek: '30 mins',
    whatItIs: 'Mutual funds that invest in small-cap stocks (companies ranked 251+ by market cap). High growth potential but very volatile.',
    whyConsider: [
      'Highest growth potential',
      'Can multiply money in bull runs',
      'Access to tomorrow\'s large caps',
    ],
    warnings: [
      'Can fall 50-70% in downturns',
      'Requires 10+ year horizon',
      'Very volatile - emotionally tough',
      'Not for core portfolio',
    ],
    howToStart: [
      'Only after you have large-cap base',
      'Limit to 10-20% of equity portfolio',
      'SIP through market cycles',
      'Don\'t check daily - seriously',
    ],
    platforms: ['Groww', 'Zerodha Coin', 'Kuvera'],
    taxOnReturns: '10% LTCG above ₹1L, 15% STCG',
  },
  {
    id: 'reit',
    name: 'REITs (Real Estate Investment Trusts)',
    emoji: '🏢',
    description: 'Own commercial real estate without buying property',
    category: 'Alternative',
    riskLevel: 'MEDIUM',
    liquidity: 'MEDIUM',
    minInvestment: 10000,
    expectedReturns: '8-12% p.a. (rental yield + growth)',
    timeHorizon: 'MEDIUM',
    goals: ['INCOME', 'GROWTH'],
    experienceRequired: 'INTERMEDIATE',
    effortPerWeek: '15 mins',
    whatItIs: 'Companies that own income-generating commercial real estate. They distribute 90% of income as dividends.',
    whyConsider: [
      'Earn from rent without buying property',
      'Regular dividend income',
      'Professional property management',
      'Liquid compared to physical real estate',
    ],
    warnings: [
      'Real estate market risk',
      'Limited REITs in India',
      'Dividends are taxable',
    ],
    howToStart: [
      'Buy REITs like Embassy, Mindspace, Brookfield on stock exchange',
      'Need demat account',
      'Research occupancy rates and lease expiry',
    ],
    platforms: ['Zerodha', 'Groww', 'Upstox'],
    taxOnReturns: 'Dividends taxed at slab rate. Capital gains as per equity.',
  },
  {
    id: 'nps',
    name: 'National Pension System (NPS)',
    emoji: '👴',
    description: 'Government pension scheme with extra tax benefits',
    category: 'Retirement',
    riskLevel: 'MEDIUM',
    liquidity: 'LOW',
    minInvestment: 500,
    expectedReturns: '9-12% p.a.',
    timeHorizon: 'LONG',
    lockInPeriod: 'Till age 60',
    goals: ['TAX_SAVING', 'GROWTH'],
    experienceRequired: 'BEGINNER',
    effortPerWeek: '0 mins',
    whatItIs: 'A government pension scheme where you can choose asset allocation (equity/debt/government bonds). Extra ₹50K tax benefit under 80CCD(1B).',
    whyConsider: [
      'Extra ₹50K deduction beyond 80C limit',
      'Lowest-cost fund management',
      'Flexible asset allocation',
      'Forces long-term discipline',
    ],
    warnings: [
      'Locked till 60 (partial withdrawal allowed)',
      'Must buy annuity with 40% at retirement',
      'Annuity portion taxable',
    ],
    howToStart: [
      'Open NPS account online at eNPS portal',
      'Choose Tier 1 for tax benefits',
      'Select auto or active choice for allocation',
    ],
    platforms: ['eNPS Portal', 'Banks', 'NPS Apps'],
    taxBenefit: 'Section 80CCD(1B) - additional ₹50K beyond 80C',
    taxOnReturns: '60% corpus is tax-free at withdrawal',
  },
];

// Helper function to filter buckets
export function filterBuckets(filters: {
  riskLevel?: RiskLevel;
  liquidity?: LiquidityLevel;
  goal?: GoalType;
  experience?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
}): InvestmentBucket[] {
  return investmentBuckets.filter(bucket => {
    if (filters.riskLevel && bucket.riskLevel !== filters.riskLevel) return false;
    if (filters.liquidity && bucket.liquidity !== filters.liquidity) return false;
    if (filters.goal && !bucket.goals.includes(filters.goal)) return false;
    if (filters.experience) {
      const expLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
      const userLevel = expLevels.indexOf(filters.experience);
      const reqLevel = expLevels.indexOf(bucket.experienceRequired);
      if (reqLevel > userLevel) return false;
    }
    return true;
  });
}

