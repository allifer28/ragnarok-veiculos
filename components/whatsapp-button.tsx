"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "5511987654321"
    const message = "Olá! Estou interessado em um veículo da Ragnarok Veículos."

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, "_blank")
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        onClick={handleWhatsAppClick}
        className="rounded-full w-14 h-14 p-0 bg-[#25D366] hover:bg-[#20BD5C] shadow-lg"
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
        1
      </span>
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
      />
    </motion.div>
  )
}
