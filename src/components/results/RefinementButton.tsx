import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface RefinementButtonProps {
  onClick: () => void;
}

export default function RefinementButton({ onClick }: RefinementButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors duration-200"
      aria-label="Get more personalized activity recommendations"
    >
      <Sparkles className="mr-2 h-4 w-4" />
      Get More Personalized Results
    </Button>
  );
}