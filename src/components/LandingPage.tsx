'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// All tools data
const allTools = [
  {
    id: 'investment-explorer',
    name: 'Investment Explorer',
    shortDesc: 'Find what fits your goals',
    icon: '🎯',
    href: '/invest',
    gradient: 'from-orange-500 to-amber-500',
    shadow: 'shadow-orange-200',
    popular: true,
  },
  {
    id: 'emergency-fund',
    name: 'Emergency Fund',
    shortDesc: 'Calculate your safety net',
    icon: '🛡️',
    href: '/tools/emergency-fund-planner',
    gradient: 'from-blue-500 to-indigo-500',
    shadow: 'shadow-blue-200',
  },
  {
    id: 'safety-growth',
    name: 'Safety vs Growth',
    shortDesc: 'Balance your allocation',
    icon: '⚖️',
    href: '/tools/safety-growth-split',
    gradient: 'from-purple-500 to-pink-500',
    shadow: 'shadow-purple-200',
  },
  {
    id: 'money-mistakes',
    name: 'Money Check',
    shortDesc: 'Spot common mistakes',
    icon: '🔍',
    href: '/tools/money-mistakes-checker',
    gradient: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-200',
  },
  {
    id: 'gov-schemes',
    name: 'Govt Schemes',
    shortDesc: 'PPF, NPS, SCSS & more',
    icon: '🏛️',
    href: '/tools/government-schemes',
    gradient: 'from-teal-500 to-emerald-500',
    shadow: 'shadow-teal-200',
  },
  {
    id: 'glossary',
    name: 'Glossary',
    shortDesc: '30 terms explained',
    icon: '📚',
    href: '/learn/glossary',
    gradient: 'from-indigo-500 to-purple-500',
    shadow: 'shadow-indigo-200',
  },
];

// Quick categories for tab-like navigation
const categories = [
  { id: 'tools', label: 'Tools', icon: '🛠️' },
  { id: 'learn', label: 'Learn', icon: '📖' },
  { id: 'guides', label: 'Guides', icon: '🗺️' },
];

const learnItems = [
  { name: 'First Salary Plan', href: '/learn/first-salary-plan', icon: '💼' },
  { name: 'Beginner Investing', href: '/learn/beginner-investing-path', icon: '🌱' },
  { name: 'Safety vs Growth', href: '/learn/safety-vs-growth', icon: '⚖️' },
  { name: 'Govt Schemes Guide', href: '/learn/government-schemes-simple', icon: '🏛️' },
];

