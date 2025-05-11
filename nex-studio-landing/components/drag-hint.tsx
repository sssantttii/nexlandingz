"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export function DragHint() {
  const [showHint, setShowHint] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    // Mostrar el hint solo si es la primera visita
    if (typeof window !== "undefined") {
      const hasSeenHint = localStorage.getItem("whatsapp-drag-hint-seen")

      if (!hasSeenHint) {
        // Esperar un poco para mostrar el hint
        const timer = setTimeout(() => {
          setShowHint(true)

          // Ocultar después de 5 segundos
          setTimeout(() => {
            setShowHint(false)
            localStorage.setItem("whatsapp-drag-hint-seen", "true")
          }, 5000)
        }, 5000)

        return () => clearTimeout(timer)
      }
    }
  }, [])

  if (!showHint) return null

  return (
    <motion.div
      className="fixed bottom-24 right-6 z-40 bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 10L12 14L16 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>{t("youCanDragThisButton")}</p>
      </div>
      <div className="absolute -bottom-2 right-8 w-4 h-4 bg-black transform rotate-45"></div>
    </motion.div>
  )
}
