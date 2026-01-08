// Government Schemes Explorer

export type AgeGroup = '18-30' | '30-45' | '45-60' | '60+';
export type Goal = 'safety' | 'tax-saving' | 'retirement' | 'income';

export interface GovSchemeInputs {
  ageGroup: AgeGroup;
  goal: Goal;
  lockInOk: boolean;
}

export interface GovScheme {
  id: string;
  name: string;
  shortName: string;
  description: string;
  bestFor: string[];
  lockIn: string;
  taxAngle: string;
  eligibility: string;
  icon: string;
}

// All schemes data
const allSchemes: GovScheme[] = [
  {
    id: 'ppf',
    name: 'Public Provident Fund',
    shortName: 'PPF',
    description: 'Long-term savings scheme backed by the government with guaranteed returns.',
    bestFor: ['Tax Saving', 'Safety', 'Long-term'],
    lockIn: '15 years (partial withdrawal after 7 years)',
    taxAngle: 'EEE status: contributions, interest, and maturity are all tax-free',
    eligibility: 'Any Indian citizen',
    icon: '🏛️',
  },
  {
    id: 'epf',
    name: 'Employee Provident Fund',
    shortName: 'EPF',
    description: 'Mandatory retirement savings for salaried employees with employer matching.',
    bestFor: ['Retirement', 'Safety', 'Tax Saving'],
    lockIn: 'Until retirement (58 years)',
    taxAngle: 'EEE status up to ₹2.5L contribution per year',
    eligibility: 'Salaried employees with basic salary ≤ ₹15,000/month (mandatory)',
    icon: '👔',
  },
  {
    id: 'vpf',
    name: 'Voluntary Provident Fund',
    shortName: 'VPF',
    description: 'Contribute more than mandatory EPF limit at same interest rate.',
    bestFor: ['Retirement', 'Tax Saving', 'Safety'],
    lockIn: 'Same as EPF',
    taxAngle: 'Same as EPF, tax-free up to a limit',
    eligibility: 'Salaried employees already contributing to EPF',
    icon: '📈',
  },
  {
    id: 'nps',
    name: 'National Pension System',
    shortName: 'NPS',
    description: 'Market-linked retirement scheme with flexibility in asset allocation.',
    bestFor: ['Retirement', 'Tax Saving', 'Growth'],
    lockIn: 'Until 60 years (partial withdrawal allowed)',
    taxAngle: 'Additional ₹50,000 deduction under 80CCD(1B) beyond 80C limit',
    eligibility: 'Indian citizens aged 18-70',
    icon: '🧓',
  },
  {
    id: 'nsc',
    name: 'National Savings Certificate',
    shortName: 'NSC',
    description: 'Fixed-income investment with guaranteed returns from post office.',
    bestFor: ['Safety', 'Tax Saving', 'Fixed Income'],
    lockIn: '5 years',
    taxAngle: 'Investment qualifies for 80C deduction',
    eligibility: 'Any Indian citizen',
    icon: '📜',
  },
  {
    id: 'scss',
    name: 'Senior Citizens Savings Scheme',
    shortName: 'SCSS',
    description: 'High-interest savings scheme exclusively for senior citizens.',
    bestFor: ['Income', 'Safety', 'Retirement'],
    lockIn: '5 years (extendable by 3 years)',
    taxAngle: 'Investment qualifies for 80C; interest is taxable',
    eligibility: 'Indian citizens aged 60+ (or 55+ for retired defense personnel)',
    icon: '👴',
  },
  {
    id: 'ssy',
    name: 'Sukanya Samriddhi Yojana',
    shortName: 'SSY',
    description: 'Savings scheme for the girl child with high interest rates.',
    bestFor: ['Girl Child', 'Tax Saving', 'Long-term'],
    lockIn: 'Until girl turns 21 (partial withdrawal at 18 for education)',
    taxAngle: 'EEE status: fully tax-free',
    eligibility: 'Parents/guardians of girl child below 10 years',
    icon: '👧',
  },
  {
    id: 'sgb',
    name: 'Sovereign Gold Bonds',
    shortName: 'SGB',
    description: 'Government bonds denominated in grams of gold, with interest.',
    bestFor: ['Gold Investment', 'Safety', 'Income'],
    lockIn: '8 years (exit after 5 years)',
    taxAngle: 'No capital gains tax if held till maturity',
    eligibility: 'Indian residents',
    icon: '🥇',
  },
  {
    id: 'kvp',
    name: 'Kisan Vikas Patra',
    shortName: 'KVP',
    description: 'Post office savings certificate that doubles your money.',
    bestFor: ['Safety', 'Fixed Returns', 'Medium-term'],
    lockIn: 'About 10 years (to double)',
    taxAngle: 'No tax benefit on investment; interest is taxable',
    eligibility: 'Any Indian citizen',
    icon: '🌾',
  },
  {
    id: 'pomis',
    name: 'Post Office Monthly Income Scheme',
    shortName: 'POMIS',
    description: 'Get regular monthly income from a lump sum investment.',
    bestFor: ['Income', 'Safety', 'Retirement'],
    lockIn: '5 years',
    taxAngle: 'No tax benefit; interest is taxable',
    eligibility: 'Any Indian citizen',
    icon: '📬',
  },
];

