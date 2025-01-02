import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { ActivityEquipment } from "../questionnaire/activityTypes";

interface EquipmentSectionProps {
  equipment: ActivityEquipment[];
}

export default function EquipmentSection({ equipment }: EquipmentSectionProps) {
  const categorizedEquipment = {
    required: equipment.filter(item => item.required),
    optional: equipment.filter(item => !item.required)
  };

  const renderEquipmentList = (items: ActivityEquipment[], title: string) => (
    <div className="space-y-4">
      <h3 className="font-semibold text-[#7E69AB]">{title}</h3>
      {items.map((item, index) => (
        <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-[#F1F0FB]">
          <div className="flex-grow">
            <h4 className="font-semibold text-[#7E69AB]">{item.name}</h4>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="text-[#6E59A5] font-semibold">{item.estimatedCost}</p>
          </div>
          {item.affiliateUrl && (
            <Button 
              onClick={() => window.open(item.affiliateUrl, '_blank')}
              className="bg-[#F97316] hover:bg-[#EA580C] transition-colors duration-200"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              View on Amazon
            </Button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-[#7E69AB]">
          <ShoppingBag className="mr-2" /> Equipment Needed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {categorizedEquipment.required.length > 0 && 
          renderEquipmentList(categorizedEquipment.required, "Required Equipment")}
        {categorizedEquipment.optional.length > 0 && 
          renderEquipmentList(categorizedEquipment.optional, "Optional Equipment")}
        
        <p className="text-sm text-gray-500 italic mt-4 border-t pt-4">
          Note: As an Amazon Associate, we may earn from qualifying purchases. This helps support our website at no additional cost to you.
        </p>
      </CardContent>
    </Card>
  );
}