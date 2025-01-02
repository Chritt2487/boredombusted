import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SimilarActivitiesProps {
  activities: Array<{
    name: string;
    description: string;
  }>;
  onSelectAlternative: (activity: { name: string; description: string }) => void;
}

export default function SimilarActivities({ activities, onSelectAlternative }: SimilarActivitiesProps) {
  if (!activities.length) return null;

  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-[#7E69AB]">Similar Activities</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {activities.map((similar, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg bg-[#F1F0FB] hover:bg-[#E5DEFF] transition-colors cursor-pointer"
            onClick={() => onSelectAlternative(similar)}
          >
            <h3 className="font-semibold text-[#7E69AB]">{similar.name}</h3>
            <p className="text-gray-600">{similar.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}