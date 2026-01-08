interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ title, subtitle, align = 'center' }: SectionTitleProps) {
  return (
    <div className={`mb-6 sm:mb-8 ${align === 'center' ? 'text-center' : ''}`}>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{title}</h2>
      {subtitle && (
        <p className="text-sm text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}

