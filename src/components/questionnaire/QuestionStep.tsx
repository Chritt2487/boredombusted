import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuestionStepProps {
  question: {
    title: string;
    options: string[];
    field: string;
  };
  value: string;
  onSelect: (value: string) => void;
}

export default function QuestionStep({ question, value, onSelect }: QuestionStepProps) {
  return (
    <div className="space-y-4">
      <RadioGroup value={value} onValueChange={onSelect} className="space-y-4">
        {question.options.map((option) => (
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
    </div>
  );
}