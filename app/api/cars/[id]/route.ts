import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const car = await db.collection("cars").findOne({ _id: new ObjectId(id) })

    if (!car) {
      return NextResponse.json({ error: "Veículo não encontrado" }, { status: 404 })
    }

    // Converter ObjectId para string para serialização
    return NextResponse.json({
      ...car,
      _id: car._id.toString(),
    })
  } catch (error) {
    console.error("Erro ao buscar carro:", error)
    return NextResponse.json({ error: "Erro ao buscar carro" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const id = params.id
    const data = await request.json()

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    // Validação atualizada para múltiplas imagens
    if (!data.nome || !data.marca || !data.preco || !data.imagens || data.imagens.length === 0) {
      return NextResponse.json(
        { error: "Dados incompletos. Nome, marca, preço e pelo menos uma imagem são obrigatórios." },
        { status: 400 },
      )
    }

    const updateData = {
      ...data,
      // Se não há imagem principal definida, usar a primeira
      imagemPrincipal: data.imagemPrincipal || data.imagens[0],
      updatedAt: new Date(),
    }

    const result = await db.collection("cars").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Veículo não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Veículo atualizado com sucesso",
      car: {
        ...updateData,
        _id: id,
      },
    })
  } catch (error) {
    console.error("Erro ao atualizar carro:", error)
    return NextResponse.json({ error: "Erro ao atualizar carro" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const result = await db.collection("cars").deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Veículo não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Veículo removido com sucesso",
    })
  } catch (error) {
    console.error("Erro ao remover carro:", error)
    return NextResponse.json({ error: "Erro ao remover carro" }, { status: 500 })
  }
}
