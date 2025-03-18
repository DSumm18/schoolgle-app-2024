'use client';

import React, { createContext, useContext, useState } from 'react';

interface School {
  id: string;
  name: string;
  address: string;
  logo?: string;
  currentAnnouncement?: string;
  enabledModules: string[];
  news: any[];
  events: any[];
  socialMedia: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

interface SchoolContextType {
  school: School | null;
  isLoading: boolean;
  error: string | null;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export function SchoolProvider({ children }: { children: React.ReactNode }) {
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);
  
  // Mock school data
  const [school] = useState<School>({
    id: 'school-123',
    name: 'Schoolgle Academy',
    address: '123 Education Street, Learnville',
    logo: '/logo.png',
    currentAnnouncement: 'Welcome to the Schoolgle Intranet Platform. We are testing the Estates modules deployment.',
    enabledModules: ['activity-management', 'risk-assessment', 'issue-tracker', 'incidents'],
    news: [],
    events: [],
    socialMedia: {
      twitter: '@schoolgle'
    }
  });

  return (
    <SchoolContext.Provider
      value={{
        school,
        isLoading,
        error
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
}

export const useSchoolContext = () => {
  const context = useContext(SchoolContext);
  if (context === undefined) {
    throw new Error('useSchoolContext must be used within a SchoolProvider');
  }
  return context;
};