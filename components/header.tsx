"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false)
    }
  }, [isMobile])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-10 mr-2">
              <Image
                src="/logoblack.png?height=80&width=80"
                alt="Ragnarok Veículos Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl">Ragnarok Veículos</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/catalogo">Catálogo</NavLink>
            <NavLink href="/sobre">Sobre</NavLink>
            <NavLink href="/contato">Contato</NavLink>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/contato">Fale Conosco</Link>
            </Button>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLink href="/catalogo" mobile onClick={() => setIsMenuOpen(false)}>
              Catálogo
            </NavLink>
            <NavLink href="/sobre" mobile onClick={() => setIsMenuOpen(false)}>
              Sobre
            </NavLink>
            <NavLink href="/contato" mobile onClick={() => setIsMenuOpen(false)}>
              Contato
            </NavLink>
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/contato" onClick={() => setIsMenuOpen(false)}>
                Fale Conosco
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  mobile?: boolean
  onClick?: () => void
}

function NavLink({ href, children, mobile, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn("font-medium transition-colors hover:text-primary", mobile && "text-lg py-2")}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
