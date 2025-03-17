'use client';

import { useState, useEffect } from 'react';
import { useModules } from '@/contexts/ModuleContext';
import { useSchoolContext } from '@/contexts/SchoolContext';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Info, ChevronRight, Settings } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ModuleDefinition } from '@/lib/modules/types';

export default function ModuleAdminPage() {
  const { data: session, status } = useSession();
  const { modules, enabledModules, enableModule, disableModule, updateModuleSettings, isLoading, error } = useModules();
  const { school } = useSchoolContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Filter modules by category
  const filteredModules = selectedCategory === 'all' 
    ? modules 
    : modules.filter(module => module.category === selectedCategory);
  
  // Group modules by category
  const categories = [...new Set(modules.map(module => module.category))];
  
  if (status === 'loading' || isLoading) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading module information...</p>
        </div>
      </div>
    );
  }
  
  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              You must be logged in as an administrator to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login" className="text-primary hover:underline">
              Go to Login
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const toggleModuleStatus = async (module: ModuleDefinition) => {
    if (!school) return;
    
    if (module.enabled) {
      await disableModule(module.id, school.id);
    } else {
      await enableModule(module.id, school.id);
    }
  };
  
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Module Management</h1>
        <p className="text-muted-foreground">
          Enable or disable modules for your school. Changes will affect all users.
        </p>
        
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3 text-red-800">
            <AlertTriangle className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}
      </div>
      
      <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
        <div className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Modules</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)} Modules
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <TabsContent value={selectedCategory} className="mt-0">
          <div className="grid gap-6">
            {filteredModules.map(module => (
              <Card key={module.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <div 
                          className="h-5 w-5 rounded-full" 
                          style={{ backgroundColor: module.color }}
                        />
                        {module.name}
                        {module.required && (
                          <Badge variant="outline" className="ml-2">Required</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      {module.required ? (
                        <div className="text-sm text-muted-foreground">Always enabled</div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={module.enabled}
                            onCheckedChange={() => toggleModuleStatus(module)}
                            disabled={module.required}
                          />
                          <span className="text-sm font-medium">
                            {module.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="mb-2 text-sm font-semibold">Details</h4>
                        <dl className="grid grid-cols-2 gap-1 text-sm">
                          <dt className="text-muted-foreground">ID:</dt>
                          <dd>{module.id}</dd>
                          <dt className="text-muted-foreground">Version:</dt>
                          <dd>{module.version}</dd>
                          <dt className="text-muted-foreground">Author:</dt>
                          <dd>{module.author}</dd>
                          <dt className="text-muted-foreground">Category:</dt>
                          <dd>{module.category}</dd>
                        </dl>
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-semibold">Permissions</h4>
                        <div className="space-y-1">
                          {module.permissions.slice(0, 3).map(permission => (
                            <div key={permission.action} className="text-sm">
                              <span className="font-medium">{permission.action}</span>: {permission.roles.join(', ')}
                            </div>
                          ))}
                          {module.permissions.length > 3 && (
                            <div className="text-sm text-muted-foreground">
                              And {module.permissions.length - 3} more...
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="pt-2">
                      <h4 className="mb-3 text-sm font-semibold">Routes</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {module.routes.map(route => (
                          <Link 
                            key={route.path} 
                            href={module.enabled ? route.path : '#'}
                            className={`p-3 border rounded-md flex items-center justify-between hover:bg-muted transition-colors ${!module.enabled ? 'opacity-50 pointer-events-none' : ''}`}
                          >
                            <div>
                              <div className="font-medium">{route.name}</div>
                              <div className="text-xs text-muted-foreground">{route.description}</div>
                            </div>
                            <ChevronRight className="h-4 w-4 opacity-50" />
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    {/* Module settings button - for future use */}
                    <div className="flex justify-end pt-4">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}