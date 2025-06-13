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
      mongoConnection: false, // Adicionando a propriedade aqui
    },
    collections: {
      cars: {
        count: 0,
        status: "pending",
      },
      contacts: {
        count: 0,
        status: "pending",
      },
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

    // Teste 3: Testar coleção cars
    try {
      const carsCount = await db.collection("cars").countDocuments()
      diagnostics.collections.cars.count = carsCount
      diagnostics.collections.cars.status = "ok"
    } catch (error) {
      diagnostics.collections.cars.status = "error"
      diagnostics.errors.push(`Cars Collection Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }

    // Teste 4: Testar coleção contacts
    try {
      const contactsCount = await db.collection("contacts").countDocuments()
      diagnostics.collections.contacts.count = contactsCount
      diagnostics.collections.contacts.status = "ok"
    } catch (error) {
      diagnostics.collections.contacts.status = "error"
      diagnostics.errors.push(`Contacts Collection Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  } catch (error) {
    diagnostics.checks.mongoConnection = false
    diagnostics.errors.push(`MongoDB Error: ${error instanceof Error ? error.message : "Unknown error"}`)
  }

  return NextResponse.json(diagnostics)
}
