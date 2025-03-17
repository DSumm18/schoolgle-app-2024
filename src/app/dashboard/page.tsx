'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WeatherWidget from '@/components/widgets/WeatherWidget';
import NewsCarousel from '@/components/widgets/NewsCarousel';
import EventsCalendar from '@/components/widgets/EventsCalendar';
import SocialMediaFeed from '@/components/widgets/SocialMediaFeed';
import ModuleGrid from '@/components/dashboard/ModuleGrid';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import AuthStatus from '@/components/AuthStatus';
import { Bell, Calendar, InfoIcon, Shield } from 'lucide-react';
import { useSchoolContext } from '@/contexts/SchoolContext';

// Animation variants for staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  },
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { school, isLoading } = useSchoolContext();
  const [greeting, setGreeting] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  
  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    let greetingMessage = '';
    
    if (hour >= 5 && hour < 12) {
      greetingMessage = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      greetingMessage = 'Good afternoon';
    } else {
      greetingMessage = 'Good evening';
    }
    
    if (session?.user?.name) {
      greetingMessage += `, ${session.user.name.split(' ')[0]}`;
    }
    
    setGreeting(greetingMessage);
  }, [session]);
  
  if (status === 'loading' || isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-r-transparent"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <motion.main
        className="flex-1 px-4 lg:px-8 py-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top row - Greeting and language switcher */}
        <motion.div 
          className="mb-6 flex justify-between items-center"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {greeting || 'Welcome to your dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setShowAuth(!showAuth)}
              className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield size={16} />
              <span>Auth Status</span>
            </motion.button>
            <LanguageSwitcher />
          </div>
        </motion.div>
        
        {/* Auth Status popup */}
        {showAuth && (
          <motion.div
            variants={itemVariants}
            className="mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <AuthStatus />
          </motion.div>
        )}
        
        {/* Announcement banner if there is one */}
        {school?.currentAnnouncement && (
          <motion.div
            variants={itemVariants}
            className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg p-4 mb-6 flex items-start gap-3"
          >
            <InfoIcon className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-indigo-800 dark:text-indigo-300">
                Announcement
              </h3>
              <p className="mt-1 text-indigo-700 dark:text-indigo-200">
                {school.currentAnnouncement}
              </p>
            </div>
          </motion.div>
        )}
        
        {/* Top widgets row */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
          variants={itemVariants}
        >
          {/* Weather widget */}
          <WeatherWidget />
          
          {/* Quick shortcuts */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Quick Access
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-3">
              <motion.a
                href="/calendar"
                className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar size={24} className="text-indigo-600 dark:text-indigo-400 mb-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Calendar</span>
              </motion.a>
              
              <motion.a
                href="/notifications"
                className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell size={24} className="text-indigo-600 dark:text-indigo-400 mb-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Notifications</span>
              </motion.a>
              
              <motion.a
                href="/resources"
                className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <InfoIcon size={24} className="text-indigo-600 dark:text-indigo-400 mb-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Resources</span>
              </motion.a>
              
              <motion.a
                href="/profile"
                className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative h-6 w-6 rounded-full overflow-hidden border border-indigo-200 dark:border-indigo-800 mb-2">
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 text-xs font-medium">
                      {session?.user?.name?.[0] || 'U'}
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Profile</span>
              </motion.a>
            </div>
          </div>
          
          {/* Recent activity or third widget */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Teaching staff meeting scheduled for Friday
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    2 hours ago
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
                  <Bell size={16} />
                </div>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    New curriculum resources added in Teaching & Learning
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Yesterday
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0">
                  <InfoIcon size={16} />
                </div>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    SEND workshop materials updated
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    2 days ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* News, Events, and Social Media section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              {/* News section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Latest News
                </h3>
                <NewsCarousel items={school?.news || []} />
              </div>
              
              {/* Events section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Upcoming Events
                </h3>
                <EventsCalendar events={school?.events || []} />
              </div>
            </div>
          </motion.div>
          
          {/* Social Media Feed */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Social Media
            </h3>
            <SocialMediaFeed 
              platform="all" 
              username={school?.socialMedia?.twitter}
              maxPosts={3}
              showImages={true}
            />
          </motion.div>
        </div>
        
        {/* Modules section */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Modules
          </h3>
          <ModuleGrid modules={school?.enabledModules || []} />
        </motion.div>
      </motion.main>
      
      {/* Chatbot widget */}
      <ChatbotWidget iconType="animated-sun" />
    </div>
  );
}