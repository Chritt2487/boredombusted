import { Question } from '../questionTypes';

export const goalQuestions: Question[] = [
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
  }
];