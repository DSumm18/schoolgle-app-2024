'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { SchoolModule } from '@/contexts/SchoolContext';
import { 
  BookOpen, Heart, Building, Users,
  DollarSign, Laptop, Briefcase, Video,
  Icon as LucideIcon
} from 'lucide-react';

// Map module codes to Lucide icons
const moduleIcons: Record<string, LucideIcon> = {
  'teaching': BookOpen,
  'send': Heart,
  'estates': Building,
  'hr': Users,
  'finance': DollarSign,
  'it': Laptop,
  'governance': Briefcase,
  'tutorials': Video,
};

interface ModuleCardProps {
  module: SchoolModule;
  index: number;
}

function ModuleCard({ module, index }: ModuleCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const IconComponent = moduleIcons[module.code] || BookOpen;
  
  // Use the appropriate color based on theme
  const backgroundColor = isDark ? module.darkColor : module.color;
  
  // Calculate the animation delay based on grid position
  const delay = index * 0.1;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Link 
        href={module.route}
        className="block h-full"
      >
        <div
          className="module-card rounded-xl overflow-hidden h-full p-6 text-white"
          style={{ backgroundColor }}
        >
          <div className="flex items-start justify-between">
            <div 
              className="icon-wrapper p-3 rounded-lg bg-white/10"
            >
              <IconComponent size={24} />
            </div>
          </div>
          
          <h3 className="text-xl font-bold mt-4">{module.name}</h3>
          <p className="mt-2 text-white/80 text-sm">{module.description}</p>
          
          <div className="mt-4 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-full bg-white/20">
            Explore Module
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface ModuleGridProps {
  modules: SchoolModule[];
}

export default function ModuleGrid({ modules }: ModuleGridProps) {
  // If no modules provided, return empty grid
  if (!modules || modules.length === 0) {
    return (
      <div className="empty-state p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No modules available</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Modules will appear here when they are enabled for your school.
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {modules.map((module, index) => (
        <ModuleCard 
          key={module.id} 
          module={module} 
          index={index} 
        />
      ))}
    </div>
  );
}