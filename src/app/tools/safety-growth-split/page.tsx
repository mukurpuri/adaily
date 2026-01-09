import { Metadata } from 'next';
import SplitClient from './SplitClient';
import { ToolPageShell } from '@/components/seo';

export const metadata: Metadata = {
  title: 'Safety vs Growth Split Calculator - Adaily',
  description: 'Find the right balance between safe investments and growth investments based on your age, timeline, and risk comfort. Free tool for Indians.',
  keywords: [
    'asset allocation calculator',
    'safety vs growth',
    'investment split calculator',
    'risk allocation',
    'portfolio balance',
    'debt equity ratio',
  ],
  openGraph: {
    title: 'Safety vs Growth Split Calculator - Adaily',
    description: 'Find the right balance between safe and growth investments.',
    url: 'https://adaily.in/tools/safety-growth-split',
  },
  alternates: {
    canonical: 'https://adaily.in/tools/safety-growth-split',
  },
};

export default function SafetyGrowthSplitPage() {
  return (
    <ToolPageShell slug="safety-growth-split" accentColor="purple">
      <SplitClient />
    </ToolPageShell>
  );
}

