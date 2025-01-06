import { Question } from './questionTypes';

export const refinementQuestions: Question[] = [
  {
    title: "How challenging would you like the activity to be?",
    options: [
      { 
        value: "Easy", 
        label: "Beginner Friendly",
        description: "Activities suitable for newcomers"
      },
      { 
        value: "Moderate", 
        label: "Some Challenge",
        description: "Activities requiring moderate effort or skill"
      },
      { 
        value: "Challenging", 
        label: "Quite Challenging",
        description: "Activities that push your limits"
      }
    ],
    field: "difficulty",
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
  },
  {
    title: "Would you like equipment to be provided?",
    options: [
      { 
        value: "Provided", 
        label: "Yes, Equipment Provided",
        description: "Activities where equipment is included or rentable"
      },
      { 
        value: "BringOwn", 
        label: "I'll Bring My Own",
        description: "Activities where you use your own equipment"
      },
      { 
        value: "NoEquipment", 
        label: "No Equipment Needed",
        description: "Activities that don't require special equipment"
      }
    ],
    field: "equipment",
    dependsOn: {
      field: "activityType",
      values: ["Physical Activity", "Creative Expression"]
    }
  }
];