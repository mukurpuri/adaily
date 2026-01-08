import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adaily - Understand Your Investment Options',
  description: 'A free tool to explore and understand the best investment options for your money in India. Compare FDs, PPF, mutual funds, stocks, and more based on your goals.',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  keywords: [
    'investment options India',
    'where to invest money',
    'best investment for beginners',
    'PPF vs FD',
    'mutual funds India',
    'tax saving investments',
    'ELSS funds',
    'investment calculator',
    'wealth planning',
    'financial planning India',
  ],
  authors: [{ name: 'Adaily' }],
  creator: 'Adaily',
  publisher: 'Adaily',
  metadataBase: new URL('https://adaily.in'),
  openGraph: {
    title: 'Adaily - Understand Your Investment Options',
    description: 'A free tool to explore and understand the best investment options for your money in India.',
    url: 'https://adaily.in',
    siteName: 'Adaily',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Adaily - Your Finance Dashboard',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adaily - Understand Your Investment Options',
    description: 'A free tool to explore and understand the best investment options for your money in India.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

