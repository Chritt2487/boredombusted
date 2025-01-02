import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ResultsDisplayProps {
  answers: {
    initialChoice: string;
    environment: string;
    activityLevel: string;
    timeCommitment: string;
    budget: string;
    social: string;
  };
}

interface Activity {
  name: string;
  description: string;
  imageUrl: string;
  tips: string[];
}

export default function ResultsDisplay({ answers }: ResultsDisplayProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('generate-recommendations', {
          body: { answers }
        });

        if (error) {
          throw error;
        }

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#9b87f5]" />
        <p className="text-gray-600">Crafting perfect recommendations for you...</p>
      </div>
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
          <Card key={index} className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                <img
                  src={activity.imageUrl}
                  alt={activity.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-xl text-[#7E69AB]">{activity.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{activity.description}</p>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#7E69AB]">Quick Tips:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {activity.tips.map((tip, tipIndex) => (
                    <li key={tipIndex}>{tip}</li>
                  ))}
                </ul>
              </div>
              <Button 
                className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors duration-200"
                onClick={() => {
                  toast({
                    title: "Getting Started",
                    description: "We're preparing more details about this activity!",
                  });
                }}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}