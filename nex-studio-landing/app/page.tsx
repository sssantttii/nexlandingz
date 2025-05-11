"use client"

import Image from "next/image"
import { ArrowRight, Linkedin, Instagram } from "lucide-react"
import { ScrollLink } from "@/components/scroll-link"
import { CTAButton } from "@/components/cta-button"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DragHint } from "@/components/drag-hint"
import { Reveal } from "@/components/reveal"
import { LanguageSelector } from "@/components/language-selector"
import { MobileMenu } from "@/components/mobile-menu"
import { useLanguage } from "@/contexts/language-context"
import { LanguageTransition } from "@/components/language-transition"
import { FlipImage } from "@/components/flip-image"

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#f8f5ef] font-['Poppins']">
      {/* Header */}
      <Reveal type="fade" duration={0.8}>
        <header className="container mx-auto py-8 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black flex items-center justify-center text-white rounded-sm">
              <span className="font-bold text-xl">N</span>
            </div>
            <span className="font-bold text-xl text-black">nex studio</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
            <nav className="hidden md:flex gap-8">
              <ScrollLink href="#portfolio" className="text-black hover:opacity-70 transition-opacity">
                {t("portfolio")}
              </ScrollLink>
              <ScrollLink href="#about" className="text-black hover:opacity-70 transition-opacity">
                {t("about")}
              </ScrollLink>
              <ScrollLink href="#contact" className="text-black hover:opacity-70 transition-opacity">
                {t("contact")}
              </ScrollLink>
            </nav>
            <MobileMenu />
          </div>
        </header>
      </Reveal>

      {/* Hero Section - Nuevo diseño centrado */}
      <section className="container mx-auto px-4 py-20 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <LanguageTransition>
            <Reveal type="fade" duration={0.8}>
              <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">{t("heroTitle")}</h1>
            </Reveal>
            <Reveal type="fade" delay={0.2} duration={0.8}>
              <p className="text-xl text-black/70 mb-10 max-w-2xl mx-auto">{t("heroSubtitle")}</p>
            </Reveal>
            <Reveal type="fade" delay={0.4} duration={0.8}>
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                <CTAButton className="px-8">{t("viewProjects")}</CTAButton>
                <button className="flex items-center text-black font-medium hover:opacity-70 transition-all">
                  {t("learnMore")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </Reveal>
            <Reveal type="fade" delay={0.6} duration={0.8}>
              <div className="max-w-4xl mx-auto mb-32">
                {" "}
                {/* Aumentado el margen inferior a 32 (8rem) */}
                <div className="relative">
                  <FlipImage
                    frontImage="/images/laptop-design.png"
                    backImage="/images/mobile-design.png"
                    altTextFront="Diseño web en laptop"
                    altTextBack="Diseño web en móvil"
                    width={1000}
                    height={600}
                    className="w-full h-auto"
                  />
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-black/50 bg-white/80 px-3 py-1 rounded-full">
                    {t("hoverToFlip")}
                  </div>
                </div>
              </div>
            </Reveal>
          </LanguageTransition>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="container mx-auto px-4 py-20">
        <Reveal type="fade" duration={0.8}>
          <LanguageTransition>
            <h2 className="text-3xl font-bold text-black mb-12">{t("featuredProjects")}</h2>
          </LanguageTransition>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project 1 */}
          <Reveal type="slide" direction="left" delay={0.2} duration={0.8}>
            <div className="bg-white p-6 rounded-lg relative">
              <div className="bg-black/5 h-64 rounded-lg mb-6 overflow-hidden group">
                <Image
                  src="/images/legal-group.png"
                  alt="Legal Group Abogados - Sitio web de abogados especialistas en accidentes"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("project1Title")}</h3>
              <p className="text-black/70 mb-4">{t("project1Description")}</p>
              <a
                href="#"
                className="inline-flex items-center text-black font-medium hover:opacity-70 transition-opacity"
              >
                {t("visit")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </Reveal>

          {/* Project 2 */}
          <Reveal type="slide" direction="right" delay={0.4} duration={0.8}>
            <div className="bg-white p-6 rounded-lg relative">
              <div className="bg-black/5 h-64 rounded-lg mb-6 overflow-hidden group">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Importando al Costo"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("project2Title")}</h3>
              <p className="text-black/70 mb-4">{t("project2Description")}</p>
              <a
                href="#"
                className="inline-flex items-center text-black font-medium hover:opacity-70 transition-opacity"
              >
                {t("visit")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <LanguageTransition>
            <Reveal type="scale" delay={0.2} duration={0.8}>
              <h2 className="text-3xl font-bold text-black mb-8">{t("aboutTitle")}</h2>
            </Reveal>
            <Reveal type="fade" delay={0.4} duration={0.8}>
              <p className="text-xl text-black/80 mb-6">{t("aboutText")}</p>
            </Reveal>
          </LanguageTransition>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal type="slide" direction="up" delay={0.2} duration={0.8}>
            <LanguageTransition>
              <h2 className="text-3xl font-bold text-black mb-8">{t("contactTitle")}</h2>
            </LanguageTransition>
          </Reveal>
          <Reveal type="fade" delay={0.4} duration={0.8}>
            <div className="flex justify-center gap-6 mb-10">
              {/* LinkedIn with notification pulse effect */}
              <a href="#" className="text-black hover:text-[#0077B5] transition-colors relative group">
                <Linkedin className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-[#0077B5] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></span>
                <span className="sr-only">LinkedIn</span>
              </a>

              {/* X (formerly Twitter) with hover effect */}
              <a href="#" className="text-black hover:text-black/80 transition-colors group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="sr-only">X (Twitter)</span>
              </a>

              {/* Instagram with gradient effect */}
              <a href="#" className="text-black group relative overflow-hidden rounded-md">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#833AB4] rounded-md"></div>
                <Instagram className="h-6 w-6 relative z-10 group-hover:text-white transition-colors duration-300" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </Reveal>
          <Reveal type="slide" direction="up" delay={0.6} duration={0.8}>
            <LanguageTransition>
              <CTAButton>{t("getInTouch")}</CTAButton>
            </LanguageTransition>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <Reveal type="fade" delay={0.2} duration={0.8}>
        <footer className="container mx-auto px-4 py-8 border-t border-black/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-black flex items-center justify-center text-white rounded-sm">
                <span className="font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-black">nex studio</span>
            </div>
            <LanguageTransition>
              <p className="text-sm text-black/60">{t("copyright")}</p>
            </LanguageTransition>
          </div>
        </footer>
      </Reveal>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
      <DragHint />
    </div>
  )
}
