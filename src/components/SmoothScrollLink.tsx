"use client"

import type React from "react"
import { ReactNode } from "react"

interface SmoothScrollLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export function SmoothScrollLink({ href, children, className = "" }: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only apply smooth scrolling for hash links on the same page
    if (href.startsWith("#")) {
      e.preventDefault()

      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Get the header height to offset the scroll position
        const headerHeight = document.querySelector("header")?.offsetHeight || 0

        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: "smooth",
        })

        // Update URL without scrolling
        window.history.pushState(null, "", href)
      }
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}