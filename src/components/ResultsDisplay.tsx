import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ActivityDetail from "./ActivityDetail";
import LoadingState from "./results/LoadingState";
import ResultsHeader from "./results/ResultsHeader";
import ResultsGrid from "./results/ResultsGrid";
import { Activity } from "./results/types";

interface ResultsDisplayProps {
  answers: {
    initialChoice: string;
    environment: string;
    activityLevel: string;
    timeCommitment: string;
    budget: string;
    social: string;
    isRandom?: boolean;
  };
}

export default function ResultsDisplay({ answers }: ResultsDisplayProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('generate-recommendations', {
          body: { answers }
        });

        if (error) throw error;
        
        console.log("Received recommendations:", data);
        const activitiesWithBenefits = data.activities.map((activity: any) => ({
          ...activity,
          benefits: activity.benefits || []
        }));
        setActivities(activitiesWithBenefits);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        toast({
          title: "Error",
          description: "Failed to load recommendations. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [answers, toast]);

  const handleSelectAlternative = (alternative: { name: string; description: string }) => {
    const newActivity: Activity = {
      name: alternative.name,
      description: alternative.description,
      imageUrl: "/placeholder.svg",
      benefits: [],
    };
    setSelectedActivity(newActivity);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (selectedActivity) {
    return (
      <ActivityDetail 
        activity={selectedActivity}
        onBack={() => setSelectedActivity(null)}
        onSelectAlternative={handleSelectAlternative}
      />
    );
  }

  return (
    <div className="space-y-8">
      <ResultsHeader />
      <ResultsGrid 
        activities={activities}
        onSelectActivity={setSelectedActivity}
      />
    </div>
  );
}