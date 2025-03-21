'use client';

import { PageWrapper } from "@/components/layout/page-wrapper";
import { HoldingPage } from "@/app/components/holding-page";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, DollarSign, Settings } from "lucide-react";
import Link from "next/link";

export default function FinanceAdminPage() {
  return (
    <PageWrapper title="Finance Admin">
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">Finance</h1>
          <p className="text-gray-600 dark:text-gray-400">Configure your finance applications.</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="asset-management">Asset Management</TabsTrigger>
            <TabsTrigger value="payroll-checker">Payroll Checker</TabsTrigger>
            <TabsTrigger value="settings">Module Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Asset Management Card */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">Asset Management</CardTitle>
                      <CardDescription>Track and manage school assets</CardDescription>
                    </div>
                    <Briefcase className="text-emerald-500 h-8 w-8" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Catalog, track, and manage school assets. Set up depreciation schedules and maintenance reminders.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/admin/finance/asset-management" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium">
                    Configure Asset Management →
                  </Link>
                </CardFooter>
              </Card>

              {/* Payroll Checker Card */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">Payroll Checker</CardTitle>
                      <CardDescription>Verify and manage payroll information</CardDescription>
                    </div>
                    <DollarSign className="text-rose-500 h-8 w-8" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Validate payroll data, manage salary schedules, and track staff payment information.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/admin/finance/payroll-checker" className="text-rose-600 dark:text-rose-400 hover:underline text-sm font-medium">
                    Configure Payroll Checker →
                  </Link>
                </CardFooter>
              </Card>

              {/* Module Configuration Card */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">Module Configuration</CardTitle>
                      <CardDescription>Manage Finance module settings</CardDescription>
                    </div>
                    <Settings className="text-gray-500 h-6 w-6" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Configure global settings for the Finance module, including access controls,
                    accounting periods, and budget configurations.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/admin/finance/settings" className="text-gray-600 dark:text-gray-400 hover:underline text-sm font-medium">
                    Configure Module Settings →
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="asset-management">
            <HoldingPage 
              title="Asset Management Configuration" 
              description="This is where you'll configure the Asset Management application, including asset categories, depreciation schedules, and maintenance tracking."
              icon={<Briefcase className="h-16 w-16 text-emerald-500" />}
              comingSoon={true}
            />
          </TabsContent>

          <TabsContent value="payroll-checker">
            <HoldingPage 
              title="Payroll Checker Configuration" 
              description="This is where you'll set up payroll validation rules, salary schedules, and payment tracking parameters."
              icon={<DollarSign className="h-16 w-16 text-rose-500" />}
              comingSoon={true}
            />
          </TabsContent>

          <TabsContent value="settings">
            <HoldingPage 
              title="Module Settings" 
              description="Configure global settings for the Finance module, including access controls, accounting periods, and budget configurations."
              icon={<Settings className="h-16 w-16 text-gray-500" />}
              comingSoon={true}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageWrapper>
  );
}