import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    const messages = await db.collection("contacts").find({}).sort({ createdAt: -1 }).limit(50).toArray()

    // Converter ObjectId para string
    const serializedMessages = messages.map((message) => ({
      ...message,
      _id: message._id.toString(),
    }))

    return NextResponse.json(serializedMessages)
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error)
    return NextResponse.json({ error: "Erro ao buscar mensagens" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { messageId, status } = await request.json()

    await db
      .collection("contacts")
      .updateOne(
        { _id: new (await import("mongodb")).ObjectId(messageId) },
        { $set: { status, updatedAt: new Date() } },
      )

    return NextResponse.json({ message: "Status atualizado com sucesso" })
  } catch (error) {
    console.error("Erro ao atualizar status:", error)
    return NextResponse.json({ error: "Erro ao atualizar status" }, { status: 500 })
  }
}
