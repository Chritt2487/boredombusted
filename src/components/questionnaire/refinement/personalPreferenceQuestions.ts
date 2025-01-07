import { Question } from '../questionTypes';

export const personalPreferenceQuestions: Question[] = [
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
  }
];