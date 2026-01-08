import LandingPage from '@/components/LandingPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adaily - Simple Financial Tools for India',
  description: 'Free tools to understand where to invest your savings in India. No jargon, no selling, no signup. Educational only.',
  openGraph: {
    title: 'Adaily - Simple Financial Tools for India',
    description: 'Free tools to understand where to invest your savings. No jargon, no selling, no signup.',
    url: 'https://adaily.in',
  },
  alternates: {
    canonical: 'https://adaily.in',
  },
};

export default function Home() {
  return <LandingPage />;
}
