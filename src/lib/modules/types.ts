/**
 * Types for the module system
 */

export interface ModulePermission {
  action: string;
  description: string;
  roles: string[];
}

export interface ModuleRoute {
  path: string;
  name: string;
  description: string;
  icon?: string;
  permissions?: string[];
  isDefaultRoute?: boolean;
}

export interface ModuleDefinition {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  category: 'core' | 'estates' | 'teaching' | 'admin' | 'other';
  color: string;
  icon: string;
  enabled: boolean;
  required: boolean; // If true, cannot be disabled
  routes: ModuleRoute[];
  permissions: ModulePermission[];
  dependencies?: string[]; // IDs of modules this module depends on
  settings?: Record<string, any>; // Module-specific settings
}

export interface ModuleActivationRecord {
  moduleId: string;
  schoolId: string;
  enabled: boolean;
  enabledAt: string;
  enabledBy: string;
  settings?: Record<string, any>;
}

// For tracking module activation changes
export interface ModuleActivationLog {
  id: string;
  moduleId: string;
  schoolId: string;
  action: 'enabled' | 'disabled' | 'settings_changed';
  timestamp: string;
  userId: string;
  previousState?: Record<string, any>;
  newState: Record<string, any>;
}