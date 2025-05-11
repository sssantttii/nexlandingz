"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollLink } from "./scroll-link"
import { LanguageSelector } from "./language-selector"
import { useLanguage } from "@/contexts/language-context"
import { HamburgerButton } from "./hamburger-button"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  // Cerrar el menú cuando se hace clic en un enlace
  const handleLinkClick = () => {
    setIsOpen(false)
  }

  // Cerrar el menú cuando se cambia el tamaño de la ventana a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Evitar el scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      <HamburgerButton isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#f8f5ef] pt-24 px-6"
          >
            <div className="flex flex-col items-center gap-8">
              <div className="mb-4">
                <LanguageSelector />
              </div>
              <nav className="flex flex-col items-center gap-8 text-xl">
                <ScrollLink
                  href="#portfolio"
                  className="text-black hover:opacity-70 transition-opacity text-xl font-medium"
                  onClick={handleLinkClick}
                >
                  {t("portfolio")}
                </ScrollLink>
                <ScrollLink
                  href="#about"
                  className="text-black hover:opacity-70 transition-opacity text-xl font-medium"
                  onClick={handleLinkClick}
                >
                  {t("about")}
                </ScrollLink>
                <ScrollLink
                  href="#contact"
                  className="text-black hover:opacity-70 transition-opacity text-xl font-medium"
                  onClick={handleLinkClick}
                >
                  {t("contact")}
                </ScrollLink>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
