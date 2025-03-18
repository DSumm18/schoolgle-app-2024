// This is a stub file for the Supabase client
// In a real app, this would contain the actual client configuration

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

// Helper function to get user session
export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return null;
  }
  return data?.user || null;
};

// Dummy function to check if user is authenticated
export const isAuthenticated = async () => {
  const user = await getUser();
  return !!user;
};