"use client"

import { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';

interface PageWrapperProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export function PageWrapper({ 
  children, 
  title, 
  showHeader = true, 
  showFooter = true 
}: PageWrapperProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {showHeader && <Header title={title} />}
      <main className="flex-grow">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}