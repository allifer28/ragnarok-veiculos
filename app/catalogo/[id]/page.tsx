import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Gauge, Fuel, Palette } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { getCar } from "@/lib/data"
import Footer from "@/components/footer"
import ImageGallery from "@/components/image-gallery"
import CarDetailsClient from "@/components/car-details-client"

export default async function CarDetailsPage({ params }: { params: { id: string } }) {
  const car = await getCar(params.id)

  if (!car) {
    notFound()
  }

  // Compatibilidade com carros antigos
  let imagesToShow: string[] = []

  if (car.imagens && car.imagens.length > 0) {
    // Novo formato
    imagesToShow = car.imagens
  } else if (car.imagem) {
    // Formato antigo
    imagesToShow = [car.imagem]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/catalogo">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Catálogo
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galeria de Imagens */}
        <div>
          <ImageGallery images={imagesToShow} carName={car.nome} />
        </div>

        {/* Informações do Veículo */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{car.nome}</h1>
            <p className="text-xl text-muted-foreground mb-4">{car.marca}</p>
            <div className="text-3xl font-bold text-primary mb-6">{formatCurrency(car.preco)}</div>
          </div>

          {/* Especificações */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Especificações</h3>
              <div className="grid grid-cols-2 gap-4">
                {car.ano && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Ano: {car.ano}</span>
                  </div>
                )}
                {car.km && (
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">KM: {car.km}</span>
                  </div>
                )}
                {car.combustivel && (
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Combustível: {car.combustivel}</span>
                  </div>
                )}
                {car.cor && (
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Cor: {car.cor}</span>
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
                <p className="text-muted-foreground leading-relaxed">{car.descricao}</p>
              </CardContent>
            </Card>
          )}

          {/* Componente Client para ações */}
          <CarDetailsClient carName={car.nome} carPrice={car.preco} />
        </div>
      </div>

      <Footer />
    </div>
  )
}
