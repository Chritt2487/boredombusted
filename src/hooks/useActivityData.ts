import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Activity, QuestionnaireAnswers } from "@/types/activity";
import { useToast } from "./use-toast";

export function useActivityData(answers: QuestionnaireAnswers, existingActivities: string[] = []) {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['activities', answers, existingActivities],
    queryFn: async () => {
      try {
        console.log("Fetching recommendations with answers:", answers);
        const { data, error } = await supabase.functions.invoke('generate-recommendations', {
          body: { 
            answers,
            existingActivities
          }
        });

        if (error) throw error;
        
        console.log("Received recommendations:", data);
        return data.activities.map((activity: any) => ({
          ...activity,
          benefits: activity.benefits || []
        }));
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        toast({
          title: "Error",
          description: "Failed to load recommendations. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
    }
  });
}