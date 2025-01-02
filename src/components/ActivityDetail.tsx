import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import TutorialsSection from "./sections/TutorialsSection";
import EquipmentSection from "./sections/EquipmentSection";
import HeroSection from "./sections/HeroSection";
import OverviewSection from "./sections/OverviewSection";
import QuickBenefitsSection from "./sections/QuickBenefitsSection";
import GettingStartedSection from "./sections/GettingStartedSection";
import BenefitsSection from "./sections/BenefitsSection";
import { Card, CardContent } from "@/components/ui/card";

interface ActivityDetailProps {
  activity: {
    name: string;
    description: string;
    imageUrl: string;
    benefits: string[];
  };
  onBack: () => void;
  onSelectAlternative: (alternative: { name: string; description: string; }) => void;
}

interface DetailedActivity {
  equipment: {
    name: string;
    description: string;
    affiliateUrl: string;
    price: string;
    category: 'required' | 'optional' | 'recommended';
  }[];
  difficulty: string;
  timeCommitment: string;
  costEstimate: string;
  history: string;
  gettingStarted: {
    steps: string[];
    beginnerTips: string[];
  };
  benefits: {
    skills: string[];
    health: string[];
    funFacts: string[];
  };
}

const getActivityImage = (activityName: string) => {
  const imageMap: { [key: string]: string } = {
    "Hiking": "https://images.unsplash.com/photo-1551632811-561732d1e306",
    "Picnicking in the Park": "https://images.unsplash.com/photo-1526307616774-60d0098f7642",
    "Geocaching": "https://images.unsplash.com/photo-1578674473215-9f63c76c6fe4",
    "Outdoor Yoga": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    // Fallback image if activity not found
    "default": "https://images.unsplash.com/photo-1518770660439-4636190af475"
  };
  
  return imageMap[activityName] || imageMap.default;
};

export default function ActivityDetail({ activity, onBack, onSelectAlternative }: ActivityDetailProps) {
  const [detailedInfo, setDetailedInfo] = useState<DetailedActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDetailedInfo = async () => {
      try {
        console.log("Fetching details for activity:", activity.name);
        const { data, error } = await supabase.functions.invoke('get-activity-details', {
          body: { activityName: activity.name }
        });

        if (error) throw error;
        
        console.log("Received detailed info:", data);
        setDetailedInfo(data);
      } catch (error) {
        console.error("Error fetching detailed info:", error);
        toast({
          title: "Error",
          description: "Failed to load detailed information. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDetailedInfo();
  }, [activity.name, toast]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#9b87f5]" />
        <p className="text-gray-600">Loading activity details...</p>
      </div>
    );
  }

  if (!detailedInfo) {
    return (
      <div className="space-y-4">
        <Button onClick={onBack} variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Results
        </Button>
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-600">
              Could not load activity details. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const activityImage = getActivityImage(activity.name);

  return (
    <div className="space-y-8">
      <HeroSection 
        name={activity.name} 
        onBack={onBack} 
        imageUrl={activityImage}
      />
      
      <OverviewSection 
        description={activity.description}
        history={detailedInfo.history}
        difficulty={detailedInfo.difficulty}
        timeCommitment={detailedInfo.timeCommitment}
        costEstimate={detailedInfo.costEstimate}
      />

      {detailedInfo.benefits?.funFacts && (
        <QuickBenefitsSection funFacts={detailedInfo.benefits.funFacts} />
      )}

      {detailedInfo.gettingStarted && (
        <GettingStartedSection 
          steps={detailedInfo.gettingStarted.steps}
          beginnerTips={detailedInfo.gettingStarted.beginnerTips}
        />
      )}

      {detailedInfo.equipment && <EquipmentSection equipment={detailedInfo.equipment} />}

      {(detailedInfo.benefits?.skills || detailedInfo.benefits?.health) && (
        <BenefitsSection 
          skills={detailedInfo.benefits.skills}
          health={detailedInfo.benefits.health}
        />
      )}

      <TutorialsSection activityName={activity.name} />

      <div className="flex justify-center">
        <Button 
          onClick={onBack}
          className="bg-[#9b87f5] hover:bg-[#7E69AB]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Activities
        </Button>
      </div>
    </div>
  );
}