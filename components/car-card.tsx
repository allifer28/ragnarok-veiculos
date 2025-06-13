"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Heart } from "lucide-react"
import { motion } from "framer-motion"
import type { Car } from "@/lib/types"

interface CarCardProps {
  car: Car
}

export default function CarCard({ car }: CarCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  // Compatibilidade com carros antigos que têm apenas 'imagem'
  let mainImage: string
  let imageCount: number

  if (car.imagens && car.imagens.length > 0) {
    // Novo formato com múltiplas imagens
    mainImage = car.imagemPrincipal || car.imagens[0]
    imageCount = car.imagens.length
  } else if (car.imagem) {
    // Formato antigo com uma imagem
    mainImage = car.imagem
    imageCount = 1
  } else {
    // Fallback
    mainImage = "/placeholder.svg?height=400&width=600"
    imageCount = 0
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card
        className="overflow-hidden transition-all duration-300 hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={mainImage || "/placeholder.svg"}
            alt={car.nome}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          />

          {/* Contador de imagens */}
          {imageCount > 1 && (
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <Camera className="h-3 w-3" />
              {imageCount}
            </div>
          )}

          {/* Botão de favorito */}
          <button
            className="absolute top-2 left-2 bg-white/80 dark:bg-black/50 p-1.5 rounded-full transition-all duration-300 hover:bg-white dark:hover:bg-black/80"
            onClick={toggleFavorite}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"}`}
            />
          </button>

          {/* Overlay com preço */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <span className="text-lg font-bold text-white">{formatCurrency(car.preco)}</span>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="text-xl font-bold line-clamp-1">{car.nome}</h3>
          <p className="text-muted-foreground">{car.marca}</p>

          {car.ano && (
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary">{car.ano}</Badge>
              {car.km && <Badge variant="secondary">{car.km} km</Badge>}
              {car.combustivel && <Badge variant="secondary">{car.combustivel}</Badge>}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button asChild className="w-full group">
            <Link href={`/catalogo/${car._id}`}>
              Ver Detalhes
              <motion.span className="ml-1" animate={isHovered ? { x: 5 } : { x: 0 }} transition={{ duration: 0.3 }}>
                →
              </motion.span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
