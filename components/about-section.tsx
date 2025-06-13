"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function AboutSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left" width="100%">
            <div>
              <h2 className="text-3xl font-bold mb-2">Sobre a Ragnarok Veículos</h2>
              <div className="w-20 h-1 bg-primary mb-6"></div>
              <p className="text-lg mb-6">
                Fundada em 2020, a Ragnarok Veículos nasceu com a missão de revolucionar o mercado automotivo,
                oferecendo veículos de qualidade com transparência e excelência no atendimento.
              </p>

              <div className="space-y-4 mb-8">
                <Feature>Veículos criteriosamente selecionados</Feature>
                <Feature>Garantia em todos os veículos</Feature>
                <Feature>Financiamento com as melhores taxas</Feature>
                <Feature>Atendimento personalizado</Feature>
              </div>

              <Button asChild className="group" size="lg">
                <Link href="/sobre">
                  Conheça Nossa História
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" width="100%" delay={0.2}>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt="Loja Ragnarok Veículos"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-lg font-semibold">Nossa sede em São Paulo</p>
                <p className="text-sm opacity-80">Av. dos Automóveis, 1234</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start group">
      <CheckCircle className="h-6 w-6 text-primary mr-2 flex-shrink-0 transition-transform group-hover:scale-110" />
      <span>{children}</span>
    </div>
  )
}
