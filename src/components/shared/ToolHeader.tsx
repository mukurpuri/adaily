'use client';

import Link from 'next/link';
import Image from 'next/image';

interface ToolHeaderProps {
  backHref?: string;
  backLabel?: string;
  showFullNav?: boolean;
}

export default function ToolHeader({ 
  backHref = '/tools', 
  backLabel = 'All Tools',
  showFullNav = false 
}: ToolHeaderProps) {
  return (
    <header className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
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
        
        {showFullNav ? (
          <div className="hidden md:flex items-center gap-6">
            <Link href="/tools" className="text-sm text-gray-600 hover:text-orange-500 transition-colors font-semibold">All Tools</Link>
            <Link href="/learn/glossary" className="text-sm text-gray-600 hover:text-orange-500 transition-colors font-semibold">Glossary</Link>
            <Link href="/about/dna" className="text-sm text-gray-600 hover:text-orange-500 transition-colors font-semibold">About</Link>
          </div>
        ) : null}
        
        <Link
          href={backHref}
          className="text-xs sm:text-sm text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-1"
        >
          ← <span className="hidden xs:inline sm:inline">{backLabel}</span><span className="xs:hidden sm:hidden">Back</span>
        </Link>
      </div>
    </header>
  );
}

