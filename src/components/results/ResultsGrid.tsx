import ActivityCard from "../ActivityCard";
import { Activity } from "./types";

interface ResultsGridProps {
  activities: Activity[];
  onSelectActivity: (activity: Activity) => void;
}

export default function ResultsGrid({ activities, onSelectActivity }: ResultsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {activities.map((activity, index) => (
        <ActivityCard
          key={index}
          activity={activity}
          onSelect={onSelectActivity}
        />
      ))}
    </div>
  );
}