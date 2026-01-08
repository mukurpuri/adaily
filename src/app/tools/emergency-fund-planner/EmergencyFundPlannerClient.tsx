'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ToolHeader } from '@/components/shared';
import {
  calculateEmergencyFund,
  getStorageOptions,
  formatCurrency,
  formatFullCurrency,
  type JobStability,
  type HasDependents,
  type EmergencyFundResult,
} from '@/lib/tools/emergencyFund';

export default function EmergencyFundPlannerClient() {
  const [mounted, setMounted] = useState(false);
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('');
  const [jobStability, setJobStability] = useState<JobStability>('stable');
  const [dependents, setDependents] = useState<HasDependents>('no');
  const [existingFund, setExistingFund] = useState<string>('');
  const [result, setResult] = useState<EmergencyFundResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate results whenever inputs change
  useEffect(() => {
    const expenses = parseFloat(monthlyExpenses) || 0;
    if (expenses > 0) {
      const calculated = calculateEmergencyFund({
        monthlyExpenses: expenses,
        jobStability,
        dependents,
        existingEmergencyFund: parseFloat(existingFund) || 0,
      });
      setResult(calculated);
      setShowResults(true);
    } else {
      setResult(null);
      setShowResults(false);
    }
  }, [monthlyExpenses, jobStability, dependents, existingFund]);

  const storageOptions = getStorageOptions();

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-blue-50/50 via-white to-white">
      <ToolHeader backHref="/" backLabel="Home" />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className={`text-center mb-6 sm:mb-10 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <span className="text-base sm:text-lg">🛡️</span>
              Financial Safety Net
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              Emergency Fund Planner
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto px-4">
              Find out how much you should save for emergencies and where to keep it.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Left: Form */}
            <div className={`transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl shadow-gray-100 border border-gray-100 p-4 sm:p-6 md:p-8">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-sm sm:text-base">1</span>
                  Your Details
                </h2>

                <div className="space-y-4 sm:space-y-6">
                  {/* Monthly Expenses */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Monthly Expenses <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm sm:text-base">₹</span>
                      <input
                        type="number"
                        value={monthlyExpenses}
                        onChange={(e) => setMonthlyExpenses(e.target.value)}
                        placeholder="50,000"
                        className="w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base sm:text-lg"
                      />
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Include rent, bills, groceries, EMIs, etc.</p>
                  </div>

                  {/* Job Stability */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Job Stability
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      {[
                        { value: 'stable', label: 'Stable', icon: '✓' },
                        { value: 'somewhat-unstable', label: 'Uncertain', icon: '~' },
                        { value: 'unstable', label: 'Unstable', icon: '!' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setJobStability(option.value as JobStability)}
                          className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all text-xs sm:text-sm font-medium ${
                            jobStability === option.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          }`}
                        >
                          <span className="block text-base sm:text-lg mb-0.5 sm:mb-1">{option.icon}</span>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dependents */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Do you have dependents?
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {[
                        { value: 'yes', label: 'Yes', icon: '👨‍👩‍👧' },
                        { value: 'no', label: 'No', icon: '👤' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setDependents(option.value as HasDependents)}
                          className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all font-medium text-sm sm:text-base ${
                            dependents === option.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          }`}
                        >
                          <span className="text-xl sm:text-2xl mb-0.5 sm:mb-1 block">{option.icon}</span>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Existing Emergency Fund */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Existing Emergency Fund <span className="text-gray-400">(optional)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm sm:text-base">₹</span>
                      <input
                        type="number"
                        value={existingFund}
                        onChange={(e) => setExistingFund(e.target.value)}
                        placeholder="0"
                        className="w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base sm:text-lg"
                      />
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1">How much have you already saved?</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Results */}
            <div className={`transition-all duration-500 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {showResults && result ? (
                <div className="space-y-4 sm:space-y-6">
                  {/* Main Result Card */}
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl shadow-blue-200 p-4 sm:p-6 md:p-8 text-white">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="text-blue-100 text-xs sm:text-sm font-medium">Recommended Emergency Fund</span>
                      <span className="text-2xl sm:text-3xl">🛡️</span>
                    </div>
                    <div className="text-xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
                      {formatCurrency(result.minAmount)} - {formatCurrency(result.maxAmount)}
                    </div>
                    <div className="text-blue-100 text-xs sm:text-sm">
                      {result.minMonths} to {result.maxMonths} months of expenses
                    </div>

                    {/* Progress bar */}
                    {result.existingFund > 0 && (
                      <div className="mt-4 sm:mt-6">
                        <div className="flex justify-between text-xs sm:text-sm mb-1.5 sm:mb-2">
                          <span>Your Progress</span>
                          <span className="font-semibold">{result.percentageFunded}%</span>
                        </div>
                        <div className="h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${result.percentageFunded}%` }}
                          />
                        </div>
                        <div className="text-[10px] sm:text-xs text-blue-100 mt-1.5 sm:mt-2">
                          {formatCurrency(result.existingFund)} of {formatCurrency(result.minAmount)} (minimum)
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Gap Card */}
                  {result.gap.min > 0 && (
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg shadow-gray-100 border border-gray-100 p-4 sm:p-6">
                      <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <span className="text-lg sm:text-xl">📊</span>
                        Amount to Save
                      </h3>
                      <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-0.5 sm:mb-1">
                        {formatCurrency(result.gap.min)} - {formatCurrency(result.gap.max)}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">
                        to reach your recommended emergency fund
                      </p>
                    </div>
                  )}

                  {result.isFullyFunded && (
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl border border-emerald-200 p-4 sm:p-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-2xl sm:text-3xl">🎉</span>
                        <div>
                          <h3 className="font-semibold text-emerald-800 text-sm sm:text-base">You're covered!</h3>
                          <p className="text-xs sm:text-sm text-emerald-600">
                            Your emergency fund meets the minimum recommendation.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Why this range */}
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg shadow-gray-100 border border-gray-100 p-4 sm:p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                      <span className="text-lg sm:text-xl">💡</span>
                      Why this range?
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {result.reasons.map((reason, i) => (
                        <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                          <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-[10px] sm:text-xs font-bold mt-0.5">
                            {i + 1}
                          </span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Where to keep it */}
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg shadow-gray-100 border border-gray-100 p-4 sm:p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                      <span className="text-lg sm:text-xl">🏦</span>
                      Where to keep it
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {storageOptions.map((option, i) => (
                        <div
                          key={i}
                          className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-100"
                        >
                          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <span className="text-lg sm:text-xl">{option.icon}</span>
                              <span className="font-medium text-gray-900 text-sm sm:text-base">{option.name}</span>
                            </div>
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] sm:text-xs font-medium">
                              {option.allocation}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1.5 sm:mb-2">{option.description}</p>
                          <div className="flex gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-500">
                            <span>Returns: <span className="font-medium text-gray-700">{option.returns}</span></span>
                            <span>Access: <span className="font-medium text-gray-700">{option.liquidity}</span></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Empty State */
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-200 p-6 sm:p-8 md:p-12 text-center min-h-[200px] sm:min-h-[300px] flex flex-col items-center justify-center">
                  <span className="text-4xl sm:text-5xl mb-3 sm:mb-4">🛡️</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                    Enter your details
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm max-w-xs">
                    Fill in the form to see your personalized emergency fund recommendation
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <div className={`mt-8 sm:mt-12 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-amber-50 border border-amber-200 text-center transition-all duration-500 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-xs sm:text-sm text-amber-800">
              <span className="font-semibold">⚠️ Disclaimer:</span> This tool is for educational purposes only. 
              It provides general guidance and is not financial advice. Please consult a certified financial planner 
              for personalized recommendations.
            </p>
          </div>

          {/* Back to tools */}
          <div className="text-center mt-6 sm:mt-8">
            <Link
              href="/"
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

