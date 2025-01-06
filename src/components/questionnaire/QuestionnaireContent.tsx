import { questions, shouldShowQuestion, getNextQuestion } from "./questions";
import QuestionCard from "./QuestionCard";
import type { AnswersType } from "./questionTypes";

interface QuestionnaireContentProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  answers: Partial<AnswersType>;
  setAnswers: React.Dispatch<React.SetStateAction<Partial<AnswersType>>>;
  setIsComplete: (isComplete: boolean) => void;
}

export default function QuestionnaireContent({
  currentStep,
  setCurrentStep,
  answers,
  setAnswers,
  setIsComplete,
}: QuestionnaireContentProps) {
  const handleOptionSelect = (value: string) => {
    setAnswers((prev: Partial<AnswersType>) => ({
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

  const currentQuestion = questions[currentStep];
  const currentValue = answers[currentQuestion.field as keyof typeof answers] as string;
  const totalSteps = questions.filter(q => shouldShowQuestion(q, answers)).length;

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