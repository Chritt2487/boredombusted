import { Question } from './questionTypes';

export const basicQuestions: Question[] = [
  {
    title: "What's your age group?",
    options: [
      { value: "under_18", label: "Under 18" },
      { value: "18_30", label: "18-30" },
      { value: "31_50", label: "31-50" },
      { value: "over_50", label: "Over 50" }
    ],
    field: "age"
  },
  {
    title: "How would you describe your activity level?",
    options: [
      { 
        value: "sedentary",
        label: "Sedentary",
        description: "Mostly sitting, little physical activity"
      },
      { 
        value: "light",
        label: "Light",
        description: "Regular daily activities, occasional light exercise"
      },
      { 
        value: "moderate",
        label: "Moderate",
        description: "Regular exercise 2-3 times a week"
      },
      { 
        value: "active",
        label: "Active",
        description: "Regular intense exercise 4+ times a week"
      }
    ],
    field: "activityLevel"
  }
];