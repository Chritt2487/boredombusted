import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

interface OverviewSectionProps {
  name: string;
  description: string;
  difficulty: string;
  timeCommitment: string;
  costEstimate: string;
}

export default function OverviewSection({ 
  name, 
  description, 
  difficulty, 
  timeCommitment, 
  costEstimate 
}: OverviewSectionProps) {
  // Helper function to get emoji based on activity name
  const getActivityEmoji = (activityName: string): string => {
    const emojiMap: { [key: string]: string } = {
      'Geocaching': '🗺️',
      'Hiking': '🥾',
      'Photography': '📸',
      'Urban Sketching': '✏️',
      'Outdoor Photography': '📸',
      'default': '🎯'
    };
    return emojiMap[activityName] || emojiMap.default;
  };

  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="w-full h-64 rounded-lg overflow-hidden mb-4 flex items-center justify-center bg-[#F1F0FB]">
          <span className="text-8xl" role="img" aria-label={name}>
            {getActivityEmoji(name)}
          </span>
        </div>
        <CardTitle className="flex items-center text-[#7E69AB] text-3xl">
          <Info className="mr-2" /> {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-[#F1F0FB]">
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#F1F0FB]">
            <h3 className="font-semibold text-[#7E69AB] mb-2">Difficulty Level</h3>
            <p className="text-gray-600">{difficulty}</p>
          </div>
          
          <div className="p-4 rounded-lg bg-[#F1F0FB]">
            <h3 className="font-semibold text-[#7E69AB] mb-2">Time Commitment</h3>
            <p className="text-gray-600">{timeCommitment}</p>
          </div>
          
          <div className="p-4 rounded-lg bg-[#F1F0FB]">
            <h3 className="font-semibold text-[#7E69AB] mb-2">Cost Estimate</h3>
            <p className="text-gray-600">{costEstimate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}