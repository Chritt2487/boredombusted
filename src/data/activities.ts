import { Activity } from '@/components/questionnaire/activityTypes';

export const activities: Activity[] = [
  {
    id: "nature-journaling",
    name: "Nature Journaling",
    slug: "nature-journaling",
    description: "Combine artistic expression with nature observation by keeping a detailed journal of your outdoor experiences, including sketches, notes, and observations about local flora and fauna.",
    shortDescription: "Document nature through art and writing",
    imageUrl: "https://images.unsplash.com/photo-1517971053567-8bde93bc6a58",
    difficulty: "Beginner",
    timeCommitment: "Short (30-60 mins)",
    costEstimate: "Low Cost ($1-50)",
    benefits: [
      "Improves observational skills",
      "Develops artistic abilities",
      "Increases nature awareness",
      "Reduces stress through mindfulness"
    ],
    tags: {
      activityType: ["Creative Expression", "Learning & Skills"],
      environment: ["Outdoor"],
      competitive: "Non-competitive",
      skills: ["Creative & Artistic"],
      activityLevel: "Light Activity",
      learningStyle: ["Visual Learning", "Hands-on Practice"],
      creativity: "Highly Creative",
      timeRequired: "Short (30-60 mins)",
      budgetLevel: "Low Cost ($1-50)",
      social: ["Solo Only", "Small Groups"]
    },
    equipment: [
      {
        name: "Sketchbook",
        description: "A durable notebook suitable for outdoor use",
        estimatedCost: "$15-20",
        affiliateUrl: "https://amazon.com/sketchbook",
        required: true
      },
      {
        name: "Drawing Pencils",
        description: "Set of various hardness pencils for sketching",
        estimatedCost: "$10-15",
        affiliateUrl: "https://amazon.com/drawing-pencils",
        required: true
      }
    ],
    gettingStarted: {
      steps: [
        "Choose a comfortable outdoor location",
        "Start with simple observations",
        "Practice basic sketching techniques",
        "Add written descriptions",
        "Document weather and conditions"
      ],
      tips: [
        "Start with simple subjects",
        "Focus on one detail at a time",
        "Don't worry about perfection",
        "Use different perspectives"
      ]
    },
    wordpress: {
      postType: "hobby",
      categoryId: 1,
      taxonomies: {
        difficulty_level: ["beginner"],
        activity_type: ["creative", "nature"],
        environment: ["outdoor"]
      }
    }
  },
  {
    id: "birdwatching",
    name: "Birdwatching",
    slug: "birdwatching",
    description: "Observe and identify different bird species in their natural habitats, learning about their behaviors, calls, and migration patterns.",
    shortDescription: "Discover and identify local bird species",
    imageUrl: "https://images.unsplash.com/photo-1621631187029-c1e8f11f9c42",
    difficulty: "Beginner",
    timeCommitment: "Medium (1-3 hours)",
    costEstimate: "Medium ($50-200)",
    benefits: [
      "Improves patience and focus",
      "Increases environmental awareness",
      "Develops identification skills",
      "Encourages outdoor activity"
    ],
    tags: {
      activityType: ["Learning & Skills", "Relaxation & Mindfulness"],
      environment: ["Outdoor"],
      competitive: "Non-competitive",
      skills: ["Technical & Analytical"],
      activityLevel: "Light Activity",
      learningStyle: ["Visual Learning", "Self-Paced Study"],
      creativity: "Technical/Structured",
      timeRequired: "Medium (1-3 hours)",
      budgetLevel: "Medium ($50-200)",
      social: ["Solo Only", "Small Groups"]
    },
    equipment: [
      {
        name: "Binoculars",
        description: "Entry-level birding binoculars",
        estimatedCost: "$100-150",
        affiliateUrl: "https://amazon.com/binoculars",
        required: true
      },
      {
        name: "Field Guide",
        description: "Local bird identification guide",
        estimatedCost: "$20-30",
        affiliateUrl: "https://amazon.com/bird-guide",
        required: true
      }
    ],
    gettingStarted: {
      steps: [
        "Research local bird species",
        "Learn basic bird identification",
        "Find good observation spots",
        "Practice using binoculars",
        "Start a bird journal"
      ],
      tips: [
        "Start in your backyard",
        "Learn common bird calls",
        "Be patient and quiet",
        "Join local birding groups"
      ]
    },
    wordpress: {
      postType: "hobby",
      categoryId: 2,
      taxonomies: {
        difficulty_level: ["beginner"],
        activity_type: ["nature", "educational"],
        environment: ["outdoor"]
      }
    }
  }
];