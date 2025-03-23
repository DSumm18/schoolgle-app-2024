// This is a stub implementation of the Supabase client
// In a real application, you would use the actual Supabase client

import { createClient } from '@supabase/supabase-js';

// Using empty string as default values to prevent errors during build
// In production, these would be actual environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Define proper types for session and errors
export interface SupabaseSession {
  user: {
    id: string;
    email: string;
    name: string;
  };
  expires_at: number;
}

export interface SupabaseError {
  message: string;
}

// Mock session data for demonstration
const mockSession: SupabaseSession = {
  user: {
    id: 'user-123',
    email: 'user@example.com',
    name: 'Demo User',
  },
  expires_at: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
};

export const supabase = createClient(supabaseUrl, supabaseKey);

// Added for compatibility with components using this pattern
export const createBrowserClient = () => {
  return supabase;
};

// Get user session
export const getSession = async () => {
  // In a real app, this would fetch the actual session
  // For demo purposes, we'll just return a mock session
  return { 
    data: { session: mockSession }, 
    error: null as SupabaseError | null  // Explicitly type the error
  };
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  const { data, error } = await getSession();
  return !!data.session && !error;
};

// Generic fetch data function
export const fetchData = async (table: string) => {
  // In a real app, this would query the specified table
  // For demo purposes, return mock data
  const mockData = {
    'users': [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }],
    'posts': [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }],
    'comments': [{ id: 1, text: 'Comment 1' }, { id: 2, text: 'Comment 2' }],
  };

  return { data: mockData[table as keyof typeof mockData] || [], error: null as SupabaseError | null };
};