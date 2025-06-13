import { NextResponse } from "next/server"

const marcas = ["Honda", "Toyota", "Volkswagen"]

export async function GET() {
  try {
    return NextResponse.json(marcas)
  } catch (error) {
    console.error("Erro ao buscar marcas:", error)
    return NextResponse.json({ error: "Erro ao buscar marcas" }, { status: 500 })
  }
}
