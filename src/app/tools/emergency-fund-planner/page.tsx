import { Metadata } from 'next';
import { Suspense } from 'react';
import EmergencyFundPlannerClient from './EmergencyFundPlannerClient';
import { ToolPageShell } from '@/components/seo';

export const metadata: Metadata = {
  title: 'Emergency Fund Planner - Calculate Your Safety Net | Adaily',
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
    title: 'Emergency Fund Planner - Calculate Your Safety Net',
    description: 'Calculate how much emergency fund you need based on your expenses and situation.',
    url: 'https://adaily.in/tools/emergency-fund-planner',
  },
  alternates: {
    canonical: 'https://adaily.in/tools/emergency-fund-planner',
  },
};

export default function EmergencyFundPlannerPage() {
  return (
    <ToolPageShell slug="emergency-fund-planner" accentColor="blue">
      <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white" />}>
        <EmergencyFundPlannerClient />
      </Suspense>
    </ToolPageShell>
  );
}

