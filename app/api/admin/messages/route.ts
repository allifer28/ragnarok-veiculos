import { type NextRequest, NextResponse } from "next/server"

// Redirecionar para a API correta
export async function GET(request: NextRequest) {
  const url = new URL("/api/contact", request.url)
  const response = await fetch(url)
  const data = await response.json()
  return NextResponse.json(data)
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const url = new URL("/api/contact", request.url)
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  return NextResponse.json(data)
}
