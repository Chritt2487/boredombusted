import { Question } from '../types/questionTypes';
import { basicQuestions } from './basicQuestions';
import { activityQuestions } from './activityQuestions';
import { practicalQuestions } from './practicalQuestions';
import { socialQuestions } from './socialQuestions';
import { learningQuestions } from './learningQuestions';
import { productivityQuestions } from './productivityQuestions';

export const allQuestions: Question[] = [
  ...basicQuestions,
  ...productivityQuestions, // Add the new productivity questions
  ...activityQuestions,
  ...practicalQuestions,
  ...socialQuestions,
  ...learningQuestions
];

export * from './basicQuestions';
export * from './activityQuestions';
export * from './practicalQuestions';
export * from './socialQuestions';
export * from './learningQuestions';
export * from './productivityQuestions';

export const shouldShowQuestion = (question: Question, answers: Record<string, any>): boolean => {
  if (!question.dependsOn) return true;
  
  const { field, values } = question.dependsOn;
  const answer = answers[field];
  
  return values.includes(answer);
};

export const getNextQuestion = (currentIndex: number, answers: Record<string, any>): number => {
  let nextIndex = currentIndex + 1;
  
  while (nextIndex < allQuestions.length) {
    if (shouldShowQuestion(allQuestions[nextIndex], answers)) {
      return nextIndex;
    }
    nextIndex++;
  }
  
  return -1;
};