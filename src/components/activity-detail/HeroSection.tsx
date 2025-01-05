import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface HeroSectionProps {
  name: string;
  onBack: () => void;
  imageUrl: string;
}

export default function HeroSection({ name, onBack }: HeroSectionProps) {
  return (
    <>
      <Button 
        onClick={onBack}
        variant="ghost" 
        className="mb-4 text-[#7E69AB] hover:text-[#9b87f5]"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Results
      </Button>

      <div className="bg-[#9b87f5]/10 rounded-xl p-6">
        <h1 className="text-4xl font-bold text-[#7E69AB]">
          {name}
        </h1>
      </div>
    </>
  );
}