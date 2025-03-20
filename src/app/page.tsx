'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Schoolgle Intranet</h1>
          <nav className="flex gap-4">
            <Link href="/" className="text-indigo-600 font-medium">Home</Link>
            <Link href="/landing" className="text-gray-600 hover:text-gray-900">Public Site</Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Schoolgle Intranet Platform
            </motion.h1>
            <motion.p 
              className="mt-5 max-w-xl mx-auto text-xl text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              A comprehensive school management system with modular architecture
            </motion.p>
            <motion.div 
              className="mt-8 flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link 
                href="/dashboard" 
                className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                View Dashboard
              </Link>
              <Link 
                href="/landing" 
                className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 border-indigo-200"
              >
                Visit Public Site
              </Link>
            </motion.div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Available Estate Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Activity Management",
                  description: "Track and schedule activities happening within school premises",
                  path: "/modules/estates/activity-management",
                  color: "bg-blue-100 border-blue-200"
                },
                {
                  name: "Risk Assessment",
                  description: "Document and manage risk assessments for school facilities",
                  path: "/modules/estates/risk-assessment",
                  color: "bg-green-100 border-green-200"
                },
                {
                  name: "Issue Tracker",
                  description: "Log, track, and resolve maintenance issues throughout the school",
                  path: "/modules/estates/issue-tracker",
                  color: "bg-yellow-100 border-yellow-200"
                },
                {
                  name: "Incidents",
                  description: "Record and manage incidents that occur on school grounds",
                  path: "/modules/estates/incidents",
                  color: "bg-red-100 border-red-200"
                }
              ].map((module, index) => (
                <motion.div
                  key={module.name}
                  className={`rounded-lg shadow-sm border p-6 ${module.color}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index + 0.5 }}
                >
                  <h3 className="text-lg font-bold mb-2">{module.name}</h3>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <Link 
                    href={module.path}
                    className="text-indigo-600 font-medium hover:text-indigo-800"
                  >
                    View Module →
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="mt-20 bg-indigo-50 rounded-lg p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready for Deployment</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              This application has been configured for easy deployment via Vercel.
              All estate modules are implemented and ready to review.
            </p>
          </motion.div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            &copy; {new Date().getFullYear()} Schoolgle Intranet Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}