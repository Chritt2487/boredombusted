import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { QuestionOption } from "./questionTypes";
import QuestionProgress from "./QuestionProgress";

interface QuestionCardProps {
  title: string;
  options: QuestionOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onNext: () => void;
  isLastQuestion: boolean;
  currentStep: number;
  totalSteps: number;
}

export default function QuestionCard({
  title,
  options,
  selectedValue,
  onSelect,
  onNext,
  isLastQuestion,
  currentStep,
  totalSteps,
}: QuestionCardProps) {
  const handleOptionSelect = (value: string) => {
    onSelect(value);
    // Automatically proceed after a short delay
    setTimeout(() => {
      onNext();
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <QuestionProgress currentStep={currentStep} totalSteps={totalSteps} />
      
      <Card className="w-full border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-[#7E69AB]">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedValue}
            onValueChange={handleOptionSelect}
            className="space-y-4"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`flex items-center space-x-2 p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                  selectedValue === option.value
                    ? "border-[#9b87f5] bg-[#F1F0FB] scale-[1.02] shadow-md"
                    : "border-[#D6BCFA] hover:bg-[#F1F0FB]"
                }`}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <div className="flex-grow">
                  <Label htmlFor={option.value} className="cursor-pointer">
                    {option.label}
                  </Label>
                  {option.description && (
                    <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                  )}
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}