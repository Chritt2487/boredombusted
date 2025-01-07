import { competitionQuestions } from './refinement/competitionQuestions';
import { personalPreferenceQuestions } from './refinement/personalPreferenceQuestions';
import { goalQuestions } from './refinement/goalQuestions';
import { progressQuestions } from './refinement/progressQuestions';
import { lifestyleQuestions } from './refinement/lifestyleQuestions';
import { sustainabilityQuestions } from './refinement/sustainabilityQuestions';
import { technologyQuestions } from './refinement/technologyQuestions';

export const refinementQuestions = [
  ...competitionQuestions,
  ...personalPreferenceQuestions,
  ...goalQuestions,
  ...progressQuestions,
  ...lifestyleQuestions,
  ...technologyQuestions,
  ...sustainabilityQuestions
];