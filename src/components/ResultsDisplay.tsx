import ResultsContainer from "./results/ResultsContainer";
import { QuestionnaireAnswers } from "@/types/activity";

interface ResultsDisplayProps {
  answers: QuestionnaireAnswers;
}

export default function ResultsDisplay({ answers }: ResultsDisplayProps) {
  return <ResultsContainer answers={answers} />;
}