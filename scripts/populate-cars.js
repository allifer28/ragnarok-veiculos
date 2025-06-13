import { MongoClient } from "mongodb"

// Dados de exemplo de carros
const sampleCars = [
  {
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
  {
    nome: "Honda Accord Hybrid 2022",
    marca: "Honda",
    modelo: "Accord",
    ano: "2022/2022",
    km: "22.000",
    combustivel: "Híbrido",
    cor: "Azul",
    preco: 165000,
    descricao: "Honda Accord Hybrid 2022, tecnologia híbrida, consumo excepcional e conforto premium.",
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nome: "Toyota Camry XLE 2023",
    marca: "Toyota",
    modelo: "Camry",
    ano: "2023/2023",
    km: "12.000",
    combustivel: "Gasolina",
    cor: "Vermelho",
    preco: 185000,
    descricao: "Toyota Camry XLE 2023, sedan premium com todos os opcionais de série.",
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nome: "Volkswagen Jetta GLI 2022",
    marca: "Volkswagen",
    modelo: "Jetta",
    ano: "2022/2023",
    km: "18.500",
    combustivel: "Gasolina",
    cor: "Cinza",
    preco: 145000,
    descricao: "VW Jetta GLI 2022, versão esportiva com motor turbo e acabamento premium.",
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nome: "Honda HR-V EXL 2023",
    marca: "Honda",
    modelo: "HR-V",
    ano: "2023/2023",
    km: "5.200",
    combustivel: "Flex",
    cor: "Branco Pérola",
    preco: 155000,
    descricao: "Honda HR-V EXL 2023, SUV compacto com design moderno e tecnologia avançada.",
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nome: "Toyota RAV4 Hybrid 2022",
    marca: "Toyota",
    modelo: "RAV4",
    ano: "2022/2022",
    km: "35.000",
    combustivel: "Híbrido",
    cor: "Verde",
    preco: 195000,
    descricao: "Toyota RAV4 Hybrid 2022, SUV híbrido com tração integral e baixo consumo.",
    imagens: ["/placeholder.svg?height=400&width=600"],
    imagemPrincipal: "/placeholder.svg?height=400&width=600",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

async function populateCars() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ragnarok_veiculos"
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Conectado ao MongoDB")

    const db = client.db()
    const collection = db.collection("cars")

    // Limpar coleção existente (opcional)
    // await collection.deleteMany({})
    // console.log('Coleção limpa')

    // Inserir carros de exemplo
    const result = await collection.insertMany(sampleCars)
    console.log(`${result.insertedCount} carros inseridos com sucesso!`)

    // Listar carros inseridos
    const cars = await collection.find({}).toArray()
    console.log(`Total de carros no banco: ${cars.length}`)
  } catch (error) {
    console.error("Erro ao popular banco:", error)
  } finally {
    await client.close()
    console.log("Conexão fechada")
  }
}

// Executar script
populateCars()
