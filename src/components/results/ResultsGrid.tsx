import ActivityCard from "../ActivityCard";
import { Activity } from "./types";
import { useEffect } from "react";

interface ResultsGridProps {
  activities: Activity[];
  onSelectActivity: (activity: Activity) => void;
}

export default function ResultsGrid({ 
  activities, 
  onSelectActivity,
}: ResultsGridProps) {
  useEffect(() => {
    const handleKeyNavigation = (e: KeyboardEvent) => {
      const cards = document.querySelectorAll('[role="article"]');
      const currentIndex = Array.from(cards).findIndex(card => card === document.activeElement);

      switch(e.key) {
        case 'ArrowRight':
          if (currentIndex < cards.length - 1) {
            (cards[currentIndex + 1] as HTMLElement).focus();
          }
          break;
        case 'ArrowLeft':
          if (currentIndex > 0) {
            (cards[currentIndex - 1] as HTMLElement).focus();
          }
          break;
        case 'ArrowDown':
          if (currentIndex + 2 < cards.length) {
            (cards[currentIndex + 2] as HTMLElement).focus();
          }
          break;
        case 'ArrowUp':
          if (currentIndex - 2 >= 0) {
            (cards[currentIndex - 2] as HTMLElement).focus();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, []);

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