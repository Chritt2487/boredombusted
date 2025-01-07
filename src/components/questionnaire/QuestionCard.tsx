import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { QuestionOption } from "./questionTypes";
import QuestionProgress from "./QuestionProgress";

interface QuestionCardProps {
  title: string;
  options: QuestionOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLastQuestion: boolean;
  isFirstQuestion: boolean;
  currentStep: number;
  totalSteps: number;
}

export default function QuestionCard({
  title,
  options,
  selectedValue,
  onSelect,
  onNext,
  onBack,
  isLastQuestion,
  isFirstQuestion,
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
        <CardHeader className="relative">
          {!isFirstQuestion && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="absolute left-4 top-4 text-[#7E69AB] hover:text-[#9b87f5] hover:bg-[#F1F0FB]"
              aria-label="Go back to previous question"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
          <CardTitle className="text-2xl md:text-3xl text-center text-[#7E69AB] font-bold">
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
                <div className="flex items-center space-x-2 w-full">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <div className="flex-grow">
                    <Label htmlFor={option.value} className="cursor-pointer text-lg font-semibold">
                      {option.label}
                    </Label>
                    {option.description && (
                      <p className="text-base text-gray-600 mt-1 font-medium">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}