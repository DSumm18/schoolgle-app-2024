import { moduleRegistry } from './registry';
import { estateModules } from './module-definitions/estates-modules';

/**
 * Initialize all application modules
 * This function should be called during application startup
 */
export const initializeModules = () => {
  // Register all estate modules
  moduleRegistry.registerMany(estateModules);
  
  // Future: register modules from other categories
  // moduleRegistry.registerMany(teachingModules);
  // moduleRegistry.registerMany(adminModules);
  
  console.log(`Initialized ${moduleRegistry.getAllModules().length} modules`);
  
  // Return the registry for testing/debug purposes
  return moduleRegistry;
};

/**
 * This function checks if a module is available based on the module ID
 * It checks if the module exists and is enabled
 */
export const isModuleAvailable = (moduleId: string): boolean => {
  const module = moduleRegistry.getModule(moduleId);
  return !!module?.enabled;
};

/**
 * This function checks if a user has permission to perform an action
 * within a specific module
 */
export const hasModulePermission = (
  moduleId: string, 
  action: string, 
  userRoles: string[]
): boolean => {
  const module = moduleRegistry.getModule(moduleId);
  
  if (!module || !module.enabled) {
    return false;
  }
  
  // Find the permission matching the action
  const permission = module.permissions.find(p => p.action === action);
  
  // Check if any of the user's roles have this permission
  return !!permission && userRoles.some(role => permission.roles.includes(role));
};

/**
 * Get all routes that a user has access to
 */
export const getAccessibleModuleRoutes = (userRoles: string[]) => {
  const enabledModules = moduleRegistry.getEnabledModules();
  
  return enabledModules.flatMap(module => {
    return module.routes.filter(route => {
      // If the route doesn't specify permissions, assume it's accessible to everyone
      if (!route.permissions || route.permissions.length === 0) {
        return true;
      }
      
      // Check if the user has any of the permissions required for this route
      return route.permissions.some(permissionAction => {
        const permission = module.permissions.find(p => p.action === permissionAction);
        return permission && userRoles.some(role => permission.roles.includes(role));
      });
    }).map(route => ({
      ...route,
      moduleId: module.id,
      moduleColor: module.color,
      moduleIcon: module.icon,
      moduleName: module.name,
    }));
  });
};