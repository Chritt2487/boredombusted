import { Question } from './questionTypes';

export const basicQuestions: Question[] = [
  {
    title: "What's your age group?",
    options: [
      { 
        value: "child",
        label: "Under 13",
        description: "Activities suitable for children"
      },
      { 
        value: "teen",
        label: "13-17",
        description: "Activities suitable for teenagers"
      },
      { 
        value: "adult",
        label: "18+",
        description: "Activities suitable for adults"
      }
    ],
    field: "age"
  },
  {
    title: "What's your current energy level?",
    options: [
      { 
        value: "low",
        label: "Low Energy",
        description: "Looking for something relaxing or calming"
      },
      { 
        value: "moderate",
        label: "Moderate Energy",
        description: "Open to light physical activity or engaging tasks"
      },
      { 
        value: "high",
        label: "High Energy",
        description: "Ready for something active or challenging"
      }
    ],
    field: "activityLevel"
  }
];