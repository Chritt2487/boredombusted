import { Question } from './questionTypes';

export const skillsQuestions: Question[] = [
  {
    title: "What would you like to develop?",
    options: [
      { 
        value: "Technical & Analytical", 
        label: "Technical Skills",
        description: "Problem-solving and analytical thinking"
      },
      { 
        value: "Creative & Artistic", 
        label: "Creative Skills",
        description: "Artistic expression and imagination"
      },
      { 
        value: "Physical & Coordination", 
        label: "Physical Skills",
        description: "Movement and body coordination"
      },
      { 
        value: "Social & Communication", 
        label: "People Skills",
        description: "Interpersonal and communication abilities"
      }
    ],
    field: "skills",
    dependsOn: {
      field: "activityType",
      values: ["Learning & Skills", "Creative Expression"]
    }
  },
  {
    title: "What's your preferred learning method?",
    options: [
      {
        value: "visual",
        label: "Visual Learning",
        description: "Learn through watching and observing"
      },
      {
        value: "handson",
        label: "Hands-on Learning",
        description: "Learn through doing and practicing"
      },
      {
        value: "reading",
        label: "Reading/Writing",
        description: "Learn through written materials"
      },
      {
        value: "audio",
        label: "Audio Learning",
        description: "Learn through listening and discussion"
      }
    ],
    field: "learningMethod",
    dependsOn: {
      field: "activityType",
      values: ["Learning & Skills"]
    }
  },
  {
    title: "How much guidance do you need?",
    options: [
      {
        value: "self",
        label: "Self-guided",
        description: "Prefer to learn independently"
      },
      {
        value: "some",
        label: "Some Guidance",
        description: "Occasional help and direction"
      },
      {
        value: "full",
        label: "Full Instruction",
        description: "Prefer structured teaching"
      }
    ],
    field: "guidanceLevel",
    dependsOn: {
      field: "activityType",
      values: ["Learning & Skills", "Creative Expression"]
    }
  }
];