// Filter schemes based on inputs
export function getMatchingSchemes(inputs: GovSchemeInputs): { schemes: GovScheme[]; matchReasons: string[] } {
  const { ageGroup, goal, lockInOk } = inputs;
  const matchReasons: string[] = [];
  
  let filtered = [...allSchemes];

  // Age-based filtering
  if (ageGroup === '60+') {
    // Prioritize SCSS and income-generating schemes
    filtered = filtered.filter(s => 
      s.id === 'scss' || s.id === 'pomis' || s.id === 'sgb' || s.id === 'ppf' || s.id === 'nsc'
    );
    matchReasons.push('As a senior citizen, you have access to SCSS with higher interest rates');
  } else if (ageGroup === '18-30') {
    // Exclude SCSS, prioritize long-term
    filtered = filtered.filter(s => s.id !== 'scss');
    matchReasons.push('At your age, long-term schemes can benefit from compounding');
  }

  // If they have a girl child (we'll show SSY for younger age groups)
  if (ageGroup === '18-30' || ageGroup === '30-45') {
    // Keep SSY as an option
  } else {
    filtered = filtered.filter(s => s.id !== 'ssy');
  }

  // Goal-based filtering
  switch (goal) {
    case 'safety':
      filtered = filtered.filter(s => s.bestFor.includes('Safety'));
      matchReasons.push('Showing schemes focused on capital protection');
      break;
    case 'tax-saving':
      filtered = filtered.filter(s => s.bestFor.includes('Tax Saving'));
      matchReasons.push('Showing schemes that offer tax benefits under Section 80C or 80CCD');
      break;
    case 'retirement':
      filtered = filtered.filter(s => s.bestFor.includes('Retirement') || s.id === 'nps' || s.id === 'epf');
      matchReasons.push('Showing schemes designed for building retirement corpus');
      break;
    case 'income':
      filtered = filtered.filter(s => s.bestFor.includes('Income') || s.id === 'pomis' || s.id === 'scss' || s.id === 'sgb');
      matchReasons.push('Showing schemes that provide regular income');
      break;
  }

  // Lock-in preference
  if (!lockInOk) {
    // Prefer shorter lock-in schemes
    filtered = filtered.filter(s => 
      s.id === 'nsc' || s.id === 'scss' || s.id === 'pomis' || s.id === 'sgb'
    );
    matchReasons.push('Filtered for schemes with shorter or flexible lock-in periods');
  }

  // Limit to 6 and ensure variety
  const finalSchemes = filtered.slice(0, 6);

  return {
    schemes: finalSchemes,
    matchReasons,
  };
}

export const ageGroupOptions: { value: AgeGroup; label: string }[] = [
  { value: '18-30', label: '18-30 years' },
  { value: '30-45', label: '30-45 years' },
  { value: '45-60', label: '45-60 years' },
  { value: '60+', label: '60+ years' },
];

export const goalOptions: { value: Goal; label: string; icon: string }[] = [
  { value: 'safety', label: 'Safety', icon: '🛡️' },
  { value: 'tax-saving', label: 'Tax Saving', icon: '📋' },
  { value: 'retirement', label: 'Retirement', icon: '🧓' },
  { value: 'income', label: 'Regular Income', icon: '💰' },
];

