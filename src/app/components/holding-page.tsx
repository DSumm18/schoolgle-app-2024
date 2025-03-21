'use client';

import { ReactNode } from 'react';

interface HoldingPageProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  comingSoon?: boolean;
  features?: string[]; // Added features property
}

export function HoldingPage({ 
  title, 
  description, 
  icon, 
  comingSoon = true,
  features = [] // Added features parameter with default empty array
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
      
      {features && features.length > 0 && (
        <div className="mt-2 mb-6 text-left w-full max-w-2xl">
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      
      {comingSoon && (
        <div className="mt-4 inline-flex items-center rounded-full border border-yellow-200 bg-yellow-50 px-4 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800">
          Coming Soon
        </div>
      )}
    </div>
  );
}