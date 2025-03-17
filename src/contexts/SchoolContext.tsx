'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for the school data
export interface SchoolLocation {
  latitude: number;
  longitude: number;
  address: string;
}

export interface SchoolModule {
  id: string;
  code: string;
  name: string;
  isEnabled: boolean;
  icon: string;
  color: string;
  darkColor: string;
  route: string;
  description: string;
}

export interface SchoolNews {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
  isFeatured: boolean;
  author?: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  description?: string;
  location?: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
  category?: string;
}

export interface SchoolSocialMedia {
  twitter?: string;  // Twitter/X handle without @
  facebook?: string; // Facebook page name or ID
  instagram?: string;
  youtube?: string;
  linkedin?: string;
}

export interface School {
  id: string;
  name: string;
  domain?: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  location?: SchoolLocation;
  currentAnnouncement?: string;
  news?: SchoolNews[];
  events?: SchoolEvent[];
  enabledModules?: SchoolModule[];
  socialMedia?: SchoolSocialMedia;
  settings?: Record<string, any>;
}

interface SchoolContextType {
  school: School | null;
  isLoading: boolean;
  error: string | null;
  updateSchoolSettings: (settings: Partial<School>) => Promise<void>;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

interface SchoolProviderProps {
  children: ReactNode;
  initialSchool?: School;
}

export function SchoolProvider({ children, initialSchool }: SchoolProviderProps) {
  const [school, setSchool] = useState<School | null>(initialSchool || null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialSchool);
  const [error, setError] = useState<string | null>(null);

  // Fetch school data when no initial data is provided
  useEffect(() => {
    if (!initialSchool) {
      const fetchSchoolData = async () => {
        try {
          setIsLoading(true);
          
          // In a real application, you would fetch from your API
          // For now, we'll use mock data for demonstration
          const mockSchool: School = {
            id: '1',
            name: 'Schoolgle Academy',
            logoUrl: '/logo.svg',
            primaryColor: '#4F46E5',
            secondaryColor: '#818CF8',
            location: {
              latitude: 51.5074,
              longitude: -0.1278,
              address: 'London, UK'
            },
            currentAnnouncement: 'Welcome to the new Schoolgle Intranet! Explore our new features.',
            socialMedia: {
              twitter: 'SchoolgleAcad',
              facebook: 'SchoolgleAcademy',
              instagram: 'schoolgleacademy',
              youtube: 'schoolgleacademy',
              linkedin: 'schoolgle-academy'
            },
            enabledModules: [
              {
                id: '1',
                code: 'teaching',
                name: 'Teaching & Learning',
                isEnabled: true,
                icon: 'BookOpen',
                color: '#4F46E5',
                darkColor: '#6366F1',
                route: '/modules/teaching',
                description: 'Resources and tools for curriculum planning and delivery'
              },
              {
                id: '2',
                code: 'send',
                name: 'SEND',
                isEnabled: true,
                icon: 'Heart',
                color: '#EC4899',
                darkColor: '#F472B6',
                route: '/modules/send',
                description: 'Special Educational Needs and Disabilities support tools'
              },
              {
                id: '3',
                code: 'estates',
                name: 'Estates',
                isEnabled: true,
                icon: 'Building',
                color: '#10B981',
                darkColor: '#34D399',
                route: '/modules/estates',
                description: 'Facilities management and maintenance'
              },
              // Add more modules here
            ],
            news: [
              {
                id: '1',
                title: 'New Curriculum Resources Available',
                content: 'We\'ve added new teaching resources for the science curriculum. Check them out in the Teaching & Learning module.',
                imageUrl: '/images/news/curriculum.jpg',
                publishedAt: '2023-09-15T10:00:00Z',
                isFeatured: true,
                author: 'Admin Team'
              },
              {
                id: '2',
                title: 'Staff Training Day',
                content: 'Reminder: Staff training day scheduled for next Friday. See the Events calendar for details.',
                publishedAt: '2023-09-10T14:30:00Z',
                isFeatured: false,
                author: 'HR Department'
              }
            ],
            events: [
              {
                id: '1',
                title: 'Staff Training Day',
                description: 'Professional development workshop on new assessment methods',
                location: 'Main Hall',
                startTime: '2023-09-22T09:00:00Z',
                endTime: '2023-09-22T16:00:00Z',
                allDay: true,
                category: 'training'
              },
              {
                id: '2',
                title: 'Parent-Teacher Conference',
                description: 'Autumn term parent-teacher meetings',
                location: 'Classrooms',
                startTime: '2023-09-28T15:00:00Z',
                endTime: '2023-09-28T19:00:00Z',
                allDay: false,
                category: 'academic'
              }
            ]
          };

          // Simulate API delay
          setTimeout(() => {
            setSchool(mockSchool);
            setIsLoading(false);
          }, 1000);

        } catch (err) {
          setError('Failed to load school data');
          setIsLoading(false);
          console.error('Error fetching school data:', err);
        }
      };

      fetchSchoolData();
    }
  }, [initialSchool]);

  // Function to update school settings
  const updateSchoolSettings = async (settings: Partial<School>): Promise<void> => {
    try {
      setIsLoading(true);
      
      // In a real application, you would call your API to update settings
      // For demonstration, we'll just update the local state
      setSchool(prevSchool => {
        if (!prevSchool) return null;
        return { ...prevSchool, ...settings };
      });
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to update school settings');
      setIsLoading(false);
      console.error('Error updating school settings:', err);
      throw err; // Re-throw to let the caller handle it
    }
  };

  return (
    <SchoolContext.Provider value={{ school, isLoading, error, updateSchoolSettings }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchoolContext() {
  const context = useContext(SchoolContext);
  if (context === undefined) {
    throw new Error('useSchoolContext must be used within a SchoolProvider');
  }
  return context;
}