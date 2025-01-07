import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useAffiliateId() {
  const [affiliateId, setAffiliateId] = useState('default-tag');

  useEffect(() => {
    const getAffiliateId = async () => {
      console.log('Fetching affiliate ID');
      const { data: { AMAZON_AFFILIATE_KEY } } = await supabase.functions.invoke('get-affiliate-key');
      if (AMAZON_AFFILIATE_KEY) {
        console.log('Successfully retrieved affiliate ID');
        setAffiliateId(AMAZON_AFFILIATE_KEY);
      }
    };

    getAffiliateId();
  }, []);

  return affiliateId;
}