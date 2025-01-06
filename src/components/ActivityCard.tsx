import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import ActivityImage from "./activity-card/ActivityImage";
import ActivityDetails from "./activity-card/ActivityDetails";
import ShareButton from "./activity-card/ShareButton";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

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
  const [affiliateId, setAffiliateId] = useState('default-tag');

  useEffect(() => {
    const getAffiliateId = async () => {
      console.log('Fetching affiliate ID for activity:', activity.name);
      const { data: { AMAZON_AFFILIATE_KEY } } = await supabase.functions.invoke('get-affiliate-key');
      if (AMAZON_AFFILIATE_KEY) {
        console.log('Successfully retrieved affiliate ID');
        setAffiliateId(AMAZON_AFFILIATE_KEY);
      }
    };

    getAffiliateId();
  }, []);

  const handleShopClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Opening Amazon search for:', activity.name);
    const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(activity.name)}&tag=${affiliateId}`;
    window.open(amazonSearchUrl, '_blank');
  };

  return (
    <Card 
      className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-200"
      role="article"
      aria-label={`Activity card for ${activity.name}`}
    >
      <CardHeader>
        <div className="w-full h-48 rounded-lg overflow-hidden mb-4 relative">
          <ActivityImage name={activity.name} imageUrl={activity.imageUrl} />
        </div>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-[#7E69AB]">{activity.name}</CardTitle>
          <ShareButton activity={activity} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">{activity.description}</p>
        
        <ActivityDetails 
          difficulty={activity.difficulty}
          timeCommitment={activity.timeCommitment}
          costEstimate={activity.costEstimate}
        />
        
        <div className="space-y-2">
          <Button 
            className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors duration-200"
            onClick={() => onSelect(activity)}
            aria-label={`Learn more about ${activity.name}`}
          >
            Learn More
          </Button>
          
          <Button 
            onClick={handleShopClick}
            className="w-full bg-[#F97316] hover:bg-[#EA580C] transition-colors duration-200"
            aria-label={`Shop for ${activity.name} on Amazon`}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Shop on Amazon
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}