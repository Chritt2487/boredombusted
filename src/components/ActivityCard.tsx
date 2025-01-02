import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ActivityCardProps {
  activity: {
    name: string;
    description: string;
    imageUrl: string;
    tips: string[];
  };
  onSelect: (activity: any) => void;
}

// Helper function to get emoji based on activity name
const getActivityEmoji = (activityName: string): string => {
  const emojiMap: { [key: string]: string } = {
    'Geocaching': '🗺️',
    'Hiking': '🥾',
    'Photography': '📸',
    'Urban Sketching': '✏️',
    'Outdoor Photography': '📸',
    // Add more mappings as needed
    'default': '🎯'
  };

  console.log('Getting emoji for activity:', activityName);
  return emojiMap[activityName] || emojiMap.default;
};

export default function ActivityCard({ activity, onSelect }: ActivityCardProps) {
  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="w-full h-48 rounded-lg overflow-hidden mb-4 flex items-center justify-center bg-[#F1F0FB]">
          <span className="text-8xl" role="img" aria-label={activity.name}>
            {getActivityEmoji(activity.name)}
          </span>
        </div>
        <CardTitle className="text-xl text-[#7E69AB]">{activity.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">{activity.description}</p>
        <div className="space-y-2">
          <h4 className="font-semibold text-[#7E69AB]">Quick Tips:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {activity.tips.map((tip, tipIndex) => (
              <li key={tipIndex}>{tip}</li>
            ))}
          </ul>
        </div>
        <Button 
          className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors duration-200"
          onClick={() => {
            console.log('Learn More clicked for:', activity.name);
            onSelect(activity);
          }}
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}