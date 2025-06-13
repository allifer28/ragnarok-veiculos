"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowUp } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-black text-white pt-16 pb-8 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <div className="relative h-10 w-10 mr-2">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Ragnarok Veículos Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl">Ragnarok Veículos</span>
            </div>
            <p className="text-gray-400 mb-4">
              Seu destino para encontrar o veículo dos seus sonhos com as melhores condições do mercado.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Instagram className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Youtube className="h-5 w-5" />} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/catalogo">Catálogo</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/sobre">Sobre Nós</FooterLink>
              <FooterLink href="/contato">Contato</FooterLink>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span className="text-gray-400">
                  Av. dos Automóveis, 1234
                  <br />
                  Bairro Motorista, São Paulo - SP
                </span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span className="text-gray-400">(11) 5555-5555</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span className="text-gray-400">contato@ragnarokveiculos.com.br</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>Segunda - Sexta:</span>
                <span>8h às 18h</span>
              </li>
              <li className="flex justify-between">
                <span>Sábado:</span>
                <span>9h às 15h</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo:</span>
                <span>Fechado</span>
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button className="rounded-l-none">Enviar</Button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Ragnarok Veículos. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-sm">
              Desenvolvido com ❤️ por{" "}
              <a href="#" className="text-primary hover:underline">
                Sua Empresa
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Botão de voltar ao topo */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.5,
          pointerEvents: showScrollTop ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <Button onClick={scrollToTop} size="icon" className="rounded-full h-12 w-12 shadow-lg">
          <ArrowUp className="h-5 w-5" />
        </Button>
      </motion.div>
    </footer>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.a>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-primary transition-colors relative group">
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
      </Link>
    </li>
  )
}
