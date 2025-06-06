import { Suspense } from "react"
import CarCard from "@/components/car-card"
import Pagination from "@/components/pagination"
import { getCars } from "@/lib/data-serverless"
import { Skeleton } from "@/components/ui/skeleton"

interface CarCatalogProps {
  page?: number
  limit?: number
  marca?: string
  minPrice?: number
  maxPrice?: number
}

export default async function CarCatalogServerless({
  page = 1,
  limit = 9,
  marca,
  minPrice,
  maxPrice,
}: CarCatalogProps) {
  const { cars, pagination } = await getCars({
    page,
    limit,
    marca,
    minPrice,
    maxPrice,
  })

  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">Nenhum veículo encontrado</h3>
        <p className="text-muted-foreground">Tente ajustar os filtros ou volte mais tarde.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      <Suspense fallback={<Skeleton className="h-10 w-full max-w-md mx-auto mt-8" />}>
        <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} />
      </Suspense>
    </div>
  )
}
