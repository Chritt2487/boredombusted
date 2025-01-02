export const questions = [
  {
    title: "What type of activity interests you most?",
    options: ["Creative Expression", "Physical Activity", "Learning & Skills", "Social & Community", "Relaxation & Mindfulness"],
    field: "activityType",
  },
  {
    title: "Where would you prefer to spend your time?",
    options: ["Indoor", "Outdoor", "Both"],
    field: "environment",
  },
  {
    title: "Do you prefer competitive or non-competitive activities?",
    options: ["Competitive", "Non-competitive", "Both"],
    field: "competitive",
  },
  {
    title: "What skills would you like to develop?",
    options: ["Technical & Analytical", "Creative & Artistic", "Physical & Coordination", "Social & Communication", "Problem Solving"],
    field: "skills",
  },
  {
    title: "How active do you want to be?",
    options: ["Relaxed", "Moderate", "Active"],
    field: "activityLevel",
  },
  {
    title: "How much time do you want to spend?",
    options: ["Short (<1 hour)", "Medium (1-3 hours)", "Long (3+ hours)"],
    field: "timeCommitment",
  },
  {
    title: "What's your budget?",
    options: ["Free", "Cheap", "Moderate", "Expensive"],
    field: "budget",
  },
  {
    title: "Do you want to do this alone or with others?",
    options: ["Solo", "With friends", "Either"],
    field: "social",
  },
] as const;

export type QuestionField = typeof questions[number]['field'];

// Static activity data structure
export interface Activity {
  name: string;
  description: string;
  imageUrl: string;
  difficulty: string;
  timeCommitment: string;
  costEstimate: string;
  benefits: string[];
  tags: {
    activityType: string[];
    environment: string[];
    competitive: string[];
    skills: string[];
    activityLevel: string[];
    timeRequired: string;
    budgetLevel: string;
    social: string[];
  };
  equipment: {
    required: Array<{
      name: string;
      description: string;
      estimatedCost: string;
      amazonUrl?: string;
    }>;
    optional: Array<{
      name: string;
      description: string;
      estimatedCost: string;
      amazonUrl?: string;
    }>;
  };
  gettingStarted: {
    steps: string[];
    tips: string[];
  };
}

// Create a static activities database
export const activities: Activity[] = [
  {
    name: "Nature Journaling",
    description: "Combine artistic expression with nature observation by creating detailed journals of local flora, fauna, and landscapes.",
    imageUrl: "https://images.unsplash.com/photo-1517971053567-8bde93bc6a58",
    difficulty: "Beginner",
    timeCommitment: "1-3 hours",
    costEstimate: "Low",
    benefits: [
      "Improves observational skills",
      "Develops artistic abilities",
      "Increases nature awareness",
      "Reduces stress through mindfulness"
    ],
    tags: {
      activityType: ["Creative Expression", "Learning & Skills"],
      environment: ["Outdoor"],
      competitive: ["Non-competitive"],
      skills: ["Creative & Artistic"],
      activityLevel: ["Relaxed"],
      timeRequired: "Medium (1-3 hours)",
      budgetLevel: "Cheap",
      social: ["Solo", "Either"]
    },
    equipment: {
      required: [
        {
          name: "Sketchbook",
          description: "A5 or A4 size with thick paper suitable for various media",
          estimatedCost: "$10-15",
          amazonUrl: "https://www.amazon.com/dp/B0B5TWNLD9"
        },
        {
          name: "Drawing Pencils",
          description: "Set of graphite pencils with varying hardness",
          estimatedCost: "$8-12",
          amazonUrl: "https://www.amazon.com/dp/B007XMK4FU"
        }
      ],
      optional: [
        {
          name: "Watercolor Set",
          description: "Portable watercolor set for adding color",
          estimatedCost: "$20-30",
          amazonUrl: "https://www.amazon.com/dp/B000IZZ0UM"
        }
      ]
    },
    gettingStarted: {
      steps: [
        "Choose a comfortable outdoor location",
        "Start with simple observations",
        "Practice basic sketching techniques",
        "Add written descriptions and notes"
      ],
      tips: [
        "Begin with pencil sketches before adding color",
        "Focus on one subject at a time",
        "Include weather conditions and dates",
        "Take photos for reference"
      ]
    }
  },
  // ... Additional activities would be added here
];

// Scoring system for matching activities to user preferences
export function scoreActivity(activity: Activity, userPreferences: Record<QuestionField, string>): number {
  let score = 0;
  
  // Match activity type
  if (activity.tags.activityType.includes(userPreferences.activityType)) {
    score += 3;
  }
  
  // Match environment
  if (activity.tags.environment.includes(userPreferences.environment) || userPreferences.environment === "Both") {
    score += 2;
  }
  
  // Match competitive preference
  if (activity.tags.competitive.includes(userPreferences.competitive) || userPreferences.competitive === "Both") {
    score += 2;
  }
  
  // Match skills
  if (activity.tags.skills.includes(userPreferences.skills)) {
    score += 3;
  }
  
  // Match activity level
  if (activity.tags.activityLevel.includes(userPreferences.activityLevel)) {
    score += 2;
  }
  
  // Match time commitment
  if (activity.tags.timeRequired === userPreferences.timeCommitment) {
    score += 2;
  }
  
  // Match budget
  if (activity.tags.budgetLevel === userPreferences.budget) {
    score += 2;
  }
  
  // Match social preference
  if (activity.tags.social.includes(userPreferences.social) || userPreferences.social === "Either") {
    score += 2;
  }
  
  return score;
}

// Function to get recommendations based on user preferences
export function getRecommendations(userPreferences: Record<QuestionField, string>): Activity[] {
  return activities
    .map(activity => ({
      activity,
      score: scoreActivity(activity, userPreferences)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ activity }) => activity);
}