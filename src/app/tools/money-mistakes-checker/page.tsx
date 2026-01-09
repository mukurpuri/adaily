import { Metadata } from 'next';
import MistakesClient from './MistakesClient';
import { ToolPageShell } from '@/components/seo';

export const metadata: Metadata = {
  title: 'Money Mistakes Checker - Adaily',
  description: 'Check common money mistakes gently. Get personalized insights on savings rate, investment habits, and debt management. Free self-assessment tool.',
  keywords: [
    'money mistakes',
    'financial health check',
    'savings rate calculator',
    'debt to income ratio',
    'investment habits',
    'personal finance check',
  ],
  openGraph: {
    title: 'Money Mistakes Checker - Adaily',
    description: 'A gentle check on common money habits. No judgement, just insights.',
    url: 'https://adaily.in/tools/money-mistakes-checker',
  },
  alternates: {
    canonical: 'https://adaily.in/tools/money-mistakes-checker',
  },
};

export default function MoneyMistakesCheckerPage() {
  return (
    <ToolPageShell slug="money-mistakes-checker" accentColor="amber">
      <MistakesClient />
    </ToolPageShell>
  );
}

