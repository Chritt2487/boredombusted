import React from 'react';
import ErrorBoundary from "@/components/ErrorBoundary";
import QuestionnaireForm from "@/components/QuestionnaireForm";
import GoogleAd from "@/components/GoogleAd";

interface ContentContainerProps {
  showForm: boolean;
  selectedOption: string;
}

export default function ContentContainer({ showForm, selectedOption }: ContentContainerProps) {
  return (
    <>
      {/* Add Google Ad between questionnaire and results */}
      <GoogleAd 
        slot="2480421197"
        style={{ minHeight: '250px' }}
      />

      <ErrorBoundary>
        {showForm && <QuestionnaireForm initialChoice={selectedOption} />}
      </ErrorBoundary>
    </>
  );
}