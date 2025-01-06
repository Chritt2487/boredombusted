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

export interface Activity {
  name: string;
  description: string;
  imageUrl: string;
  difficulty?: string;
  timeCommitment?: string;
  costEstimate?: string;
  benefits: string[];
}

export interface DetailedActivity {
  equipment: {
    name: string;
    description: string;
    affiliateUrl: string;
    price: string;
    category: 'required' | 'optional' | 'recommended';
  }[];
  difficulty: string;
  timeCommitment: string;
  costEstimate: string;
  history: string;
  gettingStarted: {
    steps: string[];
    beginnerTips: string[];
  };
  benefits: {
    skills: string[];
    health: string[];
    funFacts: string[];
  };
  alternatives?: {
    name: string;
    description: string;
  }[];
}

export interface ActivityDetailProps {
  activity: Activity;
  onBack: () => void;
  onSelectAlternative: (alternative: { name: string; description: string }) => void;
}