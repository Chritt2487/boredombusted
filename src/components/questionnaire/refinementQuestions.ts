import { Question } from './questionTypes';

export const refinementQuestions: Question[] = [
  {
    title: "How competitive would you like the activity to be?",
    options: [
      { 
        value: "NonCompetitive", 
        label: "Non-competitive",
        description: "Focus on personal enjoyment and growth"
      },
      { 
        value: "MildlyCompetitive", 
        label: "Mildly Competitive",
        description: "Some friendly competition or personal goals"
      },
      { 
        value: "VeryCompetitive", 
        label: "Very Competitive",
        description: "Strong focus on achievement and competition"
      }
    ],
    field: "competitiveness",
    dependsOn: {
      field: "activityType",
      values: ["Physical Activity", "Learning & Skills"]
    }
  },
  {
    title: "How quickly would you like to see progress?",
    options: [
      { 
        value: "Quick", 
        label: "Quick Progress",
        description: "See results within a few sessions"
      },
      { 
        value: "Moderate", 
        label: "Moderate Pace",
        description: "Steady progress over weeks"
      },
      { 
        value: "Gradual", 
        label: "Gradual Development",
        description: "Focus on long-term mastery"
      }
    ],
    field: "learningCurve"
  },
  {
    title: "What's your preferred time of day?",
    options: [
      { 
        value: "Morning", 
        label: "Morning",
        description: "Early day activities"
      },
      { 
        value: "Afternoon", 
        label: "Afternoon",
        description: "Mid-day activities"
      },
      { 
        value: "Evening", 
        label: "Evening",
        description: "Late day activities"
      },
      { 
        value: "Any", 
        label: "No Preference",
        description: "Flexible timing"
      }
    ],
    field: "timeOfDay"
  },
  {
    title: "Do you prefer structured or flexible activities?",
    options: [
      { 
        value: "Structured", 
        label: "Structured",
        description: "Activities with clear steps and guidelines"
      },
      { 
        value: "Flexible", 
        label: "Flexible",
        description: "Activities with room for creativity and adaptation"
      },
      { 
        value: "Mixed", 
        label: "Mix of Both",
        description: "Balance of structure and flexibility"
      }
    ],
    field: "structure",
    dependsOn: {
      field: "activityType",
      values: ["Learning & Skills", "Creative Expression"]
    }
  }
];