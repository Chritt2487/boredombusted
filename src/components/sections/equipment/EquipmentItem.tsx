import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { ActivityEquipment } from "../../questionnaire/activityTypes";

interface EquipmentItemProps {
  item: ActivityEquipment;
  formatAmazonUrl: (url: string) => string;
}

export default function EquipmentItem({ item, formatAmazonUrl }: EquipmentItemProps) {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg bg-[#F1F0FB]">
      <div className="flex-grow">
        <h4 className="font-semibold text-[#7E69AB]">{item.name}</h4>
        <p className="text-gray-600 mb-2">{item.description}</p>
        <p className="text-[#6E59A5] font-semibold">{item.estimatedCost}</p>
      </div>
      {item.affiliateUrl && (
        <Button 
          onClick={() => window.open(formatAmazonUrl(item.affiliateUrl!), '_blank')}
          className="bg-[#F97316] hover:bg-[#EA580C] transition-colors duration-200"
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          View on Amazon
        </Button>
      )}
    </div>
  );
}