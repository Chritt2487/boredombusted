import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface AlternativesSectionProps {
  alternatives: {
    name: string;
    description: string;
  }[];
  onSelectAlternative: (alternative: { name: string; description: string }) => void;
}

export default function AlternativesSection({ alternatives, onSelectAlternative }: AlternativesSectionProps) {
  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-[#7E69AB]">
          <Lightbulb className="mr-2" /> You Might Also Like
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {alternatives.map((alt, index) => (
          <div 
            key={index} 
            className="p-4 rounded-lg bg-[#F1F0FB] hover:bg-[#E5DEFF] transition-colors cursor-pointer"
            onClick={() => onSelectAlternative(alt)}
          >
            <h3 className="font-semibold text-[#7E69AB]">{alt.name}</h3>
            <p className="text-gray-600">{alt.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}