import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityImage from "./activity-card/ActivityImage";
import ActivityDetails from "./activity-card/ActivityDetails";
import ShareButton from "./activity-card/ShareButton";
import CategoryTags from "./activity-card/CategoryTags";
import ActionButtons from "./activity-card/ActionButtons";
import CardContainer from "./activity-card/CardContainer";
import VideoButton from "./activity-card/VideoButton";
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
  const categories = useActivityCategories(activity.name);

  const handleShopClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Opening Amazon search for:', activity.name);
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
    <CardContainer 
      onSelect={() => onSelect(activity)}
      onKeyPress={handleKeyPress}
      activityName={activity.name}
    >
      <CardHeader>
        <div className="w-full h-48 rounded-lg overflow-hidden mb-4 relative">
          <ActivityImage name={activity.name} imageUrl={activity.imageUrl} />
          {activity.videoUrl && <VideoButton onClick={handleVideoClick} />}
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
    </CardContainer>
  );
}