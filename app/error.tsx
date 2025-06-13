"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

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
      <div className="text-center px-4">
        <div className="mb-8">
          <AlertTriangle className="h-24 w-24 text-destructive mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Algo deu errado!</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver o problema.
          </p>
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
        </div>
      </div>
    </div>
  )
}
