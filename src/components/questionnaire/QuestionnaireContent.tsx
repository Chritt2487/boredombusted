import { questions, shouldShowQuestion, getNextQuestion } from "./questions";
import { refinementQuestions } from "./refinementQuestions";
import QuestionCard from "./QuestionCard";
import type { AnswersType } from "./questionTypes";

interface QuestionnaireContentProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  answers: Partial<AnswersType>;
  setAnswers: React.Dispatch<React.SetStateAction<Partial<AnswersType>>>;
  setIsComplete: (isComplete: boolean) => void;
  isRefinement?: boolean;
}

export default function QuestionnaireContent({
  currentStep,
  setCurrentStep,
  answers,
  setAnswers,
  setIsComplete,
  isRefinement = false,
}: QuestionnaireContentProps) {
  const questionSet = isRefinement ? refinementQuestions : questions;

  const handleOptionSelect = (value: string) => {
    setAnswers((prev: Partial<AnswersType>) => ({
      ...prev,
      [questionSet[currentStep].field]: value,
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

  const currentQuestion = questionSet[currentStep];
  const currentValue = answers[currentQuestion.field as keyof typeof answers] as string;
  const totalSteps = questionSet.filter(q => shouldShowQuestion(q, answers)).length;

  return (
    <QuestionCard
      title={currentQuestion.title}
      options={currentQuestion.options}
      selectedValue={currentValue}
      onSelect={handleOptionSelect}
      onNext={handleNext}
      isLastQuestion={getNextQuestion(currentStep, answers) === -1}
      currentStep={currentStep + 1}
      totalSteps={totalSteps}
    />
  );
}