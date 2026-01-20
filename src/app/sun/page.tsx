'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Simple ID generator
const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

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

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No reader');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        onDone();
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('data: ')) {
          const data = trimmed.slice(6);
          if (data === '[DONE]') {
            onDone();
            return;
          }
          onChunk(data);
        }
      }
    }
  } catch (error) {
    onError(error instanceof Error ? error : new Error(String(error)));
  }
}

export default function SunPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionId] = useState(() => generateId());

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = useCallback(async () => {
    const text = inputText.trim();
    if (!text || isStreaming) return;

    setInputText('');

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: text,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Add empty assistant message
    const assistantMessageId = generateId();
    setMessages((prev) => [
      ...prev,
      { id: assistantMessageId, role: 'assistant', content: '' },
    ]);

    setIsStreaming(true);

    await streamChat(
      text,
      sessionId,
      (chunk) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: msg.content + chunk }
              : msg,
          ),
        );
      },
      () => {
        setIsStreaming(false);
        inputRef.current?.focus();
      },
      (error) => {
        console.error('Stream error:', error);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: 'Sorry, something went wrong. Please try again.' }
              : msg,
          ),
        );
        setIsStreaming(false);
      },
    );
  }, [inputText, isStreaming, sessionId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 border-b border-amber-100">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5">
            <Image
              src="/logo.svg"
              alt="Adaily"
              width={32}
              height={32}
              className="w-7 h-7 sm:w-8 sm:h-8"
            />
            <span className="text-lg sm:text-xl font-bold text-gray-900">Adaily</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">☀️</span>
            <span className="font-semibold text-gray-700">Sun</span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8 max-w-lg mx-auto">
            <span className="text-6xl mb-6">☀️</span>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Hey there!</h1>
            <p className="text-gray-600 leading-relaxed mb-8">
              I'm Sun, here to help you think through money matters with clarity and calm.
            </p>
            <div className="space-y-2 w-full">
              {['How do I start saving?', 'Help me understand budgeting', 'I want to invest but don\'t know where to start'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInputText(suggestion);
                    inputRef.current?.focus();
                  }}
                  className="w-full text-left px-4 py-3 bg-white border border-amber-200 rounded-xl text-gray-700 hover:bg-amber-50 hover:border-amber-300 transition-colors text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-orange-500 text-white rounded-br-md'
                      : 'bg-white border border-amber-100 text-gray-800 rounded-bl-md shadow-sm'
                  }`}
                >
                  <p className="text-base leading-relaxed whitespace-pre-wrap">
                    {message.content}
                    {message.role === 'assistant' && isStreaming && message.content && (
                      <span className="text-amber-500 animate-pulse">▌</span>
                    )}
                  </p>
                </div>
              </div>
            ))}

            {isStreaming && messages[messages.length - 1]?.content === '' && (
              <div className="flex justify-start">
                <div className="bg-white border border-amber-100 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="ml-2 text-sm">Sun is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Input */}
      <footer className="border-t border-amber-100 bg-white px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-end gap-3">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Sun anything..."
            disabled={isStreaming}
            rows={1}
            className="flex-1 bg-amber-50 text-gray-800 placeholder-gray-400 rounded-2xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400/50 border border-amber-200 disabled:opacity-50"
            style={{ maxHeight: '120px' }}
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isStreaming}
            className="w-11 h-11 rounded-full bg-orange-500 text-white font-bold text-lg flex items-center justify-center hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            ↑
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-3">
          Sun is for learning only. Not financial advice.
        </p>
      </footer>
    </div>
  );
}

