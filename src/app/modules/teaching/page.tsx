'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Search, FileText, Video, Users, Calendar, ChevronRight, Star, Bookmark, Filter } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';

// Mock resource data
const resourcesData = [
  {
    id: '1',
    title: 'Mathematics Curriculum Guide',
    type: 'document',
    subject: 'Mathematics',
    level: 'KS3',
    lastUpdated: '2023-08-15',
    featured: true,
  },
  {
    id: '2',
    title: 'Science Lab Safety Video',
    type: 'video',
    subject: 'Science',
    level: 'All',
    lastUpdated: '2023-07-22',
    featured: false,
  },
  {
    id: '3',
    title: 'English Literature Reading List',
    type: 'document',
    subject: 'English',
    level: 'KS4',
    lastUpdated: '2023-09-01',
    featured: true,
  },
  {
    id: '4',
    title: 'History Timeline Resources',
    type: 'interactive',
    subject: 'History',
    level: 'KS3',
    lastUpdated: '2023-06-10',
    featured: false,
  },
  {
    id: '5',
    title: 'Geography Field Trip Guide',
    type: 'document',
    subject: 'Geography',
    level: 'KS4',
    lastUpdated: '2023-08-28',
    featured: false,
  },
  {
    id: '6',
    title: 'Modern Languages Flashcards',
    type: 'interactive',
    subject: 'Languages',
    level: 'KS3',
    lastUpdated: '2023-07-15',
    featured: true,
  },
];

// Mock upcoming training sessions
const trainingSessions = [
  {
    id: '1',
    title: 'New Assessment Framework Training',
    date: '2023-10-12',
    time: '15:30 - 17:00',
    location: 'Main Hall',
  },
  {
    id: '2',
    title: 'Digital Learning Tools Workshop',
    date: '2023-10-18',
    time: '16:00 - 17:30',
    location: 'IT Suite',
  },
  {
    id: '3',
    title: 'SEN Support Strategies',
    date: '2023-10-25',
    time: '15:45 - 17:15',
    location: 'Room 104',
  },
];

// Animation variants
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

// Function to get icon by resource type
const getResourceIcon = (type: string) => {
  switch (type) {
    case 'document':
      return <FileText size={20} />;
    case 'video':
      return <Video size={20} />;
    case 'interactive':
      return <Users size={20} />;
    default:
      return <FileText size={20} />;
  }
};

export default function TeachingLearningPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  
  // Filter resources based on search and filters
  const filteredResources = resourcesData.filter(resource => {
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = selectedSubject === null || 
      resource.subject === selectedSubject;
    
    const matchesLevel = selectedLevel === null || 
      resource.level === selectedLevel;
    
    return matchesSearch && matchesSubject && matchesLevel;
  });
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <motion.main
        className="flex-1 px-4 lg:px-8 py-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Module header with color theme */}
        <motion.div
          variants={itemVariants}
          className="bg-indigo-600 dark:bg-indigo-800 text-white rounded-lg p-6 mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-lg">
              <BookOpen size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Teaching & Learning</h1>
              <p className="text-indigo-100 mt-1">
                Resources and tools for curriculum planning and delivery
              </p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link 
              href="/modules/teaching/resources"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg p-3"
            >
              <FileText size={20} />
              <span>Resources Library</span>
            </Link>
            
            <Link 
              href="/modules/teaching/training"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg p-3"
            >
              <Video size={20} />
              <span>Training & CPD</span>
            </Link>
            
            <Link 
              href="/modules/teaching/curriculum"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg p-3"
            >
              <BookOpen size={20} />
              <span>Curriculum Planning</span>
            </Link>
          </div>
        </motion.div>
        
        {/* Search and filters */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Filters:</span>
              </div>
              
              <select
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedSubject || ''}
                onChange={(e) => setSelectedSubject(e.target.value || null)}
              >
                <option value="">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
                <option value="Languages">Languages</option>
              </select>
              
              <select
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedLevel || ''}
                onChange={(e) => setSelectedLevel(e.target.value || null)}
              >
                <option value="">All Levels</option>
                <option value="KS3">KS3</option>
                <option value="KS4">KS4</option>
                <option value="KS5">KS5</option>
                <option value="All">All Levels</option>
              </select>
            </div>
          </div>
        </motion.div>
        
        {/* Featured resources */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Featured Resources
            </h2>
            <Link 
              href="/modules/teaching/resources" 
              className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:text-indigo-800 dark:hover:text-indigo-300"
            >
              View all <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resourcesData
              .filter(resource => resource.featured)
              .map(resource => (
                <motion.div
                  key={resource.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-md text-indigo-600 dark:text-indigo-400">
                      {getResourceIcon(resource.type)}
                    </div>
                    <motion.button whileHover={{ scale: 1.1 }} className="text-gray-400 hover:text-amber-500 dark:hover:text-amber-400">
                      <Star size={18} />
                    </motion.button>
                  </div>
                  
                  <h3 className="mt-3 font-medium text-gray-900 dark:text-white">
                    {resource.title}
                  </h3>
                  
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                      {resource.subject}
                    </span>
                    <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                      {resource.level}
                    </span>
                    <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                      {resource.type}
                    </span>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Updated: {resource.lastUpdated}
                    </span>
                    <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                      <Bookmark size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
        
        {/* All resources */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            All Resources
          </h2>
          
          {filteredResources.length === 0 ? (
            <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <Search className="mx-auto h-10 w-10 text-gray-400" />
              <h3 className="mt-2 text-base font-medium text-gray-900 dark:text-white">No resources found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Resource
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Level
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Updated
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredResources.map(resource => (
                    <tr key={resource.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 rounded-md text-indigo-600 dark:text-indigo-400">
                            {getResourceIcon(resource.type)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {resource.title}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {resource.type}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{resource.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                          {resource.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {resource.lastUpdated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-3">
                          View
                        </button>
                        <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
        
        {/* Upcoming training */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Upcoming Training Sessions
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="space-y-4">
              {trainingSessions.map(session => (
                <div 
                  key={session.id}
                  className="flex items-start gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-3 rounded-lg">
                    <Calendar size={24} />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {session.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{session.date}</span>
                      <span>{session.time}</span>
                      <span>{session.location}</span>
                    </div>
                  </div>
                  
                  <button className="px-3 py-1 text-sm text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                    Sign Up
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Link 
                href="/modules/teaching/training"
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                View all training opportunities
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.main>
      
      <ChatbotWidget iconType="animated-sun" />
    </div>
  );
}