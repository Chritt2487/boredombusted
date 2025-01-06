import { useState } from "react";
import { Activity } from "@/types/activity";
import { useActivityData } from "@/hooks/useActivityData";
import ActivityDetail from "../ActivityDetail";
import LoadingState from "./LoadingState";
import ResultsHeader from "./ResultsHeader";
import ResultsGrid from "./ResultsGrid";
import LoadMoreButton from "./LoadMoreButton";

interface ResultsContainerProps {
  answers: {
    initialChoice: string;
    environment: string;
    activityLevel: string;
    timeCommitment: string;
    budget: string;
    social: string;
    isRandom?: boolean;
  };
}

export default function ResultsContainer({ answers }: ResultsContainerProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const { 
    data: newActivities,
    isLoading,
    isFetching,
    refetch
  } = useActivityData(answers, activities.map(a => a.name));

  // Update activities when new data arrives
  if (newActivities && activities.length === 0) {
    setActivities(newActivities);
  }

  const handleLoadMore = async () => {
    await refetch();
    if (newActivities) {
      setActivities(prev => [...prev, ...newActivities]);
    }
  };

  const handleSelectAlternative = (alternative: { name: string; description: string }) => {
    const newActivity: Activity = {
      name: alternative.name,
      description: alternative.description,
      imageUrl: "/placeholder.svg",
      benefits: [],
    };
    setSelectedActivity(newActivity);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading && activities.length === 0) {
    return <LoadingState />;
  }

  if (selectedActivity) {
    return (
      <ActivityDetail 
        activity={selectedActivity}
        onBack={() => setSelectedActivity(null)}
        onSelectAlternative={handleSelectAlternative}
      />
    );
  }

  return (
    <div className="space-y-8">
      <ResultsHeader />
      <ResultsGrid 
        activities={activities}
        onSelectActivity={setSelectedActivity}
      />
      <LoadMoreButton 
        isLoading={isFetching}
        onClick={handleLoadMore}
      />
    </div>
  );
}