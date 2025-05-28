import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Verificar se a rota é do lado do servidor
  const isServerRoute = request.nextUrl.pathname.startsWith("/api") || request.nextUrl.pathname === "/admin"

  // Se for uma rota de API ou admin, verificar autenticação
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const authCookie = request.cookies.get("admin-auth")

    if (!authCookie && request.nextUrl.pathname !== "/admin/login") {
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    if (authCookie && request.nextUrl.pathname === "/admin/login") {
      const adminUrl = new URL("/admin", request.url)
      return NextResponse.redirect(adminUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
}
