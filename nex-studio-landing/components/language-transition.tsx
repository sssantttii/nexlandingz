"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useLanguage } from "@/contexts/language-context"

interface LanguageTransitionProps {
  children: ReactNode
  className?: string
}

export function LanguageTransition({ children, className = "" }: LanguageTransitionProps) {
  const { language } = useLanguage()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [content, setContent] = useState<ReactNode>(children)

  useEffect(() => {
    // Start transition
    setIsTransitioning(true)

    // After fade out, update content
    const timer = setTimeout(() => {
      setContent(children)
      // Start fade in
      setIsTransitioning(false)
    }, 300) // Match this with the CSS transition duration

    return () => clearTimeout(timer)
  }, [language, children])

  return (
    <div className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"} ${className}`}>
      {content}
    </div>
  )
}
