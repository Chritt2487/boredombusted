import { Question } from './questionTypes';

export const refinementQuestions: Question[] = [
  {
    title: "What's your preferred pace?",
    options: [
      { 
        value: "Fast-paced", 
        label: "Fast & Energetic",
        description: "Activities that keep you moving and engaged"
      },
      { 
        value: "Moderate", 
        label: "Balanced & Steady",
        description: "Activities with a mix of action and breaks"
      },
      { 
        value: "Relaxed", 
        label: "Calm & Peaceful",
        description: "Activities that let you take your time"
      }
    ],
    field: "pace"
  },
  {
    title: "How do you prefer to learn?",
    options: [
      { 
        value: "Hands-on", 
        label: "By Doing",
        description: "Learning through direct experience"
      },
      { 
        value: "Visual", 
        label: "By Watching",
        description: "Learning through observation and demonstration"
      },
      { 
        value: "Interactive", 
        label: "Through Discussion",
        description: "Learning through conversation and exchange"
      }
    ],
    field: "learningStyle"
  },
  {
    title: "What time of day do you prefer for activities?",
    options: [
      { 
        value: "Morning", 
        label: "Morning Person",
        description: "Activities best suited for early hours"
      },
      { 
        value: "Afternoon", 
        label: "Afternoon Energy",
        description: "Activities during the middle of the day"
      },
      { 
        value: "Evening", 
        label: "Night Owl",
        description: "Activities in the evening or night"
      }
    ],
    field: "timeOfDay"
  }
];