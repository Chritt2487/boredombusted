import { Activity } from "../results/types";
import { ActivityDetail } from "./types";
import BenefitsSection from "../sections/BenefitsSection";
import GettingStartedSection from "../sections/GettingStartedSection";
import EquipmentSection from "../sections/EquipmentSection";
import AlternativesSection from "../sections/AlternativesSection";

interface DetailContentProps {
  activity: Activity;
  details: ActivityDetail;
  onSelectAlternative: (alternative: { name: string; description: string }) => void;
}

export default function DetailContent({ 
  activity, 
  details,
  onSelectAlternative 
}: DetailContentProps) {
  return (
    <div className="space-y-8">
      {(details.skills || details.healthBenefits) && (
        <BenefitsSection 
          skills={details.skills}
          health={details.healthBenefits}
        />
      )}
      
      {(details.steps || details.beginnerTips) && (
        <GettingStartedSection 
          steps={details.steps}
          beginnerTips={details.beginnerTips}
        />
      )}
      
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