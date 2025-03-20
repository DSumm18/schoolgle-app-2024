"use client"

import * as React from "react"
import { Eye, ZoomIn, ZoomOut, ChevronDown } from "lucide-react"

export function AccessibilityToggle() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [fontSize, setFontSize] = React.useState(100) // 100% is default
  const [highContrast, setHighContrast] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Apply font size change to the document
  React.useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`
    localStorage.setItem('schoolgle-font-size', fontSize.toString())
  }, [fontSize])

  // Apply high contrast when enabled
  React.useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
    localStorage.setItem('schoolgle-high-contrast', highContrast.toString())
  }, [highContrast])

  // Initialize settings from localStorage
  React.useEffect(() => {
    const savedFontSize = localStorage.getItem('schoolgle-font-size')
    const savedHighContrast = localStorage.getItem('schoolgle-high-contrast')
    
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize))
    }
    
    if (savedHighContrast === 'true') {
      setHighContrast(true)
    }
  }, [])

  const increaseFontSize = () => {
    if (fontSize < 150) {
      setFontSize(fontSize + 10)
    }
  }

  const decreaseFontSize = () => {
    if (fontSize > 80) {
      setFontSize(fontSize - 10)
    }
  }

  const resetFontSize = () => {
    setFontSize(100)
  }

  const toggleHighContrast = () => {
    setHighContrast(!highContrast)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Accessibility options"
      >
        <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        <span className="hidden sm:inline">Accessibility</span>
        <ChevronDown className="h-3 w-3 text-gray-500 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-64 rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 z-50 p-3">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text Size</h3>
              <div className="flex items-center justify-between">
                <button 
                  onClick={decreaseFontSize} 
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Decrease text size"
                  disabled={fontSize <= 80}
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <div className="flex-1 text-center">
                  <span className="text-sm">{fontSize}%</span>
                </div>
                <button 
                  onClick={increaseFontSize} 
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Increase text size"
                  disabled={fontSize >= 150}
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
              <button 
                onClick={resetFontSize} 
                className="w-full mt-2 text-xs text-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Reset to default
              </button>
            </div>
            
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="high-contrast"
                  checked={highContrast}
                  onChange={toggleHighContrast}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="high-contrast" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  High contrast mode
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}