import { NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    // Create server Supabase client
    const supabase = createServerClient();
    
    // Test the connection with a simple query
    const { data, error } = await supabase.from('test').select('*').limit(5);
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ 
        success: false, 
        message: 'Database connection error', 
        error: error.message 
      }, { status: 500 });
    }
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Supabase connection successful',
      data: data || [] 
    });
    
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    }, { status: 500 });
  }
}