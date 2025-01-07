import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { getTranslation, type Language } from "@/utils/i18n";

interface ActionButtonsProps {
  activityName: string;
  onSelect: () => void;
  onShopClick: (e: React.MouseEvent) => void;
  language?: Language;
}

export default function ActionButtons({ 
  activityName, 
  onSelect, 
  onShopClick,
  language = 'en'
}: ActionButtonsProps) {
  return (
    <div className="space-y-2">
      <Button 
        className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors duration-200"
        onClick={onSelect}
        aria-label={`Learn more about ${activityName}`}
      >
        {getTranslation('learnMore', language)}
      </Button>
      
      <Button 
        onClick={onShopClick}
        className="w-full bg-[#F97316] hover:bg-[#EA580C] transition-colors duration-200"
        aria-label={`Shop for ${activityName} on Amazon`}
      >
        <ShoppingBag className="mr-2 h-4 w-4" />
        {getTranslation('shopOnAmazon', language)}
      </Button>
    </div>
  );
}