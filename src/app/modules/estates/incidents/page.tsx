'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  AlertTriangle,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  FileText,
  Filter,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  UserCheck,
  Users,
  XCircle
} from 'lucide-react';

import { 
  Avatar,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Badge,
  Progress
} from '@/components/ui';
import { useModules } from '@/contexts/ModuleContext';
import { useToast } from '@/hooks/useToast';

// Mock data structures
const incidentTypes = [
  { id: 'safety', name: 'Health & Safety', count: 15 },
  { id: 'behavior', name: 'Behavioral', count: 12 },
  { id: 'security', name: 'Security', count: 8 },
  { id: 'facility', name: 'Facility Damage', count: 10 },
  { id: 'medical', name: 'Medical Emergency', count: 5 },
  { id: 'other', name: 'Other', count: 3 }
];

const incidentSeverity = [
  { value: 'low', label: 'Low', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
  { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' }
];

const incidentStatus = [
  { value: 'reported', label: 'Reported', color: 'text-blue-500 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  { value: 'investigating', label: 'Investigating', color: 'text-yellow-500 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { value: 'action_taken', label: 'Action Taken', color: 'text-purple-500 dark:text-purple-400', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
  { value: 'resolved', label: 'Resolved', color: 'text-green-500 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  { value: 'closed', label: 'Closed', color: 'text-gray-500 dark:text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-800' }
];

const mockLocations = [
  'Main Building - Ground Floor',
  'Main Building - First Floor',
  'Science Block',
  'Sports Hall',
  'Playground',
  'Cafeteria',
  'Library',
  'Reception Area',
  'Staff Room',
  'Parking Lot'
];

const mockIncidents = [
  {
    id: 'INC-2024-001',
    title: 'Student Injury in Sports Hall',
    type: 'medical',
    severity: 'high',
    status: 'resolved',
    location: 'Sports Hall',
    reportedBy: {
      name: 'Sarah Johnson',
      role: 'PE Teacher'
    },
    dateReported: '2024-03-15 09:30',
    description: 'Student sustained ankle injury during PE class. First aid administered and parents notified.',
    involvedParties: ['Student: John Smith', 'PE Teacher: Sarah Johnson', 'First Aider: Mike Wilson'],
    actions: [
      { date: '2024-03-15 09:35', action: 'First aid administered', by: 'Mike Wilson' },
      { date: '2024-03-15 09:40', action: 'Parents contacted', by: 'Sarah Johnson' },
      { date: '2024-03-15 10:15', action: 'Student collected by parent', by: 'Reception Staff' }
    ]
  },
  {
    id: 'INC-2024-002',
    title: 'Broken Window in Science Lab',
    type: 'facility',
    severity: 'medium',
    status: 'action_taken',
    location: 'Science Block',
    reportedBy: {
      name: 'David Thompson',
      role: 'Science Teacher'
    },
    dateReported: '2024-03-14 14:15',
    description: 'Window cracked due to strong winds. Area has been cordoned off.',
    involvedParties: ['Science Teacher: David Thompson', 'Caretaker: Bob Martin'],
    actions: [
      { date: '2024-03-14 14:20', action: 'Area secured', by: 'David Thompson' },
      { date: '2024-03-14 14:30', action: 'Maintenance notified', by: 'Reception' }
    ]
  },
  {
    id: 'INC-2024-003',
    title: 'Unauthorized Access Attempt',
    type: 'security',
    severity: 'high',
    status: 'investigating',
    location: 'Main Building - Ground Floor',
    reportedBy: {
      name: 'Emma Williams',
      role: 'Security Staff'
    },
    dateReported: '2024-03-16 08:45',
    description: 'Suspicious individual attempted to enter through side entrance without proper authorization.',
    involvedParties: ['Security Staff: Emma Williams', 'Reception Staff: Jane Cooper'],
    actions: [
      { date: '2024-03-16 08:50', action: 'Security alerted', by: 'Jane Cooper' },
      { date: '2024-03-16 08:55', action: 'CCTV footage reviewed', by: 'Emma Williams' }
    ]
  }
];

// Mock Component for incident summary dashboard
const IncidentSummaryDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Incidents', value: 8, icon: AlertTriangle, color: 'text-yellow-500 dark:text-yellow-400' },
          { label: 'Resolved Today', value: 5, icon: CheckCircle2, color: 'text-green-500 dark:text-green-400' },
          { label: 'High Priority', value: 3, icon: Shield, color: 'text-red-500 dark:text-red-400' },
          { label: 'Avg. Resolution Time', value: '2.5h', icon: Clock, color: 'text-blue-500 dark:text-blue-400' }
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color.replace('text', 'bg').replace('500', '100').replace('400', '900/30')}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Incident Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Incident Distribution</CardTitle>
            <CardDescription>By type in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incidentTypes.map(type => (
                <div key={type.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{type.name}</span>
                    <span className="font-medium">{type.count}</span>
                  </div>
                  <Progress value={(type.count / 15) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest incident updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockIncidents.slice(0, 4).map((incident, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-2 h-2 mt-2 rounded-full ${
                    incident.severity === 'high' ? 'bg-red-500' :
                    incident.severity === 'medium' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{incident.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {incident.dateReported}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Mock Component for incident list
const IncidentList = ({ searchFilter = '', statusFilter = 'all', severityFilter = 'all', typeFilter = 'all' }) => {
  return (
    <div className="space-y-4">
      {mockIncidents.map(incident => {
        const status = incidentStatus.find(s => s.value === incident.status);
        const severity = incidentSeverity.find(s => s.value === incident.severity);
        const type = incidentTypes.find(t => t.id === incident.type);

        return (
          <Card key={incident.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {incident.title}
                  </CardTitle>
                  <CardDescription>
                    {incident.id} • Reported: {incident.dateReported}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={severity?.color}>
                    {severity?.label}
                  </Badge>
                  <Badge className={status?.bgColor}>
                    {status?.label}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {incident.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Type</p>
                  <p className="font-medium">{type?.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-medium">{incident.location}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Reported By</p>
                  <p className="font-medium">{incident.reportedBy.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Actions Taken</p>
                  <p className="font-medium">{incident.actions.length}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap justify-between gap-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <div className="flex flex-wrap gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <UserCheck size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Update Status</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <FileText size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add Note</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuItem>Add Action</DropdownMenuItem>
                    <DropdownMenuItem>Generate Report</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 dark:text-red-400">Close Incident</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

// Main Incidents page component
export default function IncidentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isModuleEnabled } = useModules();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showNewIncidentDialog, setShowNewIncidentDialog] = useState(false);
  
  // Check if user is authenticated and module is enabled
  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
    </div>;
  }
  
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }
  
  if (!isModuleEnabled('incidents')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <AlertTriangle size={64} className="text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Module Not Available</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
          The Incidents module is not enabled for your school. Please contact your administrator.
        </p>
        <Button onClick={() => router.push('/dashboard')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="container mx-auto px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Incidents</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage incidents across your school
          </p>
        </div>
        
        <Dialog open={showNewIncidentDialog} onOpenChange={setShowNewIncidentDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={16} className="mr-1" />
              Report Incident
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Report New Incident</DialogTitle>
              <DialogDescription>
                Fill in the details to report a new incident. Be as specific as possible.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Incident Title</label>
                <Input placeholder="Brief description of the incident..." />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Incident Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {incidentTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Severity</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    {incidentSeverity.map(severity => (
                      <SelectItem key={severity.value} value={severity.value}>
                        {severity.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockLocations.map(location => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Date & Time</label>
                <Input type="datetime-local" />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  className="w-full min-h-[100px] p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                  placeholder="Detailed description of the incident..."
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Involved Parties</label>
                <Input placeholder="Names of people involved..." />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Initial Actions Taken</label>
                <textarea 
                  className="w-full min-h-[80px] p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                  placeholder="Describe any immediate actions taken..."
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Evidence/Attachments</label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="w-full">
                    <Camera size={16} className="mr-2" />
                    Add Photos/Files
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewIncidentDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Incident Reported",
                  description: "The incident has been reported successfully.",
                });
                setShowNewIncidentDialog(false);
              }}>
                Submit Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="dashboard" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="incidents">All Incidents</TabsTrigger>
          <TabsTrigger value="map">Location Map</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <IncidentSummaryDashboard />
        </TabsContent>
        
        <TabsContent value="incidents">
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input 
                  placeholder="Search incidents..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                  icon={<Search size={16} />}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {incidentStatus.map(status => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    {incidentSeverity.map(severity => (
                      <SelectItem key={severity.value} value={severity.value}>
                        {severity.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {incidentTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Advanced Filters</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {mockIncidents.length} incidents found
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Last updated: Today, 11:45 AM</span>
              </div>
            </div>
          </div>
          
          <IncidentList 
            searchFilter={searchQuery}
            statusFilter={statusFilter}
            severityFilter={severityFilter}
            typeFilter={typeFilter}
          />
        </TabsContent>
        
        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Incident Location Map</CardTitle>
              <CardDescription>View incidents by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">Interactive map coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}