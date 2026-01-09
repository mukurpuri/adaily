'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { trackHomepagePreview, trackCTAClick } from '@/lib/analytics';

// Interactive Investment Explorer Preview
function InvestmentExplorerPreview() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [time, setTime] = useState('');
  const [risk, setRisk] = useState('');

  const handleExplore = () => {
    trackHomepagePreview('investment-explorer', 'submit');
    trackCTAClick('explore_investments', 'homepage', '/invest');
    const params = new URLSearchParams();
    if (amount) params.set('amount', amount);
    if (time) params.set('time', time);
    if (risk) params.set('risk', risk);
    router.push(`/invest${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const isReady = amount && time && risk;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 hover:shadow-xl transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-2xl mb-3 shadow-lg shadow-orange-200">
            🎯
          </div>
          <h3 className="font-bold text-gray-900 text-base sm:text-lg">Investment Explorer</h3>
          <p className="text-sm text-gray-500">Find what fits your goals</p>
        </div>
        <span className="px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-full uppercase">
          Popular
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">How much to invest?</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
            <input
              type="number"
              placeholder="50,000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Time horizon</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 bg-white"
            >
              <option value="">Select</option>
              <option value="short">Under 1 year</option>
              <option value="medium">1-3 years</option>
              <option value="long">3+ years</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Risk comfort</label>
            <select
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 bg-white"
            >
              <option value="">Select</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleExplore}
        className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
      >
        {isReady ? 'See matching options' : 'Explore investments'}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
}

// Interactive Emergency Fund Preview
function EmergencyFundPreview() {
  const router = useRouter();
  const [expenses, setExpenses] = useState('');
  const [stability, setStability] = useState('');

  const handleCalculate = () => {
    trackHomepagePreview('emergency-fund-planner', 'submit');
    trackCTAClick('plan_emergency_fund', 'homepage', '/tools/emergency-fund-planner');
    const params = new URLSearchParams();
    if (expenses) params.set('expenses', expenses);
    if (stability) params.set('stability', stability);
    router.push(`/tools/emergency-fund-planner${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const isReady = expenses && stability;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 hover:shadow-xl transition-all duration-200">
      <div className="mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-2xl mb-3 shadow-lg shadow-blue-200">
          🛡️
        </div>
        <h3 className="font-bold text-gray-900 text-base sm:text-lg">Emergency Fund Planner</h3>
        <p className="text-sm text-gray-500">Calculate your safety net</p>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Monthly expenses</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
            <input
              type="number"
              placeholder="30,000"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Job stability</label>
          <select
            value={stability}
            onChange={(e) => setStability(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white"
          >
            <option value="">Select</option>
            <option value="stable">Stable job</option>
            <option value="somewhat">Somewhat unstable</option>
            <option value="unstable">Unstable / freelance</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
      >
        {isReady ? 'See my safety net' : 'Plan emergency fund'}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
}

// Interactive Safety vs Growth Preview
function SafetyGrowthPreview() {
  const router = useRouter();
  const [age, setAge] = useState('');
  const [timeHorizon, setTimeHorizon] = useState('');
  const [risk, setRisk] = useState('');

  const handleCalculate = () => {
    trackHomepagePreview('safety-growth-split', 'submit');
    trackCTAClick('find_balance', 'homepage', '/tools/safety-growth-split');
    const params = new URLSearchParams();
    if (age) params.set('age', age);
    if (timeHorizon) params.set('time', timeHorizon);
    if (risk) params.set('risk', risk);
    router.push(`/tools/safety-growth-split${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const isReady = age && timeHorizon;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 hover:shadow-xl transition-all duration-200">
      <div className="mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-2xl mb-3 shadow-lg shadow-purple-200">
          ⚖️
        </div>
        <h3 className="font-bold text-gray-900 text-base sm:text-lg">Safety vs Growth</h3>
        <p className="text-sm text-gray-500">Balance your allocation</p>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Your age</label>
          <input
            type="number"
            placeholder="30"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Time horizon</label>
          <select
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 bg-white"
          >
            <option value="">Select</option>
            <option value="short">1-3 years</option>
            <option value="medium">3-5 years</option>
            <option value="long">5-10 years</option>
            <option value="very-long">10+ years</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
      >
        {isReady ? 'See my split' : 'Find my balance'}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
}

// Interactive Money Check Preview
function MoneyCheckPreview() {
  const router = useRouter();
  const [income, setIncome] = useState('');
  const [savings, setSavings] = useState('');

  const handleCheck = () => {
    trackHomepagePreview('money-mistakes-checker', 'submit');
    trackCTAClick('check_habits', 'homepage', '/tools/money-mistakes-checker');
    const params = new URLSearchParams();
    if (income) params.set('income', income);
    if (savings) params.set('savings', savings);
    router.push(`/tools/money-mistakes-checker${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const isReady = income;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 hover:shadow-xl transition-all duration-200">
      <div className="mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl mb-3 shadow-lg shadow-orange-200">
          🔍
        </div>
        <h3 className="font-bold text-gray-900 text-base sm:text-lg">Money Check</h3>
        <p className="text-sm text-gray-500">Spot common mistakes early</p>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Monthly income</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
            <input
              type="number"
              placeholder="50,000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Monthly savings</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
            <input
              type="number"
              placeholder="10,000"
              value={savings}
              onChange={(e) => setSavings(e.target.value)}
              className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleCheck}
        className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
      >
        {isReady ? 'Check my habits' : 'Start money check'}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
}

// Interactive Govt Schemes Preview
function GovSchemesPreview() {
  const router = useRouter();
  const [ageGroup, setAgeGroup] = useState('');
  const [goal, setGoal] = useState('');

  const handleExplore = () => {
    trackHomepagePreview('government-schemes', 'submit');
    trackCTAClick('explore_schemes', 'homepage', '/tools/government-schemes');
    const params = new URLSearchParams();
    if (ageGroup) params.set('age', ageGroup);
    if (goal) params.set('goal', goal);
    router.push(`/tools/government-schemes${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const isReady = ageGroup && goal;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 hover:shadow-xl transition-all duration-200">
      <div className="mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-2xl mb-3 shadow-lg shadow-teal-200">
          🏛️
        </div>
        <h3 className="font-bold text-gray-900 text-base sm:text-lg">Govt Schemes</h3>
        <p className="text-sm text-gray-500">PPF, NPS, SCSS and more</p>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Age group</label>
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 bg-white"
          >
            <option value="">Select</option>
            <option value="18-30">18-30 years</option>
            <option value="30-45">30-45 years</option>
            <option value="45-60">45-60 years</option>
            <option value="60+">60+ years</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Primary goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 bg-white"
          >
            <option value="">Select</option>
            <option value="safety">Safety</option>
            <option value="tax-saving">Tax saving</option>
            <option value="retirement">Retirement</option>
            <option value="income">Regular income</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleExplore}
        className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
      >
        {isReady ? 'See matching schemes' : 'Explore schemes'}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
            <Image 
              src="/logo.svg" 
              alt="Adaily" 
              width={32} 
              height={32} 
              className="w-7 h-7 sm:w-8 sm:h-8"
            />
            <span className="text-lg sm:text-xl font-bold text-gray-900">Adaily</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/tools" className="text-sm text-gray-600 hover:text-orange-500 transition-colors font-semibold">All Tools</Link>
            <Link href="/learn/glossary" className="text-sm text-gray-600 hover:text-orange-500 transition-colors font-semibold">Glossary</Link>
            <Link href="/about/dna" className="text-sm text-gray-600 hover:text-orange-500 transition-colors font-semibold">About</Link>
          </div>

          <Link
            href="/invest"
            className="font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm transition-colors"
          >
            <span className="hidden sm:inline">Explore Investments →</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] sm:text-xs font-medium mb-3 sm:mb-4 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            >
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              100% Free · No Signup
            </div>
            
            <h1 
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight transition-all duration-500 delay-100 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            >
              Simple tools to understand{' '}
              <span className="text-orange-500">your money</span>
            </h1>
            
            <p 
              className={`text-gray-600 text-sm sm:text-base md:text-lg mb-2 sm:mb-3 transition-all duration-500 delay-200 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            >
              Free financial tools for India. No jargon, no selling, no signup.
            </p>
            
            {/* SEO context line */}
            <p 
              className={`font-medium text-gray-500 text-xs sm:text-sm max-w-2xl mx-auto mb-6 sm:mb-8 transition-all duration-500 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            >
              Understand where to invest your savings in India, based on your goals, time, and comfort with risk.
            </p>

          </div>
        </section>

        {/* START HERE - Interactive Tool Previews */}
        <section className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">All Tools</h2>
              <p className="text-sm text-gray-500">Pick one and start exploring</p>
            </div>
            
            {/* Primary Tools Row */}
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <InvestmentExplorerPreview />
              <EmergencyFundPreview />
            </div>
            
            {/* Secondary Tools Row */}
            <div className="grid sm:grid-cols-3 gap-4">
              <SafetyGrowthPreview />
              <MoneyCheckPreview />
              <GovSchemesPreview />
            </div>
            
            <p className="text-center text-xs text-gray-400 mt-4">
              Educational only. No advice, no selling.
            </p>
          </div>
        </section>
        
      </div>

      {/* How Adaily Works - 3 Cards */}
      <section className="py-10 sm:py-12 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-lg sm:text-xl font-bold text-gray-900 mb-1 text-center ${mounted ? 'opacity-100' : 'opacity-0'}`}>
              How Adaily works
            </h2>
            <div className={`grid grid-cols-3 gap-2 sm:gap-4 transition-all duration-500 delay-400 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
              <div className="bg-white/70 rounded-xl p-3 sm:p-4 text-center border border-gray-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm sm:text-lg mx-auto mb-2">
                  ✏️
                </div>
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1">Enter your situation</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">Money, time, comfort with risk</p>
              </div>
              <div className="bg-white/70 rounded-xl p-3 sm:p-4 text-center border border-gray-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm sm:text-lg mx-auto mb-2">
                  🎯
                </div>
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1">See options that match</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">Filtered to what fits you</p>
              </div>
              <div className="bg-white/70 rounded-xl p-3 sm:p-4 text-center border border-gray-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm sm:text-lg mx-auto mb-2">
                  💡
                </div>
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1">Understand why they fit</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">Simple explanation, not advice</p>
              </div>
            </div>
          </div>
        </section>

      {/* LEARN Section */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Learn at Your Pace</h2>
              <p className="text-sm text-gray-500">Calm guides with no pressure</p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4">
              <Link 
                href="/guides/first-salary"
                className="group p-5 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all text-center"
              >
                <span className="text-2xl block mb-2">💼</span>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">First Salary Guide</h3>
                <p className="text-xs text-gray-500">A calm plan for new earners</p>
              </Link>

              <Link 
                href="/learn/glossary"
                className="group p-5 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-indigo-200 transition-all text-center"
              >
                <span className="text-2xl block mb-2">📚</span>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">Glossary</h3>
                <p className="text-xs text-gray-500">30 terms explained simply</p>
              </Link>

              <Link 
                href="/about/what-we-wont-do"
                className="group p-5 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-gray-300 transition-all text-center"
              >
                <span className="text-2xl block mb-2">🚫</span>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">What We Won't Do</h3>
                <p className="text-xs text-gray-500">Our boundaries, clearly stated</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Why Adaily?</h2>
            
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1">100%</div>
                <div className="text-xs sm:text-sm text-gray-500">Free Forever</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1">0</div>
                <div className="text-xs sm:text-sm text-gray-500">Data Collected</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1">No</div>
                <div className="text-xs sm:text-sm text-gray-500">Signup Required</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {[
                { icon: '🔒', text: 'Privacy first' },
                { icon: '⚡', text: 'Simple and fast' },
                { icon: '🇮🇳', text: 'Made for India' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm text-gray-600">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/about/dna"
                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                Read our philosophy →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Ready to explore?</h2>
            <p className="text-gray-600 text-sm sm:text-base mb-5">Pick a tool and start understanding your options.</p>
            <Link
              href="/invest"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all hover:scale-105"
            >
              Start with Investment Explorer
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-xs text-gray-400 mt-3">
              Educational. No advice or product selling.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Footer Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-8">
              {/* Tools */}
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-3">Tools</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
                  <li><Link href="/invest" className="hover:text-orange-500 transition-colors">Investment Explorer</Link></li>
                  <li><Link href="/tools/emergency-fund-planner" className="hover:text-orange-500 transition-colors">Emergency Fund</Link></li>
                  <li><Link href="/tools/safety-growth-split" className="hover:text-orange-500 transition-colors">Safety vs Growth</Link></li>
                  <li><Link href="/tools" className="hover:text-orange-500 transition-colors">All Tools →</Link></li>
                </ul>
              </div>

              {/* Learn */}
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-3">Learn</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
                  <li><Link href="/learn/glossary" className="hover:text-orange-500 transition-colors">Glossary</Link></li>
                  <li><Link href="/guides/first-salary" className="hover:text-orange-500 transition-colors">First Salary Guide</Link></li>
                  <li><Link href="/learn/first-salary-plan" className="hover:text-orange-500 transition-colors">First Salary Plan</Link></li>
                </ul>
              </div>

              {/* About */}
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-3">About</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
                  <li><Link href="/about/dna" className="hover:text-orange-500 transition-colors">Our Philosophy</Link></li>
                  <li><Link href="/about/what-we-wont-do" className="hover:text-orange-500 transition-colors">What We Won't Do</Link></li>
                </ul>
              </div>

              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Image 
                    src="/logo.svg" 
                    alt="Adaily" 
                    width={24} 
                    height={24} 
                    className="w-6 h-6"
                  />
                  <span className="font-semibold text-gray-900">Adaily</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Simple financial tools for India. No jargon, no selling, no signup.
                </p>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-100 pt-6 text-center text-gray-400 text-xs sm:text-sm">
              Made with care in India · © {new Date().getFullYear()} Adaily · Educational only
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
