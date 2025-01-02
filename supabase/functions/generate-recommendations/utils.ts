import { Activity, UserAnswers } from './types.ts';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export function generatePrompt(answers: UserAnswers, existingActivities: string[] = []): string {
  return `Based on these preferences:
    - Main interest: ${answers.initialChoice}
    - Environment: ${answers.environment}
    - Activity Level: ${answers.activityLevel}
    - Time Commitment: ${answers.timeCommitment}
    - Budget: ${answers.budget}
    - Social Setting: ${answers.social}

    Generate 4 activity recommendations that are NOT in this list: ${existingActivities.join(', ')}
    
    Return ONLY a valid JSON object with this exact structure, no additional text:
    {
      "activities": [
        {
          "name": "Activity Name",
          "description": "Activity description (2-3 sentences)",
          "tips": ["tip1", "tip2", "tip3"]
        }
      ]
    }`;
}

export function validateActivities(activities: Activity[]): void {
  if (!Array.isArray(activities)) {
    throw new Error('Response missing activities array');
  }
  
  if (activities.length !== 4) {
    throw new Error('Expected exactly 4 activities');
  }
  
  activities.forEach((activity, index) => {
    if (!activity.name || !activity.description || !Array.isArray(activity.tips)) {
      throw new Error(`Activity at index ${index} has invalid structure`);
    }
  });
}