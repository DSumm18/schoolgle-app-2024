"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, User } from 'lucide-react';
import { AnimatedLogo } from '@/components/ui/animated-logo';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { LanguageSelector } from '@/components/ui/language-selector';
import { AccessibilityToggle } from '@/components/ui/accessibility-toggle';
import { useState } from 'react';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-white dark:bg-gray-950 shadow-sm dark:shadow-gray-800/20 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <AnimatedLogo />
            {title && <span className="ml-2 font-bold text-gray-900 dark:text-gray-100">{title}</span>}
          </Link>
        </div>

        {/* Desktop Search - hidden on mobile */}
        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 w-64">
          <Search className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm w-full text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Desktop Navigation Links - hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link 
            href="/" 
            className={`px-3 py-2 rounded-md text-sm ${
              isActive('/') 
                ? 'text-indigo-600 dark:text-indigo-400 font-medium' 
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            Home
          </Link>
          <Link 
            href="/dashboard" 
            className={`px-3 py-2 rounded-md text-sm ${
              isActive('/dashboard') 
                ? 'text-indigo-600 dark:text-indigo-400 font-medium' 
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            href="/landing" 
            className={`px-3 py-2 rounded-md text-sm ${
              isActive('/landing') 
                ? 'text-indigo-600 dark:text-indigo-400 font-medium' 
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            Public Site
          </Link>

          <div className="flex items-center border-l border-gray-200 dark:border-gray-800 ml-2 pl-2">
            <LanguageSelector />
            <AccessibilityToggle />
            <ModeToggle />
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center ml-2">
              <User className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <ModeToggle />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className={`block px-3 py-2 rounded-md text-base ${
                isActive('/') 
                  ? 'text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900/20' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/dashboard" 
              className={`block px-3 py-2 rounded-md text-base ${
                isActive('/dashboard') 
                  ? 'text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900/20' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/landing" 
              className={`block px-3 py-2 rounded-md text-base ${
                isActive('/landing') 
                  ? 'text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900/20' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Public Site
            </Link>
            <div className="flex items-center space-x-2 px-3 py-3 border-t border-gray-200 dark:border-gray-800 mt-2">
              <LanguageSelector />
              <AccessibilityToggle />
              <div className="flex-1"></div>
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <User className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}