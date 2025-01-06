export type QuestionOption = {
  value: string;
  label: string;
  description?: string;
};

export type Question = {
  title: string;
  options: QuestionOption[];
  field: string;
  category: QuestionCategory;
  dependsOn?: {
    field: string;
    values: string[];
  };
};

export type QuestionCategory = 
  | 'basic'
  | 'activity'
  | 'skills'
  | 'practical'
  | 'social'
  | 'environment'
  | 'learning'
  | 'preferences'
  | 'goals'
  | 'lifestyle';

export type AnswersType = {
  // Basic Information
  initialChoice: string;
  age: string;
  activityLevel: string;
  mobility: string;

  // Activity Preferences
  activityType: string;
  environment: string;
  spaceAvailable: string;
  weatherPreference?: string;

  // Skills & Learning
  skills?: string;
  learningMethod?: string;
  guidanceLevel?: string;
  previousExperience?: string;

  // Practical Considerations
  timeCommitment: string;
  budget: string;
  equipment?: string;
  scheduleFlexibility: string;

  // Social Aspects
  social: string;
  groupSize?: string;
  socialLevel?: string;
  competitiveness?: string;

  // Time & Schedule
  timeOfDay: string;
  timeOfWeek?: string;

  // Additional Preferences
  noiseLevel?: string;
  riskTolerance?: string;
  creativeStyle?: string;

  // Goals & Motivation
  primaryGoal?: string;
  commitmentLevel?: string;
  progressTracking?: string;

  // System Flags
  isRandom?: boolean;
  isRefined?: boolean;
};