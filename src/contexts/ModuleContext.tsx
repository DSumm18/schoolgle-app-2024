'use client';

import React, { createContext, useContext, useState } from 'react';

interface Module {
  id: string;
  name: string;
  description: string;
  category: string;
  enabled: boolean;
  icon: string;
  routes: { path: string; name: string }[];
}

interface ModuleContextType {
  modules: Module[];
  enabledModules: Module[];
  loading: boolean;
  isModuleEnabled: (moduleId: string) => boolean;
  toggleModule: (moduleId: string) => void;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export function ModuleProvider({ children }: { children: React.ReactNode }) {
  // Mock module data
  const [modules] = useState<Module[]>([
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
  ]);

  const [loading] = useState(false);

  const enabledModules = modules.filter(module => module.enabled);

  const isModuleEnabled = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    return module ? module.enabled : false;
  };

  const toggleModule = (moduleId: string) => {
    // This would update the modules state in a real app
    console.log(`Toggle module: ${moduleId}`);
  };

  return (
    <ModuleContext.Provider
      value={{
        modules,
        enabledModules,
        loading,
        isModuleEnabled,
        toggleModule
      }}
    >
      {children}
    </ModuleContext.Provider>
  );
}

export const useModules = () => {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error('useModules must be used within a ModuleProvider');
  }
  return context;
};