'use client';

import Link from 'next/link';

export default function EstateNavigation() {
  const estateModules = [
    {
      id: "activity-management",
      name: "Activity Management",
      path: "/modules/estates/activity-management"
    },
    {
      id: "risk-assessment",
      name: "Risk Assessment",
      path: "/modules/estates/risk-assessment"
    },
    {
      id: "issue-tracker",
      name: "School Issue Tracker",
      path: "/modules/estates/issue-tracker"
    },
    {
      id: "incidents",
      name: "Incidents",
      path: "/modules/estates/incidents"
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Estates Management</h2>
        <Link
          href="/dashboard"
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          Return to Dashboard
        </Link>
      </div>
      
      <div className="flex flex-wrap gap-2 border-b pb-4 mb-6">
        {estateModules.map(module => (
          <Link
            key={module.id}
            href={module.path}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
          >
            {module.name}
          </Link>
        ))}
      </div>
    </div>
  );
}