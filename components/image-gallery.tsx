"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ImageGalleryProps {
  images: string[]
  carName: string
}

export default function ImageGallery({ images, carName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  // Se não há imagens ou array vazio, mostrar placeholder
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Nenhuma imagem disponível</p>
      </div>
    )
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
    if (e.key === "Escape") setIsModalOpen(false)
  }

  return (
    <div className="space-y-4">
      {/* Imagem Principal */}
      <motion.div
        className="relative aspect-square rounded-lg overflow-hidden bg-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={images[selectedImage] || "/placeholder.svg"}
          alt={`${carName} - Imagem ${selectedImage + 1}`}
          fill
          className="object-cover cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />

        {/* Navegação na imagem principal */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Indicador de posição */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </>
        )}

        {/* Botão de zoom */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
          onClick={(e) => {
            e.stopPropagation()
            setIsModalOpen(true)
          }}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          <AnimatePresence>
            {images.map((image, index) => (
              <motion.div
                key={index}
                className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedImage === index
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedImage(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${carName} - Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal de Visualização */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-none" onKeyDown={handleKeyDown}>
          <div className="relative">
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-4 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <div
              className={`relative aspect-video ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={`${carName} - Imagem ${selectedImage + 1}`}
                fill
                className={`
                  object-contain transition-transform duration-300
                  ${isZoomed ? "scale-150" : "scale-100"}
                `}
              />
            </div>

            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImage + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
