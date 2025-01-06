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
    title: "Who would you like to do this with?",
    options: [
      { 
        value: "Solo", 
        label: "By Myself",
        description: "Solo activities"
      },
      { 
        value: "With friends", 
        label: "With Others",
        description: "Group or social activities"
      },
      { 
        value: "Either", 
        label: "Either Way",
        description: "Flexible with solo or group activities"
      }
    ],
    field: "social"
  }
];