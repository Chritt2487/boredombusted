import { questions, shouldShowQuestion, getNextQuestion } from "./questions";
import QuestionCard from "./QuestionCard";
import type { AnswersType } from "./questionTypes";
import type { Question } from "./questionTypes";
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
  questions: customQuestions = questions,
  previousAnswers,
}: QuestionnaireContentProps) {
  const handleOptionSelect = (value: string) => {
    setAnswers((prev: Partial<AnswersType>) => ({
      ...prev,
      [customQuestions[currentStep].field]: value,
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

  const handleBack = () => {
    let previousIndex = currentStep - 1;
    while (previousIndex >= 0) {
      const question = customQuestions[previousIndex];
      const relevantAnswers = previousAnswers ? { ...previousAnswers, ...answers } : answers;
      
      if (!question.dependsOn || shouldShowQuestion(question, relevantAnswers)) {
        setCurrentStep(previousIndex);
        break;
      }
      previousIndex--;
    }
  };

  const getNextQuestionIndex = (currentIndex: number): number => {
    let nextIndex = currentIndex + 1;
    
    while (nextIndex < customQuestions.length) {
      const question = customQuestions[nextIndex];
      const relevantAnswers = previousAnswers ? { ...previousAnswers, ...answers } : answers;
      
      if (!question.dependsOn || shouldShowQuestion(question, relevantAnswers)) {
        return nextIndex;
      }
      nextIndex++;
    }
    
    return -1;
  };

  const currentQuestion = customQuestions[currentStep];
  const currentValue = answers[currentQuestion.field as keyof typeof answers] as string;
  const totalSteps = customQuestions.filter(q => {
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
      onBack={handleBack}
      isLastQuestion={getNextQuestionIndex(currentStep) === -1}
      isFirstQuestion={currentStep === 0}
      currentStep={currentStep + 1}
      totalSteps={totalSteps}
    />
  );
}