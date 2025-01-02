import { useState } from "react";
import ResultsDisplay from "./ResultsDisplay";
import QuestionCard from "./questionnaire/QuestionCard";
import { questions, QuestionField } from "./questionnaire/questions";

interface QuestionnaireFormProps {
  initialChoice: string;
}

type AnswersType = {
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
  const currentValue = answers[currentQuestion.field as keyof typeof answers] as string;

  return (
    <QuestionCard
      title={currentQuestion.title}
      options={currentQuestion.options}
      selectedValue={currentValue}
      onSelect={handleOptionSelect}
      onNext={handleNext}
      isLastQuestion={currentStep === questions.length - 1}
    />
  );
}