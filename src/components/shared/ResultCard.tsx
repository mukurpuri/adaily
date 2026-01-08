interface ResultCardProps {
  title?: string;
  icon?: string;
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'success' | 'warning';
  className?: string;
}

const variants = {
  default: 'bg-white shadow-lg shadow-gray-100 border border-gray-100',
  gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-200',
  success: 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200',
  warning: 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200',
};

export default function ResultCard({ title, icon, children, variant = 'default', className = '' }: ResultCardProps) {
  return (
    <div className={`rounded-2xl p-6 ${variants[variant]} ${className}`}>
      {(title || icon) && (
        <h3 className={`font-semibold mb-4 flex items-center gap-2 ${variant === 'gradient' ? 'text-white' : 'text-gray-900'}`}>
          {icon && <span className="text-xl">{icon}</span>}
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

