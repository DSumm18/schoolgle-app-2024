'use client';

import { PageWrapper } from "@/components/layout/page-wrapper";
import { HoldingPage } from "@/app/components/holding-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-export";
import { Settings, Users, Shield, Bell, Server } from "lucide-react";

export default function SettingsPage() {
  return (
    <PageWrapper title="Settings">
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">System Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Configure global system settings for all modules.</p>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <HoldingPage 
              title="User Management Settings" 
              description="Configure user permissions, roles, and access controls for the system."
              icon={<Users className="h-16 w-16 text-blue-500" />}
              comingSoon={true}
            />
          </TabsContent>

          <TabsContent value="security">
            <HoldingPage 
              title="Security Settings" 
              description="Configure security policies, authentication methods, and data protection settings."
              icon={<Shield className="h-16 w-16 text-emerald-500" />}
              comingSoon={true}
            />
          </TabsContent>

          <TabsContent value="notifications">
            <HoldingPage 
              title="Notification Settings" 
              description="Configure email, SMS, and in-app notification settings for all system events."
              icon={<Bell className="h-16 w-16 text-amber-500" />}
              comingSoon={true}
            />
          </TabsContent>

          <TabsContent value="system">
            <HoldingPage 
              title="System Configuration" 
              description="Configure global system parameters, integrations, and maintenance settings."
              icon={<Server className="h-16 w-16 text-purple-500" />}
              comingSoon={true}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageWrapper>
  );
}