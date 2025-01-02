import { Question } from './questionTypes';

export const practicalQuestions: Question[] = [
  {
    title: "How much time do you want to spend?",
    options: [
      { value: "Short (<1 hour)", label: "Short (<1 hour)" },
      { value: "Medium (1-3 hours)", label: "Medium (1-3 hours)" },
      { value: "Long (3+ hours)", label: "Long (3+ hours)" }
    ],
    field: "timeCommitment"
  },
  {
    title: "What's your budget?",
    options: [
      { value: "Free", label: "Free" },
      { value: "Cheap", label: "Cheap ($1-20)" },
      { value: "Moderate", label: "Moderate ($20-100)" },
      { value: "Expensive", label: "Expensive ($100+)" }
    ],
    field: "budget"
  },
  {
    title: "Do you want to do this alone or with others?",
    options: [
      { value: "Solo", label: "Solo" },
      { value: "With friends", label: "With friends" },
      { value: "Either", label: "Either" }
    ],
    field: "social"
  }
];