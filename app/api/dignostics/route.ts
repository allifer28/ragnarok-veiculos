import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    checks: {
      mongoUri: !!process.env.MONGODB_URI,
      blobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
      adminPassword: !!process.env.ADMIN_PASSWORD,
    },
    errors: [] as string[],
  }

  // Teste 1: Verificar variáveis de ambiente
  if (!process.env.MONGODB_URI) {
    diagnostics.errors.push("MONGODB_URI não configurado")
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    diagnostics.errors.push("BLOB_READ_WRITE_TOKEN não configurado")
  }

  // Teste 2: Testar conexão MongoDB
  try {
    const { db } = await connectToDatabase()
    const result = await db.admin().ping()
    diagnostics.checks.mongoConnection = true
  } catch (error) {
    diagnostics.checks.mongoConnection = false
    diagnostics.errors.push(`MongoDB Error: ${error instanceof Error ? error.message : "Unknown error"}`)
  }

  // Teste 3: Testar busca de carros
  try {
    const { db } = await connectToDatabase()
    const count = await db.collection("cars").countDocuments()
    diagnostics.checks.carsCollection = true
    diagnostics.checks.carsCount = count
  } catch (error) {
    diagnostics.checks.carsCollection = false
    diagnostics.errors.push(`Cars Collection Error: ${error instanceof Error ? error.message : "Unknown error"}`)
  }

  return NextResponse.json(diagnostics)
}
