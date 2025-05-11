"use client"

import { useEffect, useRef } from "react"

interface FluidGradientProps {
  className?: string
}

export function FluidGradient({ className = "" }: FluidGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Updated color palette - more diverse but still complementary
    const colors = [
      { r: 248, g: 245, b: 239, a: 0.2 }, // Base cream (lighter opacity)
      { r: 235, g: 225, b: 210, a: 0.3 }, // Warm beige
      { r: 220, g: 230, b: 230, a: 0.25 }, // Soft mint
      { r: 245, g: 220, b: 215, a: 0.3 }, // Gentle peach
      { r: 225, g: 215, b: 235, a: 0.25 }, // Soft lavender
      { r: 210, g: 225, b: 235, a: 0.3 }, // Light blue
      { r: 240, g: 230, b: 200, a: 0.25 }, // Pale yellow
      { r: 230, g: 210, b: 220, a: 0.3 }, // Dusty rose
    ]

    // Create gradient points
    const points = []
    const pointCount = 12 // Increased point count for more complexity

    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 0.4 - 0.2, // Slightly slower movement
        vy: Math.random() * 0.4 - 0.2,
        radius: Math.random() * 350 + 150, // Larger radius range
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    const animate = () => {
      // Clear canvas with a very subtle base color
      ctx.fillStyle = "#f8f5ef"
      ctx.fillRect(0, 0, width, height)

      // Draw each gradient point
      for (const point of points) {
        // Move the point
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > width) point.vx *= -1
        if (point.y < 0 || point.y > height) point.vy *= -1

        // Create gradient
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)

        const { r, g, b, a } = point.color
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`)
        gradient.addColorStop(1, "rgba(248, 245, 239, 0)")

        // Draw gradient
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full -z-10 ${className}`}
      style={{ opacity: 0.8 }} // Slightly increased opacity
    />
  )
}
