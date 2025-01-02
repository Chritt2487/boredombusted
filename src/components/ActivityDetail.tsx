import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TutorialsSection from "./sections/TutorialsSection";
import EquipmentSection from "./sections/EquipmentSection";
import OverviewSection from "./sections/OverviewSection";
import QuickBenefitsSection from "./sections/QuickBenefitsSection";
import GettingStartedSection from "./sections/GettingStartedSection";
import BenefitsSection from "./sections/BenefitsSection";
import LoadingState from "./sections/LoadingState";
import ErrorState from "./sections/ErrorState";
import HeroSection from "./activity-detail/HeroSection";
import { getActivityImage } from "./activity-detail/ActivityImageMap";
import { useActivityDetail } from "./activity-detail/useActivityDetail";
import type { ActivityDetailProps } from "./activity-detail/types";

export default function ActivityDetail({ activity, onBack }: ActivityDetailProps) {
  const { detailedInfo, loading } = useActivityDetail(activity.name);

  if (loading) {
    return <LoadingState />;
  }

  if (!detailedInfo) {
    return <ErrorState onBack={onBack} />;
  }

  const activityImage = getActivityImage(activity.name);

  return (
    <div className="space-y-8">
      <HeroSection 
        name={activity.name} 
        onBack={onBack} 
        imageUrl={activityImage}
      />
      
      <OverviewSection 
        description={activity.description}
        history={detailedInfo.history}
        difficulty={detailedInfo.difficulty}
        timeCommitment={detailedInfo.timeCommitment}
        costEstimate={detailedInfo.costEstimate}
      />

      {detailedInfo.benefits?.funFacts && (
        <QuickBenefitsSection funFacts={detailedInfo.benefits.funFacts} />
      )}

      {detailedInfo.gettingStarted && (
        <GettingStartedSection 
          steps={detailedInfo.gettingStarted.steps}
          beginnerTips={detailedInfo.gettingStarted.beginnerTips}
        />
      )}

      {detailedInfo.equipment && (
        <EquipmentSection equipment={detailedInfo.equipment} />
      )}

      {(detailedInfo.benefits?.skills || detailedInfo.benefits?.health) && (
        <BenefitsSection 
          skills={detailedInfo.benefits.skills}
          health={detailedInfo.benefits.health}
        />
      )}

      <TutorialsSection activityName={activity.name} />

      <div className="flex justify-center">
        <Button 
          onClick={onBack}
          className="bg-[#9b87f5] hover:bg-[#7E69AB]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Results
        </Button>
      </div>
    </div>
  );
}