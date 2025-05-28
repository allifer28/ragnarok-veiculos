import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Sobre a Ragnarok Veículos</h2>
            <p className="text-lg mb-6">
              Fundada em 2020, a Ragnarok Veículos nasceu com a missão de revolucionar o mercado automotivo, oferecendo
              veículos de qualidade com transparência e excelência no atendimento.
            </p>

            <div className="space-y-4 mb-8">
              <Feature>Veículos criteriosamente selecionados</Feature>
              <Feature>Garantia em todos os veículos</Feature>
              <Feature>Financiamento com as melhores taxas</Feature>
              <Feature>Atendimento personalizado</Feature>
            </div>

            <Button asChild>
              <Link href="/sobre">Conheça Nossa História</Link>
            </Button>
          </div>

          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/vermelho-granada.png?height=800&width=1200"
              alt="Loja Ragnarok Veículos"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start">
      <CheckCircle className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
      <span>{children}</span>
    </div>
  )
}
