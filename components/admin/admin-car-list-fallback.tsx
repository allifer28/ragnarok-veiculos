"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"
import type { Car } from "@/lib/types"

export default function AdminCarListFallback() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [isDemo, setIsDemo] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchCars() {
      try {
        // Tentar API principal primeiro
        let response = await fetch("/api/cars-serverless")

        if (!response.ok) {
          // Se falhar, usar fallback
          response = await fetch("/api/cars-fallback")
          setIsDemo(true)
        }

        if (response.ok) {
          const data = await response.json()
          setCars(data.cars)
        } else {
          throw new Error("Erro ao buscar veículos")
        }
      } catch (error) {
        console.error("Erro ao buscar veículos:", error)
        setIsDemo(true)

        // Usar dados mock como último recurso
        const mockCars = [
          {
            _id: "1",
            nome: "Honda Civic EXL 2023",
            marca: "Honda",
            preco: 125000,
            imagem: "/placeholder.svg?height=100&width=150",
          },
          {
            _id: "2",
            nome: "Toyota Corolla XEI 2022",
            marca: "Toyota",
            preco: 115000,
            imagem: "/placeholder.svg?height=100&width=150",
          },
        ]
        setCars(mockCars as Car[])

        toast({
          title: "Modo Demonstração",
          description: "Usando dados de exemplo. Configure as variáveis de ambiente.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [toast])

  if (loading) {
    return <p>Carregando veículos...</p>
  }

  return (
    <div>
      {isDemo && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Modo Demonstração:</strong> Configure as variáveis de ambiente (MONGODB_URI, BLOB_READ_WRITE_TOKEN)
            para usar a funcionalidade completa.
          </AlertDescription>
        </Alert>
      )}

      {cars.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <h3 className="text-xl font-medium mb-2">Nenhum veículo cadastrado</h3>
          <p className="text-muted-foreground mb-6">Comece adicionando seu primeiro veículo ao catálogo.</p>
          <Button asChild>
            <Link href="/admin/adicionar">Adicionar Veículo</Link>
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left">Veículo</th>
                  <th className="px-4 py-3 text-left">Marca</th>
                  <th className="px-4 py-3 text-left">Preço</th>
                  <th className="px-4 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {cars.map((car) => (
                  <tr key={car._id} className="hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="relative h-12 w-16 mr-3 rounded overflow-hidden">
                          <Image
                            src={car.imagem || "/placeholder.svg?height=100&width=150"}
                            alt={car.nome}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium">{car.nome}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{car.marca}</td>
                    <td className="px-4 py-3">{formatCurrency(car.preco)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button asChild size="sm" variant="outline" disabled={isDemo}>
                          <Link href={`/admin/editar/${car._id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:text-destructive"
                          disabled={isDemo}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
