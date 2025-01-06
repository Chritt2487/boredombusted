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
    title: "What's your preferred group size?",
    options: [
      {
        value: "oneOnOne",
        label: "1-on-1",
        description: "Individual or paired activities"
      },
      {
        value: "small",
        label: "Small Group (3-5)",
        description: "Small group activities"
      },
      {
        value: "large",
        label: "Larger Group",
        description: "Activities with more participants"
      }
    ],
    field: "groupSize",
    dependsOn: {
      field: "social",
      values: ["With friends", "Either"]
    }
  },
  {
    title: "What level of social interaction do you prefer?",
    options: [
      {
        value: "minimal",
        label: "Minimal",
        description: "Limited interaction with others"
      },
      {
        value: "moderate",
        label: "Moderate",
        description: "Balanced social interaction"
      },
      {
        value: "high",
        label: "High",
        description: "Lots of social interaction"
      }
    ],
    field: "socialLevel",
    dependsOn: {
      field: "social",
      values: ["With friends", "Either"]
    }
  }
];