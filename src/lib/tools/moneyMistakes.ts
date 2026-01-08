// Money Mistakes Checker

export type WhereMoneyIs = 
  | 'savings-account'
  | 'fd'
  | 'ppf-epf'
  | 'mutual-funds'
  | 'stocks'
  | 'gold'
  | 'crypto'
  | 'not-investing';

export type MistakeTimeHorizon = '<1y' | '1-3y' | '3-5y' | '5y+';
export type Severity = 'low' | 'medium' | 'high';

export interface MistakesInputs {
  incomeMonthly: number;
  savingsMonthly: number;
  whereMoneyIsNow: WhereMoneyIs[];
  debtEMI?: number;
  timeHorizon: MistakeTimeHorizon;
}

export interface Mistake {
  id: string;
  title: string;
  severity: Severity;
  why: string;
  nextStep: string;
  icon: string;
}

export interface MistakesResult {
  mistakes: Mistake[];
  isAllGood: boolean;
  positives: string[];
}

export function checkMistakes(inputs: MistakesInputs): MistakesResult {
  const {
    incomeMonthly,
    savingsMonthly,
    whereMoneyIsNow,
    debtEMI = 0,
    timeHorizon,
  } = inputs;

  const mistakes: Mistake[] = [];
  const positives: string[] = [];

  const savingsRate = incomeMonthly > 0 ? (savingsMonthly / incomeMonthly) * 100 : 0;
  const emiRatio = incomeMonthly > 0 ? (debtEMI / incomeMonthly) * 100 : 0;

  // Check 1: Low savings rate
  if (savingsRate < 10 && savingsRate >= 0) {
    mistakes.push({
      id: 'low-savings',
      title: 'Low savings rate',
      severity: savingsRate < 5 ? 'high' : 'medium',
      why: `You're saving about ${savingsRate.toFixed(0)}% of your income. Most experts suggest aiming for at least 20%.`,
      nextStep: 'Try tracking expenses for a month to find small savings opportunities.',
      icon: '💰',
    });
  } else if (savingsRate >= 20) {
    positives.push('Great savings rate!');
  }

  // Check 2: Too much idle cash
  const hasOnlySavingsAccount = 
    whereMoneyIsNow.includes('savings-account') &&
    !whereMoneyIsNow.includes('fd') &&
    !whereMoneyIsNow.includes('ppf-epf') &&
    !whereMoneyIsNow.includes('mutual-funds') &&
    !whereMoneyIsNow.includes('stocks') &&
    whereMoneyIsNow.length === 1;

  if (hasOnlySavingsAccount && (timeHorizon === '1-3y' || timeHorizon === '3-5y' || timeHorizon === '5y+')) {
    mistakes.push({
      id: 'idle-cash',
      title: 'Too much idle cash',
      severity: timeHorizon === '5y+' ? 'high' : 'medium',
      why: 'Money sitting in a savings account barely beats inflation. With a longer horizon, you could earn more.',
      nextStep: 'Consider moving some funds to FDs, PPF, or low-risk mutual funds.',
      icon: '🏦',
    });
  }

  // Check 3: Risk before buffer
  const hasRiskyAssets = whereMoneyIsNow.includes('stocks') || whereMoneyIsNow.includes('crypto');
  const hasSafetyNet = whereMoneyIsNow.includes('fd') || whereMoneyIsNow.includes('ppf-epf');
  
  if (hasRiskyAssets && !hasSafetyNet && !whereMoneyIsNow.includes('mutual-funds')) {
    mistakes.push({
      id: 'risk-before-buffer',
      title: 'Risk without a safety net',
      severity: 'medium',
      why: 'Investing in stocks or crypto without safer investments as a buffer can be risky if you need money suddenly.',
      nextStep: 'Build an emergency fund in liquid/FD before aggressive investing.',
      icon: '⚠️',
    });
  }

  // Check 4: High EMI ratio
  if (emiRatio > 40) {
    mistakes.push({
      id: 'high-emi',
      title: 'High fixed obligations',
      severity: emiRatio > 50 ? 'high' : 'medium',
      why: `About ${emiRatio.toFixed(0)}% of your income goes to EMIs. This leaves little room for savings or emergencies.`,
      nextStep: 'Focus on paying off high-interest debt first, or consider consolidation.',
      icon: '📋',
    });
  } else if (debtEMI > 0 && emiRatio <= 30) {
    positives.push('Debt is under control');
  }

  // Check 5: Not investing yet with long horizon
  if (whereMoneyIsNow.includes('not-investing') && (timeHorizon === '3-5y' || timeHorizon === '5y+')) {
    mistakes.push({
      id: 'not-investing',
      title: 'Missing growth opportunity',
      severity: 'medium',
      why: 'With a longer time horizon, even small investments can grow significantly thanks to compounding.',
      nextStep: 'Start with ₹500/month in an index fund SIP to build the habit.',
      icon: '📈',
    });
  }

  // Check 6: All in crypto
  if (whereMoneyIsNow.includes('crypto') && whereMoneyIsNow.length === 1) {
    mistakes.push({
      id: 'all-in-crypto',
      title: 'Concentrated in crypto',
      severity: 'high',
      why: 'Crypto is highly volatile. Having all investments here is very risky.',
      nextStep: 'Diversify into traditional investments for stability.',
      icon: '🎲',
    });
  }

  // Check 7: Short horizon with stocks
  if ((whereMoneyIsNow.includes('stocks') || whereMoneyIsNow.includes('mutual-funds')) && timeHorizon === '<1y') {
    mistakes.push({
      id: 'short-horizon-equity',
      title: 'Equity for short-term goals',
      severity: 'medium',
      why: 'Stock markets can drop significantly in a year. If you need this money soon, it might not be available.',
      nextStep: 'For money needed within a year, prefer liquid funds or FDs.',
      icon: '⏱️',
    });
  }

  // Add positives
  if (whereMoneyIsNow.includes('ppf-epf')) {
    positives.push('Building retirement corpus');
  }
  if (whereMoneyIsNow.includes('mutual-funds') && timeHorizon === '5y+') {
    positives.push('Investing for long-term growth');
  }

  return {
    mistakes: mistakes.slice(0, 6), // Max 6 mistakes
    isAllGood: mistakes.length === 0,
    positives,
  };
}

export const whereMoneyOptions: { value: WhereMoneyIs; label: string; icon: string }[] = [
  { value: 'savings-account', label: 'Savings Account', icon: '🏦' },
  { value: 'fd', label: 'Fixed Deposits', icon: '📜' },
  { value: 'ppf-epf', label: 'PPF / EPF', icon: '🏛️' },
  { value: 'mutual-funds', label: 'Mutual Funds', icon: '📊' },
  { value: 'stocks', label: 'Stocks', icon: '📈' },
  { value: 'gold', label: 'Gold', icon: '🥇' },
  { value: 'crypto', label: 'Crypto', icon: '₿' },
  { value: 'not-investing', label: 'Not investing yet', icon: '🤷' },
];

export const timeHorizonOptions: { value: MistakeTimeHorizon; label: string }[] = [
  { value: '<1y', label: 'Less than 1 year' },
  { value: '1-3y', label: '1-3 years' },
  { value: '3-5y', label: '3-5 years' },
  { value: '5y+', label: '5+ years' },
];

export const severityColors: Record<Severity, { bg: string; text: string; border: string }> = {
  low: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  medium: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  high: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
};

