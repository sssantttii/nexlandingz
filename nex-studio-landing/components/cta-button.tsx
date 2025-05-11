"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"

interface CTAButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  icon?: boolean
}

export function CTAButton({ children, onClick, className = "", icon = true }: CTAButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`bg-black text-white hover:bg-black/90 rounded-full px-8 py-6 text-lg font-medium 
      transition-all duration-300 hover:scale-105 hover:shadow-lg group btn-hover-effect ${className}`}
    >
      {children}
      {icon && <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />}
    </Button>
  )
}
