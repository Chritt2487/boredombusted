import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface BenefitsSectionProps {
  benefits: {
    skills: string[];
    health: string[];
    social: string[];
  };
}

export default function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-[#7E69AB]">
          <Heart className="mr-2" /> Benefits & Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="p-4 rounded-lg bg-[#F1F0FB]">
          <h3 className="font-semibold text-[#7E69AB] mb-2">Skills Developed</h3>
          <ul className="list-disc list-inside space-y-1">
            {benefits.skills.map((skill, index) => (
              <li key={index} className="text-gray-600">{skill}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-lg bg-[#F1F0FB]">
          <h3 className="font-semibold text-[#7E69AB] mb-2">Health & Wellness Benefits</h3>
          <ul className="list-disc list-inside space-y-1">
            {benefits.health.map((benefit, index) => (
              <li key={index} className="text-gray-600">{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-lg bg-[#F1F0FB]">
          <h3 className="font-semibold text-[#7E69AB] mb-2">Social Benefits</h3>
          <ul className="list-disc list-inside space-y-1">
            {benefits.social.map((benefit, index) => (
              <li key={index} className="text-gray-600">{benefit}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}