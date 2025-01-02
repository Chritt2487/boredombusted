import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  onNext: () => void;
  isLastStep: boolean;
  isValid: boolean;
}

export default function NavigationButtons({ onNext, isLastStep, isValid }: NavigationButtonsProps) {
  return (
    <Button
      onClick={onNext}
      className="w-full mt-6 bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors duration-200"
      disabled={!isValid}
    >
      {isLastStep ? "Finish" : "Next"}
    </Button>
  );
}