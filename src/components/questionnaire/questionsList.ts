import { Question } from './questionTypes';

export const questions: readonly Question[] = [
  {
    title: "What type of activity interests you most?",
    description: "This helps us understand your primary motivation",
    options: [
      "Creative Expression",
      "Physical Activity",
      "Learning & Skills",
      "Social & Community",
      "Relaxation & Mindfulness",
      "Problem Solving"
    ],
    field: "activityType",
  },
  {
    title: "Where would you prefer to spend your time?",
    description: "Choose your preferred environment",
    options: ["Indoor", "Outdoor", "Both"],
    field: "environment",
  },
  {
    title: "Do you prefer competitive or non-competitive activities?",
    description: "This helps us match your competitive spirit",
    options: ["Highly Competitive", "Casually Competitive", "Non-competitive", "Both"],
    field: "competitive",
  },
  {
    title: "What skills would you like to develop?",
    description: "Select the type of skills you're most interested in building",
    options: [
      "Technical & Analytical",
      "Creative & Artistic",
      "Physical & Coordination",
      "Social & Communication",
      "Problem Solving",
      "Leadership & Management"
    ],
    field: "skills",
  },
  {
    title: "How do you prefer to learn and develop?",
    description: "This helps us match activities to your learning style",
    options: [
      "Hands-on Practice",
      "Visual Learning",
      "Group Learning",
      "Self-Paced Study",
      "Structured Programs"
    ],
    field: "learningStyle",
  },
  {
    title: "How creative would you like the activity to be?",
    description: "Select your preferred level of creative expression",
    options: [
      "Highly Creative",
      "Somewhat Creative",
      "Technical/Structured",
      "Mix of Both"
    ],
    field: "creativity",
  },
  {
    title: "How active do you want to be?",
    description: "Choose your preferred activity level",
    options: ["Very Active", "Moderately Active", "Light Activity", "Minimal Movement"],
    field: "activityLevel",
  },
  {
    title: "How much time can you commit?",
    description: "Select your preferred time commitment",
    options: ["Quick (<30 mins)", "Short (30-60 mins)", "Medium (1-3 hours)", "Long (3+ hours)"],
    field: "timeCommitment",
  },
  {
    title: "What's your budget?",
    description: "Choose your preferred investment level",
    options: ["Free", "Low Cost ($1-50)", "Medium ($50-200)", "High ($200+)"],
    field: "budget",
  },
  {
    title: "Do you want to do this alone or with others?",
    description: "Select your preferred social setting",
    options: ["Solo Only", "Small Groups", "Large Groups", "Flexible"],
    field: "social",
  },
];