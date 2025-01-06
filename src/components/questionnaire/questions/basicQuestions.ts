import { Question } from '../types/questionTypes';

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
    field: "age",
    category: "basic"
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
    field: "activityLevel",
    category: "basic"
  },
  {
    title: "Do you have any mobility considerations?",
    options: [
      {
        value: "full",
        label: "Full Mobility",
        description: "No physical limitations"
      },
      {
        value: "some",
        label: "Some Limitations",
        description: "Prefer activities with moderate physical demands"
      },
      {
        value: "seated",
        label: "Seated Activities",
        description: "Prefer activities that can be done while seated"
      }
    ],
    field: "mobility",
    category: "basic"
  }
];