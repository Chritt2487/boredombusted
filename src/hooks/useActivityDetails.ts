import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DetailedActivity, Activity } from "@/types/activity";

export const useActivityDetails = (activity: Activity) => {
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
        
        // Add default category if not present
        const processedData = {
          ...data,
          equipment: data.equipment.map((item: any) => ({
            ...item,
            category: item.category || 'recommended'
          }))
        };
        
        console.log("Received detailed info:", processedData);
        setDetailedInfo(processedData);
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

  return { detailedInfo, loading };
};