import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ActivityDetail from "./ActivityDetail";
import LoadingState from "./results/LoadingState";
import ResultsHeader from "./results/ResultsHeader";
import ResultsGrid from "./results/ResultsGrid";
import { Activity } from "./questionnaire/activityTypes";
import { getTopRecommendations } from "./questionnaire/scoringSystem";
import { activities } from "@/data/activities";

interface ResultsDisplayProps {
  answers: {
    initialChoice: string;
    environment: string;
    activityLevel: string;
    timeCommitment: string;
    budget: string;
    social: string;
    competitive?: string;
    skills?: string;
    creativity?: string;
    learningStyle?: string;
    isRandom?: boolean;
  };
}

export default function ResultsDisplay({ answers }: ResultsDisplayProps) {
  const [recommendedActivities, setRecommendedActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        console.log("Getting recommendations with answers:", answers);
        const recommendations = getTopRecommendations(activities, answers);
        console.log("Generated recommendations:", recommendations);
        setRecommendedActivities(recommendations);
      } catch (error) {
        console.error("Error generating recommendations:", error);
        toast({
          title: "Error",
          description: "Failed to generate recommendations. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, [answers, toast]);

  const handleSelectAlternative = (alternative: { name: string; description: string }) => {
    const newActivity = activities.find(a => a.name === alternative.name);
    if (newActivity) {
      setSelectedActivity(newActivity);
    }
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
        activities={recommendedActivities}
        onSelectActivity={(activity: Activity) => setSelectedActivity(activity)}
      />
    </div>
  );
}