import DetailContainer from "./activity-detail/DetailContainer";
import { Activity } from "./results/types";

interface ActivityDetailProps {
  activity: Activity;
  onBack: () => void;
  onSelectAlternative: (alternative: { name: string; description: string }) => void;
}

export default function ActivityDetail({ 
  activity, 
  onBack,
  onSelectAlternative 
}: ActivityDetailProps) {
  return (
    <DetailContainer
      activity={activity}
      onBack={onBack}
      onSelectAlternative={onSelectAlternative}
    />
  );
}