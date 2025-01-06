import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface ShopSectionProps {
  activityName: string;
}

export default function ShopSection({ activityName }: ShopSectionProps) {
  const [affiliateId, setAffiliateId] = useState('default-tag');

  useEffect(() => {
    const getAffiliateId = async () => {
      const { data: { AMAZON_AFFILIATE_KEY } } = await supabase.functions.invoke('get-affiliate-key');
      if (AMAZON_AFFILIATE_KEY) {
        setAffiliateId(AMAZON_AFFILIATE_KEY);
      }
    };

    getAffiliateId();
  }, []);

  const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(activityName)}&tag=${affiliateId}`;
  
  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-[#7E69AB]">
          <ShoppingBag className="mr-2" /> Shop Equipment on Amazon
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 rounded-lg bg-[#F1F0FB] hover:bg-[#E5DEFF] transition-colors">
          <h3 className="font-semibold text-[#7E69AB] mb-2">Get Started with {activityName}</h3>
          <p className="text-gray-600 mb-4">
            Find all the equipment you need to begin your {activityName} journey on Amazon.
          </p>
          <Button 
            onClick={() => window.open(amazonSearchUrl, '_blank')}
            className="bg-[#F97316] hover:bg-[#EA580C] transition-colors duration-200 mb-4"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Shop on Amazon
          </Button>
          <p className="text-sm text-gray-500 italic">
            Note: As an Amazon Associate, we may earn from qualifying purchases. This helps support our website at no additional cost to you.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}