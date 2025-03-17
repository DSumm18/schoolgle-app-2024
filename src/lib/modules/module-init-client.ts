'use client';

import { useEffect } from 'react';
import { initializeModules } from './initialize';

let isInitialized = false;

/**
 * This hook initializes the modules on the client side
 * It ensures modules are only initialized once
 */
export const useInitializeModules = () => {
  useEffect(() => {
    if (!isInitialized) {
      initializeModules();
      isInitialized = true;
      console.log('Modules initialized on client');
    }
  }, []);
};

/**
 * Component to initialize modules
 */
export const ModuleInitializer = () => {
  useInitializeModules();
  return null;
};