import { Question } from './questionTypes';

export const practicalQuestions: Question[] = [
  {
    title: "How much time do you have?",
    options: [
      { 
        value: "Short (<1 hour)", 
        label: "Quick Activity",
        description: "Less than 1 hour"
      },
      { 
        value: "Medium (1-3 hours)", 
        label: "Few Hours",
        description: "1-3 hours"
      },
      { 
        value: "Long (3+ hours)", 
        label: "Extended Time",
        description: "More than 3 hours"
      }
    ],
    field: "timeCommitment"
  },
  {
    title: "What's your budget?",
    options: [
      { 
        value: "Free", 
        label: "Free",
        description: "No cost activities"
      },
      { 
        value: "Cheap", 
        label: "Low Cost",
        description: "Under $20"
      },
      { 
        value: "Moderate", 
        label: "Medium Cost",
        description: "$20-100"
      },
      { 
        value: "Expensive", 
        label: "High Cost",
        description: "Over $100"
      }
    ],
    field: "budget"
  },
  {
    title: "What equipment do you have available?",
    options: [
      {
        value: "none",
        label: "No Equipment",
        description: "Activities requiring no special equipment"
      },
      {
        value: "basic",
        label: "Basic Household Items",
        description: "Common items found at home"
      },
      {
        value: "purchase",
        label: "Willing to Purchase",
        description: "Open to buying necessary equipment"
      }
    ],
    field: "equipment",
    dependsOn: {
      field: "budget",
      values: ["Cheap", "Moderate", "Expensive"]
    }
  },
  {
    title: "How flexible is your schedule?",
    options: [
      {
        value: "fixed",
        label: "Fixed Schedule",
        description: "Need specific time slots"
      },
      {
        value: "flexible",
        label: "Flexible Timing",
        description: "Can adjust timing as needed"
      }
    ],
    field: "scheduleFlexibility"
  }
];