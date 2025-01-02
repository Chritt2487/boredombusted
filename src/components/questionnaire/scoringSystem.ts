import { Activity } from './activityTypes';

export interface UserPreferences {
  initialChoice?: string;
  environment: string;
  activityLevel: string;
  timeCommitment: string;
  budget: string;
  social: string;
  competitive?: string;
  skills?: string;
  creativity?: string;
  learningStyle?: string;
  [key: string]: string | undefined;
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
  if (preferences.initialChoice && activity.tags.activityType.includes(preferences.initialChoice)) {
    score += weights.activityType;
  }

  // Score environment preference
  if (activity.tags.environment.includes(preferences.environment) || 
      preferences.environment === "Both") {
    score += weights.environment;
  }

  // Score competitive nature
  if (preferences.competitive && 
      (activity.tags.competitive === preferences.competitive || 
       preferences.competitive === "Both")) {
    score += weights.competitive;
  }

  // Score skills match
  if (preferences.skills && activity.tags.skills.includes(preferences.skills)) {
    score += weights.skills;
  }

  // Score learning style
  if (preferences.learningStyle && 
      activity.tags.learningStyle.includes(preferences.learningStyle)) {
    score += weights.learningStyle;
  }

  // Score creativity level
  if (preferences.creativity && 
      (activity.tags.creativity === preferences.creativity || 
       preferences.creativity === "Mix of Both")) {
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
  preferences: Record<string, string | boolean | undefined>,
  limit: number = 4
): Activity[] {
  // Handle random selection
  if (preferences.isRandom) {
    const shuffled = [...activities].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  }

  // Filter out isRandom from preferences for scoring
  const { isRandom, ...scoringPreferences } = preferences;

  return activities
    .map(activity => ({
      activity,
      score: scoreActivity(activity, scoringPreferences as UserPreferences)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ activity }) => activity);
}