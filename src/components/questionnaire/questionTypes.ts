export type QuestionOption = {
  value: string;
  label: string;
  description?: string;
};

export type Question = {
  title: string;
  options: QuestionOption[];
  field: string;
  dependsOn?: {
    field: string;
    values: string[];
  };
};

export type AnswersType = {
  initialChoice: string;
  age?: string;
  activityLevel?: string;
  activityType?: string;
  environment?: string;
  competitive?: string;
  skills?: string;
  timeCommitment?: string;
  budget?: string;
  social?: string;
  isRandom?: boolean;
  // Refinement questions
  pace?: string;
  learningStyle?: string;
  timeOfDay?: string;
};