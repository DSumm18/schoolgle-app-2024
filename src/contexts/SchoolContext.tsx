'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type School = {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  socialMedia: {
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
};

type SchoolContextType = {
  school: School;
  updateSchool: (newSchool: Partial<School>) => void;
};

const defaultSchool: School = {
  name: 'Schoolgle Academy',
  logo: '/images/logo.svg',
  primaryColor: '#3b82f6',
  secondaryColor: '#60a5fa',
  address: '123 Education St, Learning City, ED1 2LN',
  phone: '+44 1234 567890',
  email: 'info@schoolgle.edu',
  website: 'https://schoolgle.edu',
  socialMedia: {
    twitter: 'schoolgle_edu',
    facebook: 'schoolgleEdu',
    instagram: 'schoolgle_edu',
    youtube: 'SchoolgleEdu',
    linkedin: 'schoolgle-education'
  }
};

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export function SchoolProvider({ children }: { children: ReactNode }) {
  const [school, setSchool] = useState<School>(defaultSchool);

  const updateSchool = (newSchool: Partial<School>) => {
    setSchool(prev => ({
      ...prev,
      ...newSchool
    }));
  };

  return (
    <SchoolContext.Provider value={{ school, updateSchool }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const context = useContext(SchoolContext);
  
  if (context === undefined) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  
  return context;
}