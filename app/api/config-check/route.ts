import { NextResponse } from "next/server"

export async function GET() {
  try {
    const hasMongoUri = !!process.env.MONGODB_URI
    const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN

    if (hasMongoUri && hasBlobToken) {
      return NextResponse.json({ status: "ok", message: "Todas as configurações estão presentes" })
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: "Configurações faltando",
          missing: {
            mongodb: !hasMongoUri,
            blob: !hasBlobToken,
          },
        },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Erro ao verificar configurações" }, { status: 500 })
  }
}
