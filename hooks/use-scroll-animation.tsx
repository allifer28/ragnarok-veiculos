"use client"

import { useEffect, useState, useRef } from "react"

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const prevScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrollingUp(prevScrollY.current > currentScrollY)
      prevScrollY.current = currentScrollY
      setScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Função para verificar se um elemento está visível na viewport
  const isElementInView = (element: HTMLElement, offset = 0) => {
    if (!element) return false
    const rect = element.getBoundingClientRect()
    return rect.top + offset <= window.innerHeight && rect.bottom >= 0
  }

  // Função para aplicar classe quando elemento está visível
  const applyClassOnScroll = (selector: string, className: string, offset = 0) => {
    const elements = useRef<NodeListOf<Element> | null>(null)

    const handleScrollCheck = () => {
      if (!elements.current) return
      elements.current.forEach((el) => {
        if (isElementInView(el as HTMLElement, offset)) {
          el.classList.add(className)
        } else if (el.classList.contains(className)) {
          el.classList.remove(className)
        }
      })
    }

    useEffect(() => {
      elements.current = document.querySelectorAll(selector)

      // Verificar inicialmente e em cada scroll
      handleScrollCheck()
      window.addEventListener("scroll", handleScrollCheck, { passive: true })
      return () => window.removeEventListener("scroll", handleScrollCheck)
    }, [selector, className, offset])
  }

  return { scrollY, isScrollingUp, applyClassOnScroll }
}
