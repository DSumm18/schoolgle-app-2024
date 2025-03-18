'use client';

import Link from 'next/link';
import { BookOpen, Users, Calendar, FileText } from 'lucide-react';

export default function TeachingModulePage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Teaching & Learning</h2>
          <Link
            href="/dashboard"
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Return to Dashboard
          </Link>
        </div>
        
        <div className="flex flex-wrap gap-2 border-b pb-4 mb-6">
          <Link
            href="/modules/teaching"
            className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-md text-sm font-medium"
          >
            Overview
          </Link>
          <Link
            href="/modules/teaching/curriculum"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
          >
            Curriculum
          </Link>
          <Link
            href="/modules/teaching/lessons"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
          >
            Lesson Plans
          </Link>
          <Link
            href="/modules/teaching/assessment"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
          >
            Assessment
          </Link>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">Teaching & Learning Module</h1>
      <p className="mb-4">This is a placeholder for the Teaching & Learning module. This section is for demonstration purposes.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              <BookOpen className="h-5 w-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold">Curriculum Resources</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Access and manage curriculum resources for all year groups and subjects.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
              <span>English - Year 7-9 resources updated</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
              <span>Science - New practical worksheets</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
              <span>Mathematics - Exam preparation materials</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Key dates and upcoming events related to teaching and learning.
          </p>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Staff Training Day</span>
              <span className="text-gray-500">15 Mar</span>
            </li>
            <li className="flex justify-between">
              <span>Department Meetings</span>
              <span className="text-gray-500">22 Mar</span>
            </li>
            <li className="flex justify-between">
              <span>Parent-Teacher Conference</span>
              <span className="text-gray-500">29 Mar</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
        <p className="text-indigo-700">
          Note: This is a simplified demonstration of the Teaching & Learning module. The full module would include curriculum management, lesson planning, assessment tracking, and more.
        </p>
      </div>
    </div>
  );
}