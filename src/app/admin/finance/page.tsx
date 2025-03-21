import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { HoldingPage } from "@/components/holding-page";
import { DollarSign, Database, BarChart2, Settings, ChevronRight } from "lucide-react";

export default function FinanceAdminPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Finance</h2>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">Configure Finance applications</p>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="asset-management">Asset Management</TabsTrigger>
          <TabsTrigger value="payroll-checker">Payroll Checker</TabsTrigger>
          <TabsTrigger value="settings">Module Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Asset Management
                </CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Track and manage school assets and inventory
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
                  Payroll Checker
                </CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Verify and analyze payroll data
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
              <CardTitle>Finance Module</CardTitle>
              <CardDescription>Configuration and settings for all finance applications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This module provides tools for managing financial aspects of school operations.
                Configure module-wide settings and individual application settings from this dashboard.
              </p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Common Settings
                  </h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Financial year configuration</li>
                    <li>• Budget categories</li>
                    <li>• Approval thresholds</li>
                    <li>• Report templates</li>
                  </ul>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Module Integrations
                  </h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Accounting software integration</li>
                    <li>• Payroll system connections</li>
                    <li>• Purchase order systems</li>
                    <li>• Banking interfaces</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="asset-management" className="space-y-4">
          <HoldingPage 
            title="Asset Management" 
            description="Configure settings for the Asset Management application. You'll be able to define asset categories, depreciation schedules, and inventory tracking parameters."
            icon={<Database className="h-12 w-12 text-primary/40" />}
          />
        </TabsContent>
        
        <TabsContent value="payroll-checker" className="space-y-4">
          <HoldingPage 
            title="Payroll Checker" 
            description="Configure settings for the Payroll Checker application. You'll be able to define salary scales, allowances, and verification rules."
            icon={<BarChart2 className="h-12 w-12 text-primary/40" />}
          />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <HoldingPage 
            title="Module Settings" 
            description="Configure module-wide settings for Finance. These settings will apply across all applications in this module."
            icon={<Settings className="h-12 w-12 text-primary/40" />}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}