"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Calendar, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface CarDetailsClientProps {
  carName: string
  carPrice: number
}

export default function CarDetailsClient({ carName, carPrice }: CarDetailsClientProps) {
  const [isScheduling, setIsScheduling] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const { toast } = useToast()

  const handleWhatsAppContact = () => {
    const phoneNumber = "5511987654321"
    const message = `Olá! Estou interessado no veículo ${carName} - ${formatCurrency(carPrice)}`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleScheduleTestDrive = (e: React.FormEvent) => {
    e.preventDefault()
    setIsScheduling(true)

    // Simulação de envio
    setTimeout(() => {
      toast({
        title: "Agendamento realizado!",
        description: `Seu test drive para ${date} às ${time} foi agendado. Entraremos em contato para confirmar.`,
      })
      setIsScheduling(false)
      setName("")
      setPhone("")
      setDate("")
      setTime("")

      // Fechar o diálogo
      const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]')
      if (closeButton instanceof HTMLElement) {
        closeButton.click()
      }
    }, 1500)
  }

  return (
    <div className="space-y-3">
      <Button
        className="w-full bg-[#25D366] hover:bg-[#20BD5C] text-white group"
        onClick={handleWhatsAppContact}
        as={motion.button}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        Conversar no WhatsApp
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full group"
            as={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Agendar Test Drive
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agendar Test Drive</DialogTitle>
            <DialogDescription>
              Preencha o formulário abaixo para agendar um test drive para o veículo {carName}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleScheduleTestDrive} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>
                <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
            </div>
            <div className="bg-muted/50 p-3 rounded-md flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Após o envio, nossa equipe entrará em contato para confirmar a disponibilidade do horário.
              </p>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <DialogTrigger asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogTrigger>
              <Button type="submit" disabled={isScheduling}>
                {isScheduling ? "Agendando..." : "Agendar Test Drive"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Button
        asChild
        variant="outline"
        className="w-full"
        as={motion.button}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link href="/contato">
          <Phone className="mr-2 h-4 w-4" />
          Entrar em Contato
        </Link>
      </Button>
    </div>
  )
}
