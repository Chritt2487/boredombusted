import { Question } from '../questionTypes';

export const progressQuestions: Question[] = [
  {
    title: "How would you like to track progress?",
    options: [
      {
        value: "NoTracking",
        label: "No Tracking",
        description: "Focus on the experience"
      },
      {
        value: "BasicMilestones",
        label: "Basic Milestones",
        description: "Simple progress tracking"
      },
      {
        value: "DetailedProgress",
        label: "Detailed Progress",
        description: "Comprehensive tracking"
      }
    ],
    field: "progressTracking"
  },
  {
    title: "What's your preferred pace?",
    options: [
      {
        value: "FastPaced",
        label: "Fast-paced",
        description: "Dynamic, quick-moving activities"
      },
      {
        value: "SlowerReflective",
        label: "Slower, Reflective",
        description: "Thoughtful, measured pace"
      }
    ],
    field: "pacePreference"
  }
];