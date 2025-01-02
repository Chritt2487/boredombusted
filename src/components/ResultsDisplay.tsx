import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ActivityDetail from "./ActivityDetail";
import ActivityCard from "./ActivityCard";

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

interface Activity {
  name: string;
  description: string;
  imageUrl: string;
  difficulty?: string;
  timeCommitment?: string;
  costEstimate?: string;
  benefits?: string[];
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
        setActivities(data.activities);
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
    };
    setSelectedActivity(newActivity);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#9b87f5]" />
        <p className="text-gray-600">Crafting perfect recommendations for you...</p>
      </div>
    );
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
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#7E69AB] mb-2">Your Perfect Activities</h2>
        <p className="text-gray-600">Based on your preferences, here are some activities we think you'll love</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((activity, index) => (
          <ActivityCard
            key={index}
            activity={activity}
            onSelect={setSelectedActivity}
          />
        ))}
      </div>
    </div>
  );
}