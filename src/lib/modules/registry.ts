import { ModuleDefinition } from './types';

/**
 * The ModuleRegistry manages all modules in the application
 */
class ModuleRegistry {
  private modules: Map<string, ModuleDefinition> = new Map();
  
  /**
   * Register a module in the registry
   */
  register(module: ModuleDefinition): void {
    if (this.modules.has(module.id)) {
      console.warn(`Module with ID ${module.id} is already registered. Overwriting.`);
    }
    this.modules.set(module.id, module);
  }
  
  /**
   * Register multiple modules at once
   */
  registerMany(modules: ModuleDefinition[]): void {
    modules.forEach(module => this.register(module));
  }
  
  /**
   * Get a module by ID
   */
  getModule(id: string): ModuleDefinition | undefined {
    return this.modules.get(id);
  }
  
  /**
   * Get all registered modules
   */
  getAllModules(): ModuleDefinition[] {
    return Array.from(this.modules.values());
  }
  
  /**
   * Get modules by category
   */
  getModulesByCategory(category: ModuleDefinition['category']): ModuleDefinition[] {
    return this.getAllModules().filter(module => module.category === category);
  }
  
  /**
   * Get enabled modules
   */
  getEnabledModules(): ModuleDefinition[] {
    return this.getAllModules().filter(module => module.enabled);
  }
  
  /**
   * Enable a module
   */
  enableModule(id: string): boolean {
    const module = this.modules.get(id);
    if (module) {
      module.enabled = true;
      this.modules.set(id, module);
      return true;
    }
    return false;
  }
  
  /**
   * Disable a module
   */
  disableModule(id: string): boolean {
    const module = this.modules.get(id);
    if (module && !module.required) {
      module.enabled = false;
      this.modules.set(id, module);
      return true;
    }
    return false;
  }
  
  /**
   * Check if a module's dependencies are met
   */
  areDependenciesMet(id: string): boolean {
    const module = this.modules.get(id);
    if (!module || !module.dependencies || module.dependencies.length === 0) {
      return true;
    }
    
    return module.dependencies.every(depId => {
      const dep = this.modules.get(depId);
      return dep && dep.enabled;
    });
  }
  
  /**
   * Update module settings
   */
  updateModuleSettings(id: string, settings: Record<string, any>): boolean {
    const module = this.modules.get(id);
    if (module) {
      module.settings = { ...(module.settings || {}), ...settings };
      this.modules.set(id, module);
      return true;
    }
    return false;
  }
}

// Create and export the singleton instance
export const moduleRegistry = new ModuleRegistry();

// Export the class for testing purposes
export default ModuleRegistry;