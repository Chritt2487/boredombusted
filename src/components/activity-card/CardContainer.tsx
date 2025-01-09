import { Card } from "@/components/ui/card";
import type { Language } from "@/utils/i18n";

interface CardContainerProps {
  children: React.ReactNode;
  onSelect: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  activityName: string;
}

export default function CardContainer({ 
  children, 
  onSelect, 
  onKeyPress,
  activityName 
}: CardContainerProps) {
  return (
    <Card 
      className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-200 focus-visible:ring-2 focus-visible:ring-[#7E69AB] focus-visible:outline-none"
      role="article"
      aria-label={`Activity card for ${activityName}`}
      tabIndex={0}
      onKeyDown={onKeyPress}
      onClick={onSelect}
    >
      {children}
    </Card>
  );
}