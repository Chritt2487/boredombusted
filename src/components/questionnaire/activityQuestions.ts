import { Question } from './questionTypes';

export const activityQuestions: Question[] = [
  {
    title: "What type of activity interests you most?",
    options: [
      { value: "Creative Expression", label: "Creative Expression" },
      { value: "Physical Activity", label: "Physical Activity" },
      { value: "Learning & Skills", label: "Learning & Skills" },
      { value: "Social & Community", label: "Social & Community" },
      { value: "Relaxation & Mindfulness", label: "Relaxation & Mindfulness" }
    ],
    field: "activityType"
  },
  {
    title: "Where would you prefer to spend your time?",
    options: [
      { value: "Indoor", label: "Indoor" },
      { value: "Outdoor", label: "Outdoor" },
      { value: "Both", label: "Both" }
    ],
    field: "environment",
    dependsOn: {
      field: "activityLevel",
      values: ["light", "moderate", "active"]
    }
  },
  {
    title: "Do you prefer competitive or non-competitive activities?",
    options: [
      { value: "Competitive", label: "Competitive" },
      { value: "Non-competitive", label: "Non-competitive" },
      { value: "Both", label: "Both" }
    ],
    field: "competitive",
    dependsOn: {
      field: "activityType",
      values: ["Physical Activity", "Social & Community"]
    }
  }
];