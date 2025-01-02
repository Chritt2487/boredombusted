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
}

export interface ActivityDetailProps {
  activity: {
    name: string;
    description: string;
    imageUrl: string;
    benefits: string[];
  };
  onBack: () => void;
  onSelectAlternative: (alternative: { name: string; description: string; }) => void;
}