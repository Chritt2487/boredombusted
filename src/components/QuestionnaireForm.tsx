import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ResultsDisplay from "./ResultsDisplay";

interface QuestionnaireFormProps {
  initialChoice: string;
}

interface AnswersType {
  initialChoice: string;
  environment: string;
  activityLevel: string;
  timeCommitment: string;
  budget: string;
  social: string;
  isRandom?: boolean;
}

export default function QuestionnaireForm({ initialChoice }: QuestionnaireFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AnswersType>({
    initialChoice,
    environment: "",
    activityLevel: "",
    timeCommitment: "",
    budget: "",
    social: "",
  });
  const [isComplete, setIsComplete] = useState(false);

  // If "Surprise me" is selected, skip the questionnaire
  if (initialChoice === "Surprise me") {
    return <ResultsDisplay answers={{ ...answers, isRandom: true }} />;
  }

  const questions = [
    {
      title: "Where would you prefer to spend your time?",
      options: ["Indoor", "Outdoor", "Both"],
      field: "environment",
    },
    {
      title: "How active do you want to be?",
      options: ["Relaxed", "Moderate", "Active"],
      field: "activityLevel",
    },
    {
      title: "How much time do you want to spend?",
      options: ["Short (<1 hour)", "Medium (1-3 hours)", "Long (3+ hours)"],
      field: "timeCommitment",
    },
    {
      title: "What's your budget?",
      options: ["Free", "Cheap", "Moderate", "Expensive"],
      field: "budget",
    },
    {
      title: "Do you want to do this alone or with others?",
      options: ["Solo", "With friends", "Either"],
      field: "social",
    },
  ];

  const handleOptionSelect = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentStep].field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Collected answers:", answers);
      setIsComplete(true);
    }
  };

  if (isComplete) {
    return <ResultsDisplay answers={answers} />;
  }

  const currentQuestion = questions[currentStep];

  return (
    <Card className="w-full border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-[#7E69AB]">
          {currentQuestion.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={answers[currentQuestion.field as keyof typeof answers]}
          onValueChange={handleOptionSelect}
          className="space-y-4"
        >
          {currentQuestion.options.map((option) => (
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
          onClick={handleNext}
          className="w-full mt-6 bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors duration-200"
          disabled={!answers[currentQuestion.field as keyof typeof answers]}
        >
          {currentStep === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      </CardContent>
    </Card>
  );
}