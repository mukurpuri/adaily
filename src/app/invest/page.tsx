import { Suspense } from 'react';
import { Metadata } from 'next';
import InvestPage from '@/components/InvestPage';

export const metadata: Metadata = {
  title: 'Investment Explorer - Find Options That Fit Your Goals | Adaily',
  description: 'Explore investment options in India based on your savings, timeline, and risk comfort. Compare FDs, PPF, mutual funds, stocks, and more. Free educational tool.',
  keywords: [
    'investment options India',
    'where to invest money India',
    'investment for beginners',
    'PPF vs FD',
    'mutual funds India',
    'SIP investment',
    'investment calculator India',
  ],
  openGraph: {
    title: 'Investment Explorer - Find Options That Fit Your Goals',
    description: 'Explore investment options in India based on your savings, timeline, and risk comfort.',
    url: 'https://adaily.in/invest',
  },
  alternates: {
    canonical: 'https://adaily.in/invest',
  },
};

export default function InvestRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-white" />}>
      <InvestPage />
    </Suspense>
  );
}

