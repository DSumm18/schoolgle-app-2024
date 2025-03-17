'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pl', name: 'Polski' },
  { code: 'ar', name: 'العربية', rtl: true },
  { code: 'zh', name: '中文' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ur', name: 'اردو', rtl: true },
];

// Create a custom hook for language management
export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  
  useEffect(() => {
    // Load saved language preference from localStorage if available
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
      const lang = languages.find(l => l.code === savedLang);
      if (lang) {
        setCurrentLanguage(lang);
        applyLanguageToDocument(lang);
      }
    }
  }, []);
  
  const changeLanguage = (langCode: string) => {
    const newLang = languages.find(l => l.code === langCode);
    if (newLang) {
      setCurrentLanguage(newLang);
      localStorage.setItem('preferred-language', langCode);
      applyLanguageToDocument(newLang);
    }
  };
  
  const applyLanguageToDocument = (lang: typeof languages[0]) => {
    document.documentElement.lang = lang.code;
    document.documentElement.dir = lang.rtl ? 'rtl' : 'ltr';
    
    // In a real implementation, you would also load the appropriate translation strings here
    // This would use a library like next-i18next, react-i18next, or similar
  };
  
  return { currentLanguage, changeLanguage, languages };
}

export default function LanguageSwitcher() {
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };
  
  return (
    <div className="language-switcher relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe size={18} className="text-gray-500 dark:text-gray-400" />
        <span className="text-sm font-medium">{currentLanguage.name}</span>
        <ChevronDown 
          size={16} 
          className={`text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 py-1"
          >
            <div className="max-h-64 overflow-y-auto">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="flex items-center justify-between w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-selected={lang.code === currentLanguage.code}
                >
                  <span>{lang.name}</span>
                  {lang.code === currentLanguage.code && (
                    <Check size={16} className="text-green-500" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}