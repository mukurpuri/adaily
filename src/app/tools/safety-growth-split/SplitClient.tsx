'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ToolHeader, ToolHero, FormCard, Disclaimer } from '@/components/shared';
import { useToolAnalytics } from '@/hooks/useAnalytics';
import {
  calculateSplit,
  timeHorizonLabels,
  riskComfortLabels,
  type TimeHorizon,
  type RiskComfort,
  type SplitResult,
} from '@/lib/tools/safetyGrowthSplit';

export default function SplitClient() {
  const [mounted, setMounted] = useState(false);
  const [age, setAge] = useState<string>('30');
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('3-5y');
  const [riskComfort, setRiskComfort] = useState<RiskComfort>('medium');
  const [result, setResult] = useState<SplitResult | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Analytics tracking
  const { trackCalculation, trackResultView } = useToolAnalytics('safety-growth-split');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const ageNum = parseInt(age) || 30;
    if (ageNum >= 18 && ageNum <= 80) {
      const calculated = calculateSplit({
        age: ageNum,
        timeHorizon,
        riskComfort,
      });
      setResult(calculated);
      
      // Track only after user has interacted (not on initial load)
      if (hasInteracted && calculated) {
        trackCalculation({
          age_range: ageNum < 30 ? 'under_30' : ageNum < 45 ? '30_45' : '45_plus',
          time_horizon: timeHorizon,
          risk_comfort: riskComfort,
        });
        trackResultView(`${calculated.safetyPercent}/${calculated.growthPercent} split`);
      }
    }
  }, [age, timeHorizon, riskComfort, hasInteracted, trackCalculation, trackResultView]);
  
  // Mark as interacted when user changes any input
  const handleAgeChange = (value: string) => {
    setAge(value);
    setHasInteracted(true);
  };
  
  const handleTimeHorizonChange = (value: TimeHorizon) => {
    setTimeHorizon(value);
    setHasInteracted(true);
  };
  
  const handleRiskComfortChange = (value: RiskComfort) => {
    setRiskComfort(value);
    setHasInteracted(true);
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      <ToolHeader />

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <ToolHero
              icon="⚖️"
              badge="Asset Allocation"
              badgeColor="purple"
              title="Safety vs Growth Split"
              subtitle="Find a conceptual balance between protecting your money and growing it."
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Left: Form */}
            <div className={`transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <FormCard step={1} title="Your Profile">
                <div className="space-y-4 sm:space-y-6">
                  {/* Age */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Your Age
                    </label>
                    <input
                      type="number"
                      min="18"
                      max="80"
                      value={age}
                      onChange={(e) => handleAgeChange(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-base sm:text-lg"
                    />
                  </div>

                  {/* Time Horizon */}
                  <div>
                    <label className="block text-gray-600 font-medium text-xs sm:text-sm mb-1.5 sm:mb-2">
                      ⏱️ When do you need this money?
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      {[
                        { value: '<1y', label: '<1 year', desc: 'Very soon', icon: '🏃' },
                        { value: '1-3y', label: '1-3 years', desc: 'Short-term', icon: '📅' },
                        { value: '3-5y', label: '3-5 years', desc: 'Medium', icon: '🎯' },
                        { value: '5-10y', label: '5-10 years', desc: 'Long-term', icon: '🌱' },
                        { value: '10y+', label: '10+ years', desc: 'Retirement', icon: '🏖️' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleTimeHorizonChange(option.value as TimeHorizon)}
                          className={`p-2 sm:p-3 rounded-xl border-2 transition-all text-center ${
                            timeHorizon === option.value
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-base sm:text-lg mb-0.5">{option.icon}</div>
                          <div className={`text-[10px] sm:text-xs font-semibold ${timeHorizon === option.value ? 'text-purple-700' : 'text-gray-700'}`}>
                            {option.label}
                          </div>
                          <div className="text-[9px] sm:text-[10px] text-gray-400">{option.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Risk Comfort */}
                  <div>
                    <label className="block text-gray-600 font-medium text-xs sm:text-sm mb-1.5 sm:mb-2">
                      🎢 How do you feel about risk?
                    </label>
                    <div className="space-y-1.5 sm:space-y-2">
                      {[
                        { value: 'low', label: 'Low risk', desc: 'I prefer safety. Small losses bother me.', icon: '🛡️', color: 'blue' },
                        { value: 'medium', label: 'Medium risk', desc: 'I can handle some ups and downs for better returns.', icon: '⚖️', color: 'purple' },
                        { value: 'high', label: 'High risk', desc: 'I\'m okay with big swings for potentially higher gains.', icon: '🚀', color: 'orange' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleRiskComfortChange(option.value as RiskComfort)}
                          className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all text-left ${
                            riskComfort === option.value
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-xl sm:text-2xl">{option.icon}</span>
                            <div>
                              <div className={`font-semibold text-sm sm:text-base ${riskComfort === option.value ? 'text-purple-700' : 'text-gray-700'}`}>
                                {option.label}
                              </div>
                              <div className="text-[10px] sm:text-xs text-gray-500">{option.desc}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </FormCard>
            </div>

            {/* Right: Results */}
            <div className={`transition-all duration-500 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {result && (
                <div className="space-y-4 sm:space-y-6">
                  {/* Split Visual - Stack on mobile */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    {/* Safety Card */}
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-white shadow-lg sm:shadow-xl shadow-blue-200">
                      <div className="flex items-center justify-between mb-2 sm:mb-4">
                        <span className="text-blue-100 text-[10px] sm:text-sm font-medium">Safety</span>
                        <span className="text-xl sm:text-3xl">🛡️</span>
                      </div>
                      <div className="text-3xl sm:text-5xl font-bold mb-1 sm:mb-2">{result.safetyPercent}%</div>
                      <div className="text-blue-100 text-[10px] sm:text-sm mb-2 sm:mb-4">Capital Protection</div>
                      <div className="pt-2 sm:pt-4 border-t border-white/20 hidden sm:block">
                        <p className="text-xs text-blue-100 mb-2">Examples:</p>
                        <div className="flex flex-wrap gap-1">
                          {result.safetyExamples.slice(0, 3).map((ex, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-white/20 rounded-full">
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Growth Card */}
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-white shadow-lg sm:shadow-xl shadow-emerald-200">
                      <div className="flex items-center justify-between mb-2 sm:mb-4">
                        <span className="text-emerald-100 text-[10px] sm:text-sm font-medium">Growth</span>
                        <span className="text-xl sm:text-3xl">📈</span>
                      </div>
                      <div className="text-3xl sm:text-5xl font-bold mb-1 sm:mb-2">{result.growthPercent}%</div>
                      <div className="text-emerald-100 text-[10px] sm:text-sm mb-2 sm:mb-4">Wealth Building</div>
                      <div className="pt-2 sm:pt-4 border-t border-white/20 hidden sm:block">
                        <p className="text-xs text-emerald-100 mb-2">Examples:</p>
                        <div className="flex flex-wrap gap-1">
                          {result.growthExamples.slice(0, 3).map((ex, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-white/20 rounded-full">
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Bar */}
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg shadow-gray-100 border border-gray-100 p-4 sm:p-6">
                    <div className="h-4 sm:h-6 rounded-full overflow-hidden flex">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                        style={{ width: `${result.safetyPercent}%` }}
                      />
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                        style={{ width: `${result.growthPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm mt-1.5 sm:mt-2 text-gray-500">
                      <span>🛡️ Safety {result.safetyPercent}%</span>
                      <span>📈 Growth {result.growthPercent}%</span>
                    </div>
                  </div>

                  {/* Why this split */}
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg shadow-gray-100 border border-gray-100 p-4 sm:p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                      <span className="text-lg sm:text-xl">💡</span>
                      Why this split?
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {result.reasons.map((reason, i) => (
                        <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                          <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 text-[10px] sm:text-xs font-bold mt-0.5">
                            {i + 1}
                          </span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What belongs where */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-100">
                      <h4 className="font-medium text-blue-900 mb-1.5 sm:mb-2 text-xs sm:text-sm">🛡️ Safety Bucket</h4>
                      <ul className="text-[10px] sm:text-xs text-blue-700 space-y-0.5 sm:space-y-1">
                        {result.safetyExamples.map((ex, i) => (
                          <li key={i}>• {ex}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-emerald-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-emerald-100">
                      <h4 className="font-medium text-emerald-900 mb-1.5 sm:mb-2 text-xs sm:text-sm">📈 Growth Bucket</h4>
                      <ul className="text-[10px] sm:text-xs text-emerald-700 space-y-0.5 sm:space-y-1">
                        {result.growthExamples.map((ex, i) => (
                          <li key={i}>• {ex}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
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

