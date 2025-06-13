import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const id = params.id
    const data = await request.json()

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    // Log para debug
    console.log(`Atualizando mensagem ${id} com dados:`, data)

    const result = await db
      .collection("contacts")
      .updateOne({ _id: new ObjectId(id) }, { $set: { read: data.read, updatedAt: new Date() } })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Mensagem não encontrada" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Mensagem atualizada com sucesso",
      success: true,
    })
  } catch (error) {
    console.error("Erro ao atualizar mensagem:", error)
    return NextResponse.json({ error: "Erro ao atualizar mensagem" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const result = await db.collection("contacts").deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Mensagem não encontrada" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Mensagem removida com sucesso",
    })
  } catch (error) {
    console.error("Erro ao remover mensagem:", error)
    return NextResponse.json({ error: "Erro ao remover mensagem" }, { status: 500 })
  }
}
