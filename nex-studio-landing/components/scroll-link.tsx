"use client"

import type React from "react"

import type { ReactNode } from "react"

interface ScrollLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export function ScrollLink({ href, children, className = "" }: ScrollLinkProps) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()

    // Get the target element
    const targetId = href.replace("#", "")
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Add a highlight effect to the section
      targetElement.classList.add("section-highlight")

      // Scroll to the element
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Remove the highlight effect after animation
      setTimeout(() => {
        targetElement.classList.remove("section-highlight")
      }, 1500)
    }
  }

  return (
    <a
      href={href}
      onClick={handleScroll}
      className={`${className} relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full`}
    >
      {children}
    </a>
  )
}
