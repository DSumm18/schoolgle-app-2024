'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">Schoolgle</Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md hover:bg-blue-700">Home</Link>
            
            {status === 'authenticated' ? (
              <>
                <Link href="/dashboard" className="px-3 py-2 rounded-md hover:bg-blue-700">Dashboard</Link>
                <div className="relative ml-3">
                  <button
                    onClick={toggleMenu}
                    className="flex items-center px-3 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
                  >
                    <span className="mr-2">{session.user?.name || session.user?.email}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-800 z-10">
                      <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                      <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="px-3 py-2 rounded-md hover:bg-blue-700">Sign in</Link>
                <Link 
                  href="/register" 
                  className="ml-2 px-4 py-2 rounded-md bg-white text-blue-600 hover:bg-gray-100"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md hover:bg-blue-700">Home</Link>
            
            {status === 'authenticated' ? (
              <>
                <Link href="/dashboard" className="block px-3 py-2 rounded-md hover:bg-blue-700">Dashboard</Link>
                <Link href="/profile" className="block px-3 py-2 rounded-md hover:bg-blue-700">Profile</Link>
                <Link href="/settings" className="block px-3 py-2 rounded-md hover:bg-blue-700">Settings</Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-blue-700 text-white"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 rounded-md hover:bg-blue-700">Sign in</Link>
                <Link href="/register" className="block px-3 py-2 rounded-md hover:bg-blue-700">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}