import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Share2 } from "lucide-react";
import { useActivityImage } from "@/hooks/useActivityImage";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ActivityCardProps {
  activity: {
    name: string;
    description: string;
    imageUrl: string;
    difficulty?: string;
    timeCommitment?: string;
    costEstimate?: string;
    benefits?: string[];
  };
  onSelect: (activity: any) => void;
}

export default function ActivityCard({ activity, onSelect }: ActivityCardProps) {
  const { imageUrl, isLoading } = useActivityImage(activity.name, activity.imageUrl);
  const { toast } = useToast();

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.share({
        title: activity.name,
        text: activity.description,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Activity link has been copied to clipboard",
      });
    }
  };

  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="w-full h-48 rounded-lg overflow-hidden mb-4 relative">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <Loader2 className="h-8 w-8 animate-spin text-[#9b87f5]" />
            </div>
          ) : (
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={activity.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-[#7E69AB]">{activity.name}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="hover:bg-[#F1F0FB] text-gray-500"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">{activity.description}</p>
        
        {(activity.difficulty || activity.timeCommitment || activity.costEstimate) && (
          <div className="space-y-2">
            <h4 className="font-semibold text-[#7E69AB]">Activity Details:</h4>
            <ul className="space-y-1 text-gray-600">
              {activity.difficulty && (
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Difficulty: {activity.difficulty}</span>
                </li>
              )}
              {activity.timeCommitment && (
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Time: {activity.timeCommitment}</span>
                </li>
              )}
              {activity.costEstimate && (
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Cost: {activity.costEstimate}</span>
                </li>
              )}
            </ul>
          </div>
        )}
        
        <Button 
          className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors duration-200"
          onClick={() => onSelect(activity)}
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}