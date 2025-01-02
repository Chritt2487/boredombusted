interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <div
        className="bg-[#9b87f5] h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
      />
    </div>
  );
}