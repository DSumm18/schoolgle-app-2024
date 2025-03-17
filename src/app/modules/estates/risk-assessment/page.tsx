'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  AlertCircle,
  Check,
  Download,
  FileText, 
  Plus, 
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX
} from 'lucide-react';

import { 
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
  Badge
} from '@/components/ui';
import { useModules } from '@/contexts/ModuleContext';
import { useToast } from '@/hooks/useToast';

const riskCategories = [
  { id: 'physical', name: 'Physical Safety', count: 12 },
  { id: 'fire', name: 'Fire Safety', count: 8 },
  { id: 'health', name: 'Health & Hygiene', count: 7 },
  { id: 'security', name: 'Security', count: 5 },
  { id: 'equipment', name: 'Equipment', count: 9 },
  { id: 'trips', name: 'Educational Visits', count: 3 },
];

const riskLevels = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
  { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' }
];

const riskStatuses = [
  { value: 'open', label: 'Open', icon: ShieldAlert, color: 'text-yellow-500 dark:text-yellow-400' },
  { value: 'mitigated', label: 'Mitigated', icon: ShieldCheck, color: 'text-green-500 dark:text-green-400' },
  { value: 'closed', label: 'Closed', icon: ShieldX, color: 'text-gray-500 dark:text-gray-400' },
  { value: 'review', label: 'Under Review', icon: Shield, color: 'text-blue-500 dark:text-blue-400' }
];

// Mock data for the UI
const mockAssessments = [
  {
    id: 'RA001',
    title: 'Main Building Fire Safety Assessment',
    category: 'fire',
    createdAt: '2024-02-15',
    dueDate: '2024-08-15',
    status: 'open',
    riskLevel: 'high',
    assignedTo: 'Sarah Johnson',
    description: 'Comprehensive assessment of fire safety measures in the main building including exit routes, fire detection systems, and extinguishing equipment.'
  },
  {
    id: 'RA002',
    title: 'Science Lab Equipment Safety',
    category: 'equipment',
    createdAt: '2024-03-10',
    dueDate: '2024-06-10',
    status: 'mitigated',
    riskLevel: 'medium',
    assignedTo: 'Michael Chen',
    description: 'Review of science lab equipment safety protocols, storage of chemicals, and handling procedures.'
  },
  {
    id: 'RA003',
    title: 'Playground Equipment Inspection',
    category: 'physical',
    createdAt: '2024-01-25',
    dueDate: '2024-04-25',
    status: 'closed',
    riskLevel: 'low',
    assignedTo: 'Emma Williams',
    description: 'Regular inspection of playground equipment including climbing frames, swings, and surface areas.'
  },
  {
    id: 'RA004',
    title: 'School Trip to Science Museum',
    category: 'trips',
    createdAt: '2024-04-05',
    dueDate: '2024-05-01',
    status: 'review',
    riskLevel: 'medium',
    assignedTo: 'James Wilson',
    description: 'Risk assessment for the upcoming school trip to the Science Museum, including transport, supervision, and venue safety.'
  },
  {
    id: 'RA005',
    title: 'COVID-19 Health Measures',
    category: 'health',
    createdAt: '2024-02-01',
    dueDate: '2024-05-01',
    status: 'mitigated',
    riskLevel: 'high',
    assignedTo: 'Olivia Martinez',
    description: 'Assessment of health and hygiene measures related to COVID-19 prevention and management within the school.'
  },
  {
    id: 'RA006',
    title: 'School Perimeter Security',
    category: 'security',
    createdAt: '2024-03-20',
    dueDate: '2024-09-20',
    status: 'open',
    riskLevel: 'medium',
    assignedTo: 'David Thompson',
    description: 'Evaluation of school perimeter security, access controls, and visitor management procedures.'
  }
];

// Mock Component for risk summary
const RiskSummaryDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Current Risk Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Critical Risks</span>
              <span className="text-red-600 dark:text-red-400 font-medium">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">High Risks</span>
              <span className="text-orange-600 dark:text-orange-400 font-medium">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Medium Risks</span>
              <span className="text-yellow-600 dark:text-yellow-400 font-medium">15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Low Risks</span>
              <span className="text-green-600 dark:text-green-400 font-medium">19</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Upcoming Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Fire Safety - Main Building</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Due in 5 days</p>
              </div>
              <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">High</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Kitchen Hygiene Assessment</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Due in 8 days</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Medium</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Sports Equipment Check</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Due in 12 days</p>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Low</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Compliance Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[85%]"></div>
              </div>
              <span className="text-sm font-medium">85%</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Check size={16} className="text-green-500" />
                <span>42 Assessments up-to-date</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle size={16} className="text-yellow-500" />
                <span>5 Assessments need review</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle size={16} className="text-red-500" />
                <span>2 Assessments overdue</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Mock Component for risk assessments list
const RiskAssessmentsList = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 mb-4">
        <Input 
          placeholder="Search assessments..." 
          className="max-w-xs"
          icon={<Search size={16} />}
        />
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="mitigated">Mitigated</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="review">Under Review</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {riskCategories.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {mockAssessments.map(assessment => {
        const status = riskStatuses.find(s => s.value === assessment.status);
        const riskLevel = riskLevels.find(r => r.value === assessment.riskLevel);
        const StatusIcon = status?.icon || ShieldAlert;
        
        return (
          <Card key={assessment.id} className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <StatusIcon size={18} className={status?.color} />
                    {assessment.title}
                  </CardTitle>
                  <CardDescription>ID: {assessment.id} • Created: {assessment.createdAt}</CardDescription>
                </div>
                <Badge className={riskLevel?.color}>
                  {riskLevel?.label} Risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {assessment.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Category</p>
                  <p className="font-medium">
                    {riskCategories.find(c => c.id === assessment.category)?.name || assessment.category}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Due Date</p>
                  <p className="font-medium">{assessment.dueDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Status</p>
                  <p className="font-medium">{status?.label}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Assigned To</p>
                  <p className="font-medium">{assessment.assignedTo}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <FileText size={16} className="mr-1" />
                View Details
              </Button>
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-1" />
                Download
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

// Mock Component for risk categories
const RiskCategories = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {riskCategories.map(category => (
        <Card key={category.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>{category.name}</CardTitle>
            <CardDescription>{category.count} assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Compliance</span>
              <span className="text-sm font-medium">
                {Math.floor(Math.random() * 40) + 60}%
              </span>
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500" 
                style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
              ></div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Assessments</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

// Main Risk Assessment page component
export default function RiskAssessmentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isModuleEnabled } = useModules();
  const { toast } = useToast();
  
  const [showNewRiskDialog, setShowNewRiskDialog] = useState(false);
  const [showTemplatesDialog, setShowTemplatesDialog] = useState(false);
  const [showReportsDialog, setShowReportsDialog] = useState(false);
  
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
  
  if (!isModuleEnabled('risk-assessment')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <ShieldX size={64} className="text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Module Not Available</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
          The Risk Assessment module is not enabled for your school. Please contact your administrator.
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Assessment</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage, monitor, and mitigate risks across your school
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Dialog open={showNewRiskDialog} onOpenChange={setShowNewRiskDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus size={16} className="mr-1" />
                New Assessment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Risk Assessment</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new risk assessment.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 my-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assessment Title</label>
                  <Input placeholder="Enter title..." />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {riskCategories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Risk Level</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      {riskLevels.map(level => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    className="w-full min-h-[100px] p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                    placeholder="Describe the risk assessment..."
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewRiskDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Assessment Created",
                    description: "New risk assessment has been created successfully.",
                  });
                  setShowNewRiskDialog(false);
                }}>
                  Create Assessment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showTemplatesDialog} onOpenChange={setShowTemplatesDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText size={16} className="mr-1" />
                Templates
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assessment Templates</DialogTitle>
                <DialogDescription>
                  Choose from pre-defined templates to create assessments quickly.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-3 my-2">
                {[
                  { name: 'Fire Safety Assessment', category: 'fire' },
                  { name: 'Laboratory Safety', category: 'equipment' },
                  { name: 'School Trip', category: 'trips' },
                  { name: 'Building Security', category: 'security' },
                  { name: 'COVID-19 Health Measures', category: 'health' },
                ].map((template, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {riskCategories.find(c => c.id === template.category)?.name}
                      </p>
                    </div>
                    <Button size="sm">Use</Button>
                  </div>
                ))}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowTemplatesDialog(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showReportsDialog} onOpenChange={setShowReportsDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download size={16} className="mr-1" />
                Reports
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Risk Assessment Reports</DialogTitle>
                <DialogDescription>
                  Generate and download reports for your risk assessments.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-3 my-2">
                {[
                  { name: 'Monthly Risk Summary', format: 'PDF' },
                  { name: 'Compliance Status Report', format: 'Excel' },
                  { name: 'Overdue Assessments', format: 'PDF' },
                  { name: 'Risk Level Analysis', format: 'Excel' },
                  { name: 'Category Breakdown', format: 'PDF' },
                ].map((report, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{report.format} Report</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download size={16} className="mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowReportsDialog(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs defaultValue="dashboard" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="assessments">All Assessments</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <RiskSummaryDashboard />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Recent Assessments
          </h3>
          <div className="space-y-4">
            {mockAssessments.slice(0, 3).map(assessment => {
              const status = riskStatuses.find(s => s.value === assessment.status);
              const riskLevel = riskLevels.find(r => r.value === assessment.riskLevel);
              const StatusIcon = status?.icon || ShieldAlert;
              
              return (
                <Card key={assessment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <StatusIcon size={18} className={status?.color} />
                          {assessment.title}
                        </CardTitle>
                        <CardDescription>ID: {assessment.id} • Due: {assessment.dueDate}</CardDescription>
                      </div>
                      <Badge className={riskLevel?.color}>
                        {riskLevel?.label} Risk
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {assessment.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <FileText size={16} className="mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download size={16} className="mr-1" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="assessments">
          <RiskAssessmentsList />
        </TabsContent>
        
        <TabsContent value="categories">
          <RiskCategories />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}