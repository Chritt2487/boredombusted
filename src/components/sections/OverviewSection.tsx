import { Star, Clock, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewSectionProps {
  description: string;
  history?: string;
  difficulty: string;
  timeCommitment: string;
  costEstimate: string;
}

export default function OverviewSection({ 
  description, 
  history, 
  difficulty, 
  timeCommitment, 
  costEstimate 
}: OverviewSectionProps) {
  const boldKeywords = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-[#7E69AB]">Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: boldKeywords(description) }} className="text-gray-700" />
          {history && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-[#7E69AB]">History & Fun Facts</h3>
              <div dangerouslySetInnerHTML={{ __html: boldKeywords(history) }} className="text-gray-700" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center space-x-3 p-4 bg-[#F1F0FB] rounded-lg">
            <Star className="h-5 w-5 text-[#7E69AB]" />
            <div>
              <p className="font-semibold text-[#7E69AB]">Difficulty</p>
              <p className="text-gray-600">{difficulty}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-[#F1F0FB] rounded-lg">
            <Clock className="h-5 w-5 text-[#7E69AB]" />
            <div>
              <p className="font-semibold text-[#7E69AB]">Time Commitment</p>
              <p className="text-gray-600">{timeCommitment}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-[#F1F0FB] rounded-lg">
            <DollarSign className="h-5 w-5 text-[#7E69AB]" />
            <div>
              <p className="font-semibold text-[#7E69AB]">Cost Estimate</p>
              <p className="text-gray-600">{costEstimate}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}