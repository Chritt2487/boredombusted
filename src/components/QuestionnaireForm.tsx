import QuestionnaireContainer from "./questionnaire/QuestionnaireContainer";

interface QuestionnaireFormProps {
  initialChoice: string;
}

export default function QuestionnaireForm({ initialChoice }: QuestionnaireFormProps) {
  return <QuestionnaireContainer initialChoice={initialChoice} />;
}