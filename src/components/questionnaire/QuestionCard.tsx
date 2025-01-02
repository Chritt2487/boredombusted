import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface QuestionCardProps {
  title: string;
  options: readonly string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

export default function QuestionCard({
  title,
  options,
  selectedValue,
  onSelect,
  onNext,
  isLastQuestion,
}: QuestionCardProps) {
  const handleOptionSelect = (value: string) => {
    onSelect(value);
    // Automatically proceed after a short delay
    setTimeout(() => {
      onNext();
    }, 800); // Increased delay for better animation visibility
  };

  return (
    <Card className="w-full border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm animate-fade-in">
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
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={`flex items-center space-x-2 p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                selectedValue === option
                  ? "border-[#9b87f5] bg-[#F1F0FB] scale-[1.02] shadow-md"
                  : "border-[#D6BCFA] hover:bg-[#F1F0FB]"
              }`}
            >
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option} className="cursor-pointer flex-grow">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}