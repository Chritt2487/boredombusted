import React from 'react';
import ErrorBoundary from "@/components/ErrorBoundary";
import QuestionnaireForm from "@/components/QuestionnaireForm";

interface ContentContainerProps {
  showForm: boolean;
  selectedOption: string;
}

export default function ContentContainer({ showForm, selectedOption }: ContentContainerProps) {
  return (
    <ErrorBoundary>
      {showForm && <QuestionnaireForm initialChoice={selectedOption} />}
    </ErrorBoundary>
  );
}