'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info';
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80";
      case "destructive":
        return "border-transparent bg-red-500 text-gray-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/80";
      case "outline":
        return "text-gray-950 dark:text-gray-50";
      case "success":
        return "border-transparent bg-green-500 text-gray-50 hover:bg-green-500/80 dark:bg-green-900 dark:text-gray-50 dark:hover:bg-green-900/80";
      case "warning":
        return "border-transparent bg-yellow-500 text-gray-50 hover:bg-yellow-500/80 dark:bg-yellow-900 dark:text-gray-50 dark:hover:bg-yellow-900/80";
      case "info":
        return "border-transparent bg-blue-500 text-gray-50 hover:bg-blue-500/80 dark:bg-blue-900 dark:text-gray-50 dark:hover:bg-blue-900/80";
      default:
        return "border-transparent bg-gray-900 text-gray-50 hover:bg-gray-900/80 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/80";
    }
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:focus:ring-gray-300",
        getVariantClasses(),
        className
      )} 
      {...props} 
    />
  );
}

export { Badge };