import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import TutorialsSection from "./sections/TutorialsSection";
import EquipmentSection from "./sections/EquipmentSection";
import HeroSection from "./sections/HeroSection";
import OverviewSection from "./sections/OverviewSection";
import QuickBenefitsSection from "./sections/QuickBenefitsSection";
import GettingStartedSection from "./sections/GettingStartedSection";
import BenefitsSection from "./sections/BenefitsSection";
import LoadingState from "./sections/LoadingState";
import ErrorState from "./sections/ErrorState";
import { Activity } from "./questionnaire/activityTypes";

interface ActivityDetailProps {
  activity: Activity;
  onBack: () => void;
  onSelectAlternative: (alternative: { name: string; description: string; }) => void;
}

export default function ActivityDetail({ activity, onBack, onSelectAlternative }: ActivityDetailProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-8">
      <HeroSection 
        name={activity.name} 
        onBack={onBack} 
        imageUrl={activity.imageUrl}
      />
      
      <OverviewSection 
        description={activity.description}
        history={activity.history}
        difficulty={activity.difficulty}
        timeCommitment={activity.timeCommitment}
        costEstimate={activity.costEstimate}
      />

      <QuickBenefitsSection funFacts={activity.benefits} />

      <GettingStartedSection 
        steps={activity.gettingStarted.steps}
        beginnerTips={activity.gettingStarted.tips}
      />

      <EquipmentSection equipment={activity.equipment} />

      <BenefitsSection 
        skills={activity.tags.skills}
        health={activity.benefits}
      />

      <TutorialsSection activityName={activity.name} />

      <div className="flex justify-center">
        <Button 
          onClick={onBack}
          className="bg-[#9b87f5] hover:bg-[#7E69AB]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Activities
        </Button>
      </div>
    </div>
  );
}