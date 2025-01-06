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

  // Personal Preferences
  noiseLevel?: string;
  riskTolerance?: string;
  creativeStyle?: string;

  // Goals & Motivation
  primaryGoal?: string;
  commitmentLevel?: string;
  progressTracking?: string;

  // Activity Depth
  pacePreference?: string;

  // Lifestyle Fit
  lifestyleIntegration?: string;

  // Technology & Resources
  technologyUse?: string;

  // Sustainability & Impact
  ecoFriendly?: string;
  communityImpact?: string;

  // System Flags
  isRandom?: boolean;
  isRefined?: boolean;
};