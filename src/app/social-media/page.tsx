'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SocialMediaPage() {
  return (
    <div className="flex flex-col items-center py-20 px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      <motion.div 
        className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
          School Social Media
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-500 dark:text-blue-400">Twitter Feed</h2>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-200 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-blue-800 dark:text-blue-300 font-bold">S</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-bold text-gray-900 dark:text-white">School Official</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">@school_official • 2h</p>
                    </div>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">Example tweet {i} about school activities and updates. Check out our latest announcement!</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                    <span>♥ 24 likes</span>
                    <span>🔄 8 retweets</span>
                  </div>
                </div>
              ))}
            </div>
            <a 
              href="https://twitter.com/school_official" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-center mt-4 text-blue-600 dark:text-blue-400 hover:underline"
            >
              View full Twitter feed →
            </a>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-600">Facebook Feed</h2>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-200 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-blue-800 dark:text-blue-300 font-bold">S</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-bold text-gray-900 dark:text-white">School Page</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">3 days ago</p>
                    </div>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">Example Facebook post {i} with more detailed information about school events and announcements.</p>
                  {i === 1 && (
                    <div className="mt-3 bg-gray-200 dark:bg-gray-600 h-32 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-300">Image Placeholder</p>
                    </div>
                  )}
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                    <span>👍 52 likes</span>
                    <span>💬 12 comments</span>
                    <span>↗️ 5 shares</span>
                  </div>
                </div>
              ))}
            </div>
            <a 
              href="https://facebook.com/schoolpage" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-center mt-4 text-blue-600 dark:text-blue-400 hover:underline"
            >
              View full Facebook page →
            </a>
          </motion.div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}