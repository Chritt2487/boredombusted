import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import TutorialsSection from "./sections/TutorialsSection";
import EquipmentSection from "./sections/EquipmentSection";
import HeroSection from "./sections/HeroSection";
import OverviewSection from "./sections/OverviewSection";
import QuickBenefitsSection from "./sections/QuickBenefitsSection";
import GettingStartedSection from "./sections/GettingStartedSection";
import BenefitsSection from "./sections/BenefitsSection";
import SimilarActivities from "./sections/SimilarActivities";
import LoadingState from "./sections/LoadingState";
import ErrorState from "./sections/ErrorState";

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
    "Nature Journaling": "https://images.unsplash.com/photo-1517971053567-8bde93bc6a58?q=80&w=2946&auto=format&fit=crop",
    "Birdwatching": "https://images.unsplash.com/photo-1621631187029-c1e8f11f9c42?q=80&w=2940&auto=format&fit=crop",
    "Stargazing": "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2940&auto=format&fit=crop",
    "Photography Walks": "https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=2936&auto=format&fit=crop",
    "Hiking": "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2940&auto=format&fit=crop",
    "Picnicking in the Park": "https://images.unsplash.com/photo-1526307616774-60d0098f7642?q=80&w=2940&auto=format&fit=crop",
    "Geocaching": "https://images.unsplash.com/photo-1578674473215-9f63c76c6fe4?q=80&w=2940&auto=format&fit=crop",
    "Outdoor Yoga": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2940&auto=format&fit=crop",
    "default": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2940&auto=format&fit=crop"
  };
  
  return imageMap[activityName] || imageMap.default;
};

export default function ActivityDetail({ activity, onBack, onSelectAlternative }: ActivityDetailProps) {
  const [detailedInfo, setDetailedInfo] = useState<DetailedActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarActivities, setSimilarActivities] = useState<any[]>([]);
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

        const { data: similarData, error: similarError } = await supabase.functions.invoke('generate-recommendations', {
          body: { 
            answers: {
              initialChoice: "similar",
              baseActivity: activity.name
            }
          }
        });

        if (similarError) throw similarError;
        setSimilarActivities(similarData.activities.slice(0, 3));

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activity.name, toast]);

  const handleSelectAlternative = (alternative: { name: string; description: string }) => {
    console.log("Selected alternative activity:", alternative.name);
    // Call the provided onSelectAlternative function
    onSelectAlternative(alternative);
    // Reload the page
    window.location.reload();
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!detailedInfo) {
    return <ErrorState onBack={onBack} />;
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

      {detailedInfo.equipment && (
        <EquipmentSection equipment={detailedInfo.equipment} />
      )}

      {(detailedInfo.benefits?.skills || detailedInfo.benefits?.health) && (
        <BenefitsSection 
          skills={detailedInfo.benefits.skills}
          health={detailedInfo.benefits.health}
        />
      )}

      {similarActivities.length > 0 && (
        <SimilarActivities 
          activities={similarActivities}
          onSelectAlternative={handleSelectAlternative}
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