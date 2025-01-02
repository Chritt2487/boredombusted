import { Activity } from './activityTypes';
import { QuestionField } from './questionTypes';

interface UserPreferences {
  [key: string]: string;
}

export function scoreActivity(activity: Activity, preferences: UserPreferences): number {
  let score = 0;
  const weights = {
    activityType: 3,
    environment: 2,
    competitive: 2,
    skills: 3,
    learningStyle: 2,
    creativity: 2,
    activityLevel: 2,
    timeCommitment: 2,
    budget: 2,
    social: 2
  };

  // Score activity type match
  if (activity.tags.activityType.includes(preferences.activityType)) {
    score += weights.activityType;
  }

  // Score environment preference
  if (activity.tags.environment.includes(preferences.environment) || 
      preferences.environment === "Both") {
    score += weights.environment;
  }

  // Score competitive nature
  if (activity.tags.competitive === preferences.competitive || 
      preferences.competitive === "Both") {
    score += weights.competitive;
  }

  // Score skills match
  if (activity.tags.skills.includes(preferences.skills)) {
    score += weights.skills;
  }

  // Score learning style
  if (activity.tags.learningStyle.includes(preferences.learningStyle)) {
    score += weights.learningStyle;
  }

  // Score creativity level
  if (activity.tags.creativity === preferences.creativity || 
      preferences.creativity === "Mix of Both") {
    score += weights.creativity;
  }

  // Score activity level
  if (activity.tags.activityLevel === preferences.activityLevel) {
    score += weights.activityLevel;
  }

  // Score time commitment
  if (activity.tags.timeRequired === preferences.timeCommitment) {
    score += weights.timeCommitment;
  }

  // Score budget match
  if (activity.tags.budgetLevel === preferences.budget) {
    score += weights.budget;
  }

  // Score social preference
  if (activity.tags.social.includes(preferences.social)) {
    score += weights.social;
  }

  return score;
}

export function getTopRecommendations(
  activities: Activity[],
  preferences: UserPreferences,
  limit: number = 4
): Activity[] {
  return activities
    .map(activity => ({
      activity,
      score: scoreActivity(activity, preferences)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ activity }) => activity);
}