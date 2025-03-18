'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

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
      {filteredModules.map((module, index) => (
        <motion.div
          key={module.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full"
          variants={itemVariants}
        >
          <div className="p-6">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <div className="text-indigo-600 text-xl font-semibold">{module.name.charAt(0)}</div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{module.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{module.description}</p>
            
            {module.routes && module.routes.length > 0 && (
              <Link href={module.routes[0].path} 
                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Open Module
              </Link>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}