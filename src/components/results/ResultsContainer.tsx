import { useState } from "react";
import { Activity } from "@/types/activity";
import { useActivityData } from "@/hooks/useActivityData";
import ActivityDetail from "../ActivityDetail";
import LoadingState from "./LoadingState";
import ResultsHeader from "./ResultsHeader";
import ResultsGrid from "./ResultsGrid";
import LoadMoreButton from "./LoadMoreButton";
import RefinementQuestionnaireContainer from "../questionnaire/RefinementQuestionnaireContainer";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

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

  // Update activities when new data arrives
  if (newActivities && activities.length === 0) {
    console.log('Received initial activities:', newActivities.length);
    setActivities(newActivities);
  }

  const handleLoadMore = async () => {
    console.log('Loading more activities...');
    await refetch();
    if (newActivities) {
      console.log('Received additional activities:', newActivities.length);
      setActivities(prev => [...prev, ...newActivities]);
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
        <p className="text-center text-gray-500">No activities found. Try adjusting your preferences.</p>
      )}
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <LoadMoreButton 
            isLoading={isFetching}
            onClick={handleLoadMore}
          />
          {!answers.isRefined && (
            <Button
              onClick={() => setShowRefinement(true)}
              className="bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors duration-200"
              aria-label="Get more personalized activity recommendations"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Get More Personalized Results
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-500 italic text-center mt-4">
          As an Amazon Associate, we may earn from qualifying purchases. This helps support our website at no additional cost to you.
        </p>
      </div>
    </div>
  );
}