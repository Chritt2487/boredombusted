import { Question } from './questionTypes';

export const activityQuestions: Question[] = [
  {
    title: "What interests you most right now?",
    options: [
      { 
        value: "Creative Expression", 
        label: "Creative & Artistic",
        description: "Activities involving art, music, or self-expression"
      },
      { 
        value: "Physical Activity", 
        label: "Movement & Exercise",
        description: "Sports, fitness, or outdoor activities"
      },
      { 
        value: "Learning & Skills", 
        label: "Learning Something New",
        description: "Developing new abilities or knowledge"
      },
      { 
        value: "Social & Community", 
        label: "Meeting People",
        description: "Group activities and social interactions"
      },
      { 
        value: "Relaxation & Mindfulness", 
        label: "Rest & Relaxation",
        description: "Calming and peaceful activities"
      }
    ],
    field: "activityType"
  },
  {
    title: "Where would you prefer to be?",
    options: [
      { 
        value: "Indoor", 
        label: "Indoors",
        description: "Activities in a controlled environment"
      },
      { 
        value: "Outdoor", 
        label: "Outdoors",
        description: "Activities in nature or open spaces"
      },
      { 
        value: "Both", 
        label: "No Preference",
        description: "Open to either indoor or outdoor activities"
      }
    ],
    field: "environment"
  }
];