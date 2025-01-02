import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GettingStartedSectionProps {
  steps: string[];
  beginnerTips: string[];
}

export default function GettingStartedSection({ steps, beginnerTips }: GettingStartedSectionProps) {
  const boldKeywords = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-[#7E69AB]">Getting Started</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {steps && steps.length > 0 && (
          <div>
            <h3 className="font-semibold text-[#7E69AB] mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 list-none pl-0">
              {steps.map((step, index) => (
                <li key={index} className="flex gap-3 text-gray-700">
                  <span className="flex-shrink-0 font-medium text-[#7E69AB]">{index + 1}.</span>
                  <span dangerouslySetInnerHTML={{ __html: boldKeywords(step) }} />
                </li>
              ))}
            </ol>
          </div>
        )}
        
        {beginnerTips && beginnerTips.length > 0 && (
          <div>
            <h3 className="font-semibold text-[#7E69AB] mb-4">Tips for Beginners</h3>
            <ul className="space-y-3 list-none pl-0">
              {beginnerTips.map((tip, index) => (
                <li key={index} className="flex gap-3 text-gray-700">
                  <span className="flex-shrink-0 text-[#7E69AB]">•</span>
                  <span dangerouslySetInnerHTML={{ __html: boldKeywords(tip) }} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}