export interface UserAnswers {
  initialChoice: string;
  environment: string;
  activityLevel: string;
  timeCommitment: string;
  budget: string;
  social: string;
}

export interface Activity {
  name: string;
  description: string;
  tips: string[];
  benefits: string[]; // Added this field
}

export interface RecommendationsResponse {
  activities: Activity[];
}