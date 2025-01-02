import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { ActivityEquipment } from "../questionnaire/activityTypes";
import { useAffiliateId } from "./equipment/useAffiliateId";
import { formatAmazonUrl } from "./equipment/formatAmazonUrl";
import EquipmentList from "./equipment/EquipmentList";

interface EquipmentSectionProps {
  equipment: ActivityEquipment[];
}

export default function EquipmentSection({ equipment }: EquipmentSectionProps) {
  const affiliateId = useAffiliateId();
  
  const formatUrl = (url: string) => formatAmazonUrl(url, affiliateId);

  const categorizedEquipment = {
    required: equipment.filter(item => item.required),
    optional: equipment.filter(item => !item.required)
  };

  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-[#7E69AB]">
          <ShoppingBag className="mr-2" /> Equipment Needed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {categorizedEquipment.required.length > 0 && (
          <EquipmentList 
            items={categorizedEquipment.required} 
            title="Required Equipment"
            formatAmazonUrl={formatUrl}
          />
        )}
        
        {categorizedEquipment.optional.length > 0 && (
          <EquipmentList 
            items={categorizedEquipment.optional} 
            title="Optional Equipment"
            formatAmazonUrl={formatUrl}
          />
        )}
        
        <p className="text-sm text-gray-500 italic mt-4 border-t pt-4">
          Note: As an Amazon Associate, we may earn from qualifying purchases. This helps support our website at no additional cost to you.
        </p>
      </CardContent>
    </Card>
  );
}