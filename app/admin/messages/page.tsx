import { Suspense } from "react"
import AdminHeader from "@/components/admin/admin-header"
import MessagesList from "@/components/admin/messages-list"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminMessagesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AdminHeader />

      <div className="mt-8">
        <Suspense fallback={<MessagesSkeleton />}>
          <MessagesList />
        </Suspense>
      </div>
    </div>
  )
}

function MessagesSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
