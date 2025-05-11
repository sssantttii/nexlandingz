"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

interface HamburgerButtonProps {
  isOpen: boolean
  toggle: () => void
}

export function HamburgerButton({ isOpen, toggle }: HamburgerButtonProps) {
  const { t } = useLanguage()

  return (
    <button
      className="flex md:hidden flex-col justify-center items-center w-10 h-10 rounded-md focus:outline-none focus:ring-2 focus:ring-black/20"
      onClick={toggle}
      aria-expanded={isOpen}
      aria-label={isOpen ? t("closeMenu") : t("openMenu")}
    >
      <motion.div
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        className="w-6 h-0.5 bg-black mb-1.5"
      />
      <motion.div
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="w-6 h-0.5 bg-black mb-1.5"
      />
      <motion.div
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        className="w-6 h-0.5 bg-black"
      />
    </button>
  )
}
