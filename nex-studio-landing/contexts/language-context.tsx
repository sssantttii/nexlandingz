"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define our translations
const translations = {
  en: {
    // Navigation
    portfolio: "Portfolio",
    about: "About",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",

    // Hero
    heroTitle: "Modern and functional web design",
    heroSubtitle: "Crafting stylish and user-friendly websites to help businesses thrive online.",
    viewProjects: "View Projects",
    learnMore: "Learn more",
    hoverToFlip: "Hover to see mobile version",

    // Portfolio
    featuredProjects: "Featured Projects",
    project1Title: "Legal Group Abogados",
    project1Description: "Institutional website for a labor accident law firm",
    project2Title: "Importando al Costo",
    project2Description: "E-commerce store for technology and perfume importer",
    visit: "Visit",

    // About
    aboutTitle: "Turning ideas into real websites",
    aboutText:
      "I transform ideas into real, working websites. My focus is on creating responsive and engaging digital experiences.",

    // Contact
    contactTitle: "Let's work together",
    getInTouch: "Get in Touch",

    // Footer
    copyright: "© 2025 nex studio. All rights reserved.",

    // WhatsApp
    dragToMove: "Drag to move",
    youCanDragThisButton: "You can drag this button!",
  },
  es: {
    // Navigation
    portfolio: "Portafolio",
    about: "Nosotros",
    contact: "Contacto",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",

    // Hero
    heroTitle: "Diseño web moderno y funcional",
    heroSubtitle: "Creamos sitios web elegantes y fáciles de usar para ayudar a las empresas a prosperar en línea.",
    viewProjects: "Ver Proyectos",
    learnMore: "Saber más",
    hoverToFlip: "Pasa el cursor para ver versión móvil",

    // Portfolio
    featuredProjects: "Proyectos Destacados",
    project1Title: "Legal Group Abogados",
    project1Description: "Sitio institucional para estudio de accidentes laborales",
    project2Title: "Importando al Costo",
    project2Description: "Tienda e-commerce para importador de tecnología y perfumes",
    visit: "Visitar",

    // About
    aboutTitle: "Convertimos ideas en sitios web reales",
    aboutText:
      "Transformo ideas en sitios web reales y funcionales. Mi enfoque está en crear experiencias digitales responsivas y atractivas.",

    // Contact
    contactTitle: "Trabajemos juntos",
    getInTouch: "Contáctanos",

    // Footer
    copyright: "© 2025 nex studio. Todos los derechos reservados.",

    // WhatsApp
    dragToMove: "Arrastra para mover",
    youCanDragThisButton: "¡Puedes arrastrar este botón!",
  },
}

type Language = "en" | "es"
type TranslationKey = keyof typeof translations.en

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
  isTransitioning: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es") // Default to Spanish
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Load saved language preference if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Función para cambiar el idioma con transición
  const changeLanguage = (lang: Language) => {
    setIsTransitioning(true)

    // Pequeño retraso para permitir que la animación comience
    setTimeout(() => {
      setLanguage(lang)

      // Finalizar la transición después de un breve momento
      setTimeout(() => {
        setIsTransitioning(false)
      }, 300)
    }, 50)
  }

  // Translation function
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t, isTransitioning }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
