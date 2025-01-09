import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { getTranslation, type Language } from "@/utils/i18n";

interface ShopButtonProps {
  onClick: (e: React.MouseEvent) => void;
  activityName: string;
  language?: Language;
}

export default function ShopButton({ 
  onClick, 
  activityName,
  language = 'en' 
}: ShopButtonProps) {
  return (
    <Button 
      onClick={onClick}
      className="w-full bg-[#F97316] hover:bg-[#EA580C] transition-colors duration-200"
      aria-label={`Shop for ${activityName} on Amazon`}
    >
      <ShoppingBag className="mr-2 h-4 w-4" />
      {getTranslation('shopOnAmazon', language)}
    </Button>
  );
}