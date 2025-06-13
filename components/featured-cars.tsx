import Link from "next/link"
import { Button } from "@/components/ui/button"
import CarCard from "@/components/car-card"
import { getFeaturedCars } from "@/lib/data"

export default async function FeaturedCars() {
  const cars = await getFeaturedCars()

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Veículos em Destaque</h2>
            <p className="text-muted-foreground">Confira nossos veículos mais populares</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/catalogo">Ver Todos</Link>
          </Button>
        </div>

        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum veículo encontrado</p>
          </div>
        )}
      </div>
    </section>
  )
}
