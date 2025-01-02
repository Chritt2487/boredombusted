import { useState } from "react";
import ResultsDisplay from "./ResultsDisplay";
import QuestionCard from "./questionnaire/QuestionCard";
import { questions } from "./questionnaire/questionsList";
import { QuestionField } from "./questionnaire/questionTypes";

interface QuestionnaireFormProps {
  initialChoice: string;
}

type AnswersType = {
  initialChoice: string;
  activityType: string;
  environment: string;
  competitive: string;
  skills: string;
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
    activityType: "",
    environment: "",
    competitive: "",
    skills: "",
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

  const handleOptionSelect = (value: string) => {
    const currentQuestion = questions[currentStep];
    if (!currentQuestion) {
      console.error("Question not found for step:", currentStep);
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.field]: value,
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
  
  // Add safety check for currentQuestion
  if (!currentQuestion) {
    console.error("Question not found for step:", currentStep);
    return null;
  }

  return (
    <QuestionCard
      title={currentQuestion.title}
      options={currentQuestion.options}
      selectedValue={answers[currentQuestion.field as keyof typeof answers] as string}
      onSelect={handleOptionSelect}
      onNext={handleNext}
      isLastQuestion={currentStep === questions.length - 1}
    />
  );
}