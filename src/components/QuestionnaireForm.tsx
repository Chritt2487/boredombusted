import { useState } from "react";
import ResultsDisplay from "./ResultsDisplay";
import QuestionCard from "./questionnaire/QuestionCard";
import { questions, shouldShowQuestion, getNextQuestion } from "./questionnaire/questions";
import type { AnswersType } from "./questionnaire/questionTypes";

interface QuestionnaireFormProps {
  initialChoice: string;
}

export default function QuestionnaireForm({ initialChoice }: QuestionnaireFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<AnswersType>>({
    initialChoice,
  });
  const [isComplete, setIsComplete] = useState(false);

  // If "Surprise me" is selected, skip the questionnaire
  if (initialChoice === "Surprise me") {
    return <ResultsDisplay answers={{ ...answers as AnswersType, isRandom: true }} />;
  }

  const handleOptionSelect = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentStep].field]: value,
    }));
  };

  const handleNext = () => {
    const nextQuestionIndex = getNextQuestion(currentStep, answers);
    
    if (nextQuestionIndex === -1) {
      console.log("Collected answers:", answers);
      setIsComplete(true);
    } else {
      setCurrentStep(nextQuestionIndex);
    }
  };

  if (isComplete) {
    return <ResultsDisplay answers={answers as AnswersType} />;
  }

  const currentQuestion = questions[currentStep];
  const currentValue = answers[currentQuestion.field as keyof typeof answers] as string;

  // Calculate total steps by filtering questions that should be shown based on current answers
  const totalSteps = questions.filter(q => shouldShowQuestion(q, answers)).length;

  return (
    <QuestionCard
      title={currentQuestion.title}
      options={currentQuestion.options}
      selectedValue={currentValue}
      onSelect={handleOptionSelect}
      onNext={handleNext}
      isLastQuestion={getNextQuestion(currentStep, answers) === -1}
      currentStep={currentStep + 1} // Adding 1 to make it 1-based for display
      totalSteps={totalSteps}
    />
  );
}