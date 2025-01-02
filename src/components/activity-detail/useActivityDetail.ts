import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DetailedActivity } from "./types";

export function useActivityDetail(activityName: string) {
  const [detailedInfo, setDetailedInfo] = useState<DetailedActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarActivities, setSimilarActivities] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDetailedInfo = async () => {
      try {
        console.log("Fetching details for activity:", activityName);
        const { data, error } = await supabase.functions.invoke('get-activity-details', {
          body: { activityName }
        });

        if (error) throw error;
        
        console.log("Received detailed info:", data);
        setDetailedInfo(data);

        const { data: similarData, error: similarError } = await supabase.functions.invoke('generate-recommendations', {
          body: { 
            answers: {
              initialChoice: "similar",
              baseActivity: activityName
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
  }, [activityName, toast]);

  return { detailedInfo, loading, similarActivities };
}