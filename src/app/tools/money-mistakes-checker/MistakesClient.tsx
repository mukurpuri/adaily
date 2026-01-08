'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ToolHeader, ToolHero, FormCard, Disclaimer } from '@/components/shared';
import {
  checkMistakes,
  whereMoneyOptions,
  timeHorizonOptions,
  severityColors,
  type WhereMoneyIs,
  type MistakeTimeHorizon,
  type MistakesResult,
} from '@/lib/tools/moneyMistakes';

export default function MistakesClient() {
  const [mounted, setMounted] = useState(false);
  const [income, setIncome] = useState<string>('');
  const [savings, setSavings] = useState<string>('');
  const [whereMoneyIs, setWhereMoneyIs] = useState<WhereMoneyIs[]>([]);
  const [debtEMI, setDebtEMI] = useState<string>('');
  const [timeHorizon, setTimeHorizon] = useState<MistakeTimeHorizon>('3-5y');
  const [result, setResult] = useState<MistakesResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleWhereMoney = (value: WhereMoneyIs) => {
    setWhereMoneyIs((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleCheck = () => {
    const incomeNum = parseFloat(income) || 0;
    const savingsNum = parseFloat(savings) || 0;
    const emiNum = parseFloat(debtEMI) || 0;

    if (incomeNum > 0) {
      const calculated = checkMistakes({
        incomeMonthly: incomeNum,
        savingsMonthly: savingsNum,
        whereMoneyIsNow: whereMoneyIs.length > 0 ? whereMoneyIs : ['not-investing'],
        debtEMI: emiNum,
        timeHorizon,
      });
      setResult(calculated);
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-orange-50/50 via-white to-white">
      <ToolHeader />

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <ToolHero
              icon="🔍"
              badge="Self-Assessment"
              badgeColor="orange"
              title="Money Mistakes Checker"
              subtitle="A gentle check on common money habits. No judgement, just insights."
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Left: Form */}
            <div className={`transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <FormCard step={1} title="Your Financial Snapshot">
                <div className="space-y-4 sm:space-y-6">
                  {/* Monthly Income */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Monthly Income (after tax) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm sm:text-base">₹</span>
                      <input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        placeholder="50,000"
                        className="w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-base sm:text-lg"
                      />
                    </div>
                  </div>

                  {/* Monthly Savings */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Monthly Savings
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm sm:text-base">₹</span>
                      <input
                        type="number"
                        value={savings}
                        onChange={(e) => setSavings(e.target.value)}
                        placeholder="10,000"
                        className="w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-base sm:text-lg"
                      />
                    </div>
                  </div>

                  {/* Where is your money */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Where is your money now? <span className="text-gray-400 text-[10px] sm:text-xs">(select all)</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {whereMoneyOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => toggleWhereMoney(option.value)}
                          className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border-2 transition-all text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-1.5 ${
                            whereMoneyIs.includes(option.value)
                              ? 'border-orange-500 bg-orange-50 text-orange-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          }`}
                        >
                          <span className="text-sm sm:text-base">{option.icon}</span>
                          <span className="hidden xs:inline sm:inline">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Debt EMI */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Monthly EMIs <span className="text-gray-400 text-[10px] sm:text-xs">(loans, credit cards)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm sm:text-base">₹</span>
                      <input
                        type="number"
                        value={debtEMI}
                        onChange={(e) => setDebtEMI(e.target.value)}
                        placeholder="0"
                        className="w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-base sm:text-lg"
                      />
                    </div>
                  </div>

                  {/* Time Horizon */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Investment time horizon
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      {timeHorizonOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setTimeHorizon(option.value)}
                          className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all text-xs sm:text-sm font-medium ${
                            timeHorizon === option.value
                              ? 'border-orange-500 bg-orange-50 text-orange-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Check Button */}
                  <button
                    onClick={handleCheck}
                    disabled={!income}
                    className="w-full py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-base sm:text-lg shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Check My Habits
                  </button>
                </div>
              </FormCard>
            </div>

            {/* Right: Results */}
            <div className={`transition-all duration-500 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {showResults && result ? (
                <div className="space-y-4 sm:space-y-6">
                  {/* All Good State */}
                  {result.isAllGood ? (
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white shadow-lg sm:shadow-xl shadow-emerald-200 text-center">
                      <span className="text-5xl sm:text-6xl block mb-3 sm:mb-4">🎉</span>
                      <h3 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">Looking Good!</h3>
                      <p className="text-emerald-100 text-sm sm:text-base">
                        We didn't spot any obvious red flags in your financial habits. Keep it up!
                      </p>
                      {result.positives.length > 0 && (
                        <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-1.5 sm:gap-2">
                          {result.positives.map((positive, i) => (
                            <span key={i} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 rounded-full text-xs sm:text-sm">
                              ✓ {positive}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Tone setter */}
                      <div className="bg-blue-50 border border-blue-100 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                        <p className="text-xs sm:text-sm text-blue-700">
                          💙 <span className="font-medium">This isn't judgement</span> — everyone has room to improve. 
                          These are just patterns to be aware of.
                        </p>
                      </div>

                      {/* Mistakes List */}
                      <div className="space-y-3 sm:space-y-4">
                        {result.mistakes.map((mistake) => {
                          const colors = severityColors[mistake.severity];
                          return (
                            <div
                              key={mistake.id}
                              className={`${colors.bg} border ${colors.border} rounded-xl sm:rounded-2xl p-4 sm:p-5`}
                            >
                              <div className="flex items-start gap-2 sm:gap-3">
                                <span className="text-xl sm:text-2xl">{mistake.icon}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1 flex-wrap">
                                    <h4 className={`font-semibold ${colors.text} text-sm sm:text-base`}>{mistake.title}</h4>
                                    <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
                                      {mistake.severity}
                                    </span>
                                  </div>
                                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{mistake.why}</p>
                                  <div className="bg-white/60 rounded-lg p-2 sm:p-3">
                                    <p className="text-xs sm:text-sm">
                                      <span className="font-medium text-gray-700">💡 Next step:</span>{' '}
                                      <span className="text-gray-600">{mistake.nextStep}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Positives */}
                      {result.positives.length > 0 && (
                        <div className="bg-emerald-50 border border-emerald-100 rounded-lg sm:rounded-xl p-3 sm:p-4">
                          <h4 className="font-medium text-emerald-800 mb-1.5 sm:mb-2 text-sm sm:text-base">✓ What you're doing well</h4>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {result.positives.map((positive, i) => (
                              <span key={i} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs sm:text-sm">
                                {positive}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Next Steps CTAs */}
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg shadow-gray-100 border border-gray-100 p-4 sm:p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Helpful Tools</h3>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <Link
                        href="/tools/emergency-fund-planner"
                        className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-center"
                      >
                        <span className="text-xl sm:text-2xl block mb-0.5 sm:mb-1">🛡️</span>
                        <span className="text-xs sm:text-sm font-medium text-blue-700">Emergency Fund</span>
                      </Link>
                      <Link
                        href="/invest"
                        className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors text-center"
                      >
                        <span className="text-xl sm:text-2xl block mb-0.5 sm:mb-1">🎯</span>
                        <span className="text-xs sm:text-sm font-medium text-orange-700">Investment Explorer</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                /* Empty State */
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-200 p-6 sm:p-8 md:p-12 text-center min-h-[200px] sm:min-h-[300px] flex flex-col items-center justify-center">
                  <span className="text-4xl sm:text-5xl mb-3 sm:mb-4">🔍</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                    Enter your details
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm max-w-xs">
                    Fill in the form and click "Check My Habits" to see insights
                  </p>
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

