import { Question } from './questionTypes';

export const refinementQuestions: Question[] = [
  // Existing questions
  {
    title: "How competitive would you like the activity to be?",
    options: [
      { 
        value: "NonCompetitive", 
        label: "Non-competitive",
        description: "Focus on personal enjoyment and growth"
      },
      { 
        value: "MildlyCompetitive", 
        label: "Mildly Competitive",
        description: "Some friendly competition or personal goals"
      },
      { 
        value: "VeryCompetitive", 
        label: "Very Competitive",
        description: "Strong focus on achievement and competition"
      }
    ],
    field: "competitiveness",
    dependsOn: {
      field: "activityType",
      values: ["Physical Activity", "Learning & Skills"]
    }
  },
  // Personal Preferences
  {
    title: "What's your preferred noise level for activities?",
    options: [
      {
        value: "Quiet",
        label: "Quiet",
        description: "Peaceful, minimal noise activities"
      },
      {
        value: "Moderate",
        label: "Moderate",
        description: "Balanced noise level"
      },
      {
        value: "Energetic",
        label: "Energetic",
        description: "Lively, dynamic environment"
      }
    ],
    field: "noiseLevel"
  },
  {
    title: "What's your risk tolerance level?",
    options: [
      {
        value: "VerySafe",
        label: "Very Safe",
        description: "Minimal risk activities"
      },
      {
        value: "ModerateChallenge",
        label: "Moderate Challenge",
        description: "Some challenging elements"
      },
      {
        value: "AdventureSeeking",
        label: "Adventure Seeking",
        description: "More challenging activities"
      }
    ],
    field: "riskTolerance"
  },
  {
    title: "How much creative freedom do you prefer?",
    options: [
      {
        value: "FollowingInstructions",
        label: "Following Instructions",
        description: "Clear, structured guidance"
      },
      {
        value: "SomeCreativity",
        label: "Some Creativity",
        description: "Balance of structure and freedom"
      },
      {
        value: "FullCreativeFreedom",
        label: "Full Creative Freedom",
        description: "Complete creative control"
      }
    ],
    field: "creativeStyle"
  },
  // Goals and Motivation
  {
    title: "What's your primary goal?",
    options: [
      {
        value: "Learning",
        label: "Learning",
        description: "Focus on skill development"
      },
      {
        value: "Fun",
        label: "Fun",
        description: "Pure enjoyment and entertainment"
      },
      {
        value: "Health",
        label: "Health",
        description: "Physical or mental wellbeing"
      },
      {
        value: "Social",
        label: "Social",
        description: "Meeting people and socializing"
      }
    ],
    field: "primaryGoal"
  },
  {
    title: "What's your preferred commitment level?",
    options: [
      {
        value: "OneTime",
        label: "One-time",
        description: "Single session activities"
      },
      {
        value: "ShortTerm",
        label: "Short-term",
        description: "Few weeks or months"
      },
      {
        value: "LongTerm",
        label: "Long-term",
        description: "Ongoing commitment"
      }
    ],
    field: "commitmentLevel"
  },
  {
    title: "How would you like to track progress?",
    options: [
      {
        value: "NoTracking",
        label: "No Tracking",
        description: "Focus on the experience"
      },
      {
        value: "BasicMilestones",
        label: "Basic Milestones",
        description: "Simple progress tracking"
      },
      {
        value: "DetailedProgress",
        label: "Detailed Progress",
        description: "Comprehensive tracking"
      }
    ],
    field: "progressTracking"
  },
  // Activity Depth
  {
    title: "What's your preferred pace?",
    options: [
      {
        value: "FastPaced",
        label: "Fast-paced",
        description: "Dynamic, quick-moving activities"
      },
      {
        value: "SlowerReflective",
        label: "Slower, Reflective",
        description: "Thoughtful, measured pace"
      }
    ],
    field: "pacePreference"
  },
  // Lifestyle Fit
  {
    title: "When do you prefer to do activities?",
    options: [
      {
        value: "Weekdays",
        label: "Weekdays",
        description: "Monday to Friday"
      },
      {
        value: "Weekends",
        label: "Weekends",
        description: "Saturday and Sunday"
      },
      {
        value: "Both",
        label: "Both",
        description: "Any day of the week"
      }
    ],
    field: "timeOfWeek"
  },
  {
    title: "How would you like this to fit into your lifestyle?",
    options: [
      {
        value: "DailyLife",
        label: "Integrate into Daily Life",
        description: "Regular part of routine"
      },
      {
        value: "SpecialActivity",
        label: "Special Activity",
        description: "Occasional special event"
      }
    ],
    field: "lifestyleIntegration"
  },
  // Technology and Resources
  {
    title: "What's your preference for technology use?",
    options: [
      {
        value: "TechBased",
        label: "Tech-based",
        description: "Digital activities"
      },
      {
        value: "Analog",
        label: "Analog",
        description: "Traditional, non-digital activities"
      },
      {
        value: "Mixed",
        label: "Mixed",
        description: "Combination of both"
      }
    ],
    field: "technologyUse"
  },
  // Sustainability and Impact
  {
    title: "Are you interested in eco-friendly activities?",
    options: [
      {
        value: "Yes",
        label: "Yes",
        description: "Focus on sustainable activities"
      },
      {
        value: "No",
        label: "No Preference",
        description: "Not a primary concern"
      }
    ],
    field: "ecoFriendly"
  },
  {
    title: "Would you like activities that impact the community?",
    options: [
      {
        value: "Yes",
        label: "Yes",
        description: "Activities that give back"
      },
      {
        value: "No",
        label: "No Preference",
        description: "Not a primary concern"
      }
    ],
    field: "communityImpact"
  }
];
