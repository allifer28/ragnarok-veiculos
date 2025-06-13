import Link from "next/link"
import { Button } from "@/components/ui/button"
import CarCard from "@/components/car-card"

// Dados mock para desenvolvimento local
const mockCars = [
  {
    _id: "1",
    nome: "Honda Civic EXL 2023",
    marca: "Honda",
    modelo: "Civic",
    ano: "2023/2023",
    km: "15.000",
    combustivel: "Flex",
    cor: "Preto",
    preco: 125000,
    descricao: "Honda Civic EXL 2023 em perfeito estado. Único dono, revisões em dia, todos os opcionais.",
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    nome: "Toyota Corolla XEI 2022",
    marca: "Toyota",
    modelo: "Corolla",
    ano: "2022/2022",
    km: "28.000",
    combustivel: "Flex",
    cor: "Prata",
    preco: 115000,
    descricao: "Toyota Corolla XEI 2022, muito econômico e confiável. Perfeito para o dia a dia.",
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "3",
    nome: "Volkswagen Golf TSI 2023",
    marca: "Volkswagen",
    modelo: "Golf",
    ano: "2023/2023",
    km: "8.500",
    combustivel: "Gasolina",
    cor: "Branco",
    preco: 135000,
    descricao: "VW Golf TSI 2023, motor turbo, design esportivo e tecnologia de ponta.",
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function FeaturedCarsLocal() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </section>
  )
}
