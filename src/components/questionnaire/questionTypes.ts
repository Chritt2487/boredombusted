export type QuestionField = 
  | 'activityType'
  | 'environment'
  | 'competitive'
  | 'skills'
  | 'activityLevel'
  | 'timeCommitment'
  | 'budget'
  | 'social'
  | 'creativity'
  | 'learningStyle';

export interface Question {
  title: string;
  options: readonly string[];
  field: QuestionField;
  description?: string;
}