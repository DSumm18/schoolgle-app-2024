'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Info, Shield, Bell } from 'react-icons/hi';
import ModuleGrid from '@/components/dashboard/ModuleGrid';

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
    const hour = new Date().getHours();
    let greetingMessage = '';
    
    if (hour >= 5 && hour < 12) {
      greetingMessage = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      greetingMessage = 'Good afternoon';
    } else {
      greetingMessage = 'Good evening';
    }
    
    setGreeting(greetingMessage);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Schoolgle Intranet</h1>
          <nav className="flex gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link href="/dashboard" className="text-indigo-600 font-medium">Dashboard</Link>
          </nav>
        </div>
      </header>
      
      <motion.main
        className="flex-1 px-4 lg:px-8 py-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top row - Greeting */}
        <motion.div 
          className="mb-6 flex justify-between items-center"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-gray-900">
            {greeting || 'Welcome to your dashboard'}
          </h2>
        </motion.div>
        
        {/* Announcement banner */}
        <motion.div
          variants={itemVariants}
          className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6 flex items-start gap-3"
        >
          <Info className="text-indigo-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium text-indigo-800">
              Announcement
            </h3>
            <p className="mt-1 text-indigo-700">
              Welcome to the Schoolgle Intranet Platform. We are testing the Estates modules deployment.
            </p>
          </div>
        </motion.div>
        
        {/* Module category filters */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Modules
            </h3>
            <div className="flex gap-2 overflow-x-auto py-2">
              <button
                onClick={() => setActiveCategory('')}
                className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === '' 
                    ? 'bg-indigo-100 text-indigo-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Modules
              </button>
              <button
                onClick={() => setActiveCategory('estates')}
                className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === 'estates' 
                    ? 'bg-indigo-100 text-indigo-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
    </div>
  );
}