import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function useApiStatus() {
  const [isApiWorking, setIsApiWorking] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        console.log('Checking API status...');
        const { data, error } = await supabase.functions.invoke('generate-recommendations', {
          body: { 
            answers: {
              initialChoice: "test",
              isRandom: true
            }
          }
        });

        if (error) {
          console.error('API check failed:', error);
          toast({
            title: "API Status",
            description: "API is currently experiencing issues. Please try again later.",
            variant: "destructive",
          });
          setIsApiWorking(false);
          return;
        }

        if (data) {
          console.log('API check successful');
          setIsApiWorking(true);
          toast({
            title: "API Status",
            description: "API is working correctly",
          });
        }
      } catch (error) {
        console.error('Error checking API status:', error);
        setIsApiWorking(false);
      }
    };

    checkApiStatus();
  }, [toast]);

  return isApiWorking;
}