import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Activity } from "@/types/activity";
import { useActivityDetails } from "@/hooks/useActivityDetails";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import OverviewSection from "./sections/OverviewSection";
import TutorialsSection from "./sections/TutorialsSection";
import EquipmentSection from "./sections/EquipmentSection";
import LocationsSection from "./sections/LocationsSection";
import AlternativesSection from "./sections/AlternativesSection";
import BenefitsSection from "./sections/BenefitsSection";
import CommunitySection from "./sections/CommunitySection";

interface ActivityDetailProps {
  activity: Activity;
  onBack: () => void;
  onSelectAlternative: (alternative: { name: string; description: string }) => void;
}

export default function ActivityDetail({ activity, onBack, onSelectAlternative }: ActivityDetailProps) {
  const { detailedInfo, loading } = useActivityDetails(activity);

  if (loading || !detailedInfo) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <Button 
        onClick={onBack}
        variant="ghost" 
        className="mb-4 text-[#7E69AB] hover:text-[#9b87f5]"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Results
      </Button>

      <OverviewSection 
        name={activity.name}
        description={activity.description}
        difficulty={detailedInfo.difficulty}
        timeCommitment={detailedInfo.timeCommitment}
        costEstimate={detailedInfo.costEstimate}
      />

      <TutorialsSection activityName={activity.name} />
      
      <EquipmentSection equipment={detailedInfo.equipment} />
      
      {detailedInfo.locations && (
        <LocationsSection locations={detailedInfo.locations} />
      )}

      <BenefitsSection benefits={detailedInfo.benefits} />
      
      <CommunitySection community={detailedInfo.community} />
      
      <AlternativesSection 
        alternatives={detailedInfo.alternatives} 
        onSelectAlternative={onSelectAlternative}
      />
    </div>
  );
}