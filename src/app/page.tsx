'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedLogo } from '@/components/ui/animated-logo';
import { Activity, AlertTriangle, ClipboardList, BarChart3 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            <AnimatedLogo />
            <span className="ml-2">Intranet</span>
          </h1>
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
            <motion.div 
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block transform scale-150 mb-4">
                <AnimatedLogo />
              </span>
              <span className="block mt-2">Intranet Platform</span>
            </motion.div>
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
                className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
              >
                View Dashboard
              </Link>
              <Link 
                href="/landing" 
                className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 border-indigo-200 transition-all shadow-sm hover:shadow-md"
              >
                Visit Public Site
              </Link>
            </motion.div>
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Available Estate Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Activity Management",
                  description: "Track and schedule activities happening within school premises",
                  path: "/modules/estates/activity-management",
                  color: "from-blue-500 to-indigo-600",
                  bgLight: "bg-blue-50",
                  icon: <Activity className="w-6 h-6 text-white" />,
                  iconBg: "bg-gradient-to-br from-blue-400 to-indigo-600"
                },
                {
                  name: "Risk Assessment",
                  description: "Document and manage risk assessments for school facilities",
                  path: "/modules/estates/risk-assessment",
                  color: "from-green-500 to-emerald-600",
                  bgLight: "bg-green-50",
                  icon: <AlertTriangle className="w-6 h-6 text-white" />,
                  iconBg: "bg-gradient-to-br from-green-400 to-emerald-600"
                },
                {
                  name: "Issue Tracker",
                  description: "Log, track, and resolve maintenance issues throughout the school",
                  path: "/modules/estates/issue-tracker",
                  color: "from-amber-500 to-orange-600",
                  bgLight: "bg-amber-50",
                  icon: <ClipboardList className="w-6 h-6 text-white" />,
                  iconBg: "bg-gradient-to-br from-amber-400 to-orange-600"
                },
                {
                  name: "Incidents",
                  description: "Record and manage incidents that occur on school grounds",
                  path: "/modules/estates/incidents",
                  color: "from-red-500 to-rose-600",
                  bgLight: "bg-red-50",
                  icon: <BarChart3 className="w-6 h-6 text-white" />,
                  iconBg: "bg-gradient-to-br from-red-400 to-rose-600"
                }
              ].map((module, index) => (
                <motion.div
                  key={module.name}
                  className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${module.bgLight} group`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index + 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`h-2 bg-gradient-to-r ${module.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className={`w-12 h-12 rounded-lg ${module.iconBg} flex items-center justify-center shadow-md`}>
                        {module.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{module.name}</h3>
                        <p className="text-gray-600 mb-4">{module.description}</p>
                      </div>
                    </div>
                    <Link 
                      href={module.path}
                      className="inline-flex items-center mt-2 text-white px-4 py-2 rounded-lg bg-gradient-to-r transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md text-sm font-medium gap-1"
                      style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`, 
                              '--tw-gradient-from': module.color.split(' ')[0].replace('from-', ''), 
                              '--tw-gradient-to': module.color.split(' ')[1].replace('to-', '') }}
                    >
                      View Module 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="mt-20 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-8 text-center shadow-md"
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
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4">
              <AnimatedLogo />
            </div>
            <p className="text-center text-gray-500">
              &copy; {new Date().getFullYear()} Schoolgle Intranet Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}