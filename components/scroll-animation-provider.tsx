"use client"

import type React from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function ScrollAnimationProvider({ children }: { children: React.ReactNode }) {
  const { applyClassOnScroll } = useScrollAnimation()

  // Aplicar classes de animação aos elementos com a classe scroll-reveal
  applyClassOnScroll(".scroll-reveal", "revealed", 100)

  return <>{children}</>
}
