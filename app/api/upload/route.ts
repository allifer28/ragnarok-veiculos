import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    // Verificar tipo de arquivo
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de arquivo não permitido. Envie apenas imagens (JPEG, PNG, WEBP)." },
        { status: 400 },
      )
    }

    // Verificar tamanho do arquivo (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Arquivo muito grande. Máximo 5MB." }, { status: 400 })
    }

    // Verificar se o token do Blob está configurado
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "Configuração de upload não encontrada. Configure BLOB_READ_WRITE_TOKEN." },
        { status: 500 },
      )
    }

    // Gerar nome único para o arquivo
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split(".").pop()
    const fileName = `ragnarok-${timestamp}-${randomString}.${fileExtension}`

    // Upload para Vercel Blob
    const blob = await put(fileName, file, {
      access: "public",
    })

    return NextResponse.json(
      {
        message: "Arquivo enviado com sucesso",
        url: blob.url,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erro ao fazer upload:", error)

    // Se o erro for relacionado ao Blob, retornar erro específico
    if (error instanceof Error && error.message.includes("BLOB_READ_WRITE_TOKEN")) {
      return NextResponse.json(
        { error: "Token do Vercel Blob não configurado. Configure BLOB_READ_WRITE_TOKEN nas variáveis de ambiente." },
        { status: 500 },
      )
    }

    return NextResponse.json({ error: "Erro ao fazer upload do arquivo" }, { status: 500 })
  }
}
