import Link from 'next/link';
import type { ToolItem } from '@/lib/tools/registry';

interface ToolCardProps {
  tool: ToolItem;
  variant?: 'primary' | 'secondary';
}

export default function ToolCard({ tool, variant = 'secondary' }: ToolCardProps) {
  if (variant === 'primary') {
    return (
      <Link
        href={tool.href}
        className="group relative bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 hover:shadow-xl hover:border-gray-200 transition-all duration-200"
      >
        {tool.badge && (
          <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-full uppercase">
            {tool.badge}
          </span>
        )}
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl sm:text-3xl mb-3 sm:mb-4 shadow-lg ${tool.shadow} group-hover:scale-110 transition-transform`}>
          {tool.icon}
        </div>
        <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1 group-hover:text-orange-600 transition-colors">
          {tool.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{tool.description}</p>
        <span className="text-orange-600 text-sm font-medium">
          Open tool →
        </span>
      </Link>
    );
  }

  // Secondary variant - more compact
  return (
    <Link
      href={tool.href}
      className="group bg-white rounded-xl border border-gray-100 p-3 sm:p-4 hover:shadow-lg hover:border-gray-200 transition-all duration-200"
    >
      {tool.badge && (
        <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 bg-orange-500 text-white text-[8px] font-bold rounded-full uppercase">
          {tool.badge}
        </span>
      )}
      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-xl sm:text-2xl mb-2 sm:mb-3 shadow-md ${tool.shadow} group-hover:scale-105 transition-transform`}>
        {tool.icon}
      </div>
      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5 group-hover:text-orange-600 transition-colors">
        {tool.title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{tool.description}</p>
    </Link>
  );
}

