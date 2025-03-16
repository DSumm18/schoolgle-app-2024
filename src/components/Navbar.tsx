"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { SchoolgleLogo } from "./SchoolgleLogo"
import { ThemeToggle } from "./ThemeToggle"
import { SmoothScrollLink } from "./SmoothScrollLink"
import { AnimatedButton } from "./AnimatedButton"

export function Navbar() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detect scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur ${
      scrolled 
        ? "bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-800"
        : "bg-white dark:bg-gray-900 border-transparent"
    } transition-colors duration-200`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <SchoolgleLogo size="text-2xl" />
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <SmoothScrollLink href="#features" className="text-sm font-medium hover:text-blue-500 dark:hover:text-blue-400 relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all group-hover:w-full"></span>
          </SmoothScrollLink>
          <SmoothScrollLink href="#testimonials" className="text-sm font-medium hover:text-blue-500 dark:hover:text-blue-400 relative group">
            Testimonials
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all group-hover:w-full"></span>
          </SmoothScrollLink>
          <SmoothScrollLink href="#pricing" className="text-sm font-medium hover:text-blue-500 dark:hover:text-blue-400 relative group">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all group-hover:w-full"></span>
          </SmoothScrollLink>
          <SmoothScrollLink href="#contact" className="text-sm font-medium hover:text-blue-500 dark:hover:text-blue-400 relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all group-hover:w-full"></span>
          </SmoothScrollLink>
        </nav>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {status === "authenticated" ? (
            <>
              <Link href="/dashboard" className="hidden md:block">
                <AnimatedButton size="sm">Dashboard</AnimatedButton>
              </Link>
              
              <div className="relative ml-2">
                <button 
                  className="flex items-center gap-2 text-sm"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                  </div>
                  <span className="hidden md:block">{session.user?.name}</span>
                </button>
                
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700">
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profile
                    </Link>
                    <Link 
                      href="/api/auth/signout" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign out
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:text-blue-500 dark:hover:text-blue-400 relative group hidden md:block">
                Log in
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/register" className="hidden md:block">
                <AnimatedButton>Get Started</AnimatedButton>
              </Link>
            </>
          )}
          
          {/* Mobile menu button */}
          <button
            className="block md:hidden p-2 text-gray-500 dark:text-gray-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col space-y-3">
            <SmoothScrollLink
              href="#features"
              className="py-2 text-sm font-medium hover:text-blue-500 dark:hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Features
            </SmoothScrollLink>
            <SmoothScrollLink
              href="#testimonials"
              className="py-2 text-sm font-medium hover:text-blue-500 dark:hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </SmoothScrollLink>
            <SmoothScrollLink
              href="#pricing"
              className="py-2 text-sm font-medium hover:text-blue-500 dark:hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </SmoothScrollLink>
            <SmoothScrollLink
              href="#contact"
              className="py-2 text-sm font-medium hover:text-blue-500 dark:hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </SmoothScrollLink>
            
            {status !== "authenticated" && (
              <>
                <hr className="border-gray-200 dark:border-gray-800" />
                <Link
                  href="/login"
                  className="py-2 text-sm font-medium hover:text-blue-500 dark:hover:text-blue-400"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="py-2 text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <AnimatedButton className="w-full">Get Started</AnimatedButton>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}