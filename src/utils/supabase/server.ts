// This is a stub file for the Supabase server client
// In a real app, this would contain the actual server-side client configuration

import { createClient } from '@supabase/supabase-js';

// Use environment variables or provide default empty values for local dev
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.com';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // For demonstration only, don't persist session
  },
});

// Create server client function (needed for NextAuth)
export const createServerClient = () => {
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
};

// Define types for the mock data
type User = { id: number; name: string; email: string };
type Module = { id: string; name: string; enabled: boolean };

interface MockData {
  users: User[];
  modules: Module[];
  [key: string]: any; // Add index signature to allow string indexing
}

// Helper function to get database data with authentication
export const getAuthenticatedData = async (table: string) => {
  // Mock data for demonstration
  const mockData: MockData = {
    users: [
      { id: 1, name: 'Test User', email: 'test@example.com' }
    ],
    modules: [
      { id: 'activity-management', name: 'Activity Management', enabled: true },
      { id: 'risk-assessment', name: 'Risk Assessment', enabled: true },
      { id: 'issue-tracker', name: 'Issue Tracker', enabled: true },
      { id: 'incidents', name: 'Incidents', enabled: true }
    ]
  };

  // Return mock data based on table request
  return { data: mockData[table] || [], error: null };
};