// This is a stub file for the Supabase server client
// In a real app, this would contain the actual server-side client configuration

import { createClient } from '@supabase/supabase-js';

// Empty URL and key since this is a stub
const supabaseUrl = '';
const supabaseKey = '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // For demonstration only, don't persist session
  },
});

// Helper function to get database data with authentication
export const getAuthenticatedData = async (table: string) => {
  // Mock data for demonstration
  const mockData = {
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