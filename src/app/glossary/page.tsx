import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { glossaryTerms } from '@/lib/glossary/terms';
import GlossarySearch from './GlossarySearch';

export const metadata: Metadata = {
  title: 'Financial Glossary - Simple Terms Explained | Adaily',
  description: 'Understand common financial terms in plain language. FD, PPF, SIP, mutual funds, and more explained with simple examples for Indian investors.',
  openGraph: {
    title: 'Financial Glossary - Simple Terms Explained',
    description: 'Common financial terms explained in plain language with Indian examples.',
    url: 'https://adaily.in/glossary',
  },
  alternates: {
    canonical: 'https://adaily.in/glossary',
  },
};

export default function GlossaryIndexPage() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-indigo-50/30 via-white to-white">
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5">
            <Image src="/logo.svg" alt="Adaily" width={32} height={32} className="w-7 h-7 sm:w-8 sm:h-8" />
            <span className="text-lg sm:text-xl font-bold text-gray-900">Adaily</span>
          </Link>
          <Link href="/tools" className="text-xs sm:text-sm text-gray-500 hover:text-indigo-500 transition-colors">
            ← All Tools
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium mb-4">
              <span>📚</span>
              {glossaryTerms.length} Terms
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Financial Glossary
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
              Simple explanations of common financial terms. No jargon, just clarity.
            </p>
          </div>

          {/* Search */}
          <GlossarySearch terms={glossaryTerms} />

          {/* All Terms List */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">All Terms</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {glossaryTerms.map((term) => (
                <Link
                  key={term.slug}
                  href={`/glossary/${term.slug}`}
                  className="group p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors text-sm sm:text-base mb-1">
                    {term.term}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                    {term.shortDefinition}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Related Tools CTA */}
          <div className="mt-12 bg-indigo-50 rounded-xl p-6 text-center">
            <h3 className="font-semibold text-gray-800 mb-2">Ready to put knowledge into action?</h3>
            <p className="text-sm text-gray-600 mb-4">Try our free financial tools to plan your investments.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/invest"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                🎯 Investment Explorer
              </Link>
              <Link
                href="/tools/emergency-fund-planner"
                className="px-4 py-2 bg-white hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-sm font-medium transition-colors"
              >
                🛡️ Emergency Fund Planner
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

