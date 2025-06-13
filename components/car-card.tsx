import Image from "next/image"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera } from "lucide-react"
import type { Car } from "@/lib/types"

interface CarCardProps {
  car: Car
}

export default function CarCard({ car }: CarCardProps) {
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

  return (
    <Card className="overflow-hidden card-hover">
      <div className="relative h-48 w-full">
        <Image src={mainImage || "/placeholder.svg"} alt={car.nome} fill className="object-cover" />

        {/* Contador de imagens */}
        {imageCount > 1 && (
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <Camera className="h-3 w-3" />
            {imageCount}
          </div>
        )}
      </div>

      {/* Resto do componente permanece igual */}
      <CardContent className="p-4">
        <h3 className="text-xl font-bold">{car.nome}</h3>
        <p className="text-muted-foreground">{car.marca}</p>
        <div className="mt-2">
          <span className="text-lg font-semibold text-primary">{formatCurrency(car.preco)}</span>
        </div>
        {car.ano && (
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="secondary">{car.ano}</Badge>
            {car.km && <Badge variant="secondary">{car.km} km</Badge>}
            {car.combustivel && <Badge variant="secondary">{car.combustivel}</Badge>}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/catalogo/${car._id}`}>Ver Detalhes</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
