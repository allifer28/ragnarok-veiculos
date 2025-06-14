"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"
import type { Car } from "@/lib/types"

export default function AdminCarList() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [carToDelete, setCarToDelete] = useState<Car | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch("/api/cars-serverless")
        if (response.ok) {
          const data = await response.json()
          console.log("Carros carregados:", data.cars)
          setCars(data.cars)
        } else {
          throw new Error("Erro ao buscar veículos")
        }
      } catch (error) {
        console.error("Erro ao buscar veículos:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os veículos",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [toast])

  const handleDeleteClick = (car: Car) => {
    setCarToDelete(car)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!carToDelete) return

    try {
      const response = await fetch(`/api/cars-serverless/${carToDelete._id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCars(cars.filter((car) => car._id !== carToDelete._id))

        toast({
          title: "Sucesso",
          description: "Veículo removido com sucesso",
        })
      } else {
        throw new Error("Erro ao excluir veículo")
      }
    } catch (error) {
      console.error("Erro ao excluir veículo:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o veículo",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setCarToDelete(null)
    }
  }

  if (loading) {
    return <p>Carregando veículos...</p>
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <h3 className="text-xl font-medium mb-2">Nenhum veículo cadastrado</h3>
        <p className="text-muted-foreground mb-6">Comece adicionando seu primeiro veículo ao catálogo.</p>
        <Button asChild>
          <Link href="/admin/adicionar">Adicionar Veículo</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
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
                      <div className="relative h-12 w-16 mr-3 rounded overflow-hidden bg-muted">
                        <Image
                          src={
                            car.imagemPrincipal ||
                            car.imagem ||
                            car.imagens?.[0] ||
                            "/placeholder.svg?height=100&width=150"
                          }
                          alt={car.nome}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <span className="font-medium">{car.nome}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{car.marca}</td>
                  <td className="px-4 py-3">{formatCurrency(car.preco)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end space-x-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/editar/${car._id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteClick(car)}
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o veículo &quot;{carToDelete?.nome}&quot;? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
