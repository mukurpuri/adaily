import { ReactNode } from 'react';
import ToolSeoSection from './ToolSeoSection';
import { getToolSeoContent } from '@/lib/seo/toolSeoRegistry';

interface ToolPageShellProps {
  slug: string;
  children: ReactNode;
  accentColor?: 'orange' | 'blue' | 'purple' | 'green' | 'amber';
}

export default function ToolPageShell({ slug, children, accentColor = 'blue' }: ToolPageShellProps) {
  const seoContent = getToolSeoContent(slug);

  return (
    <>
      {children}
      {seoContent && (
        <div className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
          <div className="max-w-6xl mx-auto">
            <ToolSeoSection {...seoContent} accentColor={accentColor} />
          </div>
        </div>
      )}
    </>
  );
}

