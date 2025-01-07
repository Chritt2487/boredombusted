import { Question } from '../questionTypes';

export const competitionQuestions: Question[] = [
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
  }
];