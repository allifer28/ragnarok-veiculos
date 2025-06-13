"use client"

import type React from "react"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface ScrollRevealProps {
  children: React.ReactNode
  width?: "fit-content" | "100%"
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  once?: boolean
  className?: string
}

export default function ScrollReveal({
  children,
  width = "fit-content",
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 30,
  once = true,
  className = "",
}: ScrollRevealProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  })

  // Definir as variantes de animação com base na direção
  const getVariants = () => {
    const variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: "easeOut",
        },
      },
    }

    // Adicionar transformação baseada na direção
    switch (direction) {
      case "up":
        variants.hidden = { ...variants.hidden, y: distance }
        variants.visible = { ...variants.visible, y: 0 }
        break
      case "down":
        variants.hidden = { ...variants.hidden, y: -distance }
        variants.visible = { ...variants.visible, y: 0 }
        break
      case "left":
        variants.hidden = { ...variants.hidden, x: distance }
        variants.visible = { ...variants.visible, x: 0 }
        break
      case "right":
        variants.hidden = { ...variants.hidden, x: -distance }
        variants.visible = { ...variants.visible, x: 0 }
        break
    }

    return variants
  }

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, inView, once])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      style={{ width }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
