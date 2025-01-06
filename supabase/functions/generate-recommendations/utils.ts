import { Activity, UserAnswers } from './types.ts';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export function generatePrompt(answers: UserAnswers, existingActivities: string[] = []): string {
  const refinementContext = answers.isRefined 
    ? `Additional preferences:
    - Competitiveness: ${answers.competitiveness || 'Not specified'}
    - Learning Curve: ${answers.learningCurve || 'Not specified'}
    - Time of Day: ${answers.timeOfDay || 'Not specified'}
    - Structure: ${answers.structure || 'Not specified'}`
    : '';

  return `Based on these preferences:
    - Main interest: ${answers.initialChoice}
    - Environment: ${answers.environment || 'Not specified'}
    - Activity Level: ${answers.activityLevel || 'Not specified'}
    - Time Commitment: ${answers.timeCommitment || 'Not specified'}
    - Budget: ${answers.budget || 'Not specified'}
    - Social Setting: ${answers.social || 'Not specified'}
    ${refinementContext}

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