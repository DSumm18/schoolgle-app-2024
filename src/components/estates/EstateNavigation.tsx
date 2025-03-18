'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  FileText, 
  Clipboard, 
  AlertTriangle, 
  Calendar, 
  Bell 
} from 'lucide-react';

export default function EstateNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname?.includes(path);
  };

  const navItems = [
    {
      name: 'Overview',
      href: '/modules/estates',
      icon: Home,
    },
    {
      name: 'Risk Assessment',
      href: '/modules/estates/risk-assessment',
      icon: AlertTriangle,
    },
    {
      name: 'Issue Tracker',
      href: '/modules/estates/issue-tracker',
      icon: Clipboard,
    },
    {
      name: 'Activity Management',
      href: '/modules/estates/activity-management',
      icon: Calendar,
    },
    {
      name: 'Incidents',
      href: '/modules/estates/incidents',
      icon: Bell,
    },
  ];

  return (
    <div className="mb-8">
      <nav className="flex overflow-x-auto pb-4">
        <ul className="flex space-x-8">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-1 py-2 text-sm font-medium border-b-2 ${
                    active
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <item.icon className={`mr-2 h-5 w-5 ${active ? 'text-indigo-500' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}