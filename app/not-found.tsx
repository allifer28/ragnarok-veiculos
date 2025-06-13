"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-background">
      <motion.div
        className="text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-8"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <motion.h1
            className="text-9xl font-bold text-primary/20"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            404
          </motion.h1>
          <h2 className="text-3xl font-bold mb-4">Página não encontrada</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Desculpe, não conseguimos encontrar a página que você está procurando. Ela pode ter sido movida ou não
            existe mais.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90"
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Ir para Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/catalogo">
              <Search className="mr-2 h-5 w-5" />
              Ver Catálogo
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
