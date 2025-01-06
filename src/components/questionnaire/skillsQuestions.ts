import { Question } from './questionTypes';

export const skillsQuestions: Question[] = [
  {
    title: "What would you like to develop?",
    options: [
      { 
        value: "Technical & Analytical", 
        label: "Technical Skills",
        description: "Problem-solving and analytical thinking"
      },
      { 
        value: "Creative & Artistic", 
        label: "Creative Skills",
        description: "Artistic expression and imagination"
      },
      { 
        value: "Physical & Coordination", 
        label: "Physical Skills",
        description: "Movement and body coordination"
      },
      { 
        value: "Social & Communication", 
        label: "People Skills",
        description: "Interpersonal and communication abilities"
      }
    ],
    field: "skills",
    dependsOn: {
      field: "activityType",
      values: ["Learning & Skills", "Creative Expression"]
    }
  }
];