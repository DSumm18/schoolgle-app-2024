'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Lightbulb,
  MoreHorizontal,
  Plus,
  Search,
  Tag,
  Timer,
  UserCheck,
  Users,
  XCircle,
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
} from '@/components/ui';
import { useModules } from '@/contexts/ModuleContext';
import { useToast } from '@/hooks/useToast';

// Mock data for the UI
const issuePriorities = [
  { value: 'low', label: 'Low', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
  { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' }
];

const issueStatuses = [
  { value: 'open', label: 'Open', color: 'text-blue-500 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  { value: 'in_progress', label: 'In Progress', color: 'text-yellow-500 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { value: 'review', label: 'In Review', color: 'text-purple-500 dark:text-purple-400', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
  { value: 'resolved', label: 'Resolved', color: 'text-green-500 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  { value: 'closed', label: 'Closed', color: 'text-gray-500 dark:text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-800' }
];

const issueCategories = [
  { id: 'facilities', name: 'Facilities', count: 14 },
  { id: 'it', name: 'IT & Technology', count: 23 },
  { id: 'curriculum', name: 'Curriculum', count: 8 },
  { id: 'health_safety', name: 'Health & Safety', count: 11 },
  { id: 'admin', name: 'Administrative', count: 17 },
  { id: 'staff', name: 'Staff Related', count: 5 }
];

const mockTeams = [
  { id: 1, name: 'IT Support', issues: 23 },
  { id: 2, name: 'Facilities Management', issues: 14 },
  { id: 3, name: 'Academic Support', issues: 8 },
  { id: 4, name: 'Admin Team', issues: 17 },
  { id: 5, name: 'Health & Safety', issues: 11 }
];

const mockUsers = [
  { id: 1, name: 'David Thompson', email: 'david.t@schoolgle.edu', avatar: null, initials: 'DT', role: 'IT Support' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@schoolgle.edu', avatar: null, initials: 'SJ', role: 'Facilities Manager' },
  { id: 3, name: 'Michael Chen', email: 'michael.c@schoolgle.edu', avatar: null, initials: 'MC', role: 'Teacher' },
  { id: 4, name: 'Emma Williams', email: 'emma.w@schoolgle.edu', avatar: null, initials: 'EW', role: 'Admin Staff' },
  { id: 5, name: 'James Wilson', email: 'james.w@schoolgle.edu', avatar: null, initials: 'JW', role: 'Assistant Head' }
];

const mockIssues = [
  {
    id: 'ISS-1001',
    title: 'Broken projector in Room 204',
    description: 'The projector in Room 204 is not working correctly. The image is blurry and sometimes cuts out during presentations.',
    status: 'open',
    priority: 'high',
    category: 'it',
    createdAt: '2024-03-10',
    dueDate: '2024-03-17',
    reporter: {
      id: 3,
      name: 'Michael Chen'
    },
    assignedTo: {
      id: 1,
      name: 'David Thompson'
    },
    teamId: 1
  },
  {
    id: 'ISS-1002',
    title: 'Leaking tap in staff bathroom',
    description: 'The sink in the staff bathroom has a leaking tap that needs fixing. It has been getting worse over the past week.',
    status: 'in_progress',
    priority: 'medium',
    category: 'facilities',
    createdAt: '2024-03-08',
    dueDate: '2024-03-15',
    reporter: {
      id: 4,
      name: 'Emma Williams'
    },
    assignedTo: {
      id: 2,
      name: 'Sarah Johnson'
    },
    teamId: 2
  },
  {
    id: 'ISS-1003',
    title: 'Missing science textbooks',
    description: 'We are missing 10 Year 9 Science textbooks that were supposed to be delivered last month.',
    status: 'closed',
    priority: 'low',
    category: 'curriculum',
    createdAt: '2024-02-15',
    dueDate: '2024-02-28',
    reporter: {
      id: 5,
      name: 'James Wilson'
    },
    assignedTo: {
      id: 4,
      name: 'Emma Williams'
    },
    teamId: 3
  },
  {
    id: 'ISS-1004',
    title: 'Fire door not closing properly',
    description: 'The fire door near the cafeteria isn\'t closing properly and needs adjustment.',
    status: 'resolved',
    priority: 'critical',
    category: 'health_safety',
    createdAt: '2024-03-05',
    dueDate: '2024-03-07',
    reporter: {
      id: 2,
      name: 'Sarah Johnson'
    },
    assignedTo: {
      id: 2,
      name: 'Sarah Johnson'
    },
    teamId: 5
  },
  {
    id: 'ISS-1005',
    title: 'Update staff directory on website',
    description: 'The staff directory on the school website needs to be updated with new staff members and role changes.',
    status: 'review',
    priority: 'low',
    category: 'admin',
    createdAt: '2024-03-12',
    dueDate: '2024-03-26',
    reporter: {
      id: 5,
      name: 'James Wilson'
    },
    assignedTo: {
      id: 1,
      name: 'David Thompson'
    },
    teamId: 4
  },
  {
    id: 'ISS-1006',
    title: 'Computer lab network intermittently dropping',
    description: 'The network in Computer Lab B is intermittently disconnecting, affecting lessons and student work.',
    status: 'in_progress',
    priority: 'high',
    category: 'it',
    createdAt: '2024-03-11',
    dueDate: '2024-03-14',
    reporter: {
      id: 3,
      name: 'Michael Chen'
    },
    assignedTo: {
      id: 1,
      name: 'David Thompson'
    },
    teamId: 1
  },
  {
    id: 'ISS-1007',
    title: 'Staff absence reporting system issues',
    description: 'Some staff members are reporting difficulties when trying to log absences through the online portal.',
    status: 'open',
    priority: 'medium',
    category: 'staff',
    createdAt: '2024-03-13',
    dueDate: '2024-03-20',
    reporter: {
      id: 4,
      name: 'Emma Williams'
    },
    assignedTo: {
      id: 4,
      name: 'Emma Williams'
    },
    teamId: 4
  }
];

// Mock Component for issue summary dashboard
const IssueSummaryDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Open Issues', value: 12, icon: AlertTriangle, color: 'text-blue-500 dark:text-blue-400' },
          { label: 'In Progress', value: 8, icon: Clock, color: 'text-yellow-500 dark:text-yellow-400' },
          { label: 'Resolved This Week', value: 15, icon: CheckCircle2, color: 'text-green-500 dark:text-green-400' },
          { label: 'Overdue', value: 3, icon: XCircle, color: 'text-red-500 dark:text-red-400' }
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
        {/* Response Time Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Response Time</CardTitle>
            <CardDescription>Average time to first response</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold">4.2 hours</div>
                <div className="text-sm text-green-500 dark:text-green-400">↓ 12% from last month</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Resolution Time Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resolution Time</CardTitle>
            <CardDescription>Average time to resolve issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold">2.8 days</div>
                <div className="text-sm text-green-500 dark:text-green-400">↓ 8% from last month</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'resolved', issue: 'Broken projector in Room 204', user: 'David Thompson', time: '2 hours ago' },
                { action: 'commented on', issue: 'Leaking tap in staff bathroom', user: 'Sarah Johnson', time: '4 hours ago' },
                { action: 'assigned', issue: 'Fire door not closing properly', user: 'Emma Williams', time: 'Yesterday' },
                { action: 'created', issue: 'Staff absence reporting system issues', user: 'James Wilson', time: 'Yesterday' }
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action} <span className="text-indigo-600 dark:text-indigo-400">{activity.issue}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Top Categories */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {issueCategories.slice(0, 4).map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <span className="text-sm">{category.name}</span>
                  <span className="text-sm font-medium">{category.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Mock Component for issue list
const IssueList = ({ searchFilter = '', statusFilter = 'all', priorityFilter = 'all', categoryFilter = 'all' }) => {
  // Filter issues based on search and filters
  const filteredIssues = mockIssues.filter(issue => {
    // Apply search filter
    if (searchFilter && !issue.title.toLowerCase().includes(searchFilter.toLowerCase())) {
      return false;
    }
    
    // Apply status filter
    if (statusFilter !== 'all' && issue.status !== statusFilter) {
      return false;
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all' && issue.priority !== priorityFilter) {
      return false;
    }
    
    // Apply category filter
    if (categoryFilter !== 'all' && issue.category !== categoryFilter) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="space-y-4">
      {filteredIssues.map(issue => {
        const status = issueStatuses.find(s => s.value === issue.status);
        const priority = issuePriorities.find(p => p.value === issue.priority);
        const category = issueCategories.find(c => c.id === issue.category);
        
        return (
          <Card key={issue.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <CardTitle className="text-lg">{issue.title}</CardTitle>
                  <CardDescription>
                    {issue.id} • Reported on {issue.createdAt}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={priority?.color}>
                    {priority?.label}
                  </Badge>
                  <Badge className={status?.bgColor}>
                    {status?.label}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {issue.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Category</p>
                  <p className="font-medium">{category?.name || issue.category}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Due Date</p>
                  <p className="font-medium">{issue.dueDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Reported By</p>
                  <p className="font-medium">{issue.reporter.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Assigned To</p>
                  <p className="font-medium">{issue.assignedTo.name}</p>
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
                      <p>Reassign Issue</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Tag size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Change Category</p>
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
                    <DropdownMenuItem>Change Status</DropdownMenuItem>
                    <DropdownMenuItem>Add Comment</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 dark:text-red-400">Close Issue</DropdownMenuItem>
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

// Mock Component for team view
const TeamView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockTeams.map(team => (
        <Card key={team.id}>
          <CardHeader>
            <CardTitle>{team.name}</CardTitle>
            <CardDescription>{team.issues} active issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Response Time</span>
                <span className="font-medium">{Math.random() * 9 + 1 < 5 ? Math.random() * 9 + 1 : Math.random() * 9 + 1 - 10}.{Math.floor(Math.random() * 9 + 1)} hours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Resolution Rate</span>
                <span className="font-medium">{Math.floor(Math.random() * 30) + 70}%</span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Team Members</h4>
              <div className="flex -space-x-2">
                {mockUsers
                  .filter(user => Math.random() > 0.5) // Randomly select users
                  .slice(0, 4) // Limit to 4 users
                  .map(user => (
                    <Avatar key={user.id} className="border-2 border-white dark:border-gray-800">
                      <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-medium">
                        {user.initials}
                      </div>
                    </Avatar>
                  ))}
                {mockUsers.length > 4 && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium">
                    +3
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Team Issues</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

// Main Issue Tracker page component
export default function IssueTrackerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isModuleEnabled } = useModules();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showNewIssueDialog, setShowNewIssueDialog] = useState(false);
  
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
  
  if (!isModuleEnabled('issue-tracker')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Lightbulb size={64} className="text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Module Not Available</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
          The Issue Tracker module is not enabled for your school. Please contact your administrator.
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Issue Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track, manage, and resolve issues across your school
          </p>
        </div>
        
        <Dialog open={showNewIssueDialog} onOpenChange={setShowNewIssueDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={16} className="mr-1" />
              Report Issue
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report New Issue</DialogTitle>
              <DialogDescription>
                Fill in the details to report a new issue or problem that needs attention.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 my-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Issue Title</label>
                <Input placeholder="Brief description of the issue..." />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {issueCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {issuePriorities.map(priority => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Due Date</label>
                <Input type="date" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Assign To</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team or person" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {mockTeams.map(team => (
                      <SelectItem key={team.id} value={`team-${team.id}`}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  className="w-full min-h-[100px] p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                  placeholder="Detailed description of the issue..."
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewIssueDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Issue Reported",
                  description: "Your issue has been reported successfully.",
                });
                setShowNewIssueDialog(false);
              }}>
                Submit Issue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="dashboard" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="issues">All Issues</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <IssueSummaryDashboard />
        </TabsContent>
        
        <TabsContent value="issues">
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input 
                  placeholder="Search issues..." 
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
                    {issueStatuses.map(status => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    {issuePriorities.map(priority => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {issueCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
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
                {mockIssues.length} issues found
              </div>
              <div className="flex items-center gap-2">
                <Timer size={16} className="text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Last updated: Today, 10:30 AM</span>
              </div>
            </div>
          </div>
          
          <IssueList 
            searchFilter={searchQuery}
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            categoryFilter={categoryFilter}
          />
        </TabsContent>
        
        <TabsContent value="teams">
          <div className="mb-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Teams & Assignments
              </h3>
              <Button variant="outline" size="sm">
                <Users size={16} className="mr-1" />
                Manage Teams
              </Button>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Overview of teams responsible for addressing and resolving issues.
            </p>
          </div>
          
          <TeamView />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}