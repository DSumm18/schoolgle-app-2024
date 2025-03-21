import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { HoldingPage } from "@/components/holding-page";
import { Briefcase, FileText, Users, ClipboardCheck, Settings, ChevronRight } from "lucide-react";

export default function BusinessSupportAdminPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">School Business Support</h2>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">Configure School Business Support applications</p>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="policy-manager">Policy Manager</TabsTrigger>
          <TabsTrigger value="meeting-assistant">Meeting Assistant</TabsTrigger>
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          <TabsTrigger value="settings">Module Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Policy Manager
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Create, manage, and distribute school policies
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
                  Meeting Assistant
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Schedule, manage, and document meetings
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
                  Sign In
                </CardTitle>
                <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Digital visitor and staff sign-in system
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
              <CardTitle>School Business Support Module</CardTitle>
              <CardDescription>Configuration and settings for all business support applications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This module provides tools for school administrators to manage policies, meetings, and visitors.
                Configure module-wide settings and individual application settings from this dashboard.
              </p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Common Settings
                  </h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• User permissions</li>
                    <li>• Document templates</li>
                    <li>• Notification preferences</li>
                    <li>• Data retention policies</li>
                  </ul>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Module Integrations
                  </h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Calendar integration</li>
                    <li>• Email notifications</li>
                    <li>• Document storage</li>
                    <li>• Staff directory access</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="policy-manager" className="space-y-4">
          <HoldingPage 
            title="Policy Manager" 
            description="Configure settings for the Policy Manager application. You'll be able to define policy categories, approval workflows, and review schedules."
            icon={<FileText className="h-12 w-12 text-primary/40" />}
          />
        </TabsContent>
        
        <TabsContent value="meeting-assistant" className="space-y-4">
          <HoldingPage 
            title="Meeting Assistant" 
            description="Configure settings for the Meeting Assistant application. You'll be able to set up meeting templates, agenda structures, and minute-taking formats."
            icon={<Users className="h-12 w-12 text-primary/40" />}
          />
        </TabsContent>
        
        <TabsContent value="sign-in" className="space-y-4">
          <HoldingPage 
            title="Sign In" 
            description="Configure settings for the Sign In application. You'll be able to customize visitor types, ID requirements, and health & safety agreements."
            icon={<ClipboardCheck className="h-12 w-12 text-primary/40" />}
          />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <HoldingPage 
            title="Module Settings" 
            description="Configure module-wide settings for School Business Support. These settings will apply across all applications in this module."
            icon={<Settings className="h-12 w-12 text-primary/40" />}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}