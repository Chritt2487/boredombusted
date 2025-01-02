import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuickBenefitsSectionProps {
  funFacts: string[];
}

export default function QuickBenefitsSection({ funFacts }: QuickBenefitsSectionProps) {
  const boldKeywords = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-[#7E69AB]">Why You'll Love It</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="list-disc list-inside space-y-2">
          {funFacts.map((fact, index) => (
            <li key={index} className="text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: boldKeywords(fact) }} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}