const guideItems = [
  { name: 'First Salary Guide', href: '/guides/first-salary', icon: '📖' },
  { name: 'Invest Savings India', href: '/invest/invest-savings-india', icon: '💰' },
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('tools');

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-white">
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
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-medium transition-colors"
          >
            <span className="hidden sm:inline">Explore Investments →</span>
            <span className="sm:hidden">Invest →</span>
          </Link>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">

      {/* Hero - Compact */}
      <section className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="max-w-5xl mx-auto text-center">
          <div 
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] sm:text-xs font-medium mb-3 sm:mb-4 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          >
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            100% Free • No Signup
          </div>
          
          <h1 
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight transition-all duration-500 delay-100 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          >
            Simple tools to understand{' '}
            <span className="text-orange-500">your money</span>
          </h1>
          
          <p 
            className={`text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 transition-all duration-500 delay-200 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          >
            Free financial tools for India. No jargon, no selling, no signup.
          </p>
        </div>
      </section>

      {/* Tools Grid - Prominent */}
      <section className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
        <div className="max-w-5xl mx-auto">
          {/* Category Tabs */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 sm:gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                    : 'bg-white text-gray-600 hover:bg-gray-200 border border-gray-100'
                }`}
              >
                <span className="text-sm sm:text-base">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tools Tab */}
          {activeCategory === 'tools' && (
            <div className={`grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 transition-all duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
              {allTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="group relative bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-4 md:p-5 hover:shadow-xl hover:border-gray-200 transition-all duration-200"
                >
                  {tool.popular && (
                    <span className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 px-1.5 sm:px-2 py-0.5 bg-orange-500 text-white text-[8px] sm:text-[10px] font-bold rounded-full uppercase">
                      Popular
                    </span>
                  )}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-xl sm:text-2xl mb-2 sm:mb-3 shadow-lg ${tool.shadow} group-hover:scale-110 transition-transform`}>
                    {tool.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1 group-hover:text-orange-600 transition-colors">{tool.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 font-semibold">{tool.shortDesc}</p>
                </Link>
              ))}
            </div>
          )}

          {/* Learn Tab */}
          {activeCategory === 'learn' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {learnItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group bg-white rounded-lg sm:rounded-xl border border-gray-100 p-3 sm:p-4 hover:shadow-lg hover:border-gray-200 transition-all text-center"
                >
                  <span className="text-2xl sm:text-3xl block mb-1.5 sm:mb-2">{item.icon}</span>
                  <h3 className="font-medium text-gray-900 text-xs sm:text-sm group-hover:text-orange-600 transition-colors">{item.name}</h3>
                </Link>
              ))}
            </div>
          )}

          {/* Guides Tab */}
          {activeCategory === 'guides' && (
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 max-w-md mx-auto">
              {guideItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group bg-white rounded-lg sm:rounded-xl border border-gray-100 p-3 sm:p-4 hover:shadow-lg hover:border-gray-200 transition-all text-center"
                >
                  <span className="text-2xl sm:text-3xl block mb-1.5 sm:mb-2">{item.icon}</span>
                  <h3 className="font-medium text-gray-900 text-xs sm:text-sm group-hover:text-orange-600 transition-colors">{item.name}</h3>
                </Link>
              ))}
            </div>
          )}

          {/* View all link */}
          <div className="text-center mt-4 sm:mt-6">
            <Link
              href="/tools"
              className="text-xs sm:text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              View all tools & guides →
            </Link>
          </div>
        </div>
      </section>

      </div>

      {/* Quick Access Cards - Like ClearTax */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Quick Start</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              {/* New Earner */}
              <Link 
                href="/learn/first-salary-plan"
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-2xl mb-4 shadow-lg shadow-emerald-200">
                  💼
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  Just got your first salary?
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  Start here. A calm, step-by-step plan for new earners.
                </p>
                <span className="text-emerald-600 text-sm font-medium">Read the guide →</span>
              </Link>

              {/* Beginner */}
              <Link 
                href="/invest"
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-2xl mb-4 shadow-lg shadow-orange-200">
                  🎯
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  Want to invest but confused?
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  Tell us your situation. We'll show options that fit.
                </p>
                <span className="text-orange-600 text-sm font-medium">Try Investment Explorer →</span>
              </Link>

              {/* Govt Schemes */}
              <Link 
                href="/tools/government-schemes"
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-2xl mb-4 shadow-lg shadow-blue-200">
                  🏛️
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Looking for safe options?
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  Explore government-backed schemes like PPF, NPS, SCSS.
                </p>
                <span className="text-blue-600 text-sm font-medium">Explore schemes →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-500 mb-1">100%</div>
                <div className="text-sm text-gray-500">Free Forever</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-500 mb-1">0</div>
                <div className="text-sm text-gray-500">Data Collected</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-500 mb-1">No</div>
                <div className="text-sm text-gray-500">Signup Required</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Adaily?</h2>
            <p className="text-gray-600 mb-8">
              Most financial tools overwhelm you with options, push products, or want your data.
              <br />
              <span className="font-semibold text-gray-900">We just help you understand.</span>
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: '🔒', title: 'Privacy First', desc: 'No accounts, no tracking' },
                { icon: '⚡', title: 'Simple & Fast', desc: 'Get answers in seconds' },
                { icon: '🇮🇳', title: 'Made for India', desc: 'Indian options & rules' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                  <span className="text-2xl block mb-2">{item.icon}</span>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
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
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to explore?</h2>
            <p className="text-gray-600 mb-6">Pick a tool and start understanding your options.</p>
            <Link
              href="/invest"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all hover:scale-105"
            >
              Start with Investment Explorer
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Image 
                  src="/logo.svg" 
                  alt="Adaily" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6"
                />
                <span className="font-semibold text-gray-900">Adaily</span>
                <span className="text-gray-400 text-xs sm:text-sm ml-1 sm:ml-2 hidden sm:inline">— Simple financial tools</span>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
                <Link href="/tools" className="hover:text-orange-500 transition-colors">Tools</Link>
                <Link href="/learn/glossary" className="hover:text-orange-500 transition-colors">Glossary</Link>
                <Link href="/about/dna" className="hover:text-orange-500 transition-colors">About</Link>
                <Link href="/about/what-we-wont-do" className="hover:text-orange-500 transition-colors hidden sm:inline">What We Won't Do</Link>
              </div>
            </div>

            <div className="text-center mt-4 sm:mt-6 text-gray-400 text-xs sm:text-sm">
              Made with ❤️ in India • © {new Date().getFullYear()} Adaily
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
