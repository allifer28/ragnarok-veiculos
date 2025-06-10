"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw, Bug } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Erro na aplicação:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-destructive/5 to-background">
      <div className="text-center px-4 max-w-2xl">
        <div className="mb-8">
          <AlertTriangle className="h-24 w-24 text-destructive mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Oops! Algo deu errado</h1>
          <p className="text-muted-foreground text-lg mb-4">
            Encontramos um problema técnico. Nossa equipe foi notificada.
          </p>

          {/* Informações de debug */}
          <div className="bg-muted p-4 rounded-lg text-left mb-6">
            <h3 className="font-semibold mb-2">Informações técnicas:</h3>
            <p className="text-sm text-muted-foreground">Erro: {error.message || "Erro desconhecido"}</p>
            {error.digest && <p className="text-sm text-muted-foreground">Digest: {error.digest}</p>}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} size="lg" className="bg-primary hover:bg-primary/90">
            <RefreshCw className="mr-2 h-5 w-5" />
            Tentar Novamente
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Ir para Home
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/api/diagnostics" target="_blank">
              <Bug className="mr-2 h-5 w-5" />
              Ver Diagnóstico
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
