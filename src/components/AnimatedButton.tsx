"use client"

import { ButtonHTMLAttributes } from 'react'
import Link from 'next/link'

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  children: React.ReactNode
  className?: string
  href?: string
}

export function AnimatedButton({
  variant = "default",
  size = "default",
  children,
  className = "",
  href,
  ...props
}: AnimatedButtonProps) {
  const baseClasses = [
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full hover:scale-105 relative overflow-hidden",
    "before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:rotate-45",
    "before:bg-gradient-to-t before:from-white/10 before:to-white/20 before:transition-transform before:duration-500",
    "hover:before:translate-x-[-50%] hover:before:translate-y-[-50%]",
    "active:scale-100",
  ].join(" ")
  
  const variantClasses = {
    default: "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/50",
  }
  
  const sizeClasses = {
    sm: "text-sm px-3 py-1",
    default: "px-4 py-2",
    lg: "text-lg px-6 py-3",
  }
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    )
  }
  
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}