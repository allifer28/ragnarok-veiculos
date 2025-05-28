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
