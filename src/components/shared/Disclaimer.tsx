interface DisclaimerProps {
  className?: string;
}

export default function Disclaimer({ className = '' }: DisclaimerProps) {
  return (
    <div className={`p-4 rounded-xl bg-amber-50 border border-amber-200 text-center ${className}`}>
      <p className="text-sm text-amber-800">
        <span className="font-semibold">⚠️ Disclaimer:</span> This tool is for educational purposes only. 
        It provides general guidance and is not financial advice. Please consult a certified financial planner 
        for personalized recommendations.
      </p>
    </div>
  );
}

