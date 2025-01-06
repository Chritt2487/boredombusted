import { Activity } from "../results/types";
import { DetailedActivity } from "./types";
import BenefitsSection from "../sections/BenefitsSection";
import GettingStartedSection from "../sections/GettingStartedSection";
import EquipmentSection from "../sections/EquipmentSection";
import AlternativesSection from "../sections/AlternativesSection";
import ShopSection from "../sections/ShopSection";

interface DetailContentProps {
  activity: Activity;
  details: DetailedActivity;
  onSelectAlternative: (alternative: { name: string; description: string }) => void;
}

export default function DetailContent({ 
  activity, 
  details,
  onSelectAlternative 
}: DetailContentProps) {
  return (
    <div className="space-y-8">
      {(details.benefits?.skills || details.benefits?.health) && (
        <BenefitsSection 
          skills={details.benefits?.skills}
          health={details.benefits?.health}
        />
      )}
      
      {(details.gettingStarted?.steps || details.gettingStarted?.beginnerTips) && (
        <GettingStartedSection 
          steps={details.gettingStarted?.steps}
          beginnerTips={details.gettingStarted?.beginnerTips}
        />
      )}
      
      <ShopSection activityName={activity.name} />
      
      {details.equipment && details.equipment.length > 0 && (
        <EquipmentSection equipment={details.equipment} />
      )}
      
      {details.alternatives && details.alternatives.length > 0 && (
        <AlternativesSection 
          alternatives={details.alternatives}
          onSelectAlternative={onSelectAlternative}
        />
      )}
    </div>
  );
}