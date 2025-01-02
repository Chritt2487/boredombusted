import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorStateProps {
  onBack: () => void;
}

export default function ErrorState({ onBack }: ErrorStateProps) {
  return (
    <div className="space-y-4">
      <Button onClick={onBack} variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Results
      </Button>
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-600">
            Could not load activity details. Please try again later.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}