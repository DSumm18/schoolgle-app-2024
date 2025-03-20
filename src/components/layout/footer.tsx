"use client"

import Link from 'next/link';
import { AnimatedLogo } from '@/components/ui/animated-logo';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { LanguageSelector } from '@/components/ui/language-selector';
import { AccessibilityToggle } from '@/components/ui/accessibility-toggle';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <AnimatedLogo />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              A comprehensive school management system with modular architecture designed for educational institutions.
            </p>
            <div className="flex items-center space-x-2">
              <ModeToggle />
              <LanguageSelector />
              <AccessibilityToggle />
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/landing" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Public Site
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Modules</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/modules/estates/activity-management" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Activity Management
                </Link>
              </li>
              <li>
                <Link 
                  href="/modules/estates/risk-assessment" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Risk Assessment
                </Link>
              </li>
              <li>
                <Link 
                  href="/modules/estates/issue-tracker" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Issue Tracker
                </Link>
              </li>
              <li>
                <Link 
                  href="/modules/estates/incidents" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Incidents
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="#" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Schoolgle. All rights reserved.
            </p>
            <div className="flex mt-4 sm:mt-0">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Version 1.0.0 - Running on <a href="http://localhost:3001" className="underline hover:text-indigo-600 dark:hover:text-indigo-400">http://localhost:3001</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}