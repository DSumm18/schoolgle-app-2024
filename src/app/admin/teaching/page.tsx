import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoldingPage } from "@/components/holding-page";
import { BookOpen, BookText, FileCheck, PenTool, Settings, ChevronRight } from "lucide-react";

export default function TeachingLearningAdminPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Teaching & Learning</h2>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">Configure Teaching & Learning applications</p>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lesson-planner">Lesson Planner</TabsTrigger>
          <TabsTrigger value="assessment-manager">Assessment Manager</TabsTrigger>
          <TabsTrigger value="writing-assessment">Writing Assessment</TabsTrigger>
          <TabsTrigger value="settings">Module Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Lesson Planner
                </CardTitle>
                <BookText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Create and manage lesson plans for teachers
                </div>
                <div className="flex items-center pt-4">
                  <span className="text-xs text-muted-foreground">Configure</span>
                  <ChevronRight className="h-3 w-3 ml-1 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Assessment Manager
                </CardTitle>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Track and analyze student assessments
                </div>
                <div className="flex items-center pt-4">
                  <span className="text-xs text-muted-foreground">Configure</span>
                  <ChevronRight className="h-3 w-3 ml-1 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Writing Assessment
                </CardTitle>
                <PenTool className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Tools for assessing and improving student writing
                </div>
                <div className="flex items-center pt-4">
                  <span className="text-xs text-muted-foreground">Configure</span>
                  <ChevronRight className="h-3 w-3 ml-1 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Teaching & Learning Module</CardTitle>
              <CardDescription>Configuration and settings for all teaching and learning applications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This module provides tools for educators to plan lessons, assess student performance, and track academic progress.
                Configure module-wide settings and individual application settings from this dashboard.
              </p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Common Settings
                  </h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Academic year configuration</li>
                    <li>• Curriculum frameworks</li>
                    <li>• Assessment periods</li>
                    <li>• Subject terminology</li>
                  </ul>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Module Integrations
                  </h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• MIS system integration</li>
                    <li>• Calendar synchronization</li>
                    <li>• Parent portal access</li>
                    <li>• Data export formats</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="lesson-planner" className="space-y-4">
          <HoldingPage 
            title="Lesson Planner" 
            description="Configure settings for the Lesson Planner application. You'll be able to set up templates, define curriculum structures, and manage sharing permissions."
            icon={<BookText className="h-12 w-12 text-primary/40" />}
          />
        </TabsContent>
        
        <TabsContent value="assessment-manager" className="space-y-4">
          <HoldingPage 
            title="Assessment Manager" 
            description="Configure settings for the Assessment Manager application. You'll be able to define grading scales, assessment types, and reporting templates."
            icon={<FileCheck className="h-12 w-12 text-primary/40" />}
          />
        </TabsContent>
        
        <TabsContent value="writing-assessment" className="space-y-4">
          <HoldingPage 
            title="Writing Assessment" 
            description="Configure settings for the Writing Assessment application. You'll be able to set up writing frameworks, rubrics, and feedback templates."
            icon={<PenTool className="h-12 w-12 text-primary/40" />}
          />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <HoldingPage 
            title="Module Settings" 
            description="Configure module-wide settings for Teaching & Learning. These settings will apply across all applications in this module."
            icon={<Settings className="h-12 w-12 text-primary/40" />}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}