import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const data = await request.json()

    if (!data.nome || !data.email || !data.mensagem) {
      return NextResponse.json(
        { error: "Dados incompletos. Nome, email e mensagem são obrigatórios." },
        { status: 400 },
      )
    }

    const contactData = {
      ...data,
      status: "novo", // Definir status inicial como "novo"
      createdAt: new Date(),
    }

    await db.collection("contacts").insertOne(contactData)

    return NextResponse.json(
      {
        message: "Mensagem enviada com sucesso",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error)
    return NextResponse.json({ error: "Erro ao enviar mensagem" }, { status: 500 })
  }
}

// Adicionar o método GET para listar mensagens
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    // Buscar todas as mensagens ordenadas por data de criação (mais recentes primeiro)
    const messages = await db.collection("contacts").find({}).sort({ createdAt: -1 }).toArray()

    // Converter ObjectId para string para serialização
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
