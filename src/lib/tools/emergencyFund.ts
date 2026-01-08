// Emergency Fund Planner - Logic & Types

export type JobStability = 'stable' | 'somewhat-unstable' | 'unstable';
export type HasDependents = 'yes' | 'no';

export interface EmergencyFundInputs {
  monthlyExpenses: number;
  jobStability: JobStability;
  dependents: HasDependents;
  existingEmergencyFund?: number;
}

export interface EmergencyFundResult {
  minMonths: number;
  maxMonths: number;
  minAmount: number;
  maxAmount: number;
  existingFund: number;
  gap: {
    min: number;
    max: number;
  };
  isFullyFunded: boolean;
  percentageFunded: number;
  reasons: string[];
}

export interface StorageOption {
  name: string;
  allocation: string;
  description: string;
  icon: string;
  returns: string;
  liquidity: string;
}

// Calculate emergency fund recommendation
export function calculateEmergencyFund(inputs: EmergencyFundInputs): EmergencyFundResult {
  const { monthlyExpenses, jobStability, dependents, existingEmergencyFund = 0 } = inputs;

  // Base months based on job stability
  let minMonths: number;
  let maxMonths: number;

  switch (jobStability) {
    case 'stable':
      minMonths = 3;
      maxMonths = 4;
      break;
    case 'somewhat-unstable':
      minMonths = 4;
      maxMonths = 6;
      break;
    case 'unstable':
      minMonths = 6;
      maxMonths = 9;
      break;
    default:
      minMonths = 3;
      maxMonths = 6;
  }

  // Add buffer for dependents
  if (dependents === 'yes') {
    minMonths += 1;
    maxMonths += 2;
  }

  // Calculate amounts
  const minAmount = monthlyExpenses * minMonths;
  const maxAmount = monthlyExpenses * maxMonths;

  // Calculate gap
  const gapMin = Math.max(0, minAmount - existingEmergencyFund);
  const gapMax = Math.max(0, maxAmount - existingEmergencyFund);

  // Check if fully funded
  const isFullyFunded = existingEmergencyFund >= minAmount;
  const percentageFunded = minAmount > 0 ? Math.min(100, Math.round((existingEmergencyFund / minAmount) * 100)) : 0;

  // Build reasons
  const reasons: string[] = [];

  // Job stability reason
  switch (jobStability) {
    case 'stable':
      reasons.push('Your job is stable, so 3-4 months is typically sufficient');
      break;
    case 'somewhat-unstable':
      reasons.push('With some job uncertainty, 4-6 months provides better security');
      break;
    case 'unstable':
      reasons.push('Given job instability, 6-9 months gives you breathing room');
      break;
  }

  // Dependents reason
  if (dependents === 'yes') {
    reasons.push('Having dependents adds +1-2 months to ensure family security');
  } else {
    reasons.push('No dependents means you have more flexibility in emergencies');
  }

  return {
    minMonths,
    maxMonths,
    minAmount,
    maxAmount,
    existingFund: existingEmergencyFund,
    gap: {
      min: gapMin,
      max: gapMax,
    },
    isFullyFunded,
    percentageFunded,
    reasons,
  };
}

// Where to keep emergency fund
export function getStorageOptions(): StorageOption[] {
  return [
    {
      name: 'Savings Account',
      allocation: '1-2 months',
      description: 'Keep this portion for immediate access. Choose a bank with good interest rates.',
      icon: '🏦',
      returns: '3-4% p.a.',
      liquidity: 'Instant',
    },
    {
      name: 'Sweep-in FD',
      allocation: '2-3 months',
      description: 'Auto-sweep deposits earn FD rates while staying accessible. Best of both worlds.',
      icon: '💳',
      returns: '6-7% p.a.',
      liquidity: 'Same day',
    },
    {
      name: 'Liquid Mutual Fund',
      allocation: 'Remaining',
      description: 'Low-risk funds that can be redeemed in 1-2 days. Slightly better returns than FD.',
      icon: '📊',
      returns: '6-8% p.a.',
      liquidity: '1-2 days',
    },
  ];
}

// Format currency for display
export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

// Format full currency (no abbreviation)
export function formatFullCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

