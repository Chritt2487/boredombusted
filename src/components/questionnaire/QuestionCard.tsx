import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface QuestionCardProps {
  title: string;
  options: string[];
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
  return (
    <Card className="w-full border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-[#7E69AB]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedValue}
          onValueChange={onSelect}
          className="space-y-4"
        >
          {options.map((option) => (
            <div
              key={option}
              className="flex items-center space-x-2 p-4 rounded-lg border border-[#D6BCFA] hover:bg-[#F1F0FB] cursor-pointer transition-colors duration-200"
            >
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option} className="cursor-pointer flex-grow">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <Button
          onClick={onNext}
          className="w-full mt-6 bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors duration-200"
          disabled={!selectedValue}
        >
          {isLastQuestion ? "Finish" : "Next"}
        </Button>
      </CardContent>
    </Card>
  );
}