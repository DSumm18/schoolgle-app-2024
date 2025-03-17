'use client';

import { motion } from 'framer-motion';
import { useModules } from '@/contexts/ModuleContext';
import { SchoolModule } from '@/contexts/SchoolContext';
import { ModuleCard } from './ModuleCard';
import { ModuleDefinition } from '@/lib/modules/types';

interface ModuleGridProps {
  modules?: SchoolModule[]; // Support for legacy modules
  filter?: string; // Optional category filter
}

export default function ModuleGrid({ modules: legacyModules, filter }: ModuleGridProps) {
  const { modules: newModules, enabledModules } = useModules();
  
  // Combine legacy and new modules
  const combinedModules = [
    ...enabledModules,
    ...(legacyModules || []).map(legacyModule => ({
      id: legacyModule.id,
      name: legacyModule.name,
      description: legacyModule.description,
      version: '1.0.0',
      author: 'Schoolgle',
      category: legacyModule.code as ModuleDefinition['category'],
      color: legacyModule.color,
      icon: legacyModule.icon || 'BookOpen',
      enabled: true,
      required: false,
      routes: [
        {
          path: legacyModule.route,
          name: 'Dashboard',
          description: `${legacyModule.name} Dashboard`,
          isDefaultRoute: true,
        }
      ],
      permissions: []
    })),
  ];
  
  // Apply category filter if provided
  const filteredModules = filter
    ? combinedModules.filter(module => module.category === filter)
    : combinedModules;
  
  // If no modules provided, return empty grid
  if (!filteredModules || filteredModules.length === 0) {
    return (
      <div className="empty-state p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No modules available</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {filter 
            ? `No ${filter} modules are currently enabled for your school.` 
            : 'Modules will appear here when they are enabled for your school.'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredModules.map((module, index) => (
        <ModuleCard 
          key={module.id} 
          module={module} 
          index={index} 
        />
      ))}
    </div>
  );
}