import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuestionSkeleton() {
  return (
    <Card className="w-full border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm animate-pulse">
      <CardHeader>
        <Skeleton className="h-8 w-3/4 mx-auto" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 rounded-lg border-2 border-[#D6BCFA] space-y-2"
          >
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}