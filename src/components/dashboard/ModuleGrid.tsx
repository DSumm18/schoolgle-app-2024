'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Tool, AlertCircle, ArrowRight } from 'lucide-react';

// Define interface for module objects
interface Module {
  id: string;
  name: string;
  description: string;
  category: string;
  enabled: boolean;
  icon: string;
  routes: { path: string; name: string }[];
}

// Props for the ModuleGrid component
interface ModuleGridProps {
  modules: Module[];
  filter?: string;
}

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

// Map icon strings to actual Lucide icon components
const iconMap: Record<string, React.ReactNode> = {
  'Calendar': <Activity className="w-5 h-5" />,
  'Shield': <AlertTriangle className="w-5 h-5" />,
  'Tool': <Tool className="w-5 h-5" />,
  'AlertTriangle': <AlertCircle className="w-5 h-5" />
};

// Map module IDs to gradients and colors
const moduleStyles: Record<string, { 
  gradient: string, 
  iconBg: string, 
  hoverBg: string,
  lightBg: string
}> = {
  'activity-management': {
    gradient: 'from-blue-500 to-indigo-600', 
    iconBg: 'bg-gradient-to-br from-blue-400 to-indigo-600',
    hoverBg: 'hover:bg-blue-50',
    lightBg: 'bg-blue-50'
  },
  'risk-assessment': {
    gradient: 'from-green-500 to-emerald-600', 
    iconBg: 'bg-gradient-to-br from-green-400 to-emerald-600',
    hoverBg: 'hover:bg-green-50',
    lightBg: 'bg-green-50'
  },
  'issue-tracker': {
    gradient: 'from-amber-500 to-orange-600', 
    iconBg: 'bg-gradient-to-br from-amber-400 to-orange-600',
    hoverBg: 'hover:bg-amber-50',
    lightBg: 'bg-amber-50'
  },
  'incidents': {
    gradient: 'from-red-500 to-rose-600', 
    iconBg: 'bg-gradient-to-br from-red-400 to-rose-600',
    hoverBg: 'hover:bg-red-50',
    lightBg: 'bg-red-50'
  }
};

export default function ModuleGrid({ modules, filter = '' }: ModuleGridProps) {
  // Filter modules based on the filter prop
  const filteredModules = filter 
    ? modules.filter(module => module.category === filter)
    : modules;

  // Empty state when no modules match the filter
  if (filteredModules.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-600">No modules available</h3>
        <p className="text-gray-500 mt-2">
          {filter 
            ? `No modules found in the ${filter} category` 
            : "No modules have been enabled for your account"}
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredModules.map((module, index) => {
        const style = moduleStyles[module.id] || {
          gradient: 'from-gray-500 to-gray-600',
          iconBg: 'bg-gradient-to-br from-gray-400 to-gray-600',
          hoverBg: 'hover:bg-gray-50',
          lightBg: 'bg-gray-50'
        };
        
        return (
          <motion.div
            key={module.id}
            className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white group ${style.hoverBg}`}
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className={`h-2 bg-gradient-to-r ${style.gradient}`}></div>
            <div className="p-5">
              <div className="flex items-start mb-4">
                <div className={`w-10 h-10 rounded-lg ${style.iconBg} flex items-center justify-center shadow-md`}>
                  <div className="text-white">
                    {iconMap[module.icon] || module.name.charAt(0)}
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-bold text-gray-800">{module.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{module.description}</p>
                </div>
              </div>
              
              {module.routes && module.routes.length > 0 && (
                <Link 
                  href={module.routes[0].path}
                  className={`inline-flex items-center mt-2 text-white px-4 py-2 rounded-lg bg-gradient-to-r ${style.gradient} transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md text-sm font-medium gap-1`}
                >
                  Open Module
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}