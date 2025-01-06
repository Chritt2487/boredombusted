import { basicQuestions } from './basicQuestions';
import { activityQuestions } from './activityQuestions';
import { skillsQuestions } from './skillsQuestions';
import { practicalQuestions } from './practicalQuestions';
import { Question, AnswersType } from './questionTypes';

export const questions = [
  ...basicQuestions,
  ...activityQuestions,
  ...skillsQuestions,
  ...practicalQuestions
];

// Explicitly export allQuestions as well
export const allQuestions = questions;

export type QuestionField = typeof questions[number]['field'];

// Helper function to determine if a question should be shown based on previous answers
export function shouldShowQuestion(question: Question, answers: Partial<AnswersType>): boolean {
  if (!question.dependsOn) return true;
  
  const { field, values } = question.dependsOn;
  const answer = answers[field as keyof AnswersType];
  
  return values.includes(answer as string);
}

// Function to get the next available question based on current answers
export function getNextQuestion(currentIndex: number, answers: Partial<AnswersType>): number {
  let nextIndex = currentIndex + 1;
  
  while (nextIndex < questions.length) {
    if (shouldShowQuestion(questions[nextIndex], answers)) {
      return nextIndex;
    }
    nextIndex++;
  }
  
  return -1; // No more questions
}