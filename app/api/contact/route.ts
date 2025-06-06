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
      destinatario: "ragnarokveiculos@gmail.com", // Email de destino
      createdAt: new Date(),
      status: "novo", // Para controle de status das mensagens
    }

    await db.collection("contacts").insertOne(contactData)

    // Aqui você pode adicionar integração com serviço de email
    // Por exemplo: SendGrid, Nodemailer, etc.
    console.log(`Nova mensagem recebida para: ${contactData.destinatario}`)
    console.log(`De: ${data.nome} (${data.email})`)
    console.log(`Assunto: ${data.assunto}`)
    console.log(`Mensagem: ${data.mensagem}`)

    return NextResponse.json(
      {
        message: "Mensagem enviada com sucesso",
        destinatario: "ragnarokveiculos@gmail.com",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error)
    return NextResponse.json({ error: "Erro ao enviar mensagem" }, { status: 500 })
  }
}
