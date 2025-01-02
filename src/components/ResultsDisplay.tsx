import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ActivityDetail from "./ActivityDetail";
import LoadingState from "./results/LoadingState";
import ResultsHeader from "./results/ResultsHeader";
import ResultsGrid from "./results/ResultsGrid";
import { Activity } from "./results/types";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

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
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const { toast } = useToast();

  const fetchRecommendations = async (isLoadingMore = false) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-recommendations', {
        body: { 
          answers,
          existingActivities: isLoadingMore ? activities.map(a => a.name) : [] // Pass existing activities to avoid duplicates
        }
      });

      if (error) throw error;
      
      console.log("Received recommendations:", data);
      const activitiesWithBenefits = data.activities.map((activity: any) => ({
        ...activity,
        benefits: activity.benefits || []
      }));

      if (isLoadingMore) {
        setActivities(prev => [...prev, ...activitiesWithBenefits]);
      } else {
        setActivities(activitiesWithBenefits);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to load recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [answers]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await fetchRecommendations(true);
  };

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
      <div className="flex justify-center">
        <Button
          onClick={handleLoadMore}
          disabled={loadingMore}
          className="bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors duration-200"
        >
          {loadingMore ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading more...
            </>
          ) : (
            "Load More Activities"
          )}
        </Button>
      </div>
    </div>
  );
}