'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tab-components';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { School, Search, Plus, Edit, Trash2 } from 'lucide-react';

// Mock schools data
const schools = [
  {
    id: 1,
    name: 'Hollingwood Primary',
    urn: '107263',
    type: 'Primary Academy',
    address: '123 School Lane, Bradford',
    postcode: 'BD1 2AB',
    phone: '01274 123456',
    pupils: 450,
    status: 'Open'
  },
  {
    id: 2,
    name: 'Crossflatts Primary',
    urn: '107264',
    type: 'Primary Academy',
    address: '456 Education Road, Bradford',
    postcode: 'BD1 3CD',
    phone: '01274 234567',
    pupils: 380,
    status: 'Open'
  },
  {
    id: 3,
    name: 'Frizinghall Primary',
    urn: '107265',
    type: 'Primary Academy',
    address: '789 Learning Street, Bradford',
    postcode: 'BD2 4EF',
    phone: '01274 345678',
    pupils: 410,
    status: 'Open'
  },
  {
    id: 4,
    name: 'Wheatley Academy',
    urn: '107266',
    type: 'Secondary Academy',
    address: '101 Knowledge Avenue, Bradford',
    postcode: 'BD3 5GH',
    phone: '01274 456789',
    pupils: 820,
    status: 'Open'
  },
  {
    id: 5,
    name: 'Parkside School',
    urn: '107267',
    type: 'Secondary Academy',
    address: '202 Education Drive, Bradford',
    postcode: 'BD4 6IJ',
    phone: '01274 567890',
    pupils: 950,
    status: 'Open'
  }
];

// Mock dashboard data
const dashboardData = {
  totalSchools: 5,
  primarySchools: 3,
  secondarySchools: 2,
  totalPupils: 3010,
  averagePupilsPerSchool: 602,
  schoolsByStatus: {
    open: 5,
    closed: 0,
    consultingToClosure: 0,
    proposedToOpen: 0
  }
};

export default function SchoolTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  
  // Filter schools based on search term and selected tab
  const filteredSchools = schools.filter(school => {
    const matchesSearch = 
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.urn.includes(searchTerm) ||
      school.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.postcode.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === 'all') return matchesSearch;
    if (selectedTab === 'primary') return matchesSearch && school.type.includes('Primary');
    if (selectedTab === 'secondary') return matchesSearch && school.type.includes('Secondary');
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">School Management</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage schools in your trust</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add School
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <School className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-medium">Total Schools</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{dashboardData.totalSchools}</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {dashboardData.primarySchools} Primary | {dashboardData.secondarySchools} Secondary
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <School className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="text-lg font-medium">Total Pupils</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{dashboardData.totalPupils}</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Avg. {dashboardData.averagePupilsPerSchool} per school
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <School className="h-5 w-5 text-amber-500 mr-2" />
              <h3 className="text-lg font-medium">School Status</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{dashboardData.schoolsByStatus.open}</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Open schools
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-4">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search schools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full md:w-[300px]"
          />
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Schools</TabsTrigger>
            <TabsTrigger value="primary">Primary</TabsTrigger>
            <TabsTrigger value="secondary">Secondary</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHead className="font-semibold">School Name</TableHead>
              <TableHead className="font-semibold">URN</TableHead>
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold hidden md:table-cell">Location</TableHead>
              <TableHead className="font-semibold hidden md:table-cell">Pupils</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchools.length > 0 ? (
              filteredSchools.map((school) => (
                <TableRow key={school.id} className="border-t border-gray-200 dark:border-gray-700">
                  <TableCell className="font-medium">{school.name}</TableCell>
                  <TableCell>{school.urn}</TableCell>
                  <TableCell>{school.type}</TableCell>
                  <TableCell className="hidden md:table-cell">{school.postcode}</TableCell>
                  <TableCell className="hidden md:table-cell">{school.pupils}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No schools found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}