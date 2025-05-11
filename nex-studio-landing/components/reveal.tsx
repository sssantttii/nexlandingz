"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

type AnimationDirection = "up" | "down" | "left" | "right" | "none"
type AnimationType = "fade" | "slide" | "scale" | "flip"

interface RevealProps {
  children: ReactNode
  direction?: AnimationDirection
  type?: AnimationType
  delay?: number
  duration?: number
  className?: string
  threshold?: number
}

export function Reveal({
  children,
  direction = "up",
  type = "fade",
  delay = 0,
  duration = 0.5,
  className = "",
  threshold = 0.1,
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
      },
    )

    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  // Define transform based on direction
  let transform = "translateY(20px)"
  if (direction === "down") transform = "translateY(-20px)"
  if (direction === "left") transform = "translateX(20px)"
  if (direction === "right") transform = "translateX(-20px)"
  if (direction === "none") transform = "none"

  // Define animation type
  const opacity = type === "fade" || type === "slide" ? 0 : 1
  const scale = type === "scale" ? 0.95 : 1
  const rotateX = type === "flip" ? "rotateX(90deg)" : "none"

  const animationStyle = {
    opacity: isVisible ? 1 : opacity,
    transform: isVisible
      ? "translateY(0) translateX(0) scale(1) rotateX(0)"
      : `${transform} scale(${scale}) ${rotateX}`,
    transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
  }

  return (
    <div ref={ref} style={animationStyle} className={className}>
      {children}
    </div>
  )
}
