export interface ActivityEquipment {
  name: string;
  description: string;
  estimatedCost: string;
  affiliateUrl?: string;
  required: boolean;
}

export interface Activity {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  history?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  timeCommitment: string;
  costEstimate: string;
  benefits: string[];
  tags: {
    activityType: string[];
    environment: string[];
    competitive: string;
    skills: string[];
    activityLevel: string;
    learningStyle: string[];
    creativity: string;
    timeRequired: string;
    budgetLevel: string;
    social: string[];
  };
  equipment: ActivityEquipment[];
  gettingStarted: {
    steps: string[];
    tips: string[];
  };
  wordpress?: {
    categoryId?: number;
    postType: string;
    taxonomies?: Record<string, string[]>;
  };
}