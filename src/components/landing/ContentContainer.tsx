import React from 'react';
import ErrorBoundary from "@/components/ErrorBoundary";
import QuestionnaireForm from "@/components/QuestionnaireForm";
import InitialChoiceCard from "./InitialChoiceCard";
import ResultsDisplay from "../ResultsDisplay";

interface ContentContainerProps {
  showForm: boolean;
  selectedOption: string;
  onOptionSelect: (value: string) => void;
  onContinue: () => void;
}

export default function ContentContainer({ 
  showForm, 
  selectedOption,
  onOptionSelect,
  onContinue 
}: ContentContainerProps) {
  // If "surprise me" is selected, directly show results
  if (selectedOption === "surprise me") {
    console.log('Surprise me selected, bypassing questionnaire');
    return (
      <ErrorBoundary>
        <ResultsDisplay answers={{ 
          initialChoice: selectedOption,
          isRandom: true 
        }} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      {showForm ? (
        <QuestionnaireForm initialChoice={selectedOption} />
      ) : (
        <InitialChoiceCard 
          selectedOption={selectedOption}
          onOptionSelect={onOptionSelect}
          onContinue={onContinue}
        />
      )}
    </ErrorBoundary>
  );
}