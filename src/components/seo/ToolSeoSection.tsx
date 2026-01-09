import Link from 'next/link';
import Script from 'next/script';
import type { ToolSeoSectionProps, ToolSeoFaq } from './types';

// Helper to build FAQ JSON-LD schema
export function buildFaqJsonLd(faqs: ToolSeoFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

// Accent color mapping
const accentColors = {
  orange: {
    badge: 'bg-orange-100 text-orange-700',
    number: 'bg-orange-100',
    card: 'from-orange-50 to-amber-50 border-orange-100',
    link: 'text-orange-600 hover:bg-orange-100 border-orange-200',
    related: 'from-orange-50 to-amber-50 border-orange-100',
  },
  blue: {
    badge: 'bg-blue-100 text-blue-700',
    number: 'bg-blue-100',
    card: 'from-blue-50 to-indigo-50 border-blue-100',
    link: 'text-blue-600 hover:bg-blue-100 border-blue-200',
    related: 'from-blue-50 to-indigo-50 border-blue-100',
  },
  purple: {
    badge: 'bg-purple-100 text-purple-700',
    number: 'bg-purple-100',
    card: 'from-purple-50 to-indigo-50 border-purple-100',
    link: 'text-purple-600 hover:bg-purple-100 border-purple-200',
    related: 'from-purple-50 to-indigo-50 border-purple-100',
  },
  green: {
    badge: 'bg-emerald-100 text-emerald-700',
    number: 'bg-emerald-100',
    card: 'from-emerald-50 to-teal-50 border-emerald-100',
    link: 'text-emerald-600 hover:bg-emerald-100 border-emerald-200',
    related: 'from-emerald-50 to-teal-50 border-emerald-100',
  },
  amber: {
    badge: 'bg-amber-100 text-amber-700',
    number: 'bg-amber-100',
    card: 'from-amber-50 to-orange-50 border-amber-100',
    link: 'text-amber-600 hover:bg-amber-100 border-amber-200',
    related: 'from-amber-50 to-orange-50 border-amber-100',
  },
};

export default function ToolSeoSection({
  toolName,
  toolId,
  whatIs,
  whyPeopleStruggle,
  example,
  howThisToolHelps,
  howToReadResult,
  whatItDoesNotDo,
  faqs,
  nextSteps,
  disclaimer,
  relatedTools,
  showFaqSchema = true,
  accentColor = 'blue',
}: ToolSeoSectionProps) {
  const colors = accentColors[accentColor];

  return (
    <>
      {/* FAQ Schema JSON-LD */}
      {showFaqSchema && faqs.length > 0 && (
        <Script
          id={`faq-schema-${toolId}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(faqs)) }}
        />
      )}

      <div className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-gray-200">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className={`inline-block px-3 py-1 ${colors.badge} text-xs font-medium rounded-full mb-3`}>
            📖 Learn More
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Understanding {toolName}
          </h2>
        </div>

        <div className="space-y-12 sm:space-y-16 max-w-3xl mx-auto">
          {/* What It Is */}
          <section>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full ${colors.number} flex items-center justify-center text-sm`}>1</span>
              What is this?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed pl-10">
              {whatIs}
            </p>
          </section>

          {/* Why People Struggle */}
          <section>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full ${colors.number} flex items-center justify-center text-sm`}>2</span>
              Why this can be confusing
            </h3>
            <ul className="pl-10 space-y-2">
              {whyPeopleStruggle.map((item, i) => (
                <li key={i} className="text-sm sm:text-base text-gray-600 flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Example */}
          <section>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full ${colors.number} flex items-center justify-center text-sm`}>3</span>
              {example.title || 'A simple example'}
            </h3>
            <div className={`bg-gradient-to-br ${colors.card} rounded-2xl p-5 sm:p-8 border ml-10`}>
              <ol className="space-y-3 mb-5">
                {example.steps.map((step, i) => (
                  <li key={i} className="text-sm sm:text-base text-gray-600 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/70 flex items-center justify-center text-xs font-semibold text-gray-700 flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              {example.mathLine && (
                <div className="bg-white/70 rounded-xl p-4 mb-4 text-center">
                  <code className="text-sm sm:text-base font-semibold text-gray-800">{example.mathLine}</code>
                </div>
              )}
              <p className="text-xs sm:text-sm text-gray-600 bg-white/50 rounded-lg p-3">
                💡 {example.takeaway}
              </p>
            </div>
          </section>

          {/* How This Tool Helps */}
          <section>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full ${colors.number} flex items-center justify-center text-sm`}>4</span>
              How this tool helps
            </h3>
            <ul className="pl-10 space-y-2">
              {howThisToolHelps.map((item, i) => (
                <li key={i} className="text-sm sm:text-base text-gray-600 flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* How to Read Results */}
          <section>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full ${colors.number} flex items-center justify-center text-sm`}>5</span>
              How to read your results
            </h3>
            <ul className="pl-10 space-y-2">
              {howToReadResult.map((item, i) => (
                <li key={i} className="text-sm sm:text-base text-gray-600 flex items-start gap-2">
                  <span className="text-gray-400 mt-1">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* What It Does NOT Do */}
          <section>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full ${colors.number} flex items-center justify-center text-sm`}>6</span>
              What this tool does not do
            </h3>
            <ul className="pl-10 space-y-2">
              {whatItDoesNotDo.map((item, i) => (
                <li key={i} className="text-sm sm:text-base text-gray-600 flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQs */}
          {faqs.length > 0 && (
            <section>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className={`w-8 h-8 rounded-full ${colors.number} flex items-center justify-center text-sm`}>7</span>
                Frequently Asked Questions
              </h3>
              <div className="pl-10 space-y-3">
                {faqs.map((faq, i) => (
                  <details key={i} className="bg-white rounded-xl border border-gray-100 group">
                    <summary className="p-4 sm:p-5 cursor-pointer font-semibold text-gray-800 text-sm sm:text-base flex justify-between items-center hover:bg-gray-50 rounded-xl">
                      {faq.q}
                      <span className="text-gray-400 group-open:rotate-180 transition-transform ml-2">▼</span>
                    </summary>
                    <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-gray-600 -mt-2">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Next Steps */}
          <section>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full ${colors.number} flex items-center justify-center text-sm`}>8</span>
              What to do next
            </h3>
            <div className="pl-10">
              <ol className="space-y-3">
                {nextSteps.map((step, i) => (
                  <li key={i} className="text-sm sm:text-base text-gray-600 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600 flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-amber-800">
              <span className="font-semibold">⚠️ Disclaimer:</span> {disclaimer}
            </p>
          </section>

          {/* Related Tools */}
          {relatedTools && relatedTools.length > 0 && (
            <section className={`bg-gradient-to-br ${colors.related} rounded-2xl p-6 sm:p-8 border`}>
              <h3 className="font-bold text-gray-800 mb-4 text-center">Explore Related Tools</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {relatedTools.map((tool, i) => (
                  <Link
                    key={i}
                    href={tool.href}
                    className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all border border-gray-100 group"
                  >
                    <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">{tool.icon}</span>
                    <span className="text-sm font-medium text-gray-800">{tool.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

