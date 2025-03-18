'use client';

import { useState } from 'react';
import { BellRing, Calendar, Clock, Filter, Plus, Search, FileText, AlertCircle, Eye } from 'lucide-react';
import Link from 'next/link';
import EstateNavigation from '@/components/estates/EstateNavigation';

// Mock data for incident types
const incidentTypes = [
  { id: 1, name: 'Health & Safety', color: 'bg-red-100 text-red-800' },
  { id: 2, name: 'Maintenance', color: 'bg-blue-100 text-blue-800' },
  { id: 3, name: 'Security', color: 'bg-purple-100 text-purple-800' },
  { id: 4, name: 'Environmental', color: 'bg-green-100 text-green-800' },
  { id: 5, name: 'Other', color: 'bg-gray-100 text-gray-800' },
];

// Mock data for incident severity
const severityLevels = [
  { id: 1, name: 'Critical', color: 'bg-red-100 text-red-800' },
  { id: 2, name: 'High', color: 'bg-orange-100 text-orange-800' },
  { id: 3, name: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { id: 4, name: 'Low', color: 'bg-green-100 text-green-800' },
];

// Mock data for incident status
const statusOptions = [
  { id: 1, name: 'Open', color: 'bg-red-100 text-red-800' },
  { id: 2, name: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  { id: 3, name: 'Under Review', color: 'bg-purple-100 text-purple-800' },
  { id: 4, name: 'Resolved', color: 'bg-green-100 text-green-800' },
  { id: 5, name: 'Closed', color: 'bg-gray-100 text-gray-800' },
];

// Mock data for incidents
const mockIncidents = [
  {
    id: 1,
    title: 'Broken Window in Science Block',
    type: 'Maintenance',
    reportedBy: 'John Smith',
    reportedDate: '2024-03-15',
    status: 'Open',
    severity: 'Medium',
    location: 'Science Block, Room 103',
    description: 'Window broken due to strong winds last night. Glass shards on the floor, area has been cordoned off.',
  },
  {
    id: 2,
    title: 'Water Leak in Main Hall',
    type: 'Maintenance',
    reportedBy: 'Sarah Johnson',
    reportedDate: '2024-03-14',
    status: 'In Progress',
    severity: 'High',
    location: 'Main Hall, East Corner',
    description: 'Water leaking from ceiling. Maintenance team has been notified and will assess damage.',
  },
  {
    id: 3,
    title: 'Student Injury on Playground',
    type: 'Health & Safety',
    reportedBy: 'Michael Brown',
    reportedDate: '2024-03-13',
    status: 'Under Review',
    severity: 'High',
    location: 'South Playground',
    description: 'Student fell from climbing frame. First aid was administered and parents were contacted.',
  },
  {
    id: 4,
    title: 'Vandalism in Boys Bathroom',
    type: 'Security',
    reportedBy: 'David Williams',
    reportedDate: '2024-03-10',
    status: 'Resolved',
    severity: 'Medium',
    location: 'Main Building, Boys Bathroom',
    description: 'Graffiti found on bathroom walls. CCTV footage being reviewed to identify culprits.',
  },
  {
    id: 5,
    title: 'Waste Disposal Issue',
    type: 'Environmental',
    reportedBy: 'Emma Wilson',
    reportedDate: '2024-03-08',
    status: 'Closed',
    severity: 'Low',
    location: 'Canteen Area',
    description: 'Waste bins overflowing. Janitorial staff have been informed to increase collection frequency.',
  },
];

// Helper function to get incident type color based on type name
const getTypeColor = (typeName: string) => {
  const type = incidentTypes.find(t => t.name === typeName);
  return type ? type.color : 'bg-gray-100 text-gray-800';
};

// Helper function to get incident status color based on status name
const getStatusColor = (statusName: string) => {
  const status = statusOptions.find(s => s.name === statusName);
  return status ? status.color : 'bg-gray-100 text-gray-800';
};

// Helper function to get incident severity color based on severity name
const getSeverityColor = (severityName: string) => {
  const severity = severityLevels.find(s => s.name === severityName);
  return severity ? severity.color : 'bg-gray-100 text-gray-800';
};

export default function IncidentsPage() {
  const [view, setView] = useState<'list' | 'details'>('list');
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  // Filter incidents based on search query and filters
  const filteredIncidents = mockIncidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          incident.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter ? incident.status === statusFilter : true;
    const matchesType = typeFilter ? incident.type === typeFilter : true;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewIncident = (incident: any) => {
    setSelectedIncident(incident);
    setView('details');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedIncident(null);
  };

  // Dashboard statistics
  const openIncidents = mockIncidents.filter(i => i.status === 'Open').length;
  const inProgressIncidents = mockIncidents.filter(i => i.status === 'In Progress').length;
  const resolvedIncidents = mockIncidents.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;
  const criticalIncidents = mockIncidents.filter(i => i.severity === 'Critical' || i.severity === 'High').length;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">Schoolgle Incidents</h1>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-2 sm:px-0">
            <EstateNavigation />

            {/* Dashboard */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Open Incidents</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{openIncidents}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{inProgressIncidents}</div>
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
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Resolved</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{resolvedIncidents}</div>
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
                      <BellRing className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Critical/High</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{criticalIncidents}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {view === 'list' ? (
              <div className="mt-6">
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                  <div className="relative rounded-md shadow-sm flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Search incidents..."
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
                      {incidentTypes.map((type) => (
                        <option key={type.id} value={type.name}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    New Incident
                  </button>
                </div>

                {/* Incidents Table */}
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Incident
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Severity
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Reported Date
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                              </th>
                              <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">View</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filteredIncidents.map((incident) => (
                              <tr key={incident.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{incident.title}</div>
                                  <div className="text-sm text-gray-500">Reported by: {incident.reportedBy}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(incident.type)}`}>
                                    {incident.type}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(incident.status)}`}>
                                    {incident.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(incident.severity)}`}>
                                    {incident.severity}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {incident.reportedDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {incident.location}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button 
                                    onClick={() => handleViewIncident(incident)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    <Eye className="h-5 w-5" />
                                  </button>
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
            ) : (
              <div className="mt-6">
                {/* Incident Details View */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Incident Details</h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">Full information about the incident.</p>
                    </div>
                    <button
                      onClick={handleBackToList}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Back to List
                    </button>
                  </div>
                  <div className="border-t border-gray-200">
                    {selectedIncident && (
                      <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Title</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedIncident.title}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Type</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(selectedIncident.type)}`}>
                              {selectedIncident.type}
                            </span>
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Status</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedIncident.status)}`}>
                              {selectedIncident.status}
                            </span>
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Severity</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(selectedIncident.severity)}`}>
                              {selectedIncident.severity}
                            </span>
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Reported By</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedIncident.reportedBy}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Reported Date</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedIncident.reportedDate}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Location</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedIncident.location}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Description</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedIncident.description}</dd>
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-gray-50 px-4 py-5 sm:px-6">
                          <div className="flex justify-end space-x-3">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Edit Incident
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Update Status
                            </button>
                          </div>
                        </div>
                      </dl>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}