import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

type GetSecretResponse = string;

interface GetSecretParams {
  name: string;
}

export function useAffiliateId() {
  const [affiliateId, setAffiliateId] = useState<string>("");
  
  useEffect(() => {
    const getAffiliateId = async () => {
      const { data, error } = await supabase.rpc<GetSecretResponse>('get_secret', {
        name: 'AMAZON_AFFILIATE_KEY'
      });
      
      if (error) {
        console.error('Error fetching affiliate ID:', error);
        return;
      }
      
      if (data) {
        setAffiliateId(data);
      }
    };

    getAffiliateId();
  }, []);

  return affiliateId;
}