import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8 animate-pulse">
        <div className="space-y-4">
          <Skeleton className="h-12 w-64 max-w-full" />
          <Skeleton className="h-6 w-96 max-w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-border">
                <Skeleton className="w-full h-48" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-5 w-1/3" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
