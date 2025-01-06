import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonProps {
  activity: {
    name: string;
    description: string;
  };
}

export default function ShareButton({ activity }: ShareButtonProps) {
  const { toast } = useToast();

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.share({
        title: activity.name,
        text: activity.description,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Activity link has been copied to clipboard",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleShare}
      className="hover:bg-[#F1F0FB] text-gray-500"
    >
      <Share2 className="h-5 w-5" />
    </Button>
  );
}