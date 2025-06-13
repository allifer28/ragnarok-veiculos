import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Simular upload bem-sucedido
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      message: "Upload simulado com sucesso",
      url: "/placeholder.svg?height=400&width=600",
    })
  } catch (error) {
    console.error("Erro no upload fallback:", error)
    return NextResponse.json({ error: "Erro no upload" }, { status: 500 })
  }
}
