'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { AnimatedLogo } from './AnimatedLogo';
import { AnimatedButton } from './AnimatedButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, User, LogOut, Settings } from 'lucide-react';

// Component for smooth scrolling to sections
const SmoothScrollLink = ({ 
  href, 
  children, 
  className = '',
  onClick
}: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (onClick) onClick();
    
    // Check if the href is a hash link
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // Offset for navbar height
          behavior: 'smooth',
        });
      }
    } else {
      // For non-hash links, we can use the normal browser navigation
      window.location.href = href;
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  // Theme toggle function
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setIsMenuOpen(false);
      setIsUserMenuOpen(false);
    };

    if (isMenuOpen || isUserMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMenuOpen, isUserMenuOpen]);

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    // Check system/user preference for dark mode
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(prev => !prev);
    setIsUserMenuOpen(false);
  };

  // Toggle user menu
  const toggleUserMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUserMenuOpen(prev => !prev);
    setIsMenuOpen(false);
  };

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        hasScrolled
          ? 'bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <AnimatedLogo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <SmoothScrollLink
            href="#features"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Features
          </SmoothScrollLink>
          <SmoothScrollLink
            href="#testimonials"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Testimonials
          </SmoothScrollLink>
          <SmoothScrollLink
            href="#pricing"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Pricing
          </SmoothScrollLink>
          <SmoothScrollLink
            href="#contact"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Contact
          </SmoothScrollLink>
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </motion.button>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            {status === 'authenticated' ? (
              <>
                <Link href="/dashboard">
                  <AnimatedButton variant="outline" size="sm">
                    Dashboard
                  </AnimatedButton>
                </Link>
                <div className="relative" onClick={e => e.stopPropagation()}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleUserMenu}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <User size={18} />
                    <span className="hidden lg:inline">{session.user?.name || 'User'}</span>
                  </motion.button>
                  
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                      >
                        <div className="py-1 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
                          <p className="text-sm font-medium">
                            {session.user?.name || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {session.user?.email || ''}
                          </p>
                        </div>
                        <div className="py-1">
                          <Link 
                            href="/profile" 
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <User size={16} />
                            Your Profile
                          </Link>
                          <Link 
                            href="/settings" 
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Settings size={16} />
                            Settings
                          </Link>
                        </div>
                        <div className="py-1 border-t border-gray-200 dark:border-gray-700">
                          <button 
                            onClick={() => signOut({ callbackUrl: '/' })} 
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <LogOut size={16} />
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <AnimatedButton variant="outline" size="sm">
                    Log in
                  </AnimatedButton>
                </Link>
                <Link href="/register">
                  <AnimatedButton size="sm">Get Started</AnimatedButton>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="p-2 ml-2 md:hidden rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <SmoothScrollLink
                href="#features"
                className="py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#testimonials"
                className="py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#pricing"
                className="py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#contact"
                className="py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </SmoothScrollLink>
              
              <div className="pt-4 space-y-2 border-t border-gray-200 dark:border-gray-800">
                {status === 'authenticated' ? (
                  <>
                    <Link 
                      href="/dashboard" 
                      className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/profile" 
                      className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link 
                      href="/settings" 
                      className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button 
                      onClick={() => signOut({ callbackUrl: '/' })} 
                      className="block w-full text-left py-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <AnimatedButton variant="outline" className="w-full">
                        Log in
                      </AnimatedButton>
                    </Link>
                    <Link 
                      href="/register" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <AnimatedButton className="w-full">
                        Get Started
                      </AnimatedButton>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}