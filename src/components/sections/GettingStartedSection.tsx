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
      <CardContent className="space-y-6">
        {steps && (
          <div className="space-y-4">
            <h3 className="font-semibold text-[#7E69AB]">Step-by-Step Guide</h3>
            <ol className="list-decimal list-inside space-y-2">
              {steps.map((step, index) => (
                <li key={index} className="text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: boldKeywords(step) }} />
                </li>
              ))}
            </ol>
          </div>
        )}
        {beginnerTips && (
          <div className="space-y-4">
            <h3 className="font-semibold text-[#7E69AB]">Tips for Beginners</h3>
            <ul className="list-disc list-inside space-y-2">
              {beginnerTips.map((tip, index) => (
                <li key={index} className="text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: boldKeywords(tip) }} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}