'use client';

import { useState } from 'react';
import { Calendar, Clock, Plus, Filter, Search, FileText, CheckCircle, XCircle } from 'lucide-react';
import EstateNavigation from '@/components/estates/EstateNavigation';

// Mock data for activities
const mockActivities = [
  {
    id: 1,
    title: 'Annual Fire Safety Inspection',
    type: 'Safety',
    status: 'Scheduled',
    priority: 'High',
    assignedTo: 'John Smith',
    startDate: '2024-03-20',
    endDate: '2024-03-21',
    location: 'All Buildings',
    description: 'Comprehensive fire safety inspection across all school buildings.',
  },
  {
    id: 2,
    title: 'Playground Equipment Maintenance',
    type: 'Maintenance',
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: 'Sarah Johnson',
    startDate: '2024-03-18',
    endDate: '2024-03-19',
    location: 'Main Playground',
    description: 'Regular maintenance check of all playground equipment.',
  },
  {
    id: 3,
    title: 'HVAC System Service',
    type: 'Maintenance',
    status: 'Completed',
    priority: 'High',
    assignedTo: 'Mike Brown',
    startDate: '2024-03-15',
    endDate: '2024-03-16',
    location: 'All Buildings',
    description: 'Quarterly HVAC system service and filter replacement.',
  },
  {
    id: 4,
    title: 'Security Camera Installation',
    type: 'Security',
    status: 'Scheduled',
    priority: 'High',
    assignedTo: 'Tech Team',
    startDate: '2024-03-25',
    endDate: '2024-03-27',
    location: 'Building Entrances',
    description: 'Installation of new security cameras at all building entrances.',
  },
  {
    id: 5,
    title: 'Grounds Maintenance',
    type: 'Maintenance',
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: 'Grounds Team',
    startDate: '2024-03-17',
    endDate: '2024-03-18',
    location: 'School Grounds',
    description: 'Regular maintenance of school grounds including lawn care and landscaping.',
  },
];

// Activity types with colors
const activityTypes = [
  { id: 1, name: 'Safety', color: 'bg-red-100 text-red-800' },
  { id: 2, name: 'Maintenance', color: 'bg-blue-100 text-blue-800' },
  { id: 3, name: 'Security', color: 'bg-purple-100 text-purple-800' },
  { id: 4, name: 'Environmental', color: 'bg-green-100 text-green-800' },
  { id: 5, name: 'Other', color: 'bg-gray-100 text-gray-800' },
];

// Priority levels with colors
const priorityLevels = [
  { id: 1, name: 'High', color: 'bg-red-100 text-red-800' },
  { id: 2, name: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { id: 3, name: 'Low', color: 'bg-green-100 text-green-800' },
];

// Status options with colors
const statusOptions = [
  { id: 1, name: 'Scheduled', color: 'bg-blue-100 text-blue-800' },
  { id: 2, name: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
  { id: 3, name: 'Completed', color: 'bg-green-100 text-green-800' },
  { id: 4, name: 'Cancelled', color: 'bg-red-100 text-red-800' },
];

export default function ActivityManagementPage() {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [showNewActivityModal, setShowNewActivityModal] = useState(false);

  // Filter activities based on search query and filters
  const filteredActivities = mockActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter ? activity.status === statusFilter : true;
    const matchesType = typeFilter ? activity.type === typeFilter : true;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Helper function to get type color
  const getTypeColor = (typeName: string) => {
    const type = activityTypes.find(t => t.name === typeName);
    return type ? type.color : 'bg-gray-100 text-gray-800';
  };

  // Helper function to get status color
  const getStatusColor = (statusName: string) => {
    const status = statusOptions.find(s => s.name === statusName);
    return status ? status.color : 'bg-gray-100 text-gray-800';
  };

  // Helper function to get priority color
  const getPriorityColor = (priorityName: string) => {
    const priority = priorityLevels.find(p => p.name === priorityName);
    return priority ? priority.color : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">Activity Management</h1>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-2 sm:px-0">
            <EstateNavigation />

            {/* Activity Statistics */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Scheduled Activities</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {mockActivities.filter(a => a.status === 'Scheduled').length}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {mockActivities.filter(a => a.status === 'In Progress').length}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {mockActivities.filter(a => a.status === 'Completed').length}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                      <XCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Cancelled</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {mockActivities.filter(a => a.status === 'Cancelled').length}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative rounded-md shadow-sm flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative inline-block text-left">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={statusFilter || ''}
                  onChange={(e) => setStatusFilter(e.target.value || null)}
                >
                  <option value="">All Statuses</option>
                  {statusOptions.map((status) => (
                    <option key={status.id} value={status.name}>{status.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="relative inline-block text-left">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={typeFilter || ''}
                  onChange={(e) => setTypeFilter(e.target.value || null)}
                >
                  <option value="">All Types</option>
                  {activityTypes.map((type) => (
                    <option key={type.id} value={type.name}>{type.name}</option>
                  ))}
                </select>
              </div>
              
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setShowNewActivityModal(true)}
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Activity
              </button>
            </div>

            {/* Activities Table */}
            <div className="mt-6 flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Activity
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Dates
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredActivities.map((activity) => (
                          <tr key={activity.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                              <div className="text-sm text-gray-500">Assigned to: {activity.assignedTo}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(activity.type)}`}>
                                {activity.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(activity.status)}`}>
                                {activity.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(activity.priority)}`}>
                                {activity.priority}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div>{activity.startDate}</div>
                              <div>{activity.endDate}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {activity.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}