import { Suspense } from "react"
import AdminCarListProduction from "@/components/admin/admin-car-list-production"
import AdminHeader from "@/components/admin/admin-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AdminHeader />

      <div className="mt-8">
        <Suspense fallback={<AdminSkeleton />}>
          <AdminCarListProduction />
        </Suspense>
      </div>
    </div>
  )
}

function AdminSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full max-w-md" />
      <div className="border rounded-lg p-4">
        <div className="space-y-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-16 w-16 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-9 w-9 rounded" />
                  <Skeleton className="h-9 w-9 rounded" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
