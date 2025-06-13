"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface CarDetailsClientProps {
  carName: string
  carPrice: number
}

export default function CarDetailsClient({ carName, carPrice }: CarDetailsClientProps) {
  const handleWhatsAppContact = () => {
    const phoneNumber = "5511987654321"
    const message = `Olá! Estou interessado no veículo ${carName} - ${formatCurrency(carPrice)}`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="space-y-3">
      <Button className="w-full bg-[#25D366] hover:bg-[#20BD5C] text-white" onClick={handleWhatsAppContact}>
        <MessageCircle className="mr-2 h-4 w-4" />
        Conversar no WhatsApp
      </Button>

      <Button asChild variant="outline" className="w-full">
        <Link href="/contato">
          <Phone className="mr-2 h-4 w-4" />
          Entrar em Contato
        </Link>
      </Button>
    </div>
  )
}
