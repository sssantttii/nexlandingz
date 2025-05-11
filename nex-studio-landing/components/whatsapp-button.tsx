"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export function WhatsAppButton() {
  const [isPulsing, setIsPulsing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const { t } = useLanguage()

  // Valores iniciales para la posición (podemos cargarlos desde localStorage si existen)
  const initialX = typeof window !== "undefined" ? Number.parseInt(localStorage.getItem("whatsapp-button-x") || "0") : 0
  const initialY = typeof window !== "undefined" ? Number.parseInt(localStorage.getItem("whatsapp-button-y") || "0") : 0

  // Valores de movimiento para el arrastre
  const x = useMotionValue(initialX)
  const y = useMotionValue(initialY)

  // Usar spring para una animación más suave
  const springConfig = { damping: 20, stiffness: 300 }
  const scaleSpring = useSpring(1, springConfig)

  // Format the phone number for WhatsApp
  const phoneNumber = "5491122501912"
  const whatsappUrl = `https://wa.me/${phoneNumber}`

  // Guardar la posición cuando cambia
  useEffect(() => {
    const unsubX = x.onChange((latest) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("whatsapp-button-x", latest.toString())
      }
    })

    const unsubY = y.onChange((latest) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("whatsapp-button-y", latest.toString())
      }
    })

    return () => {
      unsubX()
      unsubY()
    }
  }, [x, y])

  // Handle animation behavior
  useEffect(() => {
    // Start pulsing animation after 3 seconds
    const pulseTimer = setTimeout(() => {
      setIsPulsing(true)

      // Stop pulsing after 3 pulses
      setTimeout(() => {
        setIsPulsing(false)
      }, 6000)
    }, 3000)

    return () => clearTimeout(pulseTimer)
  }, [])

  // Actualizar el spring cuando cambia isDragging
  useEffect(() => {
    scaleSpring.set(isDragging ? 1.2 : 1)
  }, [isDragging, scaleSpring])

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-shadow ${
        isPulsing ? "whatsapp-pulse" : ""
      }`}
      aria-label="Chat on WhatsApp"
      drag
      dragMomentum={false}
      dragElastic={0.1}
      style={{ x, y, scale: scaleSpring }}
      whileDrag={{
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
      }}
      onDragStart={() => {
        setIsDragging(true)
        setShowTooltip(true)
      }}
      onDragEnd={() => {
        setIsDragging(false)
        setTimeout(() => setShowTooltip(false), 1000)
      }}
      onClick={(e) => {
        // Prevenir la navegación si estamos arrastrando
        if (isDragging) {
          e.preventDefault()
        }
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
    >
      <motion.div whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ duration: 0.5 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.5027 3.49406C18.2877 1.28406 15.2827 0.00606298 12.0977 0.00306298C5.4877 0.00306298 0.1027 5.38506 0.0977 11.9971C0.0967 14.1171 0.6487 16.1851 1.7027 18.0001L0 24.0001L6.1427 22.3351C7.8807 23.2851 9.8687 23.7881 11.8957 23.7891H11.9017C18.5097 23.7891 23.8947 18.4061 23.8997 11.7941C23.9027 8.61706 22.7177 5.70406 20.5027 3.49406ZM12.0977 21.7861H12.0927C10.3047 21.7851 8.5527 21.3011 7.0457 20.3921L6.6807 20.1761L2.8957 21.1251L3.8597 17.4251L3.6227 17.0451C2.6137 15.4781 2.0967 13.6581 2.0977 11.7981C2.1017 6.48906 6.7907 1.80606 12.1027 1.80606C14.7367 1.80806 17.1917 2.85106 19.0277 4.68406C20.8637 6.51706 21.9027 8.97406 21.9007 11.7921C21.8967 17.1021 17.2067 21.7861 12.0977 21.7861ZM17.5457 14.4161C17.2627 14.2741 15.7957 13.5551 15.5347 13.4621C15.2747 13.3691 15.0817 13.3231 14.8887 13.6071C14.6957 13.8911 14.1197 14.5611 13.9497 14.7541C13.7797 14.9471 13.6097 14.9701 13.3267 14.8281C13.0437 14.6861 12.0597 14.3521 10.8957 13.3231C9.9867 12.5231 9.3867 11.5461 9.2167 11.2621C9.0467 10.9781 9.1987 10.8221 9.3437 10.6781C9.4747 10.5481 9.6347 10.3381 9.7817 10.1681C9.9287 9.99806 9.9747 9.88206 10.0677 9.68906C10.1607 9.49606 10.1147 9.32606 10.0447 9.18406C9.9747 9.04206 9.3787 7.57406 9.1397 7.00606C8.9067 6.45406 8.6697 6.53406 8.4897 6.52406C8.3197 6.51506 8.1267 6.51306 7.9337 6.51306C7.7407 6.51306 7.4337 6.58306 7.1727 6.86706C6.9117 7.15106 6.1467 7.87006 6.1467 9.33806C6.1467 10.8061 7.1957 12.2281 7.3427 12.4211C7.4897 12.6141 9.3837 15.5161 12.2477 16.8021C12.9467 17.1071 13.4927 17.2961 13.9167 17.4371C14.6187 17.6671 15.2557 17.6321 15.7597 17.5601C16.3217 17.4801 17.5227 16.8481 17.7617 16.1871C18.0007 15.5261 18.0007 14.9581 17.9307 14.8281C17.8607 14.6981 17.6677 14.6281 17.3847 14.4861L17.5457 14.4161Z"
          />
        </svg>
      </motion.div>

      {/* Tooltip que aparece cuando se arrastra */}
      {showTooltip && (
        <motion.div
          className="absolute -top-10 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {t("dragToMove")}
        </motion.div>
      )}
    </motion.a>
  )
}
