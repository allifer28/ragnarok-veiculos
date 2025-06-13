import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-background">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
          <h2 className="text-3xl font-bold mb-4">Página não encontrada</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Desculpe, não conseguimos encontrar a página que você está procurando. Ela pode ter sido movida ou não
            existe mais.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Ir para Home
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/catalogo">
              <Search className="mr-2 h-5 w-5" />
              Ver Catálogo
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
