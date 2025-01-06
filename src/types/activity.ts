export type QuestionnaireAnswers = {
  initialChoice: string;
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