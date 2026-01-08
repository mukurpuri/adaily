'use client';

/**
 * Investment Advisor Page - Adaily Invest
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * YC-inspired light theme with orange accents + Gamification!
 * Clean, minimal, professional, and FUN.
 */

import { useState, useMemo, useEffect } from 'react';
import type { UserInputs, ScoredBucket } from '@/lib/scoringEngine';
import { getRecommendations } from '@/lib/scoringEngine';
import type { GoalType } from '@/lib/investmentBuckets';

// ─────────────────────────────────────────────────────────────────────────────
// Utility Functions
// ─────────────────────────────────────────────────────────────────────────────

function formatIndianNumber(num: number): string {
  if (isNaN(num) || num === 0) return '0';
  const numStr = Math.floor(num).toString();
  const lastThree = numStr.slice(-3);
  const otherNumbers = numStr.slice(0, -3);
  if (otherNumbers !== '') {
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  }
  return lastThree;
}

function numberToIndianWords(num: number): string {
  if (isNaN(num) || num === 0) return 'Zero Rupees';
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

function parseReturnsPercentage(returnsStr: string): number {
  const match = returnsStr.match(/(\d+(?:\.\d+)?)/);
  if (match) return parseFloat(match[1]);
  return 7;
}

function calculateFutureValue(principal: number, annualRate: number, months: number): number {
  const years = months / 12;
  return principal * Math.pow(1 + annualRate / 100, years);
}

// ─────────────────────────────────────────────────────────────────────────────
// Gamification Functions
// ─────────────────────────────────────────────────────────────────────────────

function getMilestone(futureValue: number): { level: number; title: string; emoji: string; nextAt: number } | null {
  const milestones = [
    { level: 1, min: 100000, title: '1 Lakh Club', emoji: '🥉', nextAt: 500000 },
    { level: 2, min: 500000, title: '5 Lakh Club', emoji: '🥈', nextAt: 1000000 },
    { level: 3, min: 1000000, title: '10 Lakh Club', emoji: '🥇', nextAt: 2500000 },
    { level: 4, min: 2500000, title: '25 Lakh Club', emoji: '💎', nextAt: 5000000 },
    { level: 5, min: 5000000, title: '50 Lakh Club', emoji: '👑', nextAt: 10000000 },
    { level: 6, min: 10000000, title: 'Crorepati Club', emoji: '🏆', nextAt: 50000000 },
    { level: 7, min: 50000000, title: '5 Crore Club', emoji: '🚀', nextAt: 100000000 },
  ];
  
  for (let i = milestones.length - 1; i >= 0; i--) {
    if (futureValue >= milestones[i].min) {
      return milestones[i];
    }
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────

function FitBadge({ level }: { level: ScoredBucket['fitLevel'] }) {
  const styles = {
    EXCELLENT: 'bg-brand/15 text-brand-dark border-orange-200',
    GOOD: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    MODERATE: 'bg-amber-100 text-amber-700 border-amber-200',
    POOR: 'bg-gray-100 text-gray-500 border-gray-200',
  };
  const labels = {
    EXCELLENT: '🎯 Excellent Fit',
    GOOD: '✓ Good Fit',
    MODERATE: '~ Moderate',
    POOR: '⚠ Not Ideal',
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles[level]}`}>
      {labels[level]}
    </span>
  );
}

// Share Results Component
function ShareButton({ 
  capital, 
  timeHorizon, 
  topResult 
}: { 
  capital: number; 
  timeHorizon: string;
  topResult: ScoredBucket | null;
}) {
  const [copied, setCopied] = useState(false);
  
  const handleShare = async () => {
    if (!topResult) return;
    
    const timeLabel = parseInt(timeHorizon) >= 12 
      ? `${Math.round(parseInt(timeHorizon) / 12)} year${Math.round(parseInt(timeHorizon) / 12) > 1 ? 's' : ''}` 
      : `${timeHorizon} months`;
    
    const shareText = `🎯 My Top Investment Pick from Adaily:

💰 Amount: ₹${formatIndianNumber(capital)}
⏱️ Duration: ${timeLabel}
📊 Recommendation: ${topResult.bucket.emoji} ${topResult.bucket.name}
📈 Expected Returns: ${topResult.bucket.expectedReturns}

Find your best investment options at adaily.in ✨`;

    // Try Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Investment Recommendation - Adaily',
          text: shareText,
          url: 'https://adaily.in',
        });
        return;
      } catch {
        // User cancelled or share failed, fall through to clipboard
      }
    }
    
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard failed
      alert('Could not copy to clipboard');
    }
  };
  
  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
    >
      {copied ? (
        <>
          <span className="text-emerald-500">✓</span>
          <span className="text-emerald-600">Copied!</span>
        </>
      ) : (
        <>
          <span>📤</span>
          <span>Share Results</span>
        </>
      )}
    </button>
  );
}

function ConfettiEffect() {
  const colors = ['#f97316', '#22c55e', '#3b82f6', '#a855f7', '#eab308', '#ec4899'];
  const particles = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-2 h-2 rounded-full animate-confetti"
          style={{
            left: `${p.x}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}


function CompactCard({ result, rank, capital, months, onSelect, index }: { 
  result: ScoredBucket; 
  rank: number; 
  capital: number; 
  months: number;
  onSelect: () => void;
  index: number;
}) {
  const returnsPercent = parseReturnsPercentage(result.bucket.expectedReturns);
  const futureValue = calculateFutureValue(capital, returnsPercent, months);
  const profit = futureValue - capital;
  const growthPercent = capital > 0 ? ((futureValue - capital) / capital) * 100 : 0;
  
  const riskColors = {
    LOW: 'bg-emerald-100 text-emerald-700',
    MEDIUM: 'bg-amber-100 text-amber-700',
    HIGH: 'bg-rose-100 text-rose-700',
  };
  
  const riskBarColors = {
    LOW: 'from-emerald-400 to-emerald-500',
    MEDIUM: 'from-amber-400 to-amber-500',
    HIGH: 'from-rose-400 to-rose-500',
  };

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-brand/50 hover:-translate-y-1 group overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={onSelect}
    >
      {/* Top Progress Bar */}
      <div className="h-1 bg-gray-100">
        <div 
          className={`h-full bg-gradient-to-r ${riskBarColors[result.bucket.riskLevel]} transition-all duration-500`}
          style={{ width: `${Math.min(growthPercent, 100)}%` }}
        />
      </div>
      
      <div className="p-4">
        {/* Header: Rank, Badges */}
        <div className="flex items-center justify-between mb-3">
          <span className="bg-brand/15 text-brand text-[13px] font-bold px-2 py-0.5 rounded-full">#{rank}</span>
          <span className="flex gap-1.5 flex-wrap justify-end">
            {result.bucket.isGovernmentBacked && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                🏛️ Govt Backed
              </span>
            )}
            <FitBadge level={result.fitLevel} />
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${riskColors[result.bucket.riskLevel]}`}>
              {result.bucket.riskLevel} Risk
            </span>
          </span>
        </div>
        
        {/* Icon & Name */}
        <div className="text-center mb-3">
          <div className="text-3xl mb-1">{result.bucket.emoji}</div>
          <h3 className="font-bold text-gray-900 text-sm leading-tight">{result.bucket.name}</h3>
          <div className="text-brand font-semibold text-xs mt-0.5">{result.bucket.expectedReturns}</div>
        </div>
        
        {/* Why This Fits You - Personalized */}
        {result.whyThisFitsYou && (
          <div className="bg-gradient-to-r from-brand/5 to-emerald-50 border border-brand/10 rounded-lg p-2.5 mb-3">
            <div className="text-[10px] text-brand font-bold mb-0.5 flex items-center gap-1">
              <span>✨</span> Why this fits you
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              {result.whyThisFitsYou}
            </p>
          </div>
        )}
        
        {/* Money Journey Visual */}
        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-gray-500">Today</span>
            <span className="text-gray-500">Future</span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand to-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(50 + growthPercent / 2, 100)}%` }}
            />
            <div className="absolute left-0 top-0 h-full w-1/2 bg-brand rounded-l-full" />
          </div>
          
          {/* Values */}
          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="text-gray-800 font-bold text-xs">₹{formatIndianNumber(capital)}</div>
            </div>
            <div className="text-center">
              <span className="text-emerald-600 font-bold text-[10px]">+{growthPercent.toFixed(0)}%</span>
            </div>
            <div className="text-right">
              <div className="text-emerald-600 font-bold text-xs">₹{formatIndianNumber(Math.round(futureValue))}</div>
            </div>
          </div>
        </div>
        
        {/* Profit Highlight */}
        <div className="bg-emerald-50 rounded-lg p-2 text-center mb-2">
          <div className="text-[10px] text-emerald-600">You earn</div>
          <div className="text-emerald-700 font-bold text-lg">+₹{formatIndianNumber(Math.round(profit))}</div>
        </div>
        
        {/* Tax Info - Detailed */}
        {(result.bucket.taxBenefit || result.bucket.taxOnReturns) && (
          <div className="bg-violet-50 border border-violet-100 rounded-lg p-2.5 mb-2">
            {result.bucket.taxBenefit && (
              <div className="mb-1">
                <div className="text-[10px] text-violet-800 font-bold flex items-center gap-1">
                  <span>💰</span> Tax Benefit
                </div>
                <div className="text-[11px] text-violet-700 mt-0.5 leading-tight">
                  {result.bucket.taxBenefit}
                </div>
              </div>
            )}
            {result.bucket.taxOnReturns && (
              <div className={result.bucket.taxBenefit ? 'pt-1.5 border-t border-violet-200' : ''}>
                <div className="text-[10px] text-violet-600 font-bold flex items-center gap-1">
                  <span>📋</span> Tax on Returns
                </div>
                <div className="text-[11px] text-violet-600 mt-0.5 leading-tight">
                  {result.bucket.taxOnReturns}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* View More */}
        <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-brand font-medium">Click for details →</span>
        </div>
      </div>
    </div>
  );
}

function DetailModal({ result, capital, months, onClose }: { 
  result: ScoredBucket; 
  capital: number; 
  months: number;
  onClose: () => void;
}) {
  const returnsPercent = parseReturnsPercentage(result.bucket.expectedReturns);
  const futureValue = calculateFutureValue(capital, returnsPercent, months);
  
  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-end sm:items-center justify-center sm:p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 rounded-t-2xl p-3 sm:p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand/10 flex items-center justify-center text-xl sm:text-2xl shrink-0">
              {result.bucket.emoji}
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 truncate">{result.bucket.name}</h2>
              <p className="text-gray-500 text-xs sm:text-sm line-clamp-1">{result.bucket.description}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors shrink-0 ml-2"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4 sm:p-6">
          
          {/* Stats Grid - 2x2 on mobile, 4 cols on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
              <div className="text-gray-400 text-[10px] sm:text-xs uppercase">Returns</div>
              <div className="text-brand font-bold text-xs sm:text-sm">{result.bucket.expectedReturns}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
              <div className="text-gray-400 text-[10px] sm:text-xs uppercase">Risk</div>
              <div className={`font-bold text-xs sm:text-sm ${
                result.bucket.riskLevel === 'LOW' ? 'text-emerald-600' :
                result.bucket.riskLevel === 'MEDIUM' ? 'text-amber-600' : 'text-rose-600'
              }`}>{result.bucket.riskLevel}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
              <div className="text-gray-400 text-[10px] sm:text-xs uppercase">Minimum</div>
              <div className="text-gray-800 font-bold text-xs sm:text-sm">₹{result.bucket.minInvestment.toLocaleString('en-IN')}</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-2 sm:p-3 text-center">
              <div className="text-emerald-600 text-[10px] sm:text-xs uppercase">You&apos;ll Get</div>
              <div className="text-emerald-700 font-bold text-xs sm:text-sm">₹{formatIndianNumber(Math.round(futureValue))}</div>
            </div>
          </div>
          
          {/* Match Reasons */}
          {result.matchReasons.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {result.matchReasons.map((reason, i) => (
                <span key={i} className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] sm:text-xs font-medium">✓ {reason}</span>
              ))}
            </div>
          )}
          
          {/* Warnings */}
          {result.warningReasons.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {result.warningReasons.map((reason, i) => (
                <span key={i} className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-amber-50 text-amber-700 rounded-lg text-[10px] sm:text-xs font-medium">⚠ {reason}</span>
              ))}
            </div>
          )}
          
          {/* Content */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h4 className="text-gray-900 font-bold text-xs sm:text-sm mb-1.5 sm:mb-2">What is it?</h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{result.bucket.whatItIs}</p>
            </div>
            
            <div>
              <h4 className="text-gray-900 font-bold text-xs sm:text-sm mb-1.5 sm:mb-2">Why consider this?</h4>
              <ul className="space-y-1">
                {result.bucket.whyConsider.map((item, i) => (
                  <li key={i} className="text-gray-600 text-xs sm:text-sm flex items-start gap-2">
                    <span className="text-brand">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-gray-900 font-bold text-xs sm:text-sm mb-1.5 sm:mb-2">Watch out for</h4>
              <ul className="space-y-1">
                {result.bucket.warnings.map((item, i) => (
                  <li key={i} className="text-gray-600 text-xs sm:text-sm flex items-start gap-2">
                    <span className="text-amber-500">!</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-gray-900 font-bold text-xs sm:text-sm mb-1.5 sm:mb-2">How to get started</h4>
              <ol className="space-y-1">
                {result.bucket.howToStart.map((item, i) => (
                  <li key={i} className="text-gray-600 text-xs sm:text-sm flex items-start gap-2">
                    <span className="text-brand font-bold">{i + 1}.</span> {item}
                  </li>
                ))}
              </ol>
            </div>
            
            <div>
              <h4 className="text-gray-900 font-bold text-xs sm:text-sm mb-1.5 sm:mb-2">Platforms</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {result.bucket.platforms.map((platform, i) => (
                  <span key={i} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs sm:text-sm font-medium">{platform}</span>
                ))}
              </div>
            </div>
            
            {(result.bucket.taxBenefit || result.bucket.taxOnReturns) && (
              <div className="bg-violet-50 border border-violet-100 rounded-xl p-3 sm:p-4">
                <h4 className="text-violet-800 font-bold text-xs sm:text-sm mb-1.5 sm:mb-2">💰 Tax Info</h4>
                {result.bucket.taxBenefit && <p className="text-gray-600 text-xs sm:text-sm"><span className="text-emerald-600 font-medium">Benefit:</span> {result.bucket.taxBenefit}</p>}
                {result.bucket.taxOnReturns && <p className="text-gray-600 text-xs sm:text-sm mt-1"><span className="text-amber-600 font-medium">Tax:</span> {result.bucket.taxOnReturns}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export default function InvestPage() {
  // Form state
  const [showResults, setShowResults] = useState(false);
  const [capitalRaw, setCapitalRaw] = useState<number>(100000);
  const [capitalDisplay, setCapitalDisplay] = useState<string>('1,00,000');
  const [timeHorizon, setTimeHorizon] = useState<string>('36');
  const [riskPreference, setRiskPreference] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [needsLiquidity, setNeedsLiquidity] = useState(false);
  const [goal, setGoal] = useState<GoalType>('GROWTH');
  const [experience, setExperience] = useState<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('BEGINNER');
  
  // Beginner mode - hides advanced options for simpler UX
  const [isBeginnerMode, setIsBeginnerMode] = useState(true);
  
  const handleCapitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const numValue = parseInt(rawValue) || 0;
    setCapitalRaw(numValue);
    setCapitalDisplay(formatIndianNumber(numValue));
  };

  const inputs: UserInputs = useMemo(() => ({
    capital: capitalRaw,
    timeHorizonMonths: parseInt(timeHorizon) || 12,
    riskPreference,
    needsLiquidity,
    goal,
    experience,
  }), [capitalRaw, timeHorizon, riskPreference, needsLiquidity, goal, experience]);

  const [sortBy, setSortBy] = useState<'fit' | 'earnings' | 'risk'>('fit');
  
  // Handle browser back button and scroll to top when results appear
  useEffect(() => {
    if (showResults) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      // Push a new history state when results are shown
      window.history.pushState({ showResults: true }, '', window.location.href);
    }
  }, [showResults]);
  
  // Listen for browser back button
  useEffect(() => {
    const handlePopState = () => {
      // When back button is pressed, go back to form
      if (showResults) {
        setShowResults(false);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [showResults]);
  
  const recommendations = useMemo(() => getRecommendations(inputs), [inputs]);
  
  // Sort recommendations based on selected criteria
  const sortedRecommendations = useMemo(() => {
    const sorted = [...recommendations];
    
    if (sortBy === 'earnings') {
      sorted.sort((a, b) => {
        const aReturns = parseReturnsPercentage(a.bucket.expectedReturns);
        const bReturns = parseReturnsPercentage(b.bucket.expectedReturns);
        return bReturns - aReturns; // Higher returns first
      });
    } else if (sortBy === 'risk') {
      const riskOrder = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3 };
      sorted.sort((a, b) => riskOrder[a.bucket.riskLevel] - riskOrder[b.bucket.riskLevel]); // Low risk first
    }
    // 'fit' is already sorted by the scoring engine
    
    return sorted;
  }, [recommendations, sortBy]);
  
  const topRecommendation = recommendations.length > 0 ? recommendations[0] : null;
  
  const futureValue = useMemo(() => {
    if (!topRecommendation) return 0;
    return calculateFutureValue(capitalRaw, parseReturnsPercentage(topRecommendation.bucket.expectedReturns), parseInt(timeHorizon) || 12);
  }, [capitalRaw, topRecommendation, timeHorizon]);
  

  const milestone = useMemo(() => getMilestone(futureValue), [futureValue]);
  const [selectedBucket, setSelectedBucket] = useState<ScoredBucket | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Show confetti for big milestones
  const showConfetti = milestone && milestone.level >= 3;
  const confettiKey = `${milestone?.level}-${Math.floor(futureValue / 100000)}`;

  // ─────────────────────────────────────────────────────────────────────────────
  // WELCOME FORM VIEW
  // ─────────────────────────────────────────────────────────────────────────────
  if (!showResults) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 font-sans">
        <div className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 py-6">
          {/* Logo & Title */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <img src="/logo.svg" alt="Adaily" className="w-10 h-10" />
              <span className="text-2xl font-bold text-gray-900">Adaily</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Where should you invest?
            </h1>
            <p className="text-gray-500 text-sm">
              Answer 4 quick questions. Get personalized recommendations.
            </p>
          </div>
          
          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-orange-900/10 border border-orange-200/50 p-6 sm:p-8 w-full max-w-lg">
            <div className="space-y-6">
            
              {/* Capital Input - Green theme */}
              <div>
                <label className="block text-gray-600 font-medium text-sm mb-2">
                  💵 Investment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-semibold text-xl">₹</span>
                  <input
                    type="text"
                    value={capitalDisplay}
                    onChange={handleCapitalChange}
                    className="w-full pl-11 pr-4 py-4 bg-emerald-50 border border-emerald-200 rounded-xl text-gray-900 font-bold text-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all text-center"
                    placeholder="1,00,000"
                  />
                </div>
                <p className="text-center text-sm text-gray-400 mt-1.5">{numberToIndianWords(capitalRaw)}</p>
              </div>
            
              {/* Time Horizon - Slider with Blue theme */}
              <div>
                <label className="block text-gray-600 font-medium text-sm mb-3">
                  ⏱️ When do you need the money back
                </label>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">
                      {timeHorizon === '12' ? '⚡' : 
                       timeHorizon === '36' ? '📅' : 
                       timeHorizon === '60' ? '🎯' : 
                       timeHorizon === '84' ? '🌱' : 
                       timeHorizon === '120' ? '🌳' : '🏔️'}
                    </span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold text-gray-800">
                          {timeHorizon === '12' ? 'Less than 1 year' : 
                           timeHorizon === '36' ? '1-3 years' : 
                           timeHorizon === '60' ? '3-5 years' : 
                           timeHorizon === '84' ? '5-7 years' : 
                           timeHorizon === '120' ? '7-10 years' : '10+ years'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        value={['12', '36', '60', '84', '120', '180'].indexOf(timeHorizon)}
                        onChange={(e) => {
                          const values = ['12', '36', '60', '84', '120', '180'];
                          setTimeHorizon(values[parseInt(e.target.value)]);
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Short</span>
                        <span>Long term</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
              {/* Risk Level - Color coded by risk */}
              <div>
                <label className="block text-gray-600 font-medium text-sm mb-2">
                  🎲 Risk (Can you handle ups & downs)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'LOW', label: 'Safe', emoji: '🛡️', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-400', textColor: 'text-emerald-600' },
                    { value: 'MEDIUM', label: 'Balanced', emoji: '⚖️', bgColor: 'bg-amber-50', borderColor: 'border-amber-400', textColor: 'text-amber-600' },
                    { value: 'HIGH', label: 'Aggressive', emoji: '🚀', bgColor: 'bg-rose-50', borderColor: 'border-rose-400', textColor: 'text-rose-600' },
                  ].map((item) => {
                    const isSelected = riskPreference === item.value;
                    return (
                      <button
                        key={item.value}
                        onClick={() => setRiskPreference(item.value as typeof riskPreference)}
                        className={`py-3 rounded-xl border transition-all text-center ${
                          isSelected
                            ? `${item.bgColor} ${item.borderColor} shadow-sm`
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-lg mb-0.5">{item.emoji}</div>
                        <div className={`text-xs font-medium ${isSelected ? item.textColor : 'text-gray-500'}`}>{item.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            
              {/* Goal - Purple theme */}
              <div>
                <label className="block text-gray-600 font-medium text-sm mb-2">
                  🎯 What&apos;s the goal?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: 'SAFETY', label: 'Safety', emoji: '🛡️' },
                    { value: 'GROWTH', label: 'Growth', emoji: '📈' },
                    { value: 'INCOME', label: 'Income', emoji: '💵' },
                    { value: 'TAX_SAVING', label: 'Tax', emoji: '🧾' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setGoal(item.value as GoalType)}
                      className={`py-3 rounded-xl border transition-all text-center ${
                        goal === item.value
                          ? 'bg-violet-50 border-violet-400 shadow-sm'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-lg mb-0.5">{item.emoji}</div>
                      <div className={`text-[10px] font-medium ${goal === item.value ? 'text-violet-600' : 'text-gray-500'}`}>{item.label}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Advanced Options Toggle */}
              <div className="border-t border-gray-100 pt-4">
                <button
                  onClick={() => setIsBeginnerMode(!isBeginnerMode)}
                  className="w-full flex items-center justify-between text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>{isBeginnerMode ? '⚙️' : '✓'}</span>
                    <span>{isBeginnerMode ? 'Show advanced options' : 'Hide advanced options'}</span>
                  </span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${isBeginnerMode ? '' : 'rotate-180'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Advanced Options - Hidden in Beginner Mode */}
                <div className={`overflow-hidden transition-all duration-300 ${isBeginnerMode ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100 mt-4'}`}>
                  <div className="space-y-4">
                    {/* Liquidity */}
                    <div>
                      <label className="block text-gray-600 font-medium text-sm mb-2">
                        🔓 Need Quick Access?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setNeedsLiquidity(true)}
                          className={`py-2.5 px-4 rounded-xl border transition-all text-sm font-medium ${
                            needsLiquidity ? 'border-cyan-400 bg-cyan-50 text-cyan-700' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                          }`}
                        >Yes, anytime</button>
                        <button
                          type="button"
                          onClick={() => setNeedsLiquidity(false)}
                          className={`py-2.5 px-4 rounded-xl border transition-all text-sm font-medium ${
                            !needsLiquidity ? 'border-cyan-400 bg-cyan-50 text-cyan-700' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                          }`}
                        >Can lock it</button>
                      </div>
                    </div>
                    
                    {/* Experience */}
                    <div>
                      <label className="block text-gray-600 font-medium text-sm mb-2">
                        📚 Investment Experience
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'BEGINNER', label: 'Beginner', emoji: '🌱' },
                          { value: 'INTERMEDIATE', label: 'Some', emoji: '🌿' },
                          { value: 'ADVANCED', label: 'Expert', emoji: '🌳' },
                        ].map((item) => (
                          <button
                            key={item.value}
                            onClick={() => setExperience(item.value as typeof experience)}
                            className={`py-2.5 rounded-xl border transition-all text-center ${
                              experience === item.value
                                ? 'bg-gray-100 border-gray-400 shadow-sm'
                                : 'bg-white border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-base mb-0.5">{item.emoji}</div>
                            <div className={`text-[10px] font-medium ${experience === item.value ? 'text-gray-700' : 'text-gray-500'}`}>{item.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Submit Button - Enhanced CTA */}
              <button
                onClick={() => setShowResults(true)}
                className="w-full py-4 bg-gradient-to-r from-brand to-orange-500 hover:from-brand-dark hover:to-orange-600 text-white font-bold rounded-xl transition-all text-lg shadow-lg shadow-brand/30 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Find My Best Options →
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-2">
                Free • No signup • Takes 30 seconds
              </p>
            </div>
          </div>
          
          {/* Footer */}
          <p className="mt-8 text-gray-400 text-sm">
            Made with 🧡 by <span className="font-medium">Adaily</span>
          </p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // RESULTS VIEW
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 font-sans relative">
      {showConfetti && <ConfettiEffect key={confettiKey} />}
      
      {/* Detail Modal */}
      {selectedBucket && (
        <DetailModal 
          result={selectedBucket} 
          capital={capitalRaw} 
          months={parseInt(timeHorizon) || 12}
          onClose={() => setSelectedBucket(null)} 
        />
      )}
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-10xl mx-auto px-3 md:px-4 py-2 md:py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/logo.svg" alt="Adaily Invest" className="w-8 h-8 md:w-10 md:h-10" />
            <div>
              <div className="font-bold text-base md:text-lg text-gray-900 tracking-tight">Adaily</div>
              <div className="text-[10px] md:text-xs text-gray-400 hidden sm:block">Your Finance Dashboard</div>
            </div>
          </div>
          <nav className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setShowResults(false)}
              className="text-xs md:text-sm font-medium text-gray-500 hover:text-brand transition-colors flex items-center gap-1"
            >
              ← Start Over
            </button>
            <span className="text-gray-300">|</span>
            <span className="text-xs md:text-sm font-medium text-brand">
              Investments
            </span>
          </nav>
        </div>
      </header>

      {/* Mobile Filter Toggle with Preview - Sticky on mobile */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-[49px] z-40 shadow-sm">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full px-4 py-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">✏️ Edit Inputs</span>
            {!showMobileFilters && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">₹{formatIndianNumber(capitalRaw)}</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{timeHorizon}mo</span>
                <span className={`px-2 py-0.5 rounded-full ${
                  riskPreference === 'LOW' ? 'bg-emerald-100 text-emerald-700' :
                  riskPreference === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                  'bg-rose-100 text-rose-700'
                }`}>{riskPreference}</span>
              </div>
            )}
          </div>
          <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${showMobileFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-57px)]">
        {/* Sidebar - Smooth expand/collapse on mobile */}
        <aside className={`lg:block w-full lg:w-80 shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 overflow-hidden lg:overflow-y-auto lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)] transition-all duration-300 ease-in-out ${showMobileFilters ? 'max-h-[2000px] opacity-100' : 'max-h-0 lg:max-h-none opacity-0 lg:opacity-100'}`}>
          <div className="p-4 lg:p-5 divide-y divide-gray-100">

            {/* Capital */}
            <div className="pb-5">
              <label className="block text-gray-700 font-semibold text-sm mb-2">💰 Investment Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 font-medium">₹</span>
                <input
                  type="text"
                  value={capitalDisplay}
                  onChange={handleCapitalChange}
                  className="w-full pl-8 pr-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-gray-900 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                  placeholder="1,00,000"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5 italic">{numberToIndianWords(capitalRaw)}</p>
            </div>

            {/* Time Horizon */}
            <div className="py-5">
              <label className="block text-gray-700 font-semibold text-sm mb-2">⏱️ When do you need it back?</label>
              <div className="relative">
                <select
                  value={timeHorizon}
                  onChange={(e) => setTimeHorizon(e.target.value)}
                  className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all appearance-none cursor-pointer"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                >
                  <option value="3">Less than 3 months</option>
                  <option value="6">3-6 months</option>
                  <option value="12">6-12 months</option>
                  <option value="24">1-2 years</option>
                  <option value="36">2-3 years</option>
                  <option value="60">3-5 years</option>
                  <option value="84">5-7 years</option>
                  <option value="120">7-10 years</option>
                  <option value="180">10+ years</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Risk Preference */}
            <div className="py-5">
              <label className="block text-gray-700 font-semibold text-sm mb-2">🎲 Can you handle ups & downs?</label>
              <div className="grid grid-cols-3 gap-2">
                {(['LOW', 'MEDIUM', 'HIGH'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setRiskPreference(level)}
                    className={`py-2.5 px-2 rounded-lg border transition-all text-sm font-semibold ${
                      riskPreference === level
                        ? level === 'LOW' ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                          : level === 'MEDIUM' ? 'border-amber-400 bg-amber-50 text-amber-700'
                          : 'border-rose-400 bg-rose-50 text-rose-700'
                        : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Liquidity */}
            <div className="py-5">
              <label className="block text-gray-700 font-semibold text-sm mb-2">🔓 Need Quick Access?</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setNeedsLiquidity(true)}
                  className={`py-2.5 px-4 rounded-lg border transition-all text-sm font-semibold ${
                    needsLiquidity ? 'border-cyan-400 bg-cyan-50 text-cyan-700' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >Yes, anytime</button>
                <button
                  type="button"
                  onClick={() => setNeedsLiquidity(false)}
                  className={`py-2.5 px-4 rounded-lg border transition-all text-sm font-semibold ${
                    !needsLiquidity ? 'border-cyan-400 bg-cyan-50 text-cyan-700' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >Can lock it</button>
              </div>
            </div>

            {/* Goal */}
            <div className="py-5">
              <label className="block text-gray-700 font-semibold text-sm mb-2">🎯 What&apos;s the goal?</label>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { value: 'SAFETY', label: '🛡️ Safety' },
                  { value: 'GROWTH', label: '📈 Growth' },
                  { value: 'INCOME', label: '💵 Income' },
                  { value: 'TAX_SAVING', label: '🧾 Tax Save' },
                ] as const).map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setGoal(item.value)}
                    className={`p-2.5 rounded-lg border transition-all text-sm font-semibold ${
                      goal === item.value ? 'border-violet-400 bg-violet-50 text-violet-700' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >{item.label}</button>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="pt-5">
              <label className="block text-gray-700 font-semibold text-sm mb-2">📚 Experience</label>
              <div className="relative">
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value as typeof experience)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                >
                  <option value="BEGINNER">🌱 Beginner</option>
                  <option value="INTERMEDIATE">🌿 Intermediate</option>
                  <option value="ADVANCED">🌳 Advanced</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 max-w-6xl mx-auto">

            {/* Sort Controls & Share */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500">
                  {sortedRecommendations.length} investment options
                </div>
                <ShareButton capital={capitalRaw} timeHorizon={timeHorizon} topResult={topRecommendation} />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                <span className="text-xs sm:text-sm text-gray-500">Sort by:</span>
                <div className="flex bg-gray-100 rounded-lg p-0.5 w-full sm:w-auto overflow-x-auto">
                  <button
                    onClick={() => setSortBy('fit')}
                    className={`px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                      sortBy === 'fit' 
                        ? 'bg-white text-brand shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    🎯 Best Fit
                  </button>
                  <button
                    onClick={() => setSortBy('earnings')}
                    className={`px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                      sortBy === 'earnings' 
                        ? 'bg-white text-brand shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    💰 Returns
                  </button>
                  <button
                    onClick={() => setSortBy('risk')}
                    className={`px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                      sortBy === 'risk' 
                        ? 'bg-white text-brand shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    🛡️ Low Risk
                  </button>
                </div>
              </div>
            </div>

            {/* Results - Responsive Grid with Staggered Animation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {sortedRecommendations.map((result, i) => (
                <CompactCard 
                  key={result.bucket.id} 
                  result={result} 
                  rank={i + 1} 
                  capital={capitalRaw} 
                  months={parseInt(timeHorizon) || 12}
                  onSelect={() => setSelectedBucket(result)}
                  index={i}
                />
              ))}
            </div>

            {sortedRecommendations.length === 0 && (
              <div className="text-center py-10 md:py-16 bg-white rounded-xl border border-gray-200">
                <div className="text-4xl md:text-5xl mb-3 md:mb-4">🤔</div>
                <p className="text-gray-500 text-base md:text-lg px-4">No recommendations match your criteria.</p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-6 md:mt-10 bg-amber-50 border border-amber-200 rounded-xl p-4 md:p-5">
              <div className="flex items-start gap-3 md:gap-4">
                <span className="text-xl md:text-2xl">⚠️</span>
                <div>
                  <h4 className="text-amber-800 font-bold text-sm md:text-base mb-1">Important Disclaimer</h4>
                  <p className="text-amber-700 text-xs md:text-sm leading-relaxed">
                    This tool is for <strong>educational purposes only</strong>. Please consult a SEBI-registered advisor before investing.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-6 md:mt-8 pb-6 md:pb-8">
              <p className="text-gray-400 text-xs md:text-sm">Made with 🧡 by <span className="text-brand font-semibold">Adaily</span></p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

