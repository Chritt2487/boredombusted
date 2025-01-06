import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Activity } from "../results/types";

interface DetailHeaderProps {
  activity: Activity;
  onBack: () => void;
}

export default function DetailHeader({ activity, onBack }: DetailHeaderProps) {
  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onBack}
        className="hover:bg-[#F1F0FB]"
      >
        <ArrowLeft className="h-6 w-6 text-[#7E69AB]" />
      </Button>
      <h1 className="text-3xl font-bold text-[#7E69AB]">{activity.name}</h1>
    </div>
  );
}