'use client';

import Link from 'next/link';
import { Bell, Search, Settings, Menu } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="font-bold text-xl text-gray-900">
            Schoolgle
          </Link>
          
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-1.5">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm w-48"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
          </button>
          
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings size={20} className="text-gray-600" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
              U
            </div>
            <span className="hidden md:inline text-sm font-medium">User</span>
          </div>
          
          <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
            <Menu size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}