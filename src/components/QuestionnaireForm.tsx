import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface QuestionnaireFormProps {
  initialChoice: string;
}

interface Question {
  id: string;
  text: string;
  options: string[];
}

const QuestionnaireForm = ({ initialChoice }: QuestionnaireFormProps) => {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions: Question[] = [
    {
      id: "environment",
      text: "Preferred environment?",
      options: ["Indoor", "Outdoor", "Both"],
    },
    {
      id: "activityLevel",
      text: "Activity level?",
      options: ["Active", "Relaxed"],
    },
    {
      id: "timeCommitment",
      text: "Time commitment?",
      options: ["Short (<1 hour)", "Medium (1-3 hours)", "Long (>3 hours)"],
    },
    {
      id: "budget",
      text: "Budget?",
      options: ["Free", "Cheap", "Moderate", "Expensive"],
    },
    {
      id: "social",
      text: "Social preference?",
      options: ["Solo", "With others", "Both"],
    },
  ];

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].id]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // For now, just show a toast with the collected answers
      toast({
        title: "Questionnaire completed!",
        description: "Your preferences have been recorded. Results coming soon!",
      });
      console.log("Collected answers:", { initialChoice, ...answers });
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {currentQuestion.text}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={currentAnswer}
          onValueChange={handleAnswer}
          className="space-y-4"
        >
          {currentQuestion.options.map((option) => (
            <div
              key={option}
              className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-accent cursor-pointer"
            >
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option} className="cursor-pointer flex-grow">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex justify-between mt-6 gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!currentAnswer}
            className="flex-1"
          >
            {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionnaireForm;