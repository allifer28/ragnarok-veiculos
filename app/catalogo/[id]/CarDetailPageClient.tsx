"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Gauge, Fuel, Palette, MessageCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import Footer from "@/components/footer"
import type { Car } from "@/lib/types"

interface CarDetailPageProps {
  params: { id: string }
}

export default function CarDetailPageClient({ params }: CarDetailPageProps) {
  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCar = async () => {
      try {
        console.log("Buscando veículo com ID:", params.id)

        const response = await fetch(`/api/cars/${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        console.log("Response status:", response.status)

        if (!response.ok) {
          if (response.status === 404) {
            setError("Veículo não encontrado")
            return
          }

          const errorData = await response.json().catch(() => ({ error: "Erro desconhecido" }))
          throw new Error(errorData.error || `Erro ${response.status}`)
        }

        const carData = await response.json()
        console.log("Dados do veículo:", carData)
        setCar(carData)
      } catch (err) {
        console.error("Erro ao buscar veículo:", err)
        setError(err instanceof Error ? err.message : "Erro desconhecido ao carregar veículo")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchCar()
    }
  }, [params.id])

  const handleWhatsAppClick = () => {
    if (!car) return

    const phoneNumber = "5511987654321"
    const message = `Olá! Estou interessado no veículo ${car.nome} - ${car.marca} por ${formatCurrency(car.preco)}. Gostaria de mais informações.`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar veículo</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-4">
            <Button asChild>
              <Link href="/catalogo">Voltar ao Catálogo</Link>
            </Button>
            <div>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Tentar Novamente
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Veículo não encontrado</h1>
          <p className="text-gray-600 mb-6">O veículo que você está procurando não existe ou foi removido.</p>
          <Button asChild>
            <Link href="/catalogo">Voltar ao Catálogo</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Botão Voltar */}
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link href="/catalogo">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Catálogo
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Imagem do Veículo */}
        <div className="space-y-4">
          <div className="relative h-96 w-full rounded-2xl overflow-hidden">
            <Image
              src={car.imagem || "/placeholder.svg?height=600&width=800"}
              alt={car.nome}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Informações do Veículo */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{car.nome}</h1>
            <p className="text-xl text-gray-600">{car.marca}</p>
            <div className="mt-4">
              <span className="text-3xl font-bold text-lime-600">{formatCurrency(car.preco)}</span>
            </div>
          </div>

          {/* Especificações */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Especificações</h3>
              <div className="grid grid-cols-1 gap-4">
                {car.modelo && (
                  <div className="flex items-center">
                    <span className="font-medium">Modelo:</span>
                    <span className="ml-2">{car.modelo}</span>
                  </div>
                )}
                {car.ano && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Ano:</span>
                    <span className="ml-2">{car.ano}</span>
                  </div>
                )}
                {car.km && (
                  <div className="flex items-center">
                    <Gauge className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Quilometragem:</span>
                    <span className="ml-2">{car.km} km</span>
                  </div>
                )}
                {car.combustivel && (
                  <div className="flex items-center">
                    <Fuel className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Combustível:</span>
                    <span className="ml-2">{car.combustivel}</span>
                  </div>
                )}
                {car.cor && (
                  <div className="flex items-center">
                    <Palette className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Cor:</span>
                    <span className="ml-2">{car.cor}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Descrição */}
          {car.descricao && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Descrição</h3>
                <p className="text-gray-700 leading-relaxed">{car.descricao}</p>
              </CardContent>
            </Card>
          )}

          {/* Botões de Ação */}
          <div className="space-y-4">
            <Button onClick={handleWhatsAppClick} className="w-full bg-lime-500 hover:bg-lime-600 text-white" size="lg">
              <MessageCircle className="mr-2 h-5 w-5" />
              Tenho Interesse - WhatsApp
            </Button>

            <Button asChild variant="outline" className="w-full" size="lg">
              <Link href="/contato">Solicitar Mais Informações</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
