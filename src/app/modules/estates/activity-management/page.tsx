'use client';

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText } from "lucide-react";
import { useModules } from "@/contexts/ModuleContext";
import { isModuleAvailable } from "@/lib/modules/initialize";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

// Mock components for demonstration
// In a real implementation, we would import the actual components
const ActivitySummary = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium">Activity Summary</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Pending Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <p className="text-xs text-muted-foreground">12 due this week</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Completed Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">128</div>
          <p className="text-xs text-muted-foreground">21 completed this month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Compliance Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">87%</div>
          <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: '87%' }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const AllActivities = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium">All Activities</h3>
    <Card>
      <CardContent className="pt-6">
        <div className="rounded-md border">
          <div className="grid grid-cols-5 bg-muted/50 p-3 text-sm font-medium">
            <div>Name</div>
            <div>Category</div>
            <div>Status</div>
            <div>Due Date</div>
            <div>Assigned To</div>
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="grid grid-cols-5 p-3 text-sm border-t">
              <div>Fire Alarm Testing</div>
              <div>Health & Safety</div>
              <div>
                <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                  Pending
                </span>
              </div>
              <div>Dec 15, 2023</div>
              <div>John Smith</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

const WeeklySchedule = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium">Weekly Schedule</h3>
    <div className="grid grid-cols-7 gap-3">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
        <div key={day} className="border rounded-md p-3">
          <div className="font-medium text-center">{day}</div>
          <div className="text-xs text-center text-muted-foreground mb-2">Nov {10 + ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(day)}</div>
          <div className="space-y-2">
            <div className="bg-blue-50 p-2 rounded text-xs border border-blue-200">9:00 AM - Boiler Check</div>
            <div className="bg-green-50 p-2 rounded text-xs border border-green-200">1:00 PM - Security Check</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ActivityHistory = () => <Skeleton className="h-[400px] w-full" />;
const AwaitingDocumentation = () => <Skeleton className="h-[400px] w-full" />;
const CalendarView = () => <Skeleton className="h-[400px] w-full" />;
const ComplianceOverview = () => <Skeleton className="h-[400px] w-full" />;

// Mock dialogs
const CreateDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => onOpenChange(false)}>
      <div className="bg-white p-6 rounded-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Create New Activity</h2>
        <p>This is a placeholder for the create activity dialog.</p>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </div>
    </div>
  );
};

const TemplateDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => onOpenChange(false)}>
      <div className="bg-white p-6 rounded-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Add from Template</h2>
        <p>This is a placeholder for the template dialog.</p>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </div>
    </div>
  );
};

const ReportDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => onOpenChange(false)}>
      <div className="bg-white p-6 rounded-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Reports</h2>
        <p>This is a placeholder for the reports dialog.</p>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default function ActivityManagementPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const { isModuleEnabled } = useModules();
  const { status } = useSession();
  
  // Check if this module is available
  const isAvailable = isModuleAvailable('activity-management');
  
  if (status === 'loading') {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              You must be logged in to access this module.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login" className="text-primary hover:underline">
              Go to Login
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!isAvailable) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Module Not Available</CardTitle>
            <CardDescription>
              The Activity Management module is not enabled for your school.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Please contact your administrator to enable this module.</p>
            <Link href="/dashboard" className="text-primary hover:underline">
              Return to Dashboard
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Activities</h1>
            <p className="text-muted-foreground">
              Manage compliance activities, schedule contractors, and track completion
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setCreateDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New
            </Button>
            <Button variant="outline" onClick={() => setTemplateDialogOpen(true)}>
              <FileText className="mr-2 h-4 w-4" />
              Add From Template
            </Button>
            <Button variant="outline" onClick={() => setReportDialogOpen(true)}>
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Button>
          </div>
        </div>

        <Tabs defaultValue="compliance" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-7 lg:w-[900px]">
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="all">All Activities</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="history">History/Audit</TabsTrigger>
            <TabsTrigger value="awaiting">Awaiting Docs</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          <TabsContent value="compliance" className="space-y-4">
            <ComplianceOverview />
          </TabsContent>
          <TabsContent value="summary" className="space-y-4">
            <ActivitySummary />
          </TabsContent>
          <TabsContent value="all" className="space-y-4">
            <AllActivities />
          </TabsContent>
          <TabsContent value="weekly" className="space-y-4">
            <WeeklySchedule />
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <ActivityHistory />
          </TabsContent>
          <TabsContent value="awaiting" className="space-y-4">
            <AwaitingDocumentation />
          </TabsContent>
          <TabsContent value="calendar" className="space-y-4">
            <CalendarView />
          </TabsContent>
        </Tabs>

        <CreateDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
        <TemplateDialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen} />
        <ReportDialog open={reportDialogOpen} onOpenChange={setReportDialogOpen} />
      </div>
    </div>
  );
}