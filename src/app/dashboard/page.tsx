'use client';

import { useState, useEffect } from 'react';
import { motion } from '@/lib/motion';
import { BellRing, ChevronDown, Settings } from 'lucide-react';
import ModuleGrid from '@/components/dashboard/ModuleGrid';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
  const [greeting, setGreeting] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [isAdmin, setIsAdmin] = useState(true); // Mock admin status, would come from authentication in real app
  
  // Mock data
  const mockModules = [
    {
      id: "activity-management",
      name: "Activity Management",
      description: "Manage school activities and events",
      category: "estates",
      enabled: true,
      icon: "Calendar",
      routes: [{ path: "/modules/estates/activity-management", name: "Activity Management" }]
    },
    {
      id: "risk-assessment",
      name: "Risk Assessment",
      description: "Conduct and manage risk assessments",
      category: "estates",
      enabled: true,
      icon: "Shield",
      routes: [{ path: "/modules/estates/risk-assessment", name: "Risk Assessment" }]
    },
    {
      id: "issue-tracker",
      name: "School Issue Tracker",
      description: "Track and manage school maintenance issues",
      category: "estates",
      enabled: true,
      icon: "Tool",
      routes: [{ path: "/modules/estates/issue-tracker", name: "Issue Tracker" }]
    },
    {
      id: "incidents",
      name: "Incidents",
      description: "Report and manage incidents",
      category: "estates",
      enabled: true,
      icon: "AlertTriangle",
      routes: [{ path: "/modules/estates/incidents", name: "Incidents" }]
    }
  ];
  
  // Set greeting based on time of day
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      let greetingMessage = '';
      
      if (hour >= 5 && hour < 12) {
        greetingMessage = 'Good morning';
      } else if (hour >= 12 && hour < 18) {
        greetingMessage = 'Good afternoon';
      } else {
        greetingMessage = 'Good evening';
      }
      
      setGreeting(greetingMessage);
      
      // Format date: Monday, January 1, 2024
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setCurrentDate(now.toLocaleDateString('en-US', options));
      
      // Format time: 9:41 AM
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }));
    };
    
    updateDateTime();
    const timer = setInterval(updateDateTime, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <PageWrapper title="Dashboard">
      <motion.main
        className="flex-1 px-4 lg:px-8 py-8 max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top row - Greeting & Date/Time */}
        <motion.div 
          className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          variants={itemVariants}
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {greeting}, Admin
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{currentDate}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <p className="text-indigo-600 dark:text-indigo-400 font-medium">{currentTime}</p>
            </div>
            
            {/* Admin link - only visible to admin users */}
            {isAdmin && (
              <Link href="/admin" passHref>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Admin</span>
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
        
        {/* Announcement banner */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl p-6 mb-8 shadow-lg text-white overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8">
            <div className="w-40 h-40 rounded-full bg-indigo-400 opacity-20"></div>
          </div>
          <div className="absolute bottom-0 left-0 transform -translate-x-8 translate-y-8">
            <div className="w-32 h-32 rounded-full bg-blue-400 opacity-20"></div>
          </div>
          
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
              <BellRing className="text-white h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-xl">
                Welcome to Schoolgle Dashboard
              </h3>
              <p className="mt-2 text-indigo-100 max-w-2xl">
                We are pleased to announce that all Estate modules are now available for testing. 
                Explore the various features and provide feedback to help us improve.
              </p>
              <button className="mt-4 bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all flex items-center text-sm">
                Learn More <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Module category filters */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Estate Modules
            </h3>
            <div className="flex gap-2 overflow-x-auto py-2">
              <button
                onClick={() => setActiveCategory('')}
                className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-all shadow-sm ${
                  activeCategory === '' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                All Modules
              </button>
              <button
                onClick={() => setActiveCategory('estates')}
                className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-all shadow-sm ${
                  activeCategory === 'estates' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Estates
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Modules grid */}
        <motion.div variants={itemVariants}>
          <ModuleGrid 
            modules={mockModules} 
            filter={activeCategory}
          />
        </motion.div>
      </motion.main>
    </PageWrapper>
  );
}