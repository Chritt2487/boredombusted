import { Activity, UserAnswers } from './types.ts';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export function applyWeightedParameters(answers: UserAnswers): UserAnswers {
  // Define random weights for each parameter type
  const weights = {
    environment: Math.random() * 0.4 + 0.8, // 0.8 to 1.2
    activityLevel: Math.random() * 0.4 + 0.8,
    social: Math.random() * 0.4 + 0.8,
    skills: Math.random() * 0.4 + 0.8
  };

  console.log('Applied parameter weights:', weights);

  // Clone answers to avoid modifying the original
  const weightedAnswers = { ...answers };

  // Add weight information to the prompt
  weightedAnswers.environment = `${answers.environment} (weight: ${weights.environment.toFixed(2)})`;
  weightedAnswers.activityLevel = `${answers.activityLevel} (weight: ${weights.activityLevel.toFixed(2)})`;
  weightedAnswers.social = `${answers.social} (weight: ${weights.social.toFixed(2)})`;
  if (answers.skills) {
    weightedAnswers.skills = `${answers.skills} (weight: ${weights.skills.toFixed(2)})`;
  }

  return weightedAnswers;
}

export function generatePrompt(answers: UserAnswers, existingActivities: string[] = []): string {
  const activityLevelGuide = {
    low: "very light physical effort, relaxing activities",
    moderate: "some physical movement, balanced energy level",
    high: "significant physical effort, energetic activities"
  };

  const budgetGuide = {
    Free: "no cost required",
    Cheap: "under $20",
    Moderate: "$20-100",
    Expensive: "over $100"
  };

  const timeGuide = {
    "Short (<1 hour)": "activities that take less than 1 hour",
    "Medium (1-3 hours)": "activities that take 1-3 hours",
    "Long (3+ hours)": "activities that take more than 3 hours"
  };

  const ageRestrictions = {
    child: "STRICTLY child-safe activities only. No dangerous tools, no online interactions with strangers, must require adult supervision where appropriate. Focus on educational and fun activities.",
    teen: "Age-appropriate activities for teenagers. No dangerous activities, nothing explicit or inappropriate. Focus on skill-building and social activities with proper safety considerations.",
    adult: "Adult-appropriate activities while maintaining family-friendly content. No explicit, violent, or inappropriate suggestions."
  };

  const refinementContext = answers.isRefined 
    ? `
    Additional strict requirements:
    - Competitiveness Level: ${answers.competitiveness}
      * NonCompetitive: focus on personal enjoyment only
      * MildlyCompetitive: light friendly competition
      * VeryCompetitive: strong competitive element
    - Learning Curve: ${answers.learningCurve}
      * Quick: can be learned in one session
      * Moderate: requires a few sessions to get comfortable
      * Gradual: requires consistent practice
    - Time of Day: ${answers.timeOfDay}
      * Must be suitable for ${answers.timeOfDay.toLowerCase()} hours
    - Structure: ${answers.structure}
      * Structured: clear rules and guidelines
      * Flexible: room for creativity
      * Mixed: combination of both`
    : '';

  return `Generate 2-6 activity recommendations that STRICTLY match these requirements:

    CRITICAL SAFETY AND CONTENT REQUIREMENTS:
    - Age Group: ${answers.age} (${ageRestrictions[answers.age]})
    - ALL content must be family-friendly
    - NO explicit, sexual, or violent content
    - NO dangerous activities
    - NO mature themes or suggestions
    - Include appropriate safety warnings and adult supervision requirements where needed

    Core Requirements (ALL must be met):
    - Activity Type: ${answers.activityType}
    - Environment: ${answers.environment} activities only
    - Energy Level: ${answers.activityLevel} (${activityLevelGuide[answers.activityLevel]})
    - Time Commitment: ${answers.timeCommitment} (${timeGuide[answers.timeCommitment]})
    - Budget: ${answers.budget} (${budgetGuide[answers.budget]})
    - Social Setting: ${answers.social} activities only
    ${refinementContext}

    IMPORTANT:
    1. Do NOT include any of these existing activities: ${existingActivities.join(', ')}
    2. Each activity MUST strictly adhere to ALL requirements above
    3. Activities should be specific, actionable, and age-appropriate
    4. Include practical tips for implementation and safety considerations
    5. Be creative and suggest at least one unconventional or surprising activity that still fits the criteria

    Return ONLY a valid JSON object with this exact structure:
    {
      "activities": [
        {
          "name": "Specific Activity Name",
          "description": "Detailed description (2-3 sentences)",
          "tips": ["3-4 practical tips for getting started, including safety considerations"]
        }
      ]
    }`;
}

export function validateActivities(activities: Activity[]): void {
  console.log('Validating activities:', activities);
  
  if (!Array.isArray(activities)) {
    console.error('Response missing activities array');
    throw new Error('Response missing activities array');
  }
  
  if (activities.length < 2 || activities.length > 6) {
    console.error(`Invalid number of activities: ${activities.length}. Expected between 2 and 6 activities.`);
    throw new Error(`Invalid number of activities: ${activities.length}. Expected between 2 and 6 activities.`);
  }
  
  activities.forEach((activity, index) => {
    console.log(`Validating activity ${index + 1}:`, activity);
    
    if (!activity.name || !activity.description || !Array.isArray(activity.tips)) {
      console.error(`Activity at index ${index} has invalid structure:`, activity);
      throw new Error(`Activity at index ${index} has invalid structure`);
    }
    
    if (activity.tips.length < 2) {
      console.error(`Activity at index ${index} has insufficient tips:`, activity.tips);
      throw new Error(`Activity at index ${index} must have at least 2 tips`);
    }
    
    if (activity.description.split('.').length < 2) {
      console.error(`Activity at index ${index} has insufficient description:`, activity.description);
      throw new Error(`Activity at index ${index} description must be at least 2 sentences`);
    }

    const inappropriateTerms = [
      'explicit content',
      'sexual content',
      'violence',
      'weapon',
      'drug',
      'alcohol',
      'gambling',
      'mature content',
      'adult content',
      'nsfw'
    ];

    const contentToCheck = [
      activity.name.toLowerCase(),
      activity.description.toLowerCase(),
      ...activity.tips.map(tip => tip.toLowerCase())
    ].join(' ');

    const foundTerms = inappropriateTerms.filter(term => contentToCheck.includes(term));
    if (foundTerms.length > 0) {
      console.error(`Activity at index ${index} contains prohibited content:`, foundTerms);
      throw new Error(`Activity at index ${index} contains prohibited content: ${foundTerms.join(', ')}`);
    }
  });
}