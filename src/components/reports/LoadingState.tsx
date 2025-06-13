import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingState() {
  return (
    <div className="space-y-3 sm:space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full sm:h-12 sm:w-12" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full max-w-[200px]" />
                <Skeleton className="h-4 w-full max-w-[150px]" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
