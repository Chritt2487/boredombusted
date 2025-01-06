import { useState } from "react";
import { QuestionnaireAnswers } from "@/types/activity";
import ResultsDisplay from "../ResultsDisplay";
import QuestionnaireContent from "./QuestionnaireContent";
import { refinementQuestions } from "./refinementQuestions";
import type { AnswersType } from "./questionTypes";

interface RefinementQuestionnaireContainerProps {
  previousAnswers: QuestionnaireAnswers;
}

export default function RefinementQuestionnaireContainer({ 
  previousAnswers 
}: RefinementQuestionnaireContainerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [refinementAnswers, setRefinementAnswers] = useState<Partial<AnswersType>>({});
  const [isComplete, setIsComplete] = useState(false);

  if (isComplete) {
    const combinedAnswers = {
      ...previousAnswers,
      ...refinementAnswers,
      isRefined: true
    };
    return <ResultsDisplay answers={combinedAnswers} />;
  }

  return (
    <QuestionnaireContent
      questions={refinementQuestions}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      answers={refinementAnswers}
      setAnswers={setRefinementAnswers}
      setIsComplete={setIsComplete}
      previousAnswers={previousAnswers}
    />
  );
}