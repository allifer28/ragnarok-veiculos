"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

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
      <motion.div
        className="text-center px-4 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
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
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            size="lg"
            className="bg-primary hover:bg-primary/90"
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Tentar Novamente
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Ir para Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
