import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    const marcas = await db.collection("cars").distinct("marca")

    return NextResponse.json(marcas)
  } catch (error) {
    console.error("Erro ao buscar marcas:", error)
    return NextResponse.json({ error: "Erro ao buscar marcas" }, { status: 500 })
  }
}
