import { NextResponse } from "next/server"

// Dados mock para fallback quando não há conexão com banco
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

export async function GET() {
  try {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      cars: mockCars,
      pagination: {
        total: mockCars.length,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    })
  } catch (error) {
    console.error("Erro na API fallback:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST() {
  return NextResponse.json({ message: "Modo demonstração - dados não salvos" }, { status: 200 })
}
