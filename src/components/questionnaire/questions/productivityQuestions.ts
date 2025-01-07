import { Question } from '../types/questionTypes';

export const productivityQuestions: Question[] = [
  {
    title: "Are you looking for productive activities?",
    options: [
      {
        value: "Yes",
        label: "Yes, I want to be productive",
        description: "Find activities that help you grow and accomplish goals"
      },
      {
        value: "No",
        label: "No, just looking for fun",
        description: "Focus on entertainment and enjoyment"
      },
      {
        value: "Both",
        label: "Mix of both",
        description: "Balance productivity with entertainment"
      }
    ],
    field: "productivityFocus",
    category: "preferences"
  },
  {
    title: "What type of productive activity interests you?",
    options: [
      {
        value: "HomeProjects",
        label: "Home Projects",
        description: "DIY, organization, home improvement"
      },
      {
        value: "SkillLearning",
        label: "Learning New Skills",
        description: "Professional or personal skill development"
      },
      {
        value: "SelfImprovement",
        label: "Self-Improvement",
        description: "Health, habits, personal growth"
      },
      {
        value: "CreativeProjects",
        label: "Creative Projects",
        description: "Art, writing, design projects"
      }
    ],
    field: "productivityType",
    category: "preferences",
    dependsOn: {
      field: "productivityFocus",
      values: ["Yes", "Both"]
    }
  }
];