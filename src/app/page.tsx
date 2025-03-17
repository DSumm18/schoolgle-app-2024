'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      <motion.div 
        className="max-w-3xl w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          <span className="block">Welcome to</span>
          <span className="block text-blue-600 dark:text-blue-500">
            Schoolgle Intranet
          </span>
        </h1>
        
        <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A comprehensive intranet platform for schools and educational institutions, designed to improve communication and resource sharing.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/dashboard" 
            className="px-8 py-3 rounded-md bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
          
          <Link 
            href="/social-media" 
            className="px-8 py-3 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Social Media Feed
          </Link>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {[
          {
            title: "Customizable Dashboard",
            description: "Personalize your experience with widgets for news, events, weather, and more."
          },
          {
            title: "Modular Design",
            description: "Access different functional areas through an intuitive, color-coded module system."
          },
          {
            title: "School Chatbot",
            description: "Get quick answers to your questions with our AI assistant trained on your school's knowledge base."
          },
          {
            title: "Social Media Integration",
            description: "Stay updated with the school's social media presence directly from the intranet."
          },
          {
            title: "Multilingual Support",
            description: "Switch between languages easily to accommodate diverse user needs."
          },
          {
            title: "Responsive Design",
            description: "Access from any device with a fully responsive interface optimized for all screen sizes."
          }
        ].map((feature, index) => (
          <motion.div 
            key={index}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}