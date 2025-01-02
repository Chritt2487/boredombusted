import { Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BenefitsSectionProps {
  skills?: string[];
  health?: string[];
}

export default function BenefitsSection({ skills, health }: BenefitsSectionProps) {
  const boldKeywords = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  if (!skills && !health) return null;

  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-[#7E69AB]">
          <Brain className="mr-2" /> Benefits and Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {skills && (
            <div className="space-y-4">
              <h3 className="font-semibold text-[#7E69AB]">Skills Developed</h3>
              <ul className="space-y-2 ml-4">
                {skills.map((skill, index) => (
                  <li 
                    key={index} 
                    className="text-gray-700 relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-[#7E69AB]"
                  >
                    <div 
                      className="inline-block"
                      dangerouslySetInnerHTML={{ __html: boldKeywords(skill) }} 
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {health && (
            <div className="space-y-4">
              <h3 className="font-semibold text-[#7E69AB]">Health Benefits</h3>
              <ul className="space-y-2 ml-4">
                {health.map((benefit, index) => (
                  <li 
                    key={index} 
                    className="text-gray-700 relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-[#7E69AB]"
                  >
                    <div 
                      className="inline-block"
                      dangerouslySetInnerHTML={{ __html: boldKeywords(benefit) }} 
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}