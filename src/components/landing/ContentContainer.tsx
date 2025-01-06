import React from 'react';
import ErrorBoundary from "@/components/ErrorBoundary";
import QuestionnaireForm from "@/components/QuestionnaireForm";
import InitialChoiceCard from "./InitialChoiceCard";

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