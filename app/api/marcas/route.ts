import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    // Buscar marcas distintas da coleção de carros
    const marcas = await db.collection("cars").distinct("marca")

    // Log para debug
    console.log("Marcas encontradas:", marcas)

    // Garantir que retornamos um array mesmo se não encontrar nada
    return NextResponse.json(marcas || [])
  } catch (error) {
    console.error("Erro ao buscar marcas:", error)
    return NextResponse.json({ error: "Erro ao buscar marcas" }, { status: 500 })
  }
}
