'use client';

import { ReactNode } from 'react';

interface HoldingPageProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  comingSoon?: boolean;
}

export function HoldingPage({ 
  title, 
  description, 
  icon, 
  comingSoon = true 
}: HoldingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 max-w-4xl mx-auto">
      {icon && (
        <div className="mb-6">
          {icon}
        </div>
      )}
      
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>
      
      {description && (
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
          {description}
        </p>
      )}
      
      {comingSoon && (
        <div className="mt-4 inline-flex items-center rounded-full border border-yellow-200 bg-yellow-50 px-4 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800">
          Coming Soon
        </div>
      )}
    </div>
  );
}