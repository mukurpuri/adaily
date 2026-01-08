import { Metadata } from 'next';
import EmergencyFundPlannerClient from './EmergencyFundPlannerClient';

export const metadata: Metadata = {
  title: 'Emergency Fund Planner - Adaily',
  description: 'Calculate how much emergency fund you need based on your expenses, job stability, and dependents. Free tool for Indians to plan their financial safety net.',
  keywords: [
    'emergency fund calculator India',
    'how much emergency fund',
    'emergency savings calculator',
    'financial safety net',
    'rainy day fund',
    'emergency corpus',
    'liquid fund emergency',
  ],
  openGraph: {
    title: 'Emergency Fund Planner - Adaily',
    description: 'Calculate how much emergency fund you need based on your expenses and situation.',
    url: 'https://adaily.in/tools/emergency-fund-planner',
  },
};

export default function EmergencyFundPlannerPage() {
  return <EmergencyFundPlannerClient />;
}

