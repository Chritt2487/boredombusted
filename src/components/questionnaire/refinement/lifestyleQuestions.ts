import { Question } from '../questionTypes';

export const lifestyleQuestions: Question[] = [
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
  }
];