import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

interface EquipmentSectionProps {
  equipment: {
    name: string;
    description: string;
    affiliateUrl: string;
    price: string;
  }[];
}

export default function EquipmentSection({ equipment }: EquipmentSectionProps) {
  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-[#7E69AB]">
          <ShoppingBag className="mr-2" /> Recommended Equipment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          {equipment.map((item, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-[#F1F0FB]">
              <div className="flex-grow">
                <h3 className="font-semibold text-[#7E69AB]">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-[#6E59A5] font-semibold">{item.price}</p>
              </div>
              <Button 
                onClick={() => window.open(item.affiliateUrl, '_blank')}
                className="bg-[#9b87f5] hover:bg-[#7E69AB]"
              >
                View on Amazon
              </Button>
            </div>
          ))}
        </div>
        
        {/* Affiliate Disclaimer */}
        <p className="text-sm text-gray-500 italic mt-4 border-t pt-4">
          Note: As an Amazon Associate, we may earn from qualifying purchases. This helps support our website at no additional cost to you.
        </p>
      </CardContent>
    </Card>
  );
}