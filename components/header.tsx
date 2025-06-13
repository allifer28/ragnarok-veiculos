"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false)
    }
  }, [isMobile])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  const menuItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  }

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b transition-all duration-300",
        scrolled ? "shadow-md" : "border-transparent",
      )}
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <motion.div className="relative h-10 w-10 mr-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Ragnarok Veículos Logo"
                fill
                className="object-contain"
              />
            </motion.div>
            <span className="font-bold text-xl">Ragnarok Veículos</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/catalogo">Catálogo</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/sobre">Sobre</NavLink>
            <NavLink href="/contato">Contato</NavLink>
            <ThemeToggle />
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/contato">Fale Conosco</Link>
            </Button>
          </nav>

          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-background border-b"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <motion.div custom={0} variants={menuItemVariants} initial="closed" animate="open">
              <NavLink href="/catalogo" mobile onClick={() => setIsMenuOpen(false)}>
                Catálogo
              </NavLink>
            </motion.div>
            <motion.div custom={1} variants={menuItemVariants} initial="closed" animate="open">
              <NavLink href="/blog" mobile onClick={() => setIsMenuOpen(false)}>
                Blog
              </NavLink>
            </motion.div>
            <motion.div custom={2} variants={menuItemVariants} initial="closed" animate="open">
              <NavLink href="/sobre" mobile onClick={() => setIsMenuOpen(false)}>
                Sobre
              </NavLink>
            </motion.div>
            <motion.div custom={3} variants={menuItemVariants} initial="closed" animate="open">
              <NavLink href="/contato" mobile onClick={() => setIsMenuOpen(false)}>
                Contato
              </NavLink>
            </motion.div>
            <motion.div custom={4} variants={menuItemVariants} initial="closed" animate="open">
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/contato" onClick={() => setIsMenuOpen(false)}>
                  Fale Conosco
                </Link>
              </Button>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </motion.header>
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
      className={cn("font-medium transition-colors relative group", mobile && "text-lg py-2")}
      onClick={onClick}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
    </Link>
  )
}
