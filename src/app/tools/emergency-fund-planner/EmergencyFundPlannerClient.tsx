'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ToolHeader } from '@/components/shared';
import {
  calculateEmergencyFund,
  getStorageOptions,
  formatCurrency,
  type JobStability,
  type HasDependents,
  type EmergencyFundResult,
} from '@/lib/tools/emergencyFund';

// Preset examples
const presetExamples = [
  { label: 'Stable job', expenses: '30000', stability: 'stable' as JobStability, dependents: 'no' as HasDependents, existing: '' },
  { label: 'Variable income', expenses: '50000', stability: 'somewhat-unstable' as JobStability, dependents: 'yes' as HasDependents, existing: '' },
  { label: 'Freelancer', expenses: '80000', stability: 'unstable' as JobStability, dependents: 'yes' as HasDependents, existing: '' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Utility Functions for Indian Number Formatting
// ─────────────────────────────────────────────────────────────────────────────

function formatIndianNumber(num: number): string {
  if (isNaN(num) || num === 0) return '';
  const numStr = Math.floor(num).toString();
  const lastThree = numStr.slice(-3);
  const otherNumbers = numStr.slice(0, -3);
  if (otherNumbers !== '') {
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  }
  return lastThree;
}

function numberToIndianWords(num: number): string {
  if (isNaN(num) || num === 0) return '';
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 
                'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 
                'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const numFloor = Math.floor(num);
  
  function formatSmallNumber(n: number): string {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
    return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + formatSmallNumber(n % 100) : '');
  }
  
  if (numFloor >= 10000000) {
    const crores = Math.floor(numFloor / 10000000);
    const remainder = numFloor % 10000000;
    const croreWord = crores === 1 ? 'One Crore' : `${formatSmallNumber(crores)} Crores`;
    return remainder > 0 ? `${croreWord} ${numberToIndianWords(remainder).replace(' Rupees', '')} Rupees` : `${croreWord} Rupees`;
  }
  if (numFloor >= 100000) {
    const lakhs = Math.floor(numFloor / 100000);
    const remainder = numFloor % 100000;
    const lakhWord = lakhs === 1 ? 'One Lakh' : `${formatSmallNumber(lakhs)} Lakhs`;
    return remainder > 0 ? `${lakhWord} ${numberToIndianWords(remainder).replace(' Rupees', '')} Rupees` : `${lakhWord} Rupees`;
  }
  if (numFloor >= 1000) {
    const thousands = Math.floor(numFloor / 1000);
    const remainder = numFloor % 1000;
    const thousandWord = thousands === 1 ? 'One Thousand' : `${formatSmallNumber(thousands)} Thousand`;
    return remainder > 0 ? `${thousandWord} ${numberToIndianWords(remainder).replace(' Rupees', '')} Rupees` : `${thousandWord} Rupees`;
  }
  return `${formatSmallNumber(numFloor)} Rupees`;
}

export default function EmergencyFundPlannerClient() {
  const searchParams = useSearchParams();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Raw values for calculations
  const [expensesRaw, setExpensesRaw] = useState<number>(0);
  const [existingFundRaw, setExistingFundRaw] = useState<number>(0);
  
  // Display values for formatted input
  const [expensesDisplay, setExpensesDisplay] = useState<string>('');
  const [existingFundDisplay, setExistingFundDisplay] = useState<string>('');
  
  const [jobStability, setJobStability] = useState<JobStability>('stable');
  const [dependents, setDependents] = useState<HasDependents>('no');
  const [result, setResult] = useState<EmergencyFundResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  // Handle expenses input change
  const handleExpensesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const numValue = parseInt(rawValue) || 0;
    setExpensesRaw(numValue);
    setExpensesDisplay(formatIndianNumber(numValue));
  };

  // Handle existing fund input change
  const handleExistingFundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const numValue = parseInt(rawValue) || 0;
    setExistingFundRaw(numValue);
    setExistingFundDisplay(formatIndianNumber(numValue));
  };

  // Initialize from URL params
  useEffect(() => {
    setMounted(true);
    
    const expensesParam = searchParams.get('expenses');
    const stabilityParam = searchParams.get('stability');
    
    if (expensesParam) {
      const numValue = parseInt(expensesParam) || 0;
      setExpensesRaw(numValue);
      setExpensesDisplay(formatIndianNumber(numValue));
    }
    if (stabilityParam) {
      const stabilityMap: Record<string, JobStability> = {
        'stable': 'stable',
        'somewhat': 'somewhat-unstable',
        'unstable': 'unstable',
      };
      setJobStability(stabilityMap[stabilityParam] || 'stable');
    }
  }, [searchParams]);

  // Auto-update results after first calculation
  useEffect(() => {
    if (hasCalculated && expensesRaw > 0) {
      const calculated = calculateEmergencyFund({
        monthlyExpenses: expensesRaw,
        jobStability,
        dependents,
        existingEmergencyFund: existingFundRaw,
      });
      setResult(calculated);
    }
  }, [hasCalculated, expensesRaw, jobStability, dependents, existingFundRaw]);

  const handleCalculate = () => {
    if (expensesRaw <= 0) return;
    
    const calculated = calculateEmergencyFund({
      monthlyExpenses: expensesRaw,
      jobStability,
      dependents,
      existingEmergencyFund: existingFundRaw,
    });
    setResult(calculated);
    setHasCalculated(true);
    
    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const applyPreset = (preset: typeof presetExamples[0]) => {
    const numValue = parseInt(preset.expenses) || 0;
    setExpensesRaw(numValue);
    setExpensesDisplay(formatIndianNumber(numValue));
    setJobStability(preset.stability);
    setDependents(preset.dependents);
    const existingNum = parseInt(preset.existing) || 0;
    setExistingFundRaw(existingNum);
    setExistingFundDisplay(formatIndianNumber(existingNum));
    setHasCalculated(false);
    setResult(null);
  };

  const storageOptions = getStorageOptions();
  const isValid = expensesRaw > 0;

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
      <ToolHeader backHref="/" backLabel="Home" />

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className={`text-center mb-6 sm:mb-8 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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

          {/* About This Tool Card - Collapsible */}
          <div className={`mb-4 sm:mb-8 transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-white rounded-xl sm:rounded-2xl border border-blue-100 overflow-hidden">
              <button
                onClick={() => setShowAbout(!showAbout)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-blue-50/50 transition-colors"
              >
                <h2 className="font-semibold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                  <span>📖</span> Understand emergency funds with an example
                </h2>
                <svg 
                  className={`w-5 h-5 text-gray-400 transition-transform ${showAbout ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`px-4 pb-4 sm:px-6 sm:pb-6 ${showAbout ? 'block' : 'hidden'}`}>
                {/* What is it */}
                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  An emergency fund is money set aside for unexpected expenses like job loss, medical emergencies, or urgent repairs. 
                  It gives you breathing room so you don't need to borrow or sell investments during tough times.
                </p>
                
                {/* Rule of thumb */}
                <p className="text-xs text-gray-500 mb-2 font-medium">How much should you save? (based on ₹40,000/month expenses)</p>
                <div className="grid sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100">
                    <div className="font-semibold text-blue-700 text-xs sm:text-sm mb-1">🏢 Stable job</div>
                    <div className="text-base sm:text-lg font-bold text-blue-800">3-4 months</div>
                    <div className="text-xs sm:text-sm font-semibold text-blue-600 mb-1">≈ ₹1.2L - ₹1.6L</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
                      Permanent role, regular salary, low layoff risk. You can find a new job quickly.
                    </div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 sm:p-4 border border-amber-100">
                    <div className="font-semibold text-amber-600 text-xs sm:text-sm mb-1">🔄 Uncertain income</div>
                    <div className="text-base sm:text-lg font-bold text-amber-700">4-6 months</div>
                    <div className="text-xs sm:text-sm font-semibold text-amber-600 mb-1">≈ ₹1.6L - ₹2.4L</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
                      Contract jobs, probation, variable pay, or industries with frequent changes.
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3 sm:p-4 border border-red-100">
                    <div className="font-semibold text-red-600 text-xs sm:text-sm mb-1">⚠️ Unstable / Freelance</div>
                    <div className="text-base sm:text-lg font-bold text-red-700">6-9 months</div>
                    <div className="text-xs sm:text-sm font-semibold text-red-600 mb-1">≈ ₹2.4L - ₹3.6L</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
                      Freelancers, gig workers, business owners, or single income with dependents.
                    </div>
                  </div>
                </div>

                {/* Where to keep it - brief note */}
                <div className="bg-emerald-50 rounded-lg p-3 sm:p-4 border border-emerald-100 mb-4">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🏦</span>
                    <div>
                      <div className="font-semibold text-emerald-800 text-xs sm:text-sm mb-1">Where to keep it?</div>
                      <div className="text-[10px] sm:text-xs text-gray-600 leading-relaxed">
                        <span className="font-medium">Savings account</span> (instant access), <span className="font-medium">Sweep-in FD</span> (auto-converts to FD), or <span className="font-medium">Liquid funds</span> (1-2 day withdrawal). 
                        The goal is <span className="text-emerald-700 font-medium">quick access</span>, not high returns.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 my-4"></div>

                {/* Example */}
                <div className="text-xs sm:text-sm text-gray-600 space-y-3">
                  <p className="font-medium text-gray-800 flex items-center gap-1.5">
                    <span>💡</span> Example: Rahul's story
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <ul className="space-y-1 text-gray-600">
                      <li>• Monthly expenses: <span className="font-medium">₹40,000</span></li>
                      <li>• Job: <span className="font-medium">Stable</span></li>
                      <li>• One day, his company has layoffs. It takes <span className="font-medium">3 months</span> to find a new job.</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <div className="text-blue-700">
                      ₹40,000 × 3 months = <span className="font-bold">₹1,20,000</span>
                    </div>
                    <div className="text-[10px] sm:text-xs text-blue-600 mt-1">
                      This is what he needs to survive without borrowing.
                    </div>
                  </div>
                </div>

                <p className="text-[10px] sm:text-xs text-gray-400 italic mt-4">
                  This is educational guidance, not financial advice. Your situation may vary.
                </p>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Left: Form */}
            <div className={`transition-all duration-500 delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-blue-900/10 border border-blue-200/50 p-4 sm:p-6 md:p-8">
                {/* Preset Examples */}
                <div className="mb-4 sm:mb-6">
                  {/* <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] sm:text-xs text-gray-500">Try an example:</span>
                  </div> */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {presetExamples.map((preset, i) => (
                      <button
                        key={i}
                        onClick={() => applyPreset(preset)}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium bg-gray-100 hover:bg-blue-100 hover:text-blue-700 text-gray-600 transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-sm sm:text-base">1</span>
                  Your Details
                </h2>

                <div className="space-y-4 sm:space-y-6">
                  {/* Monthly Expenses - Green theme like Investment tool */}
                  <div>
                    <label className="block text-gray-600 font-medium text-xs sm:text-sm mb-1.5 sm:mb-2">
                      💵 Monthly Expenses <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-semibold text-lg sm:text-xl">₹</span>
                      <input
                        type="text"
                        value={expensesDisplay}
                        onChange={handleExpensesChange}
                        placeholder="50,000"
                        className="w-full pl-9 sm:pl-11 pr-4 py-3 sm:py-4 bg-emerald-50 border border-emerald-200 rounded-xl text-gray-900 font-bold text-xl sm:text-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all text-center"
                      />
                    </div>
                    {expensesRaw > 0 && (
                      <p className="text-center text-xs sm:text-sm text-gray-400 mt-1.5 italic">{numberToIndianWords(expensesRaw)}</p>
                    )}
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1 text-center">Include rent, bills, groceries, EMIs, etc.</p>
                  </div>

                  {/* Job Stability */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Job Stability
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      {[
                        { value: 'stable', label: 'Stable', icon: '🏢' },
                        { value: 'somewhat-unstable', label: 'Uncertain', icon: '🔄' },
                        { value: 'unstable', label: 'Unstable', icon: '⚠️' },
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
                    {/* Helper text for stability */}
                    <div className="mt-2 text-[10px] sm:text-xs text-gray-400 leading-relaxed">
                      {jobStability === 'stable' && 'Permanent job, stable monthly income'}
                      {jobStability === 'somewhat-unstable' && 'Variable income, probation period, or freelance work'}
                      {jobStability === 'unstable' && 'High chance of job or income disruption'}
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
                    {/* Helper text for dependents */}
                    <p className="mt-2 text-[10px] sm:text-xs text-gray-400 leading-relaxed">
                      Dependents = people who rely on your income (spouse, kids, parents). 
                      If you support someone financially, select Yes.
                    </p>
                  </div>

                  {/* Existing Emergency Fund - Blue theme for existing savings */}
                  <div>
                    <label className="block text-gray-600 font-medium text-xs sm:text-sm mb-1.5 sm:mb-2">
                      🏦 Existing Emergency Fund <span className="text-gray-400">(optional)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-blue-500 font-semibold text-lg sm:text-xl">₹</span>
                      <input
                        type="text"
                        value={existingFundDisplay}
                        onChange={handleExistingFundChange}
                        placeholder="0"
                        className="w-full pl-9 sm:pl-11 pr-4 py-3 sm:py-4 bg-blue-50 border border-blue-200 rounded-xl text-gray-900 font-bold text-xl sm:text-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-center"
                      />
                    </div>
                    {existingFundRaw > 0 && (
                      <p className="text-center text-xs sm:text-sm text-gray-400 mt-1.5 italic">{numberToIndianWords(existingFundRaw)}</p>
                    )}
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1 text-center">How much have you already saved?</p>
                  </div>

                  {/* Calculate Button */}
                  <button
                    onClick={handleCalculate}
                    disabled={!isValid}
                    className={`w-full py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold transition-all flex items-center justify-center gap-2 ${
                      isValid
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-200 hover:shadow-xl'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Calculate my safety net
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Results */}
            <div ref={resultsRef} className={`transition-all duration-500 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {hasCalculated && result ? (
                <div className="space-y-4 sm:space-y-6">
                  {/* Main Result Card */}
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl shadow-blue-200 p-4 sm:p-6 md:p-8 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-100 text-xs sm:text-sm font-medium">🛡️ Your safety net target</span>
                    </div>
                    <p className=" text-[13px] sm:text-xs mb-3 leading-relaxed font-semibold text-white">
                      This is the total amount you should have saved for emergencies. Keep this money liquid and accessible.
                    </p>
                    <div className="text-xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
                      {formatCurrency(result.minAmount)} - {formatCurrency(result.maxAmount)}
                    </div>
                    <div className="text-blue-100 text-xs sm:text-sm">
                      {result.minMonths} to {result.maxMonths} months of your expenses
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
                            style={{ width: `${Math.min(result.percentageFunded, 100)}%` }}
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
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg shadow-blue-100/50 border border-blue-100/50 p-4 sm:p-6">
                      <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2 text-sm sm:text-base">
                        <span className="text-lg sm:text-xl">📊</span>
                        Remaining to build
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-500 mb-3 leading-relaxed">
                        This is the gap between what you have and what you need. Focus on building this gradually.
                      </p>
                      <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-0.5 sm:mb-1">
                        {formatCurrency(result.gap.min)} - {formatCurrency(result.gap.max)}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">
                        to reach your safety net target
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
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg shadow-blue-100/50 border border-blue-100/50 p-4 sm:p-6">
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

                  {/* Next Steps */}
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg shadow-blue-100/50 border border-blue-100/50 p-4 sm:p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                      <span className="text-lg sm:text-xl">🚶</span>
                      Next steps
                    </h3>
                    <ul className="space-y-3 sm:space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                        <div>
                          <div className="font-medium text-gray-900 text-xs sm:text-sm">Build 1 month first</div>
                          <div className="text-[10px] sm:text-xs text-gray-500">Start small. Even ₹{formatCurrency(expensesRaw || 30000)} gives you a buffer.</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                        <div>
                          <div className="font-medium text-gray-900 text-xs sm:text-sm">Reach the minimum range</div>
                          <div className="text-[10px] sm:text-xs text-gray-500">Aim for {formatCurrency(result.minAmount)} over the next few months.</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                        <div>
                          <div className="font-medium text-gray-900 text-xs sm:text-sm">Automate monthly saving</div>
                          <div className="text-[10px] sm:text-xs text-gray-500">Set up auto-transfer on payday to build without thinking.</div>
                        </div>
                      </li>
                    </ul>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-4 italic">
                      These are general steps, not personalized advice. Adjust based on your situation.
                    </p>
                  </div>

                  {/* Where to keep it */}
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg shadow-blue-100/50 border border-blue-100/50 p-4 sm:p-6">
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
                    Start with your monthly expenses
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm max-w-xs mb-4">
                    We'll suggest a safety-net range (in months), and show where people usually keep it.
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    ↑ Try an example above to see how it works
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
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white hover:bg-blue-600 hover:text-white text-gray-700 font-medium transition-colors text-sm sm:text-base"
            >
              ← Explore More Tools
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
