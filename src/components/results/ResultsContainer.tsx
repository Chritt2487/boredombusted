import { useState } from "react";
import { Activity } from "@/types/activity";
import { useActivityData } from "@/hooks/useActivityData";
import ActivityDetail from "../ActivityDetail";
import LoadingState from "./LoadingState";
import ResultsHeader from "./ResultsHeader";
import ResultsGrid from "./ResultsGrid";
import ActionButtons from "./ActionButtons";
import NoResultsMessage from "./NoResultsMessage";
import AffiliateDisclaimer from "./AffiliateDisclaimer";
import RefinementQuestionnaireContainer from "../questionnaire/RefinementQuestionnaireContainer";

interface ResultsContainerProps {
  answers: {
    initialChoice: string;
    environment: string;
    activityLevel: string;
    timeCommitment: string;
    budget: string;
    social: string;
    isRandom?: boolean;
    isRefined?: boolean;
  };
}

export default function ResultsContainer({ answers }: ResultsContainerProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showRefinement, setShowRefinement] = useState(false);

  const { 
    data: newActivities,
    isLoading,
    isFetching,
    refetch
  } = useActivityData(answers, activities.map(a => a.name));

  // Update activities when initial data arrives
  if (newActivities && activities.length === 0) {
    console.log('Received initial activities:', newActivities.length);
    setActivities(newActivities);
  }

  const handleLoadMore = async () => {
    console.log('Loading more activities...');
    const result = await refetch();
    if (result.data) {
      console.log('Received additional activities:', result.data.length);
      setActivities(prev => [...prev, ...result.data]);
    }
  };

  const handleSelectAlternative = (alternative: { name: string; description: string }) => {
    console.log('Selected alternative activity:', alternative.name);
    const newActivity: Activity = {
      name: alternative.name,
      description: alternative.description,
      imageUrl: "/placeholder.svg",
      benefits: [],
    };
    setSelectedActivity(newActivity);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showRefinement) {
    return <RefinementQuestionnaireContainer previousAnswers={answers} />;
  }

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
    <div className="space-y-8" role="main" aria-label="Activity recommendations">
      <ResultsHeader />
      
      {activities.length > 0 ? (
        <ResultsGrid 
          activities={activities}
          onSelectActivity={setSelectedActivity}
        />
      ) : (
        <NoResultsMessage />
      )}

      <div className="flex flex-col items-center gap-4">
        <ActionButtons 
          isLoading={isFetching}
          onLoadMore={handleLoadMore}
          showRefinement={!answers.isRefined}
          onRefinement={() => setShowRefinement(true)}
        />
        <AffiliateDisclaimer />
      </div>
    </div>
  );
}