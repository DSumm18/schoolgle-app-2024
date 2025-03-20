"use client"

import * as React from "react"
import { Globe, ChevronDown } from "lucide-react"

interface LanguageOption {
  code: string;
  name: string;
}

const languageOptions: LanguageOption[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' },
]

export function LanguageSelector() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedLanguage, setSelectedLanguage] = React.useState(languageOptions[0])
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

  const handleLanguageChange = (language: LanguageOption) => {
    setSelectedLanguage(language)
    setIsOpen(false)
    // Here you would implement actual language change logic
    // For now we're just updating the UI state
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        <span className="hidden sm:inline">{selectedLanguage.name}</span>
        <ChevronDown className="h-3 w-3 text-gray-500 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <ul 
            className="py-1" 
            role="listbox" 
            aria-labelledby="language-selector"
            aria-activedescendant={selectedLanguage.code}
          >
            {languageOptions.map((language) => (
              <li
                key={language.code}
                id={language.code}
                role="option"
                aria-selected={selectedLanguage.code === language.code}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  selectedLanguage.code === language.code 
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => handleLanguageChange(language)}
              >
                {language.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}