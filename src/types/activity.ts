export interface QuestionnaireAnswers {
  initialChoice: string;
  age?: string;
  activityLevel?: string;
  activityType?: string;
  environment?: string;
  skills?: string;
  timeCommitment?: string;
  budget?: string;
  social?: string;
  isRandom?: boolean;
  isRefined?: boolean;
  difficulty?: string;
  timeOfDay?: string;
  structure?: string;
  competitiveness?: string;
  learningCurve?: string;
}

export interface Activity {
  name: string;
  description: string;
  imageUrl: string;
  difficulty?: string;
  timeCommitment?: string;
  costEstimate?: string;
  benefits: string[];
}