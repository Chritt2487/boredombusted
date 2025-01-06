import { useState } from "react";
import ResultsDisplay from "../ResultsDisplay";
import QuestionnaireContent from "./QuestionnaireContent";
import type { AnswersType } from "./questionTypes";

interface QuestionnaireContainerProps {
  initialChoice: string;
}

export default function QuestionnaireContainer({ initialChoice }: QuestionnaireContainerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<AnswersType>>({
    initialChoice,
  });
  const [isComplete, setIsComplete] = useState(false);

  // If "Surprise me" is selected, skip the questionnaire
  if (initialChoice === "Surprise me") {
    return <ResultsDisplay answers={{ ...answers as AnswersType, isRandom: true }} />;
  }

  if (isComplete) {
    return <ResultsDisplay answers={answers as AnswersType} />;
  }

  return (
    <QuestionnaireContent
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      answers={answers}
      setAnswers={setAnswers}
      setIsComplete={setIsComplete}
    />
  );
}