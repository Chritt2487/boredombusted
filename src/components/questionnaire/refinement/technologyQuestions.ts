import { Question } from '../questionTypes';

export const technologyQuestions: Question[] = [
  {
    title: "What's your preference for technology use?",
    options: [
      {
        value: "TechBased",
        label: "Tech-based",
        description: "Digital activities"
      },
      {
        value: "Analog",
        label: "Analog",
        description: "Traditional, non-digital activities"
      },
      {
        value: "Mixed",
        label: "Mixed",
        description: "Combination of both"
      }
    ],
    field: "technologyUse"
  }
];