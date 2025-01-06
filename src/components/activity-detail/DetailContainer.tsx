import { useState, useEffect } from "react";
import { Activity } from "../results/types";
import DetailHeader from "./DetailHeader";
import DetailContent from "./DetailContent";
import { useActivityDetail } from "./useActivityDetail";

interface DetailContainerProps {
  activity: Activity;
  onBack: () => void;
  onSelectAlternative: (alternative: { name: string; description: string }) => void;
}

export default function DetailContainer({ 
  activity, 
  onBack,
  onSelectAlternative 
}: DetailContainerProps) {
  const { 
    details,
    isLoading,
    error
  } = useActivityDetail(activity.name);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading details</div>;
  }

  return (
    <div className="space-y-8">
      <DetailHeader 
        activity={activity}
        onBack={onBack}
      />
      <DetailContent 
        activity={activity}
        details={details}
        onSelectAlternative={onSelectAlternative}
      />
    </div>
  );
}