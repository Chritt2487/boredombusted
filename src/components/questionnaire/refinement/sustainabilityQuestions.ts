import { Question } from '../questionTypes';

export const sustainabilityQuestions: Question[] = [
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