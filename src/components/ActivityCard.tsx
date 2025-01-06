import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Tag } from "lucide-react";
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
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const getAffiliateId = async () => {
      console.log('Fetching affiliate ID for activity:', activity.name);
      const { data: { AMAZON_AFFILIATE_KEY } } = await supabase.functions.invoke('get-affiliate-key');
      if (AMAZON_AFFILIATE_KEY) {
        console.log('Successfully retrieved affiliate ID');
        setAffiliateId(AMAZON_AFFILIATE_KEY);
      }
    };

    const fetchCategories = async () => {
      console.log('Fetching categories for activity:', activity.name);
      const { data, error } = await supabase
        .from('activity_categories')
        .select('category')
        .eq('activity_name', activity.name);
      
      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      if (data) {
        const categoryList = data.map(item => item.category);
        console.log('Retrieved categories:', categoryList);
        setCategories(categoryList);
      }
    };

    getAffiliateId();
    fetchCategories();
  }, [activity.name]);

  const handleShopClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Opening Amazon search for:', activity.name);
    const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(activity.name)}&tag=${affiliateId}`;
    window.open(amazonSearchUrl, '_blank');
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
        </div>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-[#7E69AB]">{activity.name}</CardTitle>
          <ShareButton activity={activity} />
        </div>
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex items-center bg-[#F1F0FB] px-2 py-1 rounded-full text-sm text-[#7E69AB]"
              >
                <Tag className="w-3 h-3 mr-1" />
                {category}
              </div>
            ))}
          </div>
        )}
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