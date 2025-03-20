'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BellRing, Home, LayoutDashboard, User, Menu, Search, ChevronDown } from 'lucide-react';
import ModuleGrid from '@/components/dashboard/ModuleGrid';
import { AnimatedLogo } from '@/components/ui/animated-logo';

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <AnimatedLogo />
            <span className="ml-2 font-bold text-gray-900">Dashboard</span>
          </div>
          
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
          
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900 hidden md:flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link href="/dashboard" className="text-indigo-600 font-medium hidden md:flex items-center gap-1">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/landing" className="text-gray-600 hover:text-gray-900 hidden md:flex items-center gap-1">
              <span>Public Site</span>
            </Link>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-700" />
            </div>
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </nav>
        </div>
      </header>
      
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
            <h2 className="text-3xl font-bold text-gray-900">
              {greeting}, Admin
            </h2>
            <p className="text-gray-500 mt-1">{currentDate}</p>
          </div>
          <div className="px-4 py-2 bg-white rounded-lg shadow-sm">
            <p className="text-indigo-600 font-medium">{currentTime}</p>
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
            <h3 className="text-2xl font-bold text-gray-900">
              Estate Modules
            </h3>
            <div className="flex gap-2 overflow-x-auto py-2">
              <button
                onClick={() => setActiveCategory('')}
                className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-all shadow-sm ${
                  activeCategory === '' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                All Modules
              </button>
              <button
                onClick={() => setActiveCategory('estates')}
                className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-all shadow-sm ${
                  activeCategory === 'estates' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
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
      
      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-2">
              <AnimatedLogo />
            </div>
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Schoolgle Intranet Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}