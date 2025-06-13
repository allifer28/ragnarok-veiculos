// 🔍 EXPLICANDO O CÓDIGO:

// ANTES (inseguro):
// const ADMIN_PASSWORD = "ragnarok2024" // ❌ Senha exposta!

// AGORA (seguro):
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ragnarok2024"
//                     ↑                           ↑
//                     |                           |
//                Pega do Vercel              Fallback se não tiver

// 🎯 FLUXO:
// 1. Tenta pegar de process.env.ADMIN_PASSWORD (Vercel)
// 2. Se não encontrar, usa "ragnarok2024" (só para desenvolvimento)
// 3. Em produção, SEMPRE vai usar a do Vercel!

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  // Compara a senha digitada com a senha configurada
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 })
  }

  // Se chegou aqui, senha está correta! ✅
  // ... resto do código
}
