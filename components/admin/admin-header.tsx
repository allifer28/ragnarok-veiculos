"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle, ArrowLeft, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminHeader() {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      })

      if (response.ok) {
        toast({
          title: "Logout realizado com sucesso",
          description: "Você foi desconectado do painel administrativo.",
        })

        router.push("/admin/login")
        router.refresh()
      } else {
        throw new Error("Erro no logout")
      }
    } catch (error) {
      console.error("Erro no logout:", error)
      toast({
        title: "Erro no logout",
        description: "Ocorreu um erro ao fazer logout. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <p className="text-muted-foreground">Gerencie os veículos da loja</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Site
          </Link>
        </Button>

        <Button asChild>
          <Link href="/admin/adicionar">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Veículo
          </Link>
        </Button>

        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  )
}
