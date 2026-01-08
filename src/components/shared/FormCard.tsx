interface FormCardProps {
  step?: number;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormCard({ step, title, children, className = '' }: FormCardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 p-6 sm:p-8 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        {step && (
          <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">
            {step}
          </span>
        )}
        {title}
      </h2>
      {children}
    </div>
  );
}

