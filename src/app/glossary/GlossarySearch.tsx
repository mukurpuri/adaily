'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { GlossaryTerm } from '@/lib/glossary/terms';

interface GlossarySearchProps {
  terms: GlossaryTerm[];
}

export default function GlossarySearch({ terms }: GlossarySearchProps) {
  const [query, setQuery] = useState('');

  const filteredTerms = query.trim()
    ? terms.filter(
        (term) =>
          term.term.toLowerCase().includes(query.toLowerCase()) ||
          term.shortDefinition.toLowerCase().includes(query.toLowerCase()) ||
          term.slug.includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms (e.g., PPF, SIP, mutual fund...)"
          className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 text-sm sm:text-base"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search Results */}
      {query.trim() && (
        <div className="mt-4">
          {filteredTerms.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs text-gray-500 mb-2">
                Found {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
              </p>
              {filteredTerms.map((term) => (
                <Link
                  key={term.slug}
                  href={`/glossary/${term.slug}`}
                  className="block p-3 sm:p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl border border-indigo-100 transition-colors"
                >
                  <div className="font-semibold text-indigo-700 text-sm sm:text-base mb-0.5">
                    {term.term}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {term.shortDefinition}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              No terms found for "{query}". Try a different search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

