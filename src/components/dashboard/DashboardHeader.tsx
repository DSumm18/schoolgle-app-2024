'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, Settings } from 'lucide-react';
import { useSchoolContext } from '@/contexts/SchoolContext';
import { useSession } from 'next-auth/react';

interface DashboardHeaderProps {
  schoolName?: string;
  schoolLogo?: string;
}

export default function DashboardHeader({
  schoolName,
  schoolLogo = '/logo.svg',
}: DashboardHeaderProps) {
  const { data: session } = useSession();
  const { school } = useSchoolContext();
  
  // Use school context if no props provided
  const displayName = schoolName || school?.name || 'School Intranet';
  const logoUrl = schoolLogo || school?.logoUrl || '/logo.svg';
  
  return (
    <header className="dashboard-header bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-4 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center">
            <div className="relative h-10 w-10">
              <Image
                src={logoUrl}
                alt={displayName}
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white ml-2 hidden sm:block">
              {displayName}
            </h1>
          </Link>
          
          <div className="hidden md:block h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2" />
          
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              href="/dashboard" 
              className="px-3 py-2 text-sm font-medium rounded-md text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Dashboard
            </Link>
            <Link 
              href="/news" 
              className="px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              News
            </Link>
            <Link 
              href="/events" 
              className="px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Events
            </Link>
            <Link 
              href="/resources" 
              className="px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Resources
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          </motion.button>
          
          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Settings"
          >
            <Settings size={20} />
          </motion.button>
          
          {/* User Profile */}
          <div className="relative ml-2">
            <Link 
              href="/profile"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-medium text-sm">
                    {session?.user?.name?.[0] || 'U'}
                  </div>
                )}
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                {session?.user?.name || 'User'}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}