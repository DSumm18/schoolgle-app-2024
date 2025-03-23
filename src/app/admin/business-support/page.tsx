'use client';

import { PageWrapper } from "@/components/layout/page-wrapper";
import { HoldingPage } from "@/app/components/holding-page";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-export";
import { FileText, Calendar, UserCheck, Settings } from "lucide-react";
import Link from "next/link";

export default function BusinessSupportAdminPage() {
  return (
    <PageWrapper title="School Business Support Admin">
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">School Business Support</h1>
          <p className="text-gray-600 dark:text-gray-400">Configure your school business support applications.</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="policy-manager">Policy Manager</TabsTrigger>
            <TabsTrigger value="meeting-assistant">Meeting Assistant</TabsTrigger>
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="settings">Module Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Policy Manager Card */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">Policy Manager</CardTitle>
                      <CardDescription>Create and manage school policies</CardDescription>
                    </div>
                    <FileText className="text-amber-500 h-8 w-8" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Create, manage, and distribute school policies. Set up review schedules and track policy acknowledgements.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/admin/business-support/policy-manager" className="text-amber-600 dark:text-amber-400 hover:underline text-sm font-medium">
                    Configure Policy Manager →
                  </Link>
                </CardFooter>
              </Card>

              {/* Meeting Assistant Card */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">Meeting Assistant</CardTitle>
                      <CardDescription>Schedule and document meetings</CardDescription>
                    </div>
                    <Calendar className="text-cyan-500 h-8 w-8" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Schedule, manage, and document meetings. Create agenda templates and automatically distribute minutes.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/admin/business-support/meeting-assistant" className="text-cyan-600 dark:text-cyan-400 hover:underline text-sm font-medium">
                    Configure Meeting Assistant →
                  </Link>
                </CardFooter>
              </Card>

              {/* Sign In Card */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">Sign In</CardTitle>
                      <CardDescription>Digital visitor and staff sign-in</CardDescription>
                    </div>
                    <UserCheck className="text-indigo-500 h-8 w-8" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Configure digital sign-in systems for visitors, staff, and students. Set up custom fields and notifications.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/admin/business-support/sign-in" className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium">
                    Configure Sign In →
                  </Link>
                </CardFooter>
              </Card>
            </div>

            {/* Module Configuration Card */}
            <Card className="shadow-md mb-6">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-1">Module Configuration</CardTitle>
                    <CardDescription>Manage School Business Support settings</CardDescription>
                  </div>
                  <Settings className="text-gray-500 h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Configure global settings for the School Business Support module, including access controls,
                  default templates, and integration with other school systems.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policy-manager">
            <HoldingPage 
              title="Policy Manager Configuration" 
              description="This is where you'll configure the Policy Manager application, including policy templates, review schedules, and distribution settings."
              icon={<FileText className="h-16 w-16 text-amber-500" />}
              comingSoon={true}
            />
          </TabsContent>

          <TabsContent value="meeting-assistant">
            <HoldingPage 
              title="Meeting Assistant Configuration" 
              description="This is where you'll set up meeting templates, agenda formats, and minutes distribution settings."
              icon={<Calendar className="h-16 w-16 text-cyan-500" />}
              comingSoon={true}
            />
          </TabsContent>

          <TabsContent value="sign-in">
            <HoldingPage 
              title="Sign In Configuration" 
              description="This is where you'll customize sign-in forms, visitor badges, and notification settings."
              icon={<UserCheck className="h-16 w-16 text-indigo-500" />}
              comingSoon={true}
            />
          </TabsContent>

          <TabsContent value="settings">
            <HoldingPage 
              title="Module Settings" 
              description="Configure global settings for the School Business Support module, including access controls, defaults, and integrations."
              icon={<Settings className="h-16 w-16 text-gray-500" />}
              comingSoon={true}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageWrapper>
  );
}