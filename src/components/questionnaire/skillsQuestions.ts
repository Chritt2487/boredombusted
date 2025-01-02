import { Question } from './questionTypes';

export const skillsQuestions: Question[] = [
  {
    title: "What skills would you like to develop?",
    options: [
      { value: "Technical & Analytical", label: "Technical & Analytical" },
      { value: "Creative & Artistic", label: "Creative & Artistic" },
      { value: "Physical & Coordination", label: "Physical & Coordination" },
      { value: "Social & Communication", label: "Social & Communication" },
      { value: "Problem Solving", label: "Problem Solving" }
    ],
    field: "skills",
    dependsOn: {
      field: "activityType",
      values: ["Learning & Skills", "Creative Expression"]
    }
  }
];