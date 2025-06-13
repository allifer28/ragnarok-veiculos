import CarCard from "@/components/car-card"
import Pagination from "@/components/pagination"

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
    descricao: "Honda Civic EXL 2023 em perfeito estado.",
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
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
    descricao: "Toyota Corolla XEI 2022, muito econômico.",
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
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
    descricao: "VW Golf TSI 2023, motor turbo.",
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
  },
  {
    _id: "4",
    nome: "Honda HR-V EXL 2023",
    marca: "Honda",
    modelo: "HR-V",
    ano: "2023/2023",
    km: "5.200",
    combustivel: "Flex",
    cor: "Branco Pérola",
    preco: 155000,
    descricao: "Honda HR-V EXL 2023, SUV compacto.",
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
  },
  {
    _id: "5",
    nome: "Toyota RAV4 Hybrid 2022",
    marca: "Toyota",
    modelo: "RAV4",
    ano: "2022/2022",
    km: "35.000",
    combustivel: "Híbrido",
    cor: "Verde",
    preco: 195000,
    descricao: "Toyota RAV4 Hybrid 2022, SUV híbrido.",
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
  },
  {
    _id: "6",
    nome: "Volkswagen Jetta GLI 2022",
    marca: "Volkswagen",
    modelo: "Jetta",
    ano: "2022/2023",
    km: "18.500",
    combustivel: "Gasolina",
    cor: "Cinza",
    preco: 145000,
    descricao: "VW Jetta GLI 2022, versão esportiva.",
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
  },
]

interface CarCatalogLocalProps {
  page?: number
  limit?: number
  marca?: string
  minPrice?: number
  maxPrice?: number
}

export default function CarCatalogLocal({ page = 1, limit = 9, marca, minPrice, maxPrice }: CarCatalogLocalProps) {
  // Filtrar carros baseado nos parâmetros
  let filteredCars = mockCars

  if (marca && marca !== "all") {
    filteredCars = filteredCars.filter((car) => car.marca.toLowerCase() === marca.toLowerCase())
  }

  if (minPrice !== undefined) {
    filteredCars = filteredCars.filter((car) => car.preco >= minPrice)
  }

  if (maxPrice !== undefined) {
    filteredCars = filteredCars.filter((car) => car.preco <= maxPrice)
  }

  // Paginação
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedCars = filteredCars.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredCars.length / limit)

  if (paginatedCars.length === 0) {
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
        {paginatedCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} />}
    </div>
  )
}
