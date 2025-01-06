export type QuestionOption = {
  value: string;
  label: string;
  description?: string;
};

export type Question = {
  title: string;
  options: QuestionOption[];
  field: string;
  category?: string;
  dependsOn?: {
    field: string;
    values: string[];
  };
};

export type AnswersType = {
  initialChoice: string;
  age: string;
  activityLevel: string;
  mobility: string;
  activityType: string;
  environment: string;
  spaceAvailable: string;
  weatherPreference?: string;
  skills?: string;
  learningMethod?: string;
  guidanceLevel?: string;
  timeCommitment: string;
  budget: string;
  equipment?: string;
  scheduleFlexibility: string;
  social: string;
  groupSize?: string;
  socialLevel?: string;
  competitiveness?: string;
  timeOfDay: string;
  isRandom?: boolean;
};