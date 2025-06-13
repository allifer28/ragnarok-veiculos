import { Suspense } from "react"
import CarCatalogLocal from "@/components/car-catalog-local"
import CarFilters from "@/components/car-filters"
import Footer from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function CatalogoPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Catálogo de Veículos</h1>

      <CarFilters />

      <Suspense fallback={<CatalogSkeleton />}>
        <CarCatalogLocal
          page={searchParams.page ? Number(searchParams.page) : 1}
          marca={typeof searchParams.marca === "string" ? searchParams.marca : undefined}
          minPrice={searchParams.minPrice ? Number(searchParams.minPrice) : undefined}
          maxPrice={searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined}
        />
      </Suspense>

      <Footer />
    </div>
  )
}

function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border border-border">
            <Skeleton className="w-full h-48" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-5 w-1/3" />
            </div>
          </div>
        ))}
    </div>
  )
}
