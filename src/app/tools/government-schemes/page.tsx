import { Metadata } from 'next';
import GovSchemesClient from './GovSchemesClient';
import { ToolPageShell } from '@/components/seo';

export const metadata: Metadata = {
  title: 'Government Schemes Explorer - Adaily',
  description: 'Explore government-backed investment schemes in India like PPF, NPS, SCSS, SSY. Filter by age, goals, and lock-in preferences. Free educational tool.',
  keywords: [
    'government schemes India',
    'PPF investment',
    'NPS pension scheme',
    'SCSS senior citizen',
    'Sukanya Samriddhi Yojana',
    'tax saving schemes India',
    'government bonds India',
  ],
  openGraph: {
    title: 'Government Schemes Explorer - Adaily',
    description: 'Discover safe, government-backed investment options that fit your profile.',
    url: 'https://adaily.in/tools/government-schemes',
  },
  alternates: {
    canonical: 'https://adaily.in/tools/government-schemes',
  },
};

export default function GovernmentSchemesPage() {
  return (
    <ToolPageShell slug="government-schemes" accentColor="green">
      <GovSchemesClient />
    </ToolPageShell>
  );
}

