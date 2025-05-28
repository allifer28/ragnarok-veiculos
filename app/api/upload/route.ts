import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de arquivo não permitido. Envie apenas imagens (JPEG, PNG, WEBP)." },
        { status: 400 },
      )
    }

    const fileExtension = file.name.split(".").pop()
    const fileName = `${uuidv4()}.${fileExtension}`

    const uploadDir = path.join(process.cwd(), "public")
    const filePath = path.join(uploadDir, fileName)

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    await writeFile(filePath, buffer)

    const fileUrl = `/public/${fileName}`

    return NextResponse.json(
      {
        message: "Arquivo enviado com sucesso",
        url: fileUrl,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erro ao fazer upload de arquivo:", error)
    return NextResponse.json({ error: "Erro ao fazer upload de arquivo" }, { status: 500 })
  }
}
