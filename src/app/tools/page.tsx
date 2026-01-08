import Link from 'next/link';
import { ToolHeader } from '@/components/shared';
import { getStartTools, getTools, getLearnItems } from '@/lib/tools/registry';
import type { ToolItem } from '@/lib/tools/registry';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tools and Guides | Adaily',
  description: 'Free financial tools for India. Investment explorer, emergency fund planner, money check, government schemes, and educational guides. No signup required.',
  openGraph: {
    title: 'All Tools and Guides | Adaily',
    description: 'Free financial tools for India. No signup, no data collection.',
    url: 'https://adaily.in/tools',
  },
  alternates: {
    canonical: 'https://adaily.in/tools',
  },
};

function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <Link
      href={tool.href}
      className="group relative bg-white rounded-xl border border-gray-100 p-4 sm:p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-200"
    >
      {tool.badge && (
        <span className={`absolute -top-2 -right-2 px-2 py-0.5 text-white text-[10px] font-bold rounded-full uppercase ${
          tool.badge === 'Popular' ? 'bg-orange-500' : 
          tool.badge === 'New' ? 'bg-emerald-500' : 
          'bg-indigo-500'
        }`}>
          {tool.badge}
        </span>
      )}
      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-xl sm:text-2xl mb-3 shadow-lg ${tool.shadow} group-hover:scale-110 transition-transform`}>
        {tool.icon}
      </div>
      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 group-hover:text-orange-600 transition-colors">
        {tool.title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 mb-3">{tool.description}</p>
      <span className="text-orange-600 text-xs sm:text-sm font-medium">
        Open →
      </span>
    </Link>
  );
}

export default function ToolsPage() {
  const startTools = getStartTools();
  const tools = getTools();
  const learnItems = getLearnItems();

  return (
    <div className="min-h-screen bg-white">
      <ToolHeader showFullNav />

      {/* Trust Banner */}
      <div className="bg-emerald-50 border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-3 text-center">
          <p className="text-xs sm:text-sm text-emerald-700 font-medium">
            🔒 No signup. No data collection. Educational only.
          </p>
        </div>
      </div>

      {/* Hero */}
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            All Tools & Guides
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Free financial tools for India. Pick one and start understanding your money.
          </p>
        </div>
      </section>

      {/* START HERE Section */}
      <section className="container mx-auto px-4 sm:px-6 pb-10 sm:pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Start Here</h2>
            <p className="text-sm text-gray-500">Best place to begin if you're new</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {startTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS Section */}
      <section className="bg-gray-50 py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Tools</h2>
              <p className="text-sm text-gray-500">Each tool helps you understand one aspect of money</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEARN Section */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Learn</h2>
              <p className="text-sm text-gray-500">Guides and glossary to build understanding</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {learnItems.map((item) => (
                <ToolCard key={item.id} tool={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="border-t border-gray-100 py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
              <Link href="/about/dna" className="text-gray-600 hover:text-orange-500 transition-colors">
                About Adaily
              </Link>
              <Link href="/about/what-we-wont-do" className="text-gray-600 hover:text-orange-500 transition-colors">
                What We Won't Do
              </Link>
              <Link href="/learn/glossary" className="text-gray-600 hover:text-orange-500 transition-colors">
                Glossary
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            Made with care in India · © {new Date().getFullYear()} Adaily
          </p>
        </div>
      </footer>
    </div>
  );
}
