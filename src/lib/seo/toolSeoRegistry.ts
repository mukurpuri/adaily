// Tool SEO Content Registry
// Single source of truth for SEO content across all Adaily tools

import type { ToolSeoContent } from '@/components/seo/types';

export const toolSeoRegistry: Record<string, ToolSeoContent> = {
  'emergency-fund-planner': {
    toolName: 'Emergency Funds',
    toolId: 'emergency-fund-planner',
    whatIs: `An emergency fund is money you set aside for unexpected situations like job loss, medical emergencies, or urgent repairs. It acts as a financial safety net so you don't have to borrow money or sell investments during tough times. Most experts suggest keeping 3 to 6 months of your monthly expenses in an easily accessible account.`,
    whyPeopleStruggle: [
      'Not knowing how many months of expenses to save',
      'Confusion about where to keep the money (savings account vs. FD vs. liquid fund)',
      'Uncertainty about what counts as an "expense" to calculate',
      'Feeling overwhelmed when starting from zero',
    ],
    example: {
      title: 'Example: Priya in Mumbai',
      steps: [
        'Priya spends ₹35,000/month on rent, food, transport, and bills',
        'She has a private sector job (somewhat stable)',
        'She has no dependents',
        'The tool suggests: 4-6 months of expenses',
      ],
      mathLine: '₹35,000 × 4 months = ₹1,40,000 to ₹35,000 × 6 months = ₹2,10,000',
      takeaway: 'Priya should aim for ₹1.4L to ₹2.1L as her emergency fund. She keeps ₹50k in savings (instant access) and the rest in a liquid fund.',
    },
    howThisToolHelps: [
      'Calculates a range based on your actual expenses',
      'Adjusts for job stability and dependents',
      'Shows how much more you need to save',
      'Suggests where to keep the money for quick access',
    ],
    howToReadResult: [
      'The "safety net target" is your recommended emergency fund range',
      'The "remaining to build" shows how much more you need',
      '"Where to keep it" suggests options based on accessibility',
      'A wider range (e.g., 6-9 months) means your situation needs more buffer',
    ],
    whatItDoesNotDo: [
      'Give specific investment advice',
      'Guarantee exact amounts you need',
      'Replace professional financial planning',
      'Consider your specific medical or insurance situation',
    ],
    faqs: [
      {
        q: 'How much emergency fund should I have?',
        a: 'A general rule is 3-6 months of your monthly expenses. If you have a stable government job, 3-4 months may be enough. Freelancers or those with variable income should aim for 6-9 months.',
      },
      {
        q: 'Should I invest my emergency fund?',
        a: 'No. Emergency funds should be kept in liquid, low-risk options like savings accounts or liquid mutual funds. The goal is quick access, not returns.',
      },
      {
        q: 'Can I use a Fixed Deposit for emergency fund?',
        a: 'Regular FDs have lock-in and penalty for early withdrawal. Sweep-in FDs are better as they offer FD returns with savings account flexibility.',
      },
      {
        q: 'Is ₹1 lakh enough for emergency fund?',
        a: 'It depends on your monthly expenses. If you spend ₹25,000/month, ₹1 lakh covers 4 months, which is reasonable. Calculate based on your actual expenses.',
      },
      {
        q: 'Should I build emergency fund before investing?',
        a: 'Yes. An emergency fund is the foundation. Without it, you might need to sell investments at a loss during emergencies. Build this first, then invest.',
      },
      {
        q: 'Where should I keep emergency fund in India?',
        a: 'Split it: keep 1-2 months in a savings account for instant access, and the rest in a liquid fund or sweep-in FD for slightly better returns.',
      },
    ],
    nextSteps: [
      'Calculate your actual monthly expenses (rent, food, transport, bills)',
      'Check how much you already have saved',
      'Set a monthly savings target to reach your goal',
      'Open a separate savings account or start a liquid fund SIP',
      'Review and adjust as your expenses change',
    ],
    disclaimer: 'This tool is for educational purposes only. It provides general guidance and is not financial advice. Please consult a certified financial planner for personalized recommendations.',
    relatedTools: [
      { name: 'Investment Explorer', href: '/invest', icon: '🎯' },
      { name: 'Money Check', href: '/tools/money-mistakes-checker', icon: '🔍' },
      { name: 'Glossary', href: '/glossary', icon: '📚' },
    ],
  },

  'investment-explorer': {
    toolName: 'Investment Options',
    toolId: 'investment-explorer',
    whatIs: `This tool helps you understand different investment options available in India based on your situation. You enter your savings amount, how long you can keep the money invested, and your comfort with risk. It then shows you options that might fit your profile, with explanations of each.`,
    whyPeopleStruggle: [
      'Too many options (FD, PPF, mutual funds, stocks) with confusing jargon',
      'Not knowing which option fits their timeline',
      'Fear of losing money without understanding risk levels',
      'Bank employees pushing products that may not fit',
    ],
    example: {
      title: 'Example: Rahul with ₹1 Lakh',
      steps: [
        'Rahul has ₹1,00,000 to invest',
        'He needs the money back in 2-3 years',
        'He prefers medium risk (some ups and downs are okay)',
        'The tool suggests options like FDs, debt funds, and balanced funds',
      ],
      takeaway: 'For a 2-3 year horizon with medium risk, Rahul sees options that balance safety and growth. For longer horizons (5+ years), he would see more equity options.',
    },
    howThisToolHelps: [
      'Filters options based on your timeline and risk comfort',
      'Explains why each option might suit you',
      'Shows government-backed vs. market-linked options',
      'Avoids jargon and uses simple language',
    ],
    howToReadResult: [
      'Higher "fit score" means the option matches your inputs better',
      'Green badges show government-backed (safer) options',
      '"Why this fits you" explains the match with your situation',
      'Click on any option to see more details and how to start',
    ],
    whatItDoesNotDo: [
      'Recommend specific funds or stocks to buy',
      'Guarantee returns or predict future performance',
      'Replace advice from a SEBI-registered advisor',
      'Consider your complete financial picture (loans, insurance, etc.)',
    ],
    faqs: [
      {
        q: 'Where should I invest money in India?',
        a: 'It depends on your timeline and risk comfort. For short-term (under 1 year), consider FDs or liquid funds. For long-term (5+ years), index funds or PPF are common choices.',
      },
      {
        q: 'What is the safest investment option?',
        a: 'Government-backed options like PPF, NSC, and FDs from major banks are considered safe. The trade-off is that returns are usually lower than market-linked options.',
      },
      {
        q: 'How much should I invest per month?',
        a: 'A common guideline is to save and invest 20-30% of your income after covering expenses. Start with whatever you can and increase over time.',
      },
      {
        q: 'Should I invest in FD or mutual funds?',
        a: 'FDs offer fixed, predictable returns and are good for short-term. Mutual funds can offer higher returns over long periods but come with market risk.',
      },
      {
        q: 'What is SIP and should I use it?',
        a: 'SIP (Systematic Investment Plan) lets you invest a fixed amount monthly in mutual funds. It is a disciplined way to invest and averages out market ups and downs.',
      },
      {
        q: 'Is this tool free to use?',
        a: 'Yes, completely free. We do not collect personal data, require signup, or sell any products. It is purely educational.',
      },
    ],
    nextSteps: [
      'Note down options that fit your profile',
      'Research each option further (official websites, not random blogs)',
      'Start small if you are new to investing',
      'Consider consulting a SEBI-registered advisor for large amounts',
      'Review your investments annually',
    ],
    disclaimer: 'This tool is for educational purposes only. It does not recommend specific products. Please consult a SEBI-registered advisor before investing.',
    relatedTools: [
      { name: 'Emergency Fund', href: '/tools/emergency-fund-planner', icon: '🛡️' },
      { name: 'Safety vs Growth', href: '/tools/safety-growth-split', icon: '⚖️' },
      { name: 'Glossary', href: '/glossary', icon: '📚' },
    ],
  },

  'safety-growth-split': {
    toolName: 'Asset Allocation',
    toolId: 'safety-growth-split',
    whatIs: `Asset allocation is about dividing your money between "safe" options (like FDs, PPF) and "growth" options (like equity mutual funds, stocks). The right split depends on your age, timeline, and how much risk you can handle. This tool suggests a conceptual split to help you think about balance.`,
    whyPeopleStruggle: [
      'Not understanding the trade-off between safety and growth',
      'Putting all money in one type (too safe or too risky)',
      'Changing strategy based on short-term market news',
      'Comparing their situation to others without considering differences',
    ],
    example: {
      title: 'Example: Ananya, 28 years old',
      steps: [
        'Ananya is 28 with a stable job',
        'She has 10+ years before she needs the money',
        'She is comfortable with medium risk',
        'The tool suggests: 40% Safety, 60% Growth',
      ],
      takeaway: 'With a long horizon, Ananya can afford more growth allocation. She might put 40% in PPF/debt funds and 60% in index funds. As she gets older, she can shift more to safety.',
    },
    howThisToolHelps: [
      'Gives a starting point for thinking about allocation',
      'Adjusts based on your timeline and risk comfort',
      'Shows what types of options fit each bucket',
      'Explains why the split makes sense for you',
    ],
    howToReadResult: [
      '"Safety %" shows how much to keep in low-risk options',
      '"Growth %" shows how much for market-linked options',
      'Example options under each bucket are illustrative, not recommendations',
      'The split is a guideline, not a strict rule',
    ],
    whatItDoesNotDo: [
      'Tell you exactly which funds to buy',
      'Account for your existing investments or loans',
      'Replace professional portfolio planning',
      'Guarantee any returns',
    ],
    faqs: [
      {
        q: 'What is asset allocation?',
        a: 'Asset allocation is how you divide your money between different types of investments (safety vs. growth, or debt vs. equity). The goal is to balance risk and returns.',
      },
      {
        q: 'What is a good split for beginners?',
        a: 'A common starting point is the "100 minus age" rule. If you are 30, put 70% in growth and 30% in safety. Adjust based on your comfort with risk.',
      },
      {
        q: 'Should I change my allocation over time?',
        a: 'Yes. As you get older or closer to your goal, shift more to safety. Review your allocation every year or when your life situation changes.',
      },
      {
        q: 'What counts as safety vs. growth?',
        a: 'Safety: FDs, PPF, debt funds, savings. Growth: Equity mutual funds, index funds, stocks. Balanced funds are somewhere in between.',
      },
      {
        q: 'Is 100% safety bad?',
        a: 'Not bad, but your money may not beat inflation over time. Some growth allocation helps your money grow in the long run.',
      },
    ],
    nextSteps: [
      'Note your current split (if any)',
      'Compare with the suggested split',
      'Make gradual changes, not sudden shifts',
      'Rebalance once a year',
      'Consult an advisor for large portfolios',
    ],
    disclaimer: 'This tool provides conceptual guidance only. It is not investment advice. Actual allocation depends on many personal factors.',
    relatedTools: [
      { name: 'Investment Explorer', href: '/invest', icon: '🎯' },
      { name: 'Emergency Fund', href: '/tools/emergency-fund-planner', icon: '🛡️' },
      { name: 'Glossary', href: '/glossary', icon: '📚' },
    ],
  },

  'money-mistakes-checker': {
    toolName: 'Money Habits',
    toolId: 'money-mistakes-checker',
    whatIs: `This tool looks at your basic financial habits (savings rate, where your money is, debt) and highlights common mistakes people make. It is a gentle check-up, not a judgement. The goal is to help you spot areas where small changes could help.`,
    whyPeopleStruggle: [
      'Not tracking where money actually goes',
      'Keeping too much in low-interest savings accounts',
      'Taking investment risks before building an emergency fund',
      'High EMI burden eating into savings capacity',
    ],
    example: {
      title: 'Example: Vikram, IT professional',
      steps: [
        'Vikram earns ₹80,000/month',
        'He saves ₹5,000/month (6.25% of income)',
        'All his money is in a savings account',
        'He has no emergency fund but invested in stocks',
      ],
      takeaway: 'The tool flags: low savings rate (under 10%), idle cash in savings, and taking stock risk without an emergency buffer. These are common but fixable.',
    },
    howThisToolHelps: [
      'Highlights common financial blind spots',
      'Gives gentle, non-preachy suggestions',
      'Prioritizes issues by importance',
      'Provides next steps for each issue',
    ],
    howToReadResult: [
      'Issues are categorized by severity (gentle, moderate, important)',
      'Each issue has a short explanation of why it matters',
      '"All good" means no major red flags were found',
      'This is a starting point, not a complete financial audit',
    ],
    whatItDoesNotDo: [
      'Analyze your complete financial picture',
      'Know about your investments, insurance, or loans in detail',
      'Give personalized advice',
      'Judge your choices',
    ],
    faqs: [
      {
        q: 'What is a good savings rate?',
        a: 'Aim for at least 20% of your income after taxes. If that is not possible now, start with 10% and increase gradually.',
      },
      {
        q: 'Is keeping money in savings account bad?',
        a: 'Not bad for emergencies, but large amounts lose value to inflation over time. Consider moving excess to FDs, liquid funds, or investments based on your timeline.',
      },
      {
        q: 'What EMI-to-income ratio is healthy?',
        a: 'Try to keep total EMIs (home, car, personal) under 40% of your monthly income. Higher than 50% can be stressful.',
      },
      {
        q: 'Should I invest before clearing debt?',
        a: 'Pay off high-interest debt (credit cards, personal loans) first. Home loans at low interest can coexist with investing.',
      },
      {
        q: 'What if all my results say "All good"?',
        a: 'Great! It means no common red flags were detected. You can still explore other tools to optimize further.',
      },
    ],
    nextSteps: [
      'Address any "important" issues first',
      'Track your expenses for a month',
      'Build an emergency fund before investing',
      'Review your situation every 6 months',
    ],
    disclaimer: 'This tool checks for common patterns only. It is not a complete financial analysis. Consult a professional for detailed advice.',
    relatedTools: [
      { name: 'Emergency Fund', href: '/tools/emergency-fund-planner', icon: '🛡️' },
      { name: 'Investment Explorer', href: '/invest', icon: '🎯' },
      { name: 'Glossary', href: '/glossary', icon: '📚' },
    ],
  },

  'government-schemes': {
    toolName: 'Government Schemes',
    toolId: 'government-schemes',
    whatIs: `India has several government-backed savings and investment schemes with tax benefits. This tool helps you understand which schemes might fit your age, goals, and preferences. It is an educational overview, not a recommendation to invest.`,
    whyPeopleStruggle: [
      'Too many schemes with confusing names (PPF, NPS, NSC, SCSS...)',
      'Not understanding eligibility (age, employment type)',
      'Confusion about lock-in periods and withdrawal rules',
      'Missing out on tax benefits due to lack of awareness',
    ],
    example: {
      title: 'Example: Meera, 35, wants tax saving',
      steps: [
        'Meera is 35, salaried, wants to save tax',
        'She is okay with some lock-in',
        'She selected goal: Tax saving + Retirement',
        'The tool shows: PPF, NPS, ELSS as options',
      ],
      takeaway: 'Meera learns that PPF offers safe, tax-free returns with 15-year lock-in, while NPS gives extra tax benefits but locks until 60. ELSS has only 3-year lock-in but market risk.',
    },
    howThisToolHelps: [
      'Filters schemes based on your age and goal',
      'Explains each scheme in simple terms',
      'Shows lock-in and tax angle',
      'Helps you understand eligibility',
    ],
    howToReadResult: [
      'Each scheme card shows what it is and who it is for',
      '"Lock-in" tells you how long your money is blocked',
      '"Tax angle" shows if it saves tax or if returns are taxable',
      'Eligibility notes highlight any restrictions',
    ],
    whatItDoesNotDo: [
      'Tell you exactly how much to invest',
      'Compare current interest rates',
      'Replace official government portals',
      'Cover every scheme (focus is on popular ones)',
    ],
    faqs: [
      {
        q: 'What is PPF and why is it popular?',
        a: 'Public Provident Fund is a 15-year government scheme with tax-free returns. You can invest up to ₹1.5L/year and claim 80C deduction. Very safe but long lock-in.',
      },
      {
        q: 'What is NPS?',
        a: 'National Pension System is a retirement scheme. You get extra tax benefit (₹50k under 80CCD1B) beyond 80C. But 40% must be used for pension at retirement.',
      },
      {
        q: 'What is SCSS?',
        a: 'Senior Citizens Savings Scheme is for people 60+. It offers regular income with government safety. 5-year tenure, can be extended.',
      },
      {
        q: 'Can I withdraw PPF early?',
        a: 'Partial withdrawal is allowed after 7 years. Full withdrawal only at maturity (15 years). You can extend in 5-year blocks.',
      },
      {
        q: 'Which is better: PPF or NPS?',
        a: 'PPF is safer with tax-free returns but 15-year lock-in. NPS has market exposure and extra tax benefits but locks until 60. Choose based on your goals.',
      },
    ],
    nextSteps: [
      'Note schemes that match your goals',
      'Read official guidelines on the government portal',
      'Check current interest rates (they change)',
      'Consider combining schemes for different goals',
      'Consult a tax advisor for your specific situation',
    ],
    disclaimer: 'This is an educational overview. Scheme details, rates, and rules may change. Always verify on official government portals before investing.',
    relatedTools: [
      { name: 'Investment Explorer', href: '/invest', icon: '🎯' },
      { name: 'Emergency Fund', href: '/tools/emergency-fund-planner', icon: '🛡️' },
      { name: 'Glossary', href: '/glossary', icon: '📚' },
    ],
  },
};

// Helper to get SEO content by slug
export function getToolSeoContent(slug: string): ToolSeoContent | null {
  return toolSeoRegistry[slug] || null;
}

// Get all tool slugs with SEO content
export function getAllToolSlugs(): string[] {
  return Object.keys(toolSeoRegistry);
}

