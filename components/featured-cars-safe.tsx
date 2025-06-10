import Link from "next/link"
import { Button } from "@/components/ui/button"
import CarCard from "@/components/car-card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Dados de fallback
const fallbackCars = [
  {
    _id: "fallback-1",
    nome: "Honda Civic EXL 2023",
    marca: "Honda",
    preco: 125000,
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
  },
  {
    _id: "fallback-2",
    nome: "Toyota Corolla XEI 2022",
    marca: "Toyota",
    preco: 115000,
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
  },
  {
    _id: "fallback-3",
    nome: "Volkswagen Golf TSI 2023",
    marca: "Volkswagen",
    preco: 135000,
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
  },
]

async function getFeaturedCarsSafe() {
  try {
    // Tentar importar e usar a função real
    const { getFeaturedCars } = await import("@/lib/data")
    const cars = await getFeaturedCars()

    if (cars && cars.length > 0) {
      return { cars, isReal: true, error: null }
    } else {
      return { cars: fallbackCars, isReal: false, error: "Nenhum carro encontrado no banco" }
    }
  } catch (error) {
    console.error("Erro ao buscar carros:", error)
    return {
      cars: fallbackCars,
      isReal: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}

export default async function FeaturedCarsSafe() {
  const { cars, isReal, error } = await getFeaturedCarsSafe()

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Alerta se usando dados de fallback */}
        {!isReal && (
          <Alert className="mb-6" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Modo Demonstração:</strong> {error}.
              <a href="/api/diagnostics" target="_blank" className="underline ml-2" rel="noreferrer">
                Ver diagnóstico completo
              </a>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Veículos em Destaque</h2>
            <p className="text-muted-foreground">
              {isReal ? "Confira nossos veículos mais populares" : "Dados de demonstração"}
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/catalogo">Ver Todos</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </section>
  )
}
