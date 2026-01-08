// Safety-Growth Split Calculator

export type TimeHorizon = '<1y' | '1-3y' | '3-5y' | '5-10y' | '10y+';
export type RiskComfort = 'low' | 'medium' | 'high';

export interface SplitInputs {
  age: number;
  timeHorizon: TimeHorizon;
  riskComfort: RiskComfort;
}

export interface SplitResult {
  safetyPercent: number;
  growthPercent: number;
  reasons: string[];
  safetyExamples: string[];
  growthExamples: string[];
}

// Calculate the split
export function calculateSplit(inputs: SplitInputs): SplitResult {
  const { age, timeHorizon, riskComfort } = inputs;

  let growthPercent = 50; // Start with balanced
  const reasons: string[] = [];

  // Time horizon adjustments (biggest factor)
  switch (timeHorizon) {
    case '<1y':
      growthPercent = 10;
      reasons.push('Very short time horizon (<1 year) means prioritizing capital protection');
      break;
    case '1-3y':
      growthPercent = 25;
      reasons.push('Short-medium horizon (1-3 years) allows some growth but safety first');
      break;
    case '3-5y':
      growthPercent = 45;
      reasons.push('Medium horizon (3-5 years) allows a balanced approach');
      break;
    case '5-10y':
      growthPercent = 60;
      reasons.push('Long horizon (5-10 years) lets you take more growth exposure');
      break;
    case '10y+':
      growthPercent = 75;
      reasons.push('Very long horizon (10+ years) allows maximum growth potential');
      break;
  }

  // Risk comfort adjustments
  switch (riskComfort) {
    case 'low':
      growthPercent = Math.max(10, growthPercent - 20);
      reasons.push('Conservative risk preference reduces growth allocation');
      break;
    case 'medium':
      // No adjustment
      reasons.push('Moderate risk comfort allows a balanced approach');
      break;
    case 'high':
      growthPercent = Math.min(90, growthPercent + 15);
      reasons.push('Higher risk tolerance allows more growth exposure');
      break;
  }

  // Age-based adjustments (gentle)
  if (age < 30 && timeHorizon !== '<1y' && timeHorizon !== '1-3y') {
    growthPercent = Math.min(90, growthPercent + 10);
    reasons.push('Younger age provides time to recover from market volatility');
  } else if (age > 50) {
    growthPercent = Math.max(20, growthPercent - 10);
    reasons.push('Approaching retirement suggests a more conservative approach');
  }

  // Round to nearest 10
  growthPercent = Math.round(growthPercent / 10) * 10;
  const safetyPercent = 100 - growthPercent;

  // Examples for each bucket
  const safetyExamples = [
    'Fixed Deposits (FD)',
    'PPF / EPF',
    'Liquid Mutual Funds',
    'Debt Mutual Funds',
    'Savings Account',
  ];

  const growthExamples = [
    'Index Funds (Nifty 50, Sensex)',
    'Equity Mutual Funds',
    'Direct Stocks',
    'ELSS Funds',
    'International Funds',
  ];

  return {
    safetyPercent,
    growthPercent,
    reasons,
    safetyExamples,
    growthExamples,
  };
}

export const timeHorizonLabels: Record<TimeHorizon, string> = {
  '<1y': 'Less than 1 year',
  '1-3y': '1-3 years',
  '3-5y': '3-5 years',
  '5-10y': '5-10 years',
  '10y+': '10+ years',
};

export const riskComfortLabels: Record<RiskComfort, string> = {
  low: 'Low - I prefer safety',
  medium: 'Medium - Balanced',
  high: 'High - I can handle volatility',
};

