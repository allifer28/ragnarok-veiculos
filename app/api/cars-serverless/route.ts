import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const marca = searchParams.get("marca")
    const minPrice = searchParams.get("minPrice") ? Number.parseFloat(searchParams.get("minPrice")!) : null
    const maxPrice = searchParams.get("maxPrice") ? Number.parseFloat(searchParams.get("maxPrice")!) : null

    const filter: any = {}
    if (marca && marca !== "all") filter.marca = marca
    if (minPrice !== null || maxPrice !== null) {
      filter.preco = {}
      if (minPrice !== null) filter.preco.$gte = minPrice
      if (maxPrice !== null) filter.preco.$lte = maxPrice
    }

    const skip = (page - 1) * limit

    const cars = await db.collection("cars").find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()

    const total = await db.collection("cars").countDocuments(filter)

    // Converter ObjectId para string e garantir compatibilidade
    const serializedCars = cars.map((car) => ({
      ...car,
      _id: car._id.toString(),
      // Garantir que sempre temos o campo imagens
      imagens: car.imagens || (car.imagem ? [car.imagem] : []),
      imagemPrincipal: car.imagemPrincipal || car.imagem || (car.imagens && car.imagens[0]) || "",
    }))

    return NextResponse.json({
      cars: serializedCars,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar carros:", error)
    return NextResponse.json({ error: "Erro ao buscar carros" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const data = await request.json()

    // Validação melhorada
    if (!data.nome || !data.marca || !data.preco) {
      return NextResponse.json({ error: "Dados incompletos. Nome, marca e preço são obrigatórios." }, { status: 400 })
    }

    // Garantir que temos pelo menos uma imagem
    const imagens = data.imagens || []
    if (imagens.length === 0) {
      return NextResponse.json({ error: "Pelo menos uma imagem é obrigatória." }, { status: 400 })
    }

    const carData = {
      ...data,
      imagens: imagens,
      imagemPrincipal: data.imagemPrincipal || imagens[0],
      preco: Number(data.preco),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("cars").insertOne(carData)

    return NextResponse.json(
      {
        message: "Veículo adicionado com sucesso",
        id: result.insertedId.toString(),
        car: {
          ...carData,
          _id: result.insertedId.toString(),
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erro ao adicionar carro:", error)
    return NextResponse.json({ error: "Erro ao adicionar carro" }, { status: 500 })
  }
}
