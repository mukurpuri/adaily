'use client';

import { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

// Parse response to extract main content and follow-up questions
function parseResponse(text: string): { mainContent: string; followUpQuestions: string[] } {
  const followUpQuestions: string[] = [];
  
  // Find where follow-up questions start (look for --- or first [Q1])
  const separatorIndex = text.indexOf('---');
  const q1Index = text.indexOf('[Q1]');
  
  let splitIndex = text.length;
  
  if (separatorIndex !== -1) {
    splitIndex = separatorIndex;
  } else if (q1Index !== -1) {
    splitIndex = q1Index;
  }
  
  const mainContent = text.slice(0, splitIndex).trim();
  const followUpSection = text.slice(splitIndex);
  
  // Extract questions with [Q1], [Q2], [Q3] markers
  const questionRegex = /\[Q\d\]\s*([^\[]+)/g;
  let match;
  
  while ((match = questionRegex.exec(followUpSection)) !== null) {
    const question = match[1].trim().replace(/\n/g, ' ');
    if (question) {
      followUpQuestions.push(question);
    }
  }
  
  return { mainContent, followUpQuestions };
}

// Format response with highlighted terms and proper spacing
function FormattedResponse({ text, onAskQuestion }: { text: string; onAskQuestion?: (q: string) => void }) {
  if (!text) return null;
  
  const { mainContent, followUpQuestions } = parseResponse(text);
  
  // Split by bullet points to properly segment content
  const segments = mainContent.split(/(?=•)/g);
  
  const elements: React.ReactNode[] = [];
  let currentBullets: string[] = [];
  
  segments.forEach((segment, index) => {
    const trimmed = segment.trim();
    
    if (trimmed.startsWith('•')) {
      currentBullets.push(trimmed.slice(1).trim());
    } else if (trimmed) {
      // Flush any collected bullets first
      if (currentBullets.length > 0) {
        elements.push(
          <ul key={`bullets-${index}`} className="space-y-3 my-4">
            {currentBullets.map((bullet, bIndex) => (
              <li key={bIndex} className="flex items-start gap-3">
                <span className="text-amber-500 text-lg mt-0.5">•</span>
                <span className="flex-1 leading-relaxed">
                  <HighlightedText text={bullet} />
                </span>
              </li>
            ))}
          </ul>
        );
        currentBullets = [];
      }
      
      // Regular text paragraph
      elements.push(
        <p key={`p-${index}`} className="leading-relaxed my-3">
          <HighlightedText text={trimmed} />
        </p>
      );
    }
  });
  
  // Flush remaining bullets
  if (currentBullets.length > 0) {
    elements.push(
      <ul key="bullets-final" className="space-y-3 my-4">
        {currentBullets.map((bullet, bIndex) => (
          <li key={bIndex} className="flex items-start gap-3">
            <span className="text-amber-500 text-lg mt-0.5">•</span>
            <span className="flex-1 leading-relaxed">
              <HighlightedText text={bullet} />
            </span>
          </li>
        ))}
      </ul>
    );
  }
  
  return (
    <div>
      <div className="space-y-2">{elements}</div>
      
      {/* Follow-up Questions */}
      {followUpQuestions.length > 0 && onAskQuestion && (
        <div className="mt-6 pt-5 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-3">You might also want to know:</p>
          <div className="flex flex-col gap-2">
            {followUpQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onAskQuestion(q)}
                className="text-left px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-xl border border-amber-200 hover:border-amber-300 text-gray-700 hover:text-gray-900 transition-all text-sm"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Highlight **bold** terms with styled spans
function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const term = part.slice(2, -2);
          return (
            <span
              key={index}
              className="font-semibold text-amber-700 bg-gradient-to-r from-amber-100 to-orange-100 px-1.5 py-0.5 rounded border border-amber-300 mx-0.5"
            >
              {term}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

const questions = [
  { emoji: '💰', text: "I just got my first salary, now what?" },
  { emoji: '😅', text: "My salary disappears by month-end, help" },
  { emoji: '🤔', text: "How much should I actually save each month?" },
  { emoji: '🏠', text: "How much rent is too much rent?" },
  { emoji: '📱', text: "Is buying a phone on EMI a bad idea?" },
  { emoji: '✈️', text: "I want to travel AND save, is that possible?" },
  { emoji: '💳', text: "Credit card or debit card - what's safer?" },
  { emoji: '📈', text: "Everyone talks about SIPs, should I care?" },
  { emoji: '🌱', text: "Can I start investing with just ₹500?" },
  { emoji: '📊', text: "Stocks sound risky, am I being dumb?" },
  { emoji: '🪙', text: "My friend says buy gold, should I?" },
  { emoji: '🛡️', text: "What even is an emergency fund?" },
  { emoji: '🏥', text: "Insurance at 25, really? Why?" },
  { emoji: '📋', text: "Tax saving and investing - same thing?" },
  { emoji: '🎓', text: "Should I take a loan for masters degree?" },
  { emoji: '🚗', text: "How do people save for a car?" },
  { emoji: '🏃', text: "Am I behind compared to others my age?" },
  { emoji: '💸', text: "Loans vs savings - which first?" },
  { emoji: '🚪', text: "When can I afford to move out?" },
  { emoji: '🤫', text: "Should I tell my parents my salary?" },
];

async function streamChat(
  message: string,
  sessionId: string,
  onChunk: (chunk: string) => void,
  onDone: () => void,
  onError: (error: Error) => void,
) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sessionId }),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No reader');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) { onDone(); break; }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('data: ')) {
          const data = trimmed.slice(6);
          if (data === '[DONE]') { onDone(); return; }
          onChunk(data);
        }
      }
    }
  } catch (error) {
    onError(error instanceof Error ? error : new Error(String(error)));
  }
}

