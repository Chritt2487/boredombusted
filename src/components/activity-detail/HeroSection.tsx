import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface HeroSectionProps {
  name: string;
  onBack: () => void;
  imageUrl: string;
}

export default function HeroSection({ name, onBack, imageUrl }: HeroSectionProps) {
  return (
    <>
      <Button 
        onClick={onBack}
        variant="ghost" 
        className="mb-4 text-[#7E69AB] hover:text-[#9b87f5]"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Results
      </Button>

      <div className="relative h-64 rounded-xl overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-white">
          {name}
        </h1>
      </div>
    </>
  );
}