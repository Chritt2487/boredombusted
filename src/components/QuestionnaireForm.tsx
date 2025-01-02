import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResultsDisplay from "./ResultsDisplay";
import QuestionStep from "./questionnaire/QuestionStep";
import NavigationButtons from "./questionnaire/NavigationButtons";
import ProgressIndicator from "./questionnaire/ProgressIndicator";

interface QuestionnaireFormProps {
  initialChoice: string;
}

export default function QuestionnaireForm({ initialChoice }: QuestionnaireFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    initialChoice,
    environment: "",
    activityLevel: "",
    timeCommitment: "",
    budget: "",
    social: "",
    skillLevel: "",
    travelDistance: "",
    weatherPreference: "",
  });
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      title: "Where would you prefer to spend your time?",
      options: ["Indoor", "Outdoor", "Both"],
      field: "environment",
      image: "photo-1605810230434-7631ac76ec81"
    },
    {
      title: "How active do you want to be?",
      options: ["Relaxed", "Moderate", "Active"],
      field: "activityLevel",
      image: "photo-1581091226825-a6a2a5aee158"
    },
    {
      title: "How much time do you want to spend?",
      options: ["Short (<1 hour)", "Medium (1-3 hours)", "Long (3+ hours)"],
      field: "timeCommitment",
      image: "photo-1460925895917-afdab827c52f"
    },
    {
      title: "What's your budget?",
      options: ["Free", "Cheap", "Moderate", "Expensive"],
      field: "budget",
      image: "photo-1498050108023-c5249f4df085"
    },
    {
      title: "Do you want to do this alone or with others?",
      options: ["Solo", "With friends", "Either"],
      field: "social",
      image: "photo-1519389950473-47ba0277781c"
    },
    {
      title: "What's your skill level preference?",
      options: ["Beginner", "Intermediate", "Advanced"],
      field: "skillLevel",
      image: "photo-1486312338219-ce68d2c6f44d"
    },
    {
      title: "How far are you willing to travel?",
      options: ["Nearby", "Short drive", "Any distance"],
      field: "travelDistance",
      image: "photo-1473091534298-04dcbce3278c"
    },
    {
      title: "What weather conditions do you prefer?",
      options: ["Indoor only", "Any weather", "Fair weather only"],
      field: "weatherPreference",
      image: "photo-1581092795360-fd1ca04f0952"
    }
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
        <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
          <img
            src={`https://images.unsplash.com/${currentQuestion.image}?w=400&auto=format&fit=crop&q=60`}
            alt={currentQuestion.title}
            className="w-full h-full object-cover"
          />
        </div>
        <ProgressIndicator currentStep={currentStep} totalSteps={questions.length} />
        <CardTitle className="text-2xl text-center text-[#7E69AB]">
          {currentQuestion.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <QuestionStep
          question={currentQuestion}
          value={answers[currentQuestion.field as keyof typeof answers]}
          onSelect={handleOptionSelect}
        />
        <NavigationButtons
          onNext={handleNext}
          isLastStep={currentStep === questions.length - 1}
          isValid={!!answers[currentQuestion.field as keyof typeof answers]}
        />
      </CardContent>
    </Card>
  );
}