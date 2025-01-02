export const questions = [
  {
    title: "Where would you prefer to spend your time?",
    options: ["Indoor", "Outdoor", "Both"],
    field: "environment",
  },
  {
    title: "How active do you want to be?",
    options: ["Relaxed", "Moderate", "Active"],
    field: "activityLevel",
  },
  {
    title: "How much time do you want to spend?",
    options: ["Short (<1 hour)", "Medium (1-3 hours)", "Long (3+ hours)"],
    field: "timeCommitment",
  },
  {
    title: "What's your budget?",
    options: ["Free", "Cheap", "Moderate", "Expensive"],
    field: "budget",
  },
  {
    title: "Do you want to do this alone or with others?",
    options: ["Solo", "With friends", "Either"],
    field: "social",
  },
] as const;

export type QuestionField = typeof questions[number]['field'];