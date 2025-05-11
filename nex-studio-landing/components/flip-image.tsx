"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface FlipImageProps {
  frontImage: string
  backImage: string
  altTextFront: string
  altTextBack: string
  width: number
  height: number
  className?: string
}

export function FlipImage({
  frontImage,
  backImage,
  altTextFront,
  altTextBack,
  width,
  height,
  className = "",
}: FlipImageProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className={`relative perspective-1000 ${className}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d transition-all duration-500"
        animate={{ rotateX: isFlipped ? 180 : 0 }} // Cambiado de rotateY a rotateX para flip vertical
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front image (Laptop) */}
        <div className="absolute w-full h-full backface-hidden" style={{ backfaceVisibility: "hidden" }}>
          <Image
            src={frontImage || "/placeholder.svg"}
            alt={altTextFront}
            width={width}
            height={height}
            className="w-full h-auto rounded-lg shadow-lg object-contain"
          />
        </div>

        {/* Back image (Mobile) */}
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }} // Cambiado de rotateY a rotateX
        >
          <Image
            src={backImage || "/placeholder.svg"}
            alt={altTextBack}
            width={width}
            height={height}
            className="w-full h-auto rounded-lg shadow-lg object-contain"
          />
        </div>
      </motion.div>
    </div>
  )
}
