import { Question } from '../types/questionTypes';

export const socialQuestions: Question[] = [
  {
    title: "Do you prefer solo or group activities?",
    options: [
      {
        value: "solo",
        label: "Solo Activities",
        description: "Activities you can do by yourself"
      },
      {
        value: "group",
        label: "Group Activities",
        description: "Activities involving others"
      },
      {
        value: "either",
        label: "Either",
        description: "Open to both solo and group activities"
      }
    ],
    field: "social",
    category: "social"
  },
  {
    title: "What's your preferred group size?",
    options: [
      {
        value: "oneOnOne",
        label: "1-on-1",
        description: "Individual or paired activities"
      },
      {
        value: "small",
        label: "Small Group (3-5)",
        description: "Small group activities"
      },
      {
        value: "large",
        label: "Larger Group",
        description: "Activities with more participants"
      }
    ],
    field: "groupSize",
    category: "social",
    dependsOn: {
      field: "social",
      values: ["group", "either"]
    }
  }
];