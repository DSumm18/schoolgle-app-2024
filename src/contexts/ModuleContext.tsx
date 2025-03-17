'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { moduleRegistry } from '@/lib/modules/registry';
import { ModuleDefinition } from '@/lib/modules/types';
import { useSchoolContext } from './SchoolContext';
import { useSession } from 'next-auth/react';
import { createBrowserClient } from '@/utils/supabase/client';

interface ModuleContextType {
  modules: ModuleDefinition[];
  enabledModules: ModuleDefinition[];
  isModuleEnabled: (moduleId: string) => boolean;
  enableModule: (moduleId: string, schoolId: string) => Promise<boolean>;
  disableModule: (moduleId: string, schoolId: string) => Promise<boolean>;
  updateModuleSettings: (moduleId: string, schoolId: string, settings: Record<string, any>) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const ModuleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<ModuleDefinition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { school } = useSchoolContext();
  const { data: session } = useSession();
  const supabase = createBrowserClient();

  useEffect(() => {
    const loadModules = async () => {
      try {
        setIsLoading(true);
        
        // Get all modules from registry
        const allModules = moduleRegistry.getAllModules();
        
        if (school?.id) {
          // Fetch module activation records from the database
          const { data: activationRecords, error } = await supabase
            .from('module_activations')
            .select('*')
            .eq('schoolId', school.id);
            
          if (error) throw new Error(error.message);
          
          // Update modules with activation status
          if (activationRecords && activationRecords.length > 0) {
            activationRecords.forEach(record => {
              const module = moduleRegistry.getModule(record.moduleId);
              if (module) {
                moduleRegistry.enableModule(record.moduleId);
                if (record.settings) {
                  moduleRegistry.updateModuleSettings(record.moduleId, record.settings);
                }
              }
            });
          }
        }
        
        setModules(allModules);
        setError(null);
      } catch (err: any) {
        console.error('Error loading modules:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadModules();
  }, [school?.id, supabase]);
  
  const enabledModules = modules.filter(module => module.enabled);
  
  const isModuleEnabled = (moduleId: string): boolean => {
    const module = modules.find(m => m.id === moduleId);
    return module ? module.enabled : false;
  };
  
  const enableModule = async (moduleId: string, schoolId: string): Promise<boolean> => {
    try {
      if (!session?.user) throw new Error('User must be logged in to enable modules');
      
      const success = moduleRegistry.enableModule(moduleId);
      if (!success) return false;
      
      // Record the activation in the database
      const { error } = await supabase
        .from('module_activations')
        .upsert({
          moduleId,
          schoolId,
          enabled: true,
          enabledAt: new Date().toISOString(),
          enabledBy: session.user.email || session.user.id
        });
        
      if (error) throw new Error(error.message);
      
      // Log the activation
      await supabase
        .from('module_activation_logs')
        .insert({
          moduleId,
          schoolId,
          action: 'enabled',
          timestamp: new Date().toISOString(),
          userId: session.user.id,
          newState: { enabled: true }
        });
      
      // Update state
      setModules([...moduleRegistry.getAllModules()]);
      return true;
    } catch (err: any) {
      console.error('Error enabling module:', err);
      setError(err.message);
      return false;
    }
  };
  
  const disableModule = async (moduleId: string, schoolId: string): Promise<boolean> => {
    try {
      if (!session?.user) throw new Error('User must be logged in to disable modules');
      
      const module = moduleRegistry.getModule(moduleId);
      if (!module) return false;
      
      if (module.required) {
        throw new Error('Cannot disable a required module');
      }
      
      const success = moduleRegistry.disableModule(moduleId);
      if (!success) return false;
      
      // Record the deactivation in the database
      const { error } = await supabase
        .from('module_activations')
        .upsert({
          moduleId,
          schoolId,
          enabled: false,
          enabledAt: new Date().toISOString(),
          enabledBy: session.user.email || session.user.id
        });
        
      if (error) throw new Error(error.message);
      
      // Log the deactivation
      await supabase
        .from('module_activation_logs')
        .insert({
          moduleId,
          schoolId,
          action: 'disabled',
          timestamp: new Date().toISOString(),
          userId: session.user.id,
          newState: { enabled: false }
        });
      
      // Update state
      setModules([...moduleRegistry.getAllModules()]);
      return true;
    } catch (err: any) {
      console.error('Error disabling module:', err);
      setError(err.message);
      return false;
    }
  };
  
  const updateModuleSettings = async (
    moduleId: string, 
    schoolId: string, 
    settings: Record<string, any>
  ): Promise<boolean> => {
    try {
      if (!session?.user) throw new Error('User must be logged in to update module settings');
      
      const module = moduleRegistry.getModule(moduleId);
      if (!module) return false;
      
      const previousSettings = { ...(module.settings || {}) };
      const success = moduleRegistry.updateModuleSettings(moduleId, settings);
      if (!success) return false;
      
      // Update settings in the database
      const { error } = await supabase
        .from('module_activations')
        .upsert({
          moduleId,
          schoolId,
          settings,
          enabled: module.enabled,
          enabledAt: new Date().toISOString(),
          enabledBy: session.user.email || session.user.id
        });
        
      if (error) throw new Error(error.message);
      
      // Log the settings change
      await supabase
        .from('module_activation_logs')
        .insert({
          moduleId,
          schoolId,
          action: 'settings_changed',
          timestamp: new Date().toISOString(),
          userId: session.user.id,
          previousState: { settings: previousSettings },
          newState: { settings }
        });
      
      // Update state
      setModules([...moduleRegistry.getAllModules()]);
      return true;
    } catch (err: any) {
      console.error('Error updating module settings:', err);
      setError(err.message);
      return false;
    }
  };
  
  const value = {
    modules,
    enabledModules,
    isModuleEnabled,
    enableModule,
    disableModule,
    updateModuleSettings,
    isLoading,
    error,
  };
  
  return (
    <ModuleContext.Provider value={value}>
      {children}
    </ModuleContext.Provider>
  );
};

export const useModules = (): ModuleContextType => {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error('useModules must be used within a ModuleProvider');
  }
  return context;
};