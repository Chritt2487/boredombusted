import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useAffiliateId() {
  const [affiliateId, setAffiliateId] = useState<string>("");
  
  useEffect(() => {
    const getAffiliateId = async () => {
      const { data, error } = await supabase.rpc('get_secret', {
        name: 'AMAZON_AFFILIATE_KEY' as string
      });
      
      if (error) {
        console.error('Error fetching affiliate ID:', error);
        return;
      }
      
      if (data) {
        setAffiliateId(data as string);
      }
    };

    getAffiliateId();
  }, []);

  return affiliateId;
}