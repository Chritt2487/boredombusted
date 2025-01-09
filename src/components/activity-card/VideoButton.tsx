import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

interface VideoButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

export default function VideoButton({ onClick }: VideoButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
      onClick={onClick}
      aria-label="Watch tutorial video"
    >
      <PlayCircle className="h-6 w-6" />
    </Button>
  );
}