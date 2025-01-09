import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import ActivityImage from "./activity-card/ActivityImage";
import ActivityDetails from "./activity-card/ActivityDetails";
import ShareButton from "./activity-card/ShareButton";
import CategoryTags from "./activity-card/CategoryTags";
import ActionButtons from "./activity-card/ActionButtons";
import { useAffiliateId } from "@/hooks/useAffiliateId";
import { useActivityCategories } from "@/hooks/useActivityCategories";
import type { Language } from "@/utils/i18n";

interface ActivityCardProps {
  activity: {
    name: string;
    description: string;
    imageUrl: string;
    difficulty?: string;
    timeCommitment?: string;
    costEstimate?: string;
    benefits?: string[];
    videoUrl?: string;
  };
  onSelect: (activity: any) => void;
  language?: Language;
}

export default function ActivityCard({ 
  activity, 
  onSelect,
  language = 'en' 
}: ActivityCardProps) {
  const affiliateId = useAffiliateId();
  const categories = useActivityCategories(activity.name);

  const handleShopClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Opening Amazon search for:', activity.name);
    // Update to use the new link structure with bbapp-20 store ID
    const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(activity.name)}&tag=bbapp-20`;
    window.open(amazonSearchUrl, '_blank');
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activity.videoUrl) {
      console.log('Opening video tutorial for:', activity.name);
      window.open(activity.videoUrl, '_blank');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onSelect(activity);
    }
  };

  return (
    <Card 
      className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-200 focus-visible:ring-2 focus-visible:ring-[#7E69AB] focus-visible:outline-none"
      role="article"
      aria-label={`Activity card for ${activity.name}`}
      tabIndex={0}
      onKeyDown={handleKeyPress}
      onClick={() => onSelect(activity)}
    >
      <CardHeader>
        <div className="w-full h-48 rounded-lg overflow-hidden mb-4 relative">
          <ActivityImage name={activity.name} imageUrl={activity.imageUrl} />
          {activity.videoUrl && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={handleVideoClick}
              aria-label="Watch tutorial video"
            >
              <PlayCircle className="h-6 w-6" />
            </Button>
          )}
        </div>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-[#7E69AB]">{activity.name}</CardTitle>
          <ShareButton activity={activity} />
        </div>
        <CategoryTags categories={categories} />
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">{activity.description}</p>
        
        <ActivityDetails 
          difficulty={activity.difficulty}
          timeCommitment={activity.timeCommitment}
          costEstimate={activity.costEstimate}
          language={language}
        />
        
        <ActionButtons
          activityName={activity.name}
          onSelect={() => onSelect(activity)}
          onShopClick={handleShopClick}
          language={language}
        />
      </CardContent>
    </Card>
  );
}