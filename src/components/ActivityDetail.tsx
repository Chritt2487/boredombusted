import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import TutorialsSection from "./sections/TutorialsSection";
import EquipmentSection from "./sections/EquipmentSection";
import LocationsSection from "./sections/LocationsSection";
import AlternativesSection from "./sections/AlternativesSection";

interface ActivityDetailProps {
  activity: {
    name: string;
    description: string;
    imageUrl: string;
    tips: string[];
  };
  onBack: () => void;
  onSelectAlternative: (alternative: { name: string; description: string }) => void;
}

interface DetailedActivity {
  equipment: {
    name: string;
    description: string;
    affiliateUrl: string;
    price: string;
  }[];
  locations?: {
    name: string;
    description: string;
    address: string;
    rating: number;
  }[];
  alternatives: {
    name: string;
    description: string;
  }[];
}

export default function ActivityDetail({ activity, onBack, onSelectAlternative }: ActivityDetailProps) {
  const [detailedInfo, setDetailedInfo] = useState<DetailedActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDetailedInfo = async () => {
      try {
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

  if (loading || !detailedInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <Button 
        onClick={onBack}
        variant="ghost" 
        className="mb-4 text-[#7E69AB] hover:text-[#9b87f5]"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Results
      </Button>

      {/* Hero Section */}
      <div className="relative h-64 rounded-xl overflow-hidden">
        <img
          src={activity.imageUrl || "/placeholder.svg"}
          alt={activity.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-white">
          {activity.name}
        </h1>
      </div>

      {/* Description */}
      <div className="p-6 rounded-lg border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
        <p className="text-lg text-gray-700 leading-relaxed">
          {activity.description}
        </p>
      </div>

      {/* Sections */}
      <TutorialsSection activityName={activity.name} />
      <EquipmentSection equipment={detailedInfo.equipment} />
      {detailedInfo.locations && (
        <LocationsSection locations={detailedInfo.locations} />
      )}
      <AlternativesSection 
        alternatives={detailedInfo.alternatives} 
        onSelectAlternative={onSelectAlternative}
      />
    </div>
  );
}