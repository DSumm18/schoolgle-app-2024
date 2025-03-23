'use client';

import { useState, useEffect } from 'react';
import { supabase, getSession } from '@/utils/supabase/client';
import { useSession } from 'next-auth/react';

// Define error type to fix TypeScript error
interface SupabaseError {
  message: string;
}

export default function AuthStatus() {
  const { data: session, status: authStatus } = useSession();
  const [dbStatus, setDbStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [dbMessage, setDbMessage] = useState<string>('');
  const [testResults, setTestResults] = useState<any>(null);

  // Test database connection
  useEffect(() => {
    const testDbConnection = async () => {
      try {
        const response = await fetch('/api/db-test');
        const result = await response.json();
        
        if (result.success) {
          setDbStatus('connected');
          setDbMessage('Database connection successful');
        } else {
          setDbStatus('error');
          setDbMessage(`Database error: ${result.message}`);
        }
        
        setTestResults(result);
      } catch (error: any) {
        setDbStatus('error');
        setDbMessage(`Connection error: ${error.message}`);
        console.error('Error testing database connection:', error);
      }
    };

    testDbConnection();
  }, []);

  // Test Supabase client
  const testSupabaseClient = async () => {
    try {
      // Use the imported supabase client instead of creating a new one
      const { data, error } = await getSession();
      
      if (error) {
        console.error('Supabase client error:', error);
        // Convert error to string if it doesn't have a message property
        const errorMessage = typeof error === 'object' && error !== null && 'message' in error 
          ? (error as SupabaseError).message 
          : String(error);
        return { success: false, message: errorMessage };
      }
      
      return { 
        success: true, 
        message: 'Supabase client working',
        session: data?.session ? 'Active' : 'None'
      };
    } catch (error: any) {
      console.error('Error testing Supabase client:', error);
      return { success: false, message: error.message };
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">System Status</h2>
      
      <div className="space-y-4">
        {/* NextAuth Status */}
        <div className="flex items-center justify-between">
          <span className="font-medium">NextAuth:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            authStatus === 'loading' ? 'bg-yellow-100 text-yellow-800' :
            authStatus === 'authenticated' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {authStatus === 'loading' ? 'Checking...' :
             authStatus === 'authenticated' ? 'Authenticated' :
             'Not Authenticated'}
          </span>
        </div>

        {/* Database Status */}
        <div className="flex items-center justify-between">
          <span className="font-medium">Database:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            dbStatus === 'loading' ? 'bg-yellow-100 text-yellow-800' :
            dbStatus === 'connected' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {dbStatus === 'loading' ? 'Checking...' :
             dbStatus === 'connected' ? 'Connected' :
             'Error'}
          </span>
        </div>

        {/* Session Info */}
        {authStatus === 'authenticated' && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Session Info:</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-xs font-mono overflow-auto max-h-40">
              <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
          </div>
        )}

        {/* DB Test Results */}
        {testResults && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Database Test:</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-xs font-mono overflow-auto max-h-40">
              <pre>{JSON.stringify(testResults, null, 2)}</pre>
            </div>
          </div>
        )}

        {/* Test Supabase Button */}
        <button
          onClick={async () => {
            const result = await testSupabaseClient();
            alert(JSON.stringify(result, null, 2));
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
        >
          Test Supabase Client
        </button>
      </div>
    </div>
  );
}