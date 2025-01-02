interface QuestionProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function QuestionProgress({ currentStep, totalSteps }: QuestionProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Question {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full h-2 bg-[#D6BCFA] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#9b87f5] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}