import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getTermBySlug, getRelatedTerms, getAllSlugs } from '@/lib/glossary/terms';

// Generate static params for all glossary terms
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = getTermBySlug(slug);

  if (!term) {
    return { title: 'Term Not Found | Adaily' };
  }

  return {
    title: `${term.term} - Meaning & Example | Adaily Glossary`,
    description: `${term.shortDefinition} Learn what ${term.term} means with simple examples for Indian investors.`,
    openGraph: {
      title: `${term.term} - Simple Explanation`,
      description: term.shortDefinition,
      url: `https://adaily.in/glossary/${slug}`,
    },
    alternates: {
      canonical: `https://adaily.in/glossary/${slug}`,
    },
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = getTermBySlug(slug);

  if (!term) {
    notFound();
  }

  const relatedTerms = getRelatedTerms(slug);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-indigo-50/30 via-white to-white">
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5">
            <Image src="/logo.svg" alt="Adaily" width={32} height={32} className="w-7 h-7 sm:w-8 sm:h-8" />
            <span className="text-lg sm:text-xl font-bold text-gray-900">Adaily</span>
          </Link>
          <Link href="/glossary" className="text-xs sm:text-sm text-gray-500 hover:text-indigo-500 transition-colors">
            ← All Terms
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <article className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-xs sm:text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-indigo-500">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/glossary" className="hover:text-indigo-500">Glossary</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{term.term}</span>
          </nav>

          {/* Term Header */}
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {term.term}
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              {term.shortDefinition}
            </p>
          </header>

          {/* Simple Explanation */}
          <section className="mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              What does it mean? (Simple)
            </h2>
            <div className="prose prose-sm sm:prose-base max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
              {term.simpleExplanation}
            </div>
          </section>

          {/* Example */}
          <section className="mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Example with ₹ numbers
            </h2>
            <div className="bg-indigo-50 rounded-xl p-4 sm:p-6 border border-indigo-100">
              <p className="text-sm sm:text-base text-indigo-800">
                {term.example}
              </p>
            </div>
          </section>

          {/* Common Mistakes */}
          {term.commonMistakes && term.commonMistakes.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                Common mistakes to avoid
              </h2>
              <ul className="space-y-2">
                {term.commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-600">
                    <span className="text-amber-500 mt-0.5">⚠️</span>
                    {mistake}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Related Terms */}
          {relatedTerms.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                Related terms
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedTerms.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/glossary/${related.slug}`}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 hover:text-indigo-700 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                  >
                    {related.term}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Tools */}
          {term.relatedTools.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                Try a related tool
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {term.relatedTools.map((toolRoute) => {
                  const toolInfo = getToolInfo(toolRoute);
                  return (
                    <Link
                      key={toolRoute}
                      href={toolRoute}
                      className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
                    >
                      <span className="text-2xl">{toolInfo.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{toolInfo.name}</div>
                        <div className="text-xs text-gray-500">{toolInfo.description}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <p className="text-xs sm:text-sm text-amber-800">
              <span className="font-semibold">⚠️ Educational only:</span> This explanation is for learning purposes. 
              Please consult a financial advisor for personalized advice.
            </p>
          </div>

          {/* Back to Glossary */}
          <div className="text-center mt-8">
            <Link
              href="/glossary"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium transition-colors"
            >
              ← Browse All Terms
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

// Helper to get tool info
function getToolInfo(route: string): { name: string; icon: string; description: string } {
  const tools: Record<string, { name: string; icon: string; description: string }> = {
    '/invest': {
      name: 'Investment Explorer',
      icon: '🎯',
      description: 'Find options that fit your goals',
    },
    '/tools/emergency-fund-planner': {
      name: 'Emergency Fund Planner',
      icon: '🛡️',
      description: 'Calculate your safety net',
    },
    '/tools/safety-growth-split': {
      name: 'Safety vs Growth Split',
      icon: '⚖️',
      description: 'Balance your allocation',
    },
    '/tools/money-mistakes-checker': {
      name: 'Money Mistakes Checker',
      icon: '🔍',
      description: 'Spot common mistakes',
    },
    '/tools/government-schemes': {
      name: 'Government Schemes',
      icon: '🏛️',
      description: 'Explore PPF, NPS, and more',
    },
  };

  return tools[route] || { name: 'Tool', icon: '🔧', description: 'Explore this tool' };
}

