import { allQuestions, shouldShowQuestion, getNextQuestion } from "./questions";
import QuestionCard from "./QuestionCard";
import type { AnswersType } from "./types/questionTypes";
import type { Question } from "./types/questionTypes";
import { QuestionnaireAnswers } from "@/types/activity";

interface QuestionnaireContentProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  answers: Partial<AnswersType>;
  setAnswers: React.Dispatch<React.SetStateAction<Partial<AnswersType>>>;
  setIsComplete: (isComplete: boolean) => void;
  questions?: Question[];
  previousAnswers?: QuestionnaireAnswers;
}

export default function QuestionnaireContent({
  currentStep,
  setCurrentStep,
  answers,
  setAnswers,
  setIsComplete,
  questions = allQuestions,
  previousAnswers,
}: QuestionnaireContentProps) {
  const handleOptionSelect = (value: string) => {
    setAnswers((prev: Partial<AnswersType>) => ({
      ...prev,
      [questions[currentStep].field]: value,
    }));
  };

  const handleNext = () => {
    const nextQuestionIndex = getNextQuestionIndex(currentStep);
    
    if (nextQuestionIndex === -1) {
      console.log("Questionnaire complete. Collected answers:", answers);
      setIsComplete(true);
    } else {
      setCurrentStep(nextQuestionIndex);
    }
  };

  const getNextQuestionIndex = (currentIndex: number): number => {
    let nextIndex = currentIndex + 1;
    
    while (nextIndex < questions.length) {
      const question = questions[nextIndex];
      const relevantAnswers = previousAnswers ? { ...previousAnswers, ...answers } : answers;
      
      if (!question.dependsOn || shouldShowQuestion(question, relevantAnswers)) {
        return nextIndex;
      }
      nextIndex++;
    }
    
    return -1;
  };

  const currentQuestion = questions[currentStep];
  const currentValue = answers[currentQuestion.field as keyof typeof answers] as string;
  const totalSteps = questions.filter(q => {
    const relevantAnswers = previousAnswers ? { ...previousAnswers, ...answers } : answers;
    return shouldShowQuestion(q, relevantAnswers);
  }).length;

  return (
    <QuestionCard
      title={currentQuestion.title}
      options={currentQuestion.options}
      selectedValue={currentValue}
      onSelect={handleOptionSelect}
      onNext={handleNext}
      isLastQuestion={getNextQuestionIndex(currentStep) === -1}
      currentStep={currentStep + 1}
      totalSteps={totalSteps}
    />
  );
}