'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminIssueTrackerPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Issue Tracker Admin</h1>
      <p className="mb-8 text-gray-600">This is a simplified admin page for the Issue Tracker module.</p>
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-4">Issue Tracker Configuration</h2>
        <p className="text-gray-600 mb-4">
          Configure how the Issue Tracker functions throughout your school.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded">
            <div>
              <h3 className="font-medium">Allow Public Issue Reporting</h3>
              <p className="text-sm text-gray-600">Let non-staff members report issues</p>
            </div>
            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
              <span className="absolute h-4 w-4 rounded-full bg-white left-1"></span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded">
            <div>
              <h3 className="font-medium">Auto-Assignment</h3>
              <p className="text-sm text-gray-600">Automatically assign issues based on type</p>
            </div>
            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600">
              <span className="absolute h-4 w-4 rounded-full bg-white right-1"></span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-gray-600">Send email updates when issues change status</p>
            </div>
            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600">
              <span className="absolute h-4 w-4 rounded-full bg-white right-1"></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Issue Categories</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center p-2 border-b">
              <span>Facilities</span>
              <button className="text-gray-600 hover:text-gray-900">Edit</button>
            </li>
            <li className="flex justify-between items-center p-2 border-b">
              <span>IT & Technology</span>
              <button className="text-gray-600 hover:text-gray-900">Edit</button>
            </li>
            <li className="flex justify-between items-center p-2 border-b">
              <span>Curriculum</span>
              <button className="text-gray-600 hover:text-gray-900">Edit</button>
            </li>
            <li className="flex justify-between items-center p-2 border-b">
              <span>Health & Safety</span>
              <button className="text-gray-600 hover:text-gray-900">Edit</button>
            </li>
            <li className="flex justify-between items-center p-2">
              <span>Administrative</span>
              <button className="text-gray-600 hover:text-gray-900">Edit</button>
            </li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full">
            Add Category
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">User Permissions</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center p-2 border-b">
              <span>Admin Staff</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Full Access</span>
            </li>
            <li className="flex justify-between items-center p-2 border-b">
              <span>Department Heads</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Edit & Assign</span>
            </li>
            <li className="flex justify-between items-center p-2 border-b">
              <span>Teachers</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Report Only</span>
            </li>
            <li className="flex justify-between items-center p-2 border-b">
              <span>Support Staff</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Edit & Assign</span>
            </li>
            <li className="flex justify-between items-center p-2">
              <span>Students</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">No Access</span>
            </li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full">
            Manage Permissions
          </button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Link href="/dashboard" className="px-4 py-2 bg-gray-200 text-gray-800 rounded mr-2 hover:bg-gray-300">
          Cancel
        </Link>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Save Changes
        </button>
      </div>
    </div>
  );
}