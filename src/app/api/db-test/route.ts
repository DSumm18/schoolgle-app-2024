import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/server';

export async function GET() {
  try {
    // Mock data instead of actual Supabase query
    const mockData = {
      status: 'success',
      message: 'API route working',
      data: {
        modules: [
          { id: 'activity-management', name: 'Activity Management', enabled: true },
          { id: 'risk-assessment', name: 'Risk Assessment', enabled: true },
          { id: 'issue-tracker', name: 'Issue Tracker', enabled: true },
          { id: 'incidents', name: 'Incidents', enabled: true }
        ]
      }
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    // Mock response for POST request
    return NextResponse.json(
      { status: 'success', message: 'Data received successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to process data' },
      { status: 500 }
    );
  }
}