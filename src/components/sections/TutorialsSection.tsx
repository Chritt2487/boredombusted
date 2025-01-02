import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

interface TutorialsSectionProps {
  activityName: string;
}

export default function TutorialsSection({ activityName }: TutorialsSectionProps) {
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(activityName + " tutorial")}`;
  
  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-[#7E69AB]">
          <PlayCircle className="mr-2" /> Tutorials & Guides
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 rounded-lg bg-[#F1F0FB] hover:bg-[#E5DEFF] transition-colors">
          <h3 className="font-semibold text-[#7E69AB] mb-2">Learn {activityName}</h3>
          <p className="text-gray-600 mb-3">
            Discover helpful tutorials and guides to get started with {activityName}.
          </p>
          <Button 
            onClick={() => window.open(youtubeSearchUrl, '_blank')}
            className="bg-[#9b87f5] hover:bg-[#7E69AB]"
          >
            Watch Tutorials on YouTube
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}