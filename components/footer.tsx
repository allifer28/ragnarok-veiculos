import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <div className="relative h-10 w-10 mr-2">
                <Image
                  src="/logowhite.png?height=80&width=80"
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
              <SocialLink href="https://www.facebook.com/RagnarokVeiculos/" icon={<Facebook className="h-5 w-5" />} />
              <SocialLink href="https://www.instagram.com/ragnarokveiculos/" icon={<Instagram className="h-5 w-5" />} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/catalogo">Catálogo</FooterLink>
              <FooterLink href="/sobre">Sobre Nós</FooterLink>
              <FooterLink href="/contato">Contato</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span className="text-gray-400">
                  Av. Duque de Caxias, 5161
                  <br />
                  Vila São Caetano, Londrina - PR
                </span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span className="text-gray-400">(43) 98867-4226</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span className="text-gray-400">ragnarokveiculos@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>Segunda - Sexta:</span>
                <span>8:30 às 18h</span>
              </li>
              <li className="flex justify-between">
                <span>Sábado:</span>
                <span>8:30 às 13h</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo:</span>
                <span>Fechado</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Ragnarok Veículos. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-sm">
              Desenvolvido por {" "}
              <a href="https://enrique-code.netlify.app/" className="text-primary hover:underline">
                <span className="">Enrique Code &lt;/&gt;</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-primary transition-colors">
        {children}
      </Link>
    </li>
  )
}
