import { Question } from '../types/questionTypes';

export const learningQuestions: Question[] = [
  {
    title: "What's your preferred learning method?",
    options: [
      {
        value: "visual",
        label: "Visual Learning",
        description: "Learn through watching and observing"
      },
      {
        value: "handson",
        label: "Hands-on Learning",
        description: "Learn through doing and practicing"
      },
      {
        value: "reading",
        label: "Reading/Writing",
        description: "Learn through written materials"
      },
      {
        value: "audio",
        label: "Audio Learning",
        description: "Learn through listening and discussion"
      }
    ],
    field: "learningMethod",
    category: "learning",
    dependsOn: {
      field: "activityType",
      values: ["Learning & Skills"]
    }
  },
  {
    title: "How much guidance do you need?",
    options: [
      {
        value: "self",
        label: "Self-guided",
        description: "Prefer to learn independently"
      },
      {
        value: "some",
        label: "Some Guidance",
        description: "Occasional help and direction"
      },
      {
        value: "full",
        label: "Full Instruction",
        description: "Prefer structured teaching"
      }
    ],
    field: "guidanceLevel",
    category: "learning",
    dependsOn: {
      field: "activityType",
      values: ["Learning & Skills", "Creative Expression"]
    }
  }
];