/**
 * Investment Scoring Engine
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Rule-based scoring system that ranks investment options based on user inputs.
 * No ML - just sensible rules that match investments to user needs.
 */

import type { 
  InvestmentBucket, 
  RiskLevel,
  GoalType,
} from './investmentBuckets';
import { investmentBuckets } from './investmentBuckets';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface UserInputs {
  capital: number;
  timeHorizonMonths: number;
  riskPreference: 'LOW' | 'MEDIUM' | 'HIGH';
  needsLiquidity: boolean;
  goal: GoalType;
  experience: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
}

export interface ScoredBucket {
  bucket: InvestmentBucket;
  score: number;
  matchReasons: string[];
  warningReasons: string[];
  fitLevel: 'EXCELLENT' | 'GOOD' | 'MODERATE' | 'POOR';
  /** Personalized "Why this fits you" explanation */
  whyThisFitsYou: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Generate Personalized "Why This Fits You" Explanation
// ─────────────────────────────────────────────────────────────────────────────

function generateWhyThisFitsYou(
  bucket: InvestmentBucket, 
  inputs: UserInputs,
  matchReasons: string[],
  fitLevel: 'EXCELLENT' | 'GOOD' | 'MODERATE' | 'POOR'
): string {
  const timeInYears = Math.round(inputs.timeHorizonMonths / 12);
  const timeLabel = timeInYears < 1 ? 'less than a year' : timeInYears === 1 ? '1 year' : `${timeInYears} years`;
  
  // Build personalized explanation based on user profile
  const explanations: string[] = [];
  
  // Opening based on fit level
  if (fitLevel === 'EXCELLENT') {
    explanations.push(`This is a great match for your ₹${inputs.capital.toLocaleString('en-IN')} over ${timeLabel}.`);
  } else if (fitLevel === 'GOOD') {
    explanations.push(`This works well for your ${timeLabel} investment horizon.`);
  } else {
    explanations.push(`Consider this option for your portfolio.`);
  }
  
  // Risk alignment
  if (bucket.riskLevel === inputs.riskPreference) {
    if (inputs.riskPreference === 'LOW') {
      explanations.push(`Your capital stays safe with ${bucket.riskLevel.toLowerCase()} risk.`);
    } else if (inputs.riskPreference === 'HIGH') {
      explanations.push(`Matches your appetite for higher growth potential.`);
    } else {
      explanations.push(`Balanced risk-reward suits your preference.`);
    }
  }
  
  // Goal-specific insights
  if (inputs.goal === 'TAX_SAVING' && bucket.taxBenefit) {
    explanations.push(`Saves you tax under Section 80C.`);
  } else if (inputs.goal === 'GROWTH' && bucket.riskLevel !== 'LOW') {
    explanations.push(`Built for wealth accumulation over time.`);
  } else if (inputs.goal === 'SAFETY') {
    explanations.push(`Focuses on protecting your principal.`);
  } else if (inputs.goal === 'INCOME') {
    explanations.push(`Provides regular income stream.`);
  }
  
  // Experience level
  if (bucket.experienceRequired === 'BEGINNER' && inputs.experience === 'BEGINNER') {
    explanations.push(`Perfect for beginners - no complex decisions needed.`);
  }
  
  // Liquidity
  if (inputs.needsLiquidity && bucket.liquidity === 'HIGH') {
    explanations.push(`You can access your money anytime if needed.`);
  }
  
  // Time horizon specific
  if (inputs.timeHorizonMonths >= 60 && bucket.timeHorizon === 'LONG') {
    explanations.push(`Your ${timeLabel} horizon allows compounding to work its magic.`);
  }
  
  return explanations.slice(0, 3).join(' ');
}

// ─────────────────────────────────────────────────────────────────────────────
// Scoring Rules
// ─────────────────────────────────────────────────────────────────────────────

function scoreBucket(bucket: InvestmentBucket, inputs: UserInputs): ScoredBucket {
  let score = 50; // Base score
  const matchReasons: string[] = [];
  const warningReasons: string[] = [];

  // ═══════════════════════════════════════════════════════════════════════════
  // CAPITAL RULES
  // ═══════════════════════════════════════════════════════════════════════════
  
  if (inputs.capital < bucket.minInvestment) {
    score -= 100; // Disqualify
    warningReasons.push(`Minimum investment is ₹${bucket.minInvestment.toLocaleString('en-IN')}`);
  } else if (inputs.capital >= bucket.minInvestment * 10) {
    score += 5;
    matchReasons.push('Well within investment range');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // TIME HORIZON RULES
  // ═══════════════════════════════════════════════════════════════════════════
  
  const timeMonths = inputs.timeHorizonMonths;
  
  // Short term (< 6 months)
  if (timeMonths < 6) {
    if (bucket.riskLevel === 'HIGH') {
      score -= 40;
      warningReasons.push('Too risky for short-term');
    }
    if (bucket.timeHorizon === 'LONG') {
      score -= 30;
      warningReasons.push('This needs longer time commitment');
    }
    if (bucket.id === 'liquid_fund' || bucket.id === 'savings_account') {
      score += 25;
      matchReasons.push('Perfect for short-term parking');
    }
  }
  
  // Medium term (6 months - 3 years)
  if (timeMonths >= 6 && timeMonths < 36) {
    if (bucket.timeHorizon === 'SHORT' || bucket.timeHorizon === 'MEDIUM') {
      score += 15;
      matchReasons.push('Good time horizon match');
    }
    if (bucket.lockInPeriod && bucket.lockInPeriod.includes('15 years')) {
      score -= 20;
      warningReasons.push('Lock-in too long for your horizon');
    }
    if (bucket.id === 'fd' || bucket.id === 'debt_fund') {
      score += 15;
      matchReasons.push('Ideal for medium-term');
    }
  }
  
  // Long term (3+ years)
  if (timeMonths >= 36) {
    if (bucket.timeHorizon === 'LONG') {
      score += 20;
      matchReasons.push('Long-term horizon matches well');
    }
    if (bucket.riskLevel === 'HIGH' && timeMonths >= 60) {
      score += 10;
      matchReasons.push('Time horizon allows for volatility');
    }
    if (bucket.id === 'index_fund' || bucket.id === 'equity_mf' || bucket.id === 'ppf') {
      score += 15;
      matchReasons.push('Great for wealth building');
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RISK PREFERENCE RULES
  // ═══════════════════════════════════════════════════════════════════════════
  
  const riskMatch: Record<string, Record<RiskLevel, number>> = {
    'LOW': { 'LOW': 30, 'MEDIUM': -10, 'HIGH': -40 },
    'MEDIUM': { 'LOW': 10, 'MEDIUM': 25, 'HIGH': 0 },
    'HIGH': { 'LOW': 0, 'MEDIUM': 15, 'HIGH': 30 },
  };
  
  const riskScore = riskMatch[inputs.riskPreference][bucket.riskLevel];
  score += riskScore;
  
  if (riskScore > 20) {
    matchReasons.push('Risk level matches your preference');
  } else if (riskScore < -20) {
    warningReasons.push('Risk level doesn\'t match your preference');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LIQUIDITY RULES
  // ═══════════════════════════════════════════════════════════════════════════
  
  if (inputs.needsLiquidity) {
    if (bucket.liquidity === 'HIGH') {
      score += 20;
      matchReasons.push('Highly liquid - access anytime');
    } else if (bucket.liquidity === 'LOW') {
      score -= 25;
      warningReasons.push('Money will be locked');
    }
    
    if (bucket.lockInPeriod) {
      score -= 15;
      warningReasons.push(`Lock-in: ${bucket.lockInPeriod}`);
    }
  } else {
    // User okay with locking money - bonus for lock-in products
    if (bucket.lockInPeriod) {
      score += 5;
      matchReasons.push('Lock-in is okay for you');
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GOAL MATCHING RULES
  // ═══════════════════════════════════════════════════════════════════════════
  
  if (bucket.goals.includes(inputs.goal)) {
    score += 25;
    matchReasons.push(`Matches your ${inputs.goal.toLowerCase()} goal`);
  } else {
    score -= 10;
  }
  
  // Special goal bonuses
  if (inputs.goal === 'TAX_SAVING') {
    if (bucket.taxBenefit) {
      score += 20;
      matchReasons.push(`Tax benefit: ${bucket.taxBenefit}`);
    } else {
      score -= 15;
      warningReasons.push('No tax benefit');
    }
  }
  
  if (inputs.goal === 'INCOME') {
    if (bucket.id === 'fd' || bucket.id === 'reit' || bucket.id === 'debt_fund') {
      score += 15;
      matchReasons.push('Provides regular income');
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // EXPERIENCE RULES
  // ═══════════════════════════════════════════════════════════════════════════
  
  const expLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
  const userLevel = expLevels.indexOf(inputs.experience);
  const reqLevel = expLevels.indexOf(bucket.experienceRequired);
  
  if (reqLevel > userLevel) {
    score -= 20;
    warningReasons.push('May require more experience');
  } else if (reqLevel < userLevel) {
    score += 5;
    matchReasons.push('Within your experience level');
  } else {
    score += 10;
    matchReasons.push('Perfect for your experience level');
  }
  
  // Beginners should start with passive options
  if (inputs.experience === 'BEGINNER') {
    if (bucket.effortPerWeek === '0 mins') {
      score += 10;
      matchReasons.push('Passive investment - no active effort');
    }
    if (bucket.id === 'direct_stocks') {
      score -= 15;
      warningReasons.push('Direct stocks require learning');
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SPECIAL SITUATION RULES
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Low capital special rules
  if (inputs.capital < 50000) {
    if (bucket.id === 'index_fund' || bucket.id === 'liquid_fund') {
      score += 10;
      matchReasons.push('Great for starting with small amounts');
    }
    if (bucket.id === 'direct_stocks' || bucket.id === 'reit') {
      score -= 10;
      warningReasons.push('Consider building base first');
    }
  }
  
  // High capital special rules  
  if (inputs.capital > 1000000) {
    if (bucket.id === 'nps') {
      score += 10;
      matchReasons.push('Extra ₹50K tax benefit adds up');
    }
    if (bucket.id === 'reit' || bucket.id === 'sgb') {
      score += 10;
      matchReasons.push('Good for diversification at your level');
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CALCULATE FIT LEVEL
  // ═══════════════════════════════════════════════════════════════════════════
  
  let fitLevel: 'EXCELLENT' | 'GOOD' | 'MODERATE' | 'POOR';
  if (score >= 80) fitLevel = 'EXCELLENT';
  else if (score >= 60) fitLevel = 'GOOD';
  else if (score >= 40) fitLevel = 'MODERATE';
  else fitLevel = 'POOR';

  // Generate personalized "Why this fits you" explanation
  const whyThisFitsYou = generateWhyThisFitsYou(bucket, inputs, matchReasons, fitLevel);

  return {
    bucket,
    score: Math.max(0, Math.min(100, score)),
    matchReasons,
    warningReasons,
    fitLevel,
    whyThisFitsYou,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Export
// ─────────────────────────────────────────────────────────────────────────────

export function getRecommendations(inputs: UserInputs): ScoredBucket[] {
  const scored = investmentBuckets.map(bucket => scoreBucket(bucket, inputs));
  
  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);
  
  // Filter out very poor matches
  return scored.filter(s => s.score > 20);
}

export function getTopRecommendations(inputs: UserInputs, count: number = 5): ScoredBucket[] {
  return getRecommendations(inputs).slice(0, count);
}

