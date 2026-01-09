'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ToolHeader, ToolHero, FormCard, Disclaimer } from '@/components/shared';
import { useToolAnalytics } from '@/hooks/useAnalytics';
import {
  getMatchingSchemes,
  ageGroupOptions,
  goalOptions,
  type AgeGroup,
  type Goal,
  type GovScheme,
} from '@/lib/tools/govSchemes';

export default function GovSchemesClient() {
  const [mounted, setMounted] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('30-45');
  const [goal, setGoal] = useState<Goal>('tax-saving');
  const [lockInOk, setLockInOk] = useState(true);
  const [schemes, setSchemes] = useState<GovScheme[]>([]);
  const [matchReasons, setMatchReasons] = useState<string[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Analytics tracking
  const { trackCalculation, trackResultView } = useToolAnalytics('government-schemes');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const result = getMatchingSchemes({ ageGroup, goal, lockInOk });
    setSchemes(result.schemes);
    setMatchReasons(result.matchReasons);
    
    // Track only after user interaction
    if (hasInteracted) {
      trackCalculation({
        age_group: ageGroup,
        goal: goal,
        lock_in_ok: lockInOk,
      });
      trackResultView(`${result.schemes.length} schemes found`);
    }
  }, [ageGroup, goal, lockInOk, hasInteracted, trackCalculation, trackResultView]);
  
  // Handlers with tracking
  const handleAgeGroupChange = (value: AgeGroup) => {
    setAgeGroup(value);
    setHasInteracted(true);
  };
  
  const handleGoalChange = (value: Goal) => {
    setGoal(value);
    setHasInteracted(true);
  };
  
  const handleLockInChange = (value: boolean) => {
    setLockInOk(value);
    setHasInteracted(true);
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <ToolHeader />

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <ToolHero
              icon="🏛️"
              badge="Government-Backed Options"
              badgeColor="blue"
              title="Government Schemes Explorer"
              subtitle="Discover safe, government-backed investment options that fit your profile."
            />
          </div>

          {/* About This Tool - Collapsible */}
          <div className={`mb-4 sm:mb-8 transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-white rounded-xl sm:rounded-2xl border border-blue-100 overflow-hidden">
              <button
                onClick={() => setShowAbout(!showAbout)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-blue-50/50 transition-colors"
              >
                <h2 className="font-semibold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                  <span>📖</span> Understand government schemes with examples
                </h2>
                <svg 
                  className={`w-5 h-5 text-gray-400 transition-transform ${showAbout ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`px-4 pb-4 sm:px-6 sm:pb-6 ${showAbout ? 'block' : 'hidden'}`}>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  Government-backed schemes are investment options backed by the Indian government, making them among the safest available. 
                  They often come with tax benefits but may have lock-in periods.
                </p>
                
                <p className="text-xs text-gray-500 mb-2 font-medium">Popular options at a glance:</p>
                <div className="grid sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100">
                    <div className="font-semibold text-blue-700 text-xs sm:text-sm mb-1">🏦 PPF</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
                      15-year lock-in. Tax-free returns. Great for retirement savings.
                    </div>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-3 sm:p-4 border border-teal-100">
                    <div className="font-semibold text-teal-600 text-xs sm:text-sm mb-1">💼 NPS</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
                      For retirement. Mix of equity and debt. Additional tax benefit under 80CCD.
                    </div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 sm:p-4 border border-amber-100">
                    <div className="font-semibold text-amber-600 text-xs sm:text-sm mb-1">✉️ NSC</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
                      5-year lock-in. Fixed returns. Good for conservative savers.
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-lg p-3 sm:p-4 border border-emerald-100 mb-4">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🛡️</span>
                    <div>
                      <div className="font-semibold text-emerald-800 text-xs sm:text-sm mb-1">Why government-backed?</div>
                      <div className="text-[10px] sm:text-xs text-gray-600 leading-relaxed">
                        These are backed by the Government of India, so your principal is safe. 
                        However, returns may be lower than market-linked options. Best for the <span className="font-medium text-emerald-700">"safety" part</span> of your portfolio.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 my-4"></div>

                <div className="text-xs sm:text-sm text-gray-600 space-y-3">
                  <p className="font-medium text-gray-800 flex items-center gap-1.5">
                    <span>💡</span> Example: Kavya's choice
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <ul className="space-y-1 text-gray-600">
                      <li>• Age: <span className="font-medium">32 years</span></li>
                      <li>• Goal: <span className="font-medium">Tax saving</span></li>
                      <li>• Lock-in: <span className="font-medium">Okay with it</span></li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <div className="text-blue-700 font-medium mb-1">Options that fit:</div>
                    <ul className="text-[10px] sm:text-xs text-blue-600 space-y-0.5">
                      <li>• <span className="font-medium">PPF</span> - Long-term, tax-free returns</li>
                      <li>• <span className="font-medium">NPS</span> - Extra tax benefit + retirement</li>
                      <li>• <span className="font-medium">ELSS</span> - Shortest lock-in (3 years), market-linked</li>
                    </ul>
                  </div>
                </div>

                <p className="text-[10px] sm:text-xs text-gray-400 italic mt-4">
                  This is educational information. Please verify current rates and rules before investing.
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Left: Form */}
            <div className={`transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <FormCard step={1} title="Your Profile">
                <div className="space-y-4 sm:space-y-6">
                  {/* Age Group */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Age Group
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      {ageGroupOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAgeGroupChange(option.value)}
                          className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all text-xs sm:text-sm font-medium ${
                            ageGroup === option.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Goal */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Primary Goal
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      {goalOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleGoalChange(option.value)}
                          className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 ${
                            goal === option.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          }`}
                        >
                          <span className="text-sm sm:text-base">{option.icon}</span>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lock-in OK */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Are you okay with long lock-in periods?
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      <button
                        onClick={() => handleLockInChange(true)}
                        className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all font-medium text-sm sm:text-base ${
                          lockInOk
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        <span className="text-lg sm:text-xl block mb-0.5 sm:mb-1">✓</span>
                        Yes, I can wait
                      </button>
                      <button
                        onClick={() => handleLockInChange(false)}
                        className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all font-medium text-sm sm:text-base ${
                          !lockInOk
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        <span className="text-lg sm:text-xl block mb-0.5 sm:mb-1">⏱️</span>
                        Prefer flexible
                      </button>
                    </div>
                  </div>
                </div>
              </FormCard>

              {/* Why these matched */}
              {matchReasons.length > 0 && (
                <div className="mt-4 sm:mt-6 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-100 p-3 sm:p-4">
                  <h4 className="font-medium text-blue-900 mb-1.5 sm:mb-2 text-xs sm:text-sm">💡 Why these matched you</h4>
                  <ul className="space-y-0.5 sm:space-y-1">
                    {matchReasons.map((reason, i) => (
                      <li key={i} className="text-[10px] sm:text-xs text-blue-700 flex items-start gap-1.5 sm:gap-2">
                        <span className="text-blue-400">•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: Results */}
            <div className={`lg:col-span-2 transition-all duration-500 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {schemes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {schemes.map((scheme, index) => (
                    <div
                      key={scheme.id}
                      className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg shadow-gray-100 border border-gray-100 p-4 sm:p-5 hover:shadow-xl transition-shadow"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="text-2xl sm:text-3xl">{scheme.icon}</span>
                          <div>
                            <h3 className="font-bold text-gray-900 text-sm sm:text-base">{scheme.shortName}</h3>
                            <p className="text-[10px] sm:text-xs text-gray-500">{scheme.name}</p>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{scheme.description}</p>

                      {/* Best For Tags */}
                      <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                        {scheme.bestFor.map((tag, i) => (
                          <span
                            key={i}
                            className="px-1.5 sm:px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] sm:text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Details */}
                      <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs">
                        <div className="flex items-start gap-1.5 sm:gap-2">
                          <span className="text-gray-400 w-12 sm:w-16 flex-shrink-0">Lock-in:</span>
                          <span className="text-gray-700">{scheme.lockIn}</span>
                        </div>
                        <div className="flex items-start gap-1.5 sm:gap-2">
                          <span className="text-gray-400 w-12 sm:w-16 flex-shrink-0">Tax:</span>
                          <span className="text-gray-700">{scheme.taxAngle}</span>
                        </div>
                        <div className="flex items-start gap-1.5 sm:gap-2">
                          <span className="text-gray-400 w-12 sm:w-16 flex-shrink-0">Eligible:</span>
                          <span className="text-gray-700">{scheme.eligibility}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-200 p-8 sm:p-12 text-center">
                  <span className="text-4xl sm:text-5xl block mb-3 sm:mb-4">🤔</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2">No exact matches</h3>
                  <p className="text-gray-500 text-xs sm:text-sm">Try adjusting your preferences to see more options.</p>
                </div>
              )}
            </div>
          </div>

          <Disclaimer className="mt-8 sm:mt-12" />

          <div className="text-center mt-6 sm:mt-8">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors text-sm sm:text-base"
            >
              ← Explore More Tools
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

