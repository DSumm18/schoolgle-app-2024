'use client';

import { ModuleDefinition } from '@/lib/modules/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  module: ModuleDefinition;
  index?: number;
}

export function ModuleCard({ module, index = 0 }: ModuleCardProps) {
  // Find the default route or use the first one
  const defaultRoute = module.routes.find(route => route.isDefaultRoute) || module.routes[0];
  
  // Dynamic icon component based on module.icon string (this is a simplified version)
  const IconComponent = () => {
    return (
      <div 
        className="h-10 w-10 rounded-full flex items-center justify-center" 
        style={{ backgroundColor: `${module.color}20` }}
      >
        <div 
          className="h-5 w-5 rounded-full" 
          style={{ backgroundColor: module.color }}
        />
      </div>
    );
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.4 }}
    >
      <Card className={cn(
        "hover:shadow-md transition-shadow overflow-hidden",
        !module.enabled && "opacity-50 pointer-events-none"
      )}>
        <div 
          className="h-1 w-full" 
          style={{ backgroundColor: module.color }}
        />
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <IconComponent />
            <span 
              className="text-xs rounded-full px-2 py-0.5" 
              style={{ 
                backgroundColor: `${module.color}15`, 
                color: module.color 
              }}
            >
              {module.category}
            </span>
          </div>
          <CardTitle className="mt-4">{module.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {module.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {module.routes.slice(0, 4).map((route, idx) => (
              <Link 
                key={idx} 
                href={module.enabled ? route.path : '#'}
                className="text-sm hover:underline text-muted-foreground hover:text-foreground transition-colors line-clamp-1"
              >
                {route.name}
              </Link>
            ))}
          </div>
          {module.routes.length > 4 && (
            <p className="text-xs text-muted-foreground mt-1">
              And {module.routes.length - 4} more routes...
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Link href={module.enabled ? defaultRoute.path : '#'} className="w-full">
            <Button variant="outline" className="w-full flex items-center justify-between">
              <span>Go to {module.name}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}