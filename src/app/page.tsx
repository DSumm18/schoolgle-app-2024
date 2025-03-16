'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { status } = useSession();
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Schoolgle</h1>
        <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-600">
          A comprehensive school management system designed to streamline operations, 
          enhance communication, and improve educational outcomes.
        </p>
        
        {status === 'authenticated' ? (
          <Link 
            href="/dashboard" 
            className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium inline-block hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/login" 
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium inline-block hover:bg-blue-700 transition"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-md text-lg font-medium inline-block hover:bg-blue-50 transition"
            >
              Create Account
            </Link>
          </div>
        )}
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-white rounded-lg shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'School Management',
                description: 'Efficiently manage resources, staff, and facilities in one place.',
                icon: '🏫'
              },
              {
                title: 'Data Analytics',
                description: 'Gain insights with comprehensive reports and dashboards.',
                icon: '📊'
              },
              {
                title: 'Maintenance Tracking',
                description: 'Monitor and manage maintenance requests and projects.',
                icon: '🔧'
              },
              {
                title: 'Resource Allocation',
                description: 'Optimize the allocation of resources across departments.',
                icon: '📝'
              },
              {
                title: 'Budget Management',
                description: 'Track and manage budgets with detailed financial reporting.',
                icon: '💰'
              },
              {
                title: 'Security & Compliance',
                description: 'Ensure data security and meet regulatory requirements.',
                icon: '🔒'
              }
            ].map((feature, i) => (
              <div key={i} className="text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* API Information */}
      <section className="py-8">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">API Resources</h2>
          <p className="mb-4">Schoolgle provides powerful APIs for integration with other systems:</p>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-1 rounded mr-3 text-blue-600">GET</div>
              <div>
                <Link href="/api/status" className="text-blue-600 hover:underline font-medium">
                  /api/status
                </Link>
                <p className="text-sm text-gray-600">Check API status and health</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-1 rounded mr-3 text-blue-600">GET</div>
              <div>
                <Link href="/api/hello" className="text-blue-600 hover:underline font-medium">
                  /api/hello
                </Link>
                <p className="text-sm text-gray-600">Simple hello endpoint for testing</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-1 rounded mr-3 text-blue-600">GET</div>
              <div>
                <Link href="/api/db-test" className="text-blue-600 hover:underline font-medium">
                  /api/db-test
                </Link>
                <p className="text-sm text-gray-600">Test database connection and functionality</p>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">
            <strong>Note:</strong> Full API documentation is available to authenticated users.
          </p>
        </div>
      </section>
    </div>
  );
}