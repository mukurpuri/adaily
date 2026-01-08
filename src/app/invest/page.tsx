import { Suspense } from 'react';
import InvestPage from '@/components/InvestPage';

export default function InvestRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-white" />}>
      <InvestPage />
    </Suspense>
  );
}