function SunPageContent() {
  const searchParams = useSearchParams();
  const [inputText, setInputText] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionId] = useState(() => generateId());
  const [hasAutoAsked, setHasAutoAsked] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (response && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [response]);

  // Handle query param from homepage
  useEffect(() => {
    const q = searchParams.get('q');
    if (q && !hasAutoAsked && !question) {
      setHasAutoAsked(true);
      // Small delay to let component mount
      setTimeout(() => {
        handleAskFromParam(q);
      }, 100);
    }
  }, [searchParams, hasAutoAsked, question]);

  const handleAskFromParam = async (text: string) => {
    if (!text || isStreaming) return;
    setQuestion(text);
    setResponse('');
    setIsStreaming(true);

    await streamChat(
      text,
      sessionId,
      (chunk) => setResponse((prev) => prev + chunk),
      () => setIsStreaming(false),
      (error) => {
        console.error(error);
        setResponse('Something went wrong. Please try again.');
        setIsStreaming(false);
      },
    );
  };

  const handleAsk = useCallback(async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText || isStreaming) return;

    setQuestion(messageText);
    setInputText('');
    setResponse('');
    setIsStreaming(true);

    await streamChat(
      messageText,
      sessionId,
      (chunk) => setResponse((prev) => prev + chunk),
      () => {
        setIsStreaming(false);
      },
      (error) => {
        console.error(error);
        setResponse('Something went wrong. Please try again.');
        setIsStreaming(false);
      },
    );
  }, [inputText, isStreaming, sessionId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const handleNewQuestion = () => {
    setQuestion('');
    setResponse('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-amber-50 via-orange-50/30 to-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-amber-100/50 px-4 sm:px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Adaily" width={28} height={28} />
            <span className="font-bold text-gray-800">Adaily</span>
          </Link>
          <Link 
            href="/tools"
            className="text-sm text-gray-500 hover:text-orange-500 transition-colors"
          >
            Explore Tools →
          </Link>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-8">
        {/* Hero */}
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <span className="text-5xl mb-3 block">☀️</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Ask Sun</h1>
          <p className="text-gray-500 hidden sm:block ">Questions everyone has but rarely asks out loud</p>
        </div>

        {/* Custom Question Input - Now First */}
        {!question && (
          <div className="mb-10 max-w-2xl mx-auto">
            <div className="relative">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your money question here..."
                disabled={isStreaming}
                rows={2}
                className="w-full px-5 py-4 pr-16 bg-white border-2 border-amber-200 rounded-2xl text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all disabled:opacity-50 text-lg"
              />
              <button
                onClick={() => handleAsk()}
                disabled={!inputText.trim() || isStreaming}
                className="absolute right-3 bottom-3 w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-xl flex items-center justify-center font-bold hover:from-amber-500 hover:to-orange-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-orange-200"
              >
                ↑
              </button>
            </div>
          </div>
        )}

        {/* Questions - Scattered Layout Below Input */}
        {!question && (
          <div className="mb-8">
            <p className="text-center text-sm text-gray-400 mb-6">or pick a question everyone asks</p>
            <div className="flex flex-wrap justify-center gap-3">
              {questions.map((q) => (
                <button
                  key={q.text}
                  onClick={() => handleAsk(q.text)}
                  disabled={isStreaming}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-amber-100 hover:border-amber-300 hover:shadow-md transition-all text-left group disabled:opacity-50"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">{q.emoji}</span>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 font-semibold">{q.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Response Section */}
        {(question || isStreaming) && (
          <div ref={responseRef} className="animate-fadeIn max-w-3xl mx-auto">
            {/* Question Asked */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-4 mb-6">
              <p className="text-sm text-amber-700 font-medium mb-1">You asked</p>
              <p className="text-lg text-gray-800">{question}</p>
            </div>

            {/* Sun's Answer */}
            <div className="bg-white rounded-2xl border border-amber-100 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 border-b border-amber-100 flex items-center gap-2">
                <span className="text-xl">☀️</span>
                <span className="font-semibold text-amber-800">Sun says</span>
                {isStreaming && (
                  <span className="flex gap-1 ml-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="text-gray-800 text-base sm:text-lg leading-relaxed">
                  <FormattedResponse text={response} onAskQuestion={isStreaming ? undefined : handleAsk} />
                  {isStreaming && response && (
                    <span className="text-amber-500 animate-pulse">▌</span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            {!isStreaming && response && (
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleNewQuestion}
                  className="flex-1 py-3 px-6 bg-white border-2 border-amber-200 text-amber-700 font-semibold rounded-xl hover:bg-amber-50 hover:border-amber-300 transition-all text-center"
                >
                  ← Ask another question
                </button>
                <Link
                  href="/tools"
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl text-center hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-200"
                >
                  Explore Tools →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-12">
          Sun helps you think clearly about money. Not financial advice.
        </p>
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// Loading fallback for Suspense
function SunPageLoading() {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-amber-50 via-orange-50/30 to-white flex items-center justify-center">
      <div className="text-center">
        <span className="text-5xl mb-4 block animate-pulse">☀️</span>
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

// Wrap in Suspense for useSearchParams
export default function SunPage() {
  return (
    <Suspense fallback={<SunPageLoading />}>
      <SunPageContent />
    </Suspense>
  );
}
