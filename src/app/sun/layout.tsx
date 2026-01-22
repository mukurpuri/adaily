import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ask Sun - Your Calm Finance Companion | Adaily',
  description: 'Ask Sun anything about money. Get clear, calm answers about saving, investing, budgeting, and personal finance in India. No jargon, no judgment.',
  keywords: ['personal finance', 'money questions', 'financial advice', 'India', 'savings', 'investing', 'budgeting', 'AI assistant'],
  openGraph: {
    title: 'Ask Sun - Your Calm Finance Companion',
    description: 'Ask anything about money. Get clear, calm answers about saving, investing, and personal finance in India.',
    url: 'https://adaily.in/sun',
    siteName: 'Adaily',
    type: 'website',
    images: [
      {
        url: 'https://adaily.in/logo.svg',
        width: 512,
        height: 512,
        alt: 'Adaily - Ask Sun',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Ask Sun - Your Calm Finance Companion',
    description: 'Ask anything about money. Get clear, calm answers about personal finance in India.',
    images: ['https://adaily.in/logo.svg'],
  },
  alternates: {
    canonical: 'https://adaily.in/sun',
  },
};

export default function SunLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
