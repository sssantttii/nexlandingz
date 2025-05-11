"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { SpainFlag } from "./flags/spain-flag"
import { USAFlag } from "./flags/usa-flag"

type LanguageOption = {
  code: "en" | "es"
  name: string
  flag: React.ReactNode
}

export function LanguageSelector() {
  const { language, setLanguage, isTransitioning } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages: LanguageOption[] = [
    {
      code: "es",
      name: "Español",
      flag: <SpainFlag width={20} height={15} className="rounded-sm" />,
    },
    {
      code: "en",
      name: "English",
      flag: <USAFlag width={20} height={15} className="rounded-sm" />,
    },
  ]

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const selectLanguage = (lang: LanguageOption) => {
    if (lang.code !== language) {
      setLanguage(lang.code)
    }
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-black/5 transition-colors ${
          isTransitioning ? "opacity-70" : ""
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        disabled={isTransitioning}
      >
        <span className={`flex items-center ${isTransitioning ? "animate-pulse" : ""}`}>{currentLanguage.flag}</span>
        <span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang)}
              className={`flex items-center gap-3 w-full px-4 py-2 text-left text-sm hover:bg-black/5 transition-colors ${
                language === lang.code ? "bg-black/5" : ""
              }`}
            >
              <span className="flex items-center">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
