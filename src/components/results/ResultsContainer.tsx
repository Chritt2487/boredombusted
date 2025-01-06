import { useState } from "react";
import { Activity } from "@/types/activity";
import { useActivityData } from "@/hooks/useActivityData";
import ActivityDetail from "../ActivityDetail";
import LoadingState from "./LoadingState";
import ResultsHeader from "./ResultsHeader";
import ResultsGrid from "./ResultsGrid";
import LoadMoreButton from "./LoadMoreButton";
import QuestionnaireContainer from "../questionnaire/QuestionnaireContainer";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";

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
  const [showRefinement, setShowRefinement] = useState(false);

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

  if (showRefinement) {
    return (
      <QuestionnaireContainer 
        initialChoice="refine" 
        onComplete={(refinedAnswers) => {
          setShowRefinement(false);
          // Clear existing activities to show new refined results
          setActivities([]);
        }}
      />
    );
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
    <div className="space-y-8">
      <ResultsHeader />
      <ResultsGrid 
        activities={activities}
        onSelectActivity={setSelectedActivity}
      />
      <div className="flex justify-center gap-4">
        <LoadMoreButton 
          isLoading={isFetching}
          onClick={handleLoadMore}
        />
        <Button
          onClick={() => setShowRefinement(true)}
          className="bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors duration-200"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refine Results
        </Button>
      </div>
    </div>
  );
}