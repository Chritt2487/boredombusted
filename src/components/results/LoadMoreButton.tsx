import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadMoreButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export default function LoadMoreButton({ isLoading, onClick }: LoadMoreButtonProps) {
  return (
    <div className="flex justify-center">
      <Button
        onClick={onClick}
        disabled={isLoading}
        className="bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors duration-200"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading more...
          </>
        ) : (
          "Load More Activities"
        )}
      </Button>
    </div>
  );
}