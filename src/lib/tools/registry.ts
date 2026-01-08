// Single source of truth for all Adaily tools and guides

export type ToolCategory = 'start' | 'tool' | 'learn';
export type ToolBadge = 'Popular' | 'New' | 'Guide';

export interface ToolItem {
  id: string;
  title: string;
  description: string;
  href: string;
  category: ToolCategory;
  icon: string;
  badge?: ToolBadge;
  gradient: string;
  shadow: string;
}

export const toolRegistry: ToolItem[] = [
  // Start Here - Primary tools for beginners
  {
    id: 'investment-explorer',
    title: 'Investment Explorer',
    description: 'Find what fits your goals',
    href: '/invest',
    category: 'start',
    icon: '🎯',
    badge: 'Popular',
    gradient: 'from-orange-500 to-amber-500',
    shadow: 'shadow-orange-200',
  },
  {
    id: 'emergency-fund',
    title: 'Emergency Fund Planner',
    description: 'Calculate your safety net',
    href: '/tools/emergency-fund-planner',
    category: 'start',
    icon: '🛡️',
    gradient: 'from-blue-500 to-indigo-500',
    shadow: 'shadow-blue-200',
  },

  // Tools - All other tools
  {
    id: 'safety-growth',
    title: 'Safety vs Growth',
    description: 'Balance your allocation',
    href: '/tools/safety-growth-split',
    category: 'tool',
    icon: '⚖️',
    gradient: 'from-purple-500 to-pink-500',
    shadow: 'shadow-purple-200',
  },
  {
    id: 'money-mistakes',
    title: 'Money Check',
    description: 'Spot common money mistakes early',
    href: '/tools/money-mistakes-checker',
    category: 'tool',
    icon: '🔍',
    gradient: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-200',
  },
  {
    id: 'gov-schemes',
    title: 'Govt Schemes',
    description: 'PPF, NPS, SCSS and more',
    href: '/tools/government-schemes',
    category: 'tool',
    icon: '🏛️',
    gradient: 'from-teal-500 to-emerald-500',
    shadow: 'shadow-teal-200',
  },

  // Learn - Guides and educational content
  {
    id: 'glossary',
    title: 'Glossary',
    description: '30 terms explained simply',
    href: '/learn/glossary',
    category: 'learn',
    icon: '📚',
    badge: 'Guide',
    gradient: 'from-indigo-500 to-purple-500',
    shadow: 'shadow-indigo-200',
  },
  {
    id: 'first-salary-guide',
    title: 'First Salary Guide',
    description: 'A calm plan for new earners',
    href: '/guides/first-salary',
    category: 'learn',
    icon: '💼',
    badge: 'Guide',
    gradient: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-200',
  },
  {
    id: 'invest-savings',
    title: 'How to Invest Savings',
    description: 'Simple guide for India',
    href: '/invest/invest-savings-india',
    category: 'learn',
    icon: '💰',
    badge: 'Guide',
    gradient: 'from-amber-500 to-yellow-500',
    shadow: 'shadow-amber-200',
  },
  {
    id: 'first-salary-plan',
    title: 'First Salary Plan',
    description: 'Step-by-step path',
    href: '/learn/first-salary-plan',
    category: 'learn',
    icon: '📋',
    gradient: 'from-green-500 to-emerald-500',
    shadow: 'shadow-green-200',
  },
  {
    id: 'beginner-investing',
    title: 'Beginner Investing Path',
    description: 'Start your journey',
    href: '/learn/beginner-investing-path',
    category: 'learn',
    icon: '🌱',
    gradient: 'from-lime-500 to-green-500',
    shadow: 'shadow-lime-200',
  },
];

// Helper functions
export function getStartTools(): ToolItem[] {
  return toolRegistry.filter((item) => item.category === 'start');
}

export function getTools(): ToolItem[] {
  return toolRegistry.filter((item) => item.category === 'tool');
}

export function getLearnItems(): ToolItem[] {
  return toolRegistry.filter((item) => item.category === 'learn');
}

export function getAllTools(): ToolItem[] {
  return toolRegistry.filter((item) => item.category !== 'learn');
}

export function getToolById(id: string): ToolItem | undefined {
  return toolRegistry.find((item) => item.id === id);
}

