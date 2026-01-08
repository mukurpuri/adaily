'use client';

interface ToolHeroProps {
  icon: string;
  badge: string;
  badgeColor?: 'blue' | 'orange' | 'emerald' | 'purple' | 'amber';
  title: string;
  subtitle: string;
}

const badgeColors = {
  blue: 'bg-blue-50 border-blue-100 text-blue-700',
  orange: 'bg-orange-50 border-orange-100 text-orange-700',
  emerald: 'bg-emerald-50 border-emerald-100 text-emerald-700',
  purple: 'bg-purple-50 border-purple-100 text-purple-700',
  amber: 'bg-amber-50 border-amber-100 text-amber-700',
};

export default function ToolHero({ icon, badge, badgeColor = 'blue', title, subtitle }: ToolHeroProps) {
  return (
    <div className="text-center mb-10">
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4 ${badgeColors[badgeColor]}`}>
        <span className="text-lg">{icon}</span>
        {badge}
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
        {title}
      </h1>
      <p className="text-gray-600 max-w-xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}

