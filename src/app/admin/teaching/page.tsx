'use client';

import { PageWrapper } from "@/components/layout/page-wrapper";
import { HoldingPage } from "@/app/components/holding-page";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab-components";
import { BookCopy, BookOpen, FileSpreadsheet, Settings, Edit3 } from "lucide-react";
import Link from "next/link";

export default function TeachingLearningAdminPage() {
  return (
    <PageWrapper title="Teaching & Learning Admin">
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">Teaching & Learning</h1>
          <p className="text-gray-600 dark:text-gray-400">Configure your teaching and learning applications.</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="lesson-planner">Lesson Planner</TabsTrigger>
            <TabsTrigger value="assessment-manager">Assessment Manager</TabsTrigger>
            <TabsTrigger value="writing-assessment">Writing Assessment</TabsTrigger>
            <TabsTrigger value="settings">Module Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Lesson Planner Card */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">Lesson Planner</CardTitle>
                      <CardDescription>Plan and organize lessons</CardDescription>
                    </div>
                    <BookOpen className="text-blue-500 h-8 w-8" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Create, manage, and distribute lesson plans. Set up templates and share resources across your school.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/admin/teaching/lesson-planner" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                    Configure Lesson Planner →
                  </Link>
                </CardFooter>
              </Card>

              {/* Assessment Manager Card */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">Assessment Manager</CardTitle>
                      <CardDescription>Track and analyze student progress</CardDescription>
                    </div>
                    <FileSpreadsheet className="text-green-500 h-8 w-8" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Set up assessment frameworks, create marking schemes, and manage student data for tracking progress.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/admin/teaching/assessment-manager" className="text-green-600 dark:text-green-400 hover:underline text-sm font-medium">
                    Configure Assessment Manager →
                  </Link>
                </CardFooter>
              </Card>

              {/* Writing Assessment Card */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">Writing Assessment</CardTitle>
                      <CardDescription>Evaluate and improve student writing</CardDescription>
                    </div>
                    <Edit3 className="text-purple-500 h-8 w-8" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Define writing criteria, create evaluation rubrics, and track student writing development over time.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/admin/teaching/writing-assessment" className="text-purple-600 dark:text-purple-400 hover:underline text-sm font-medium">
                    Configure Writing Assessment →
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
                    <CardDescription>Manage Teaching & Learning module settings</CardDescription>
                  </div>
                  <Settings className="text-gray-500 h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Configure global settings for the Teaching & Learning module, including access controls,
                  default templates, and integration with other school systems.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lesson-planner">
            <HoldingPage 
              title="Lesson Planner Configuration" 
              description="This is where you'll configure the Lesson Planner application, including templates, resource libraries, and user permissions."
              icon={<BookOpen className="h-16 w-16 text-blue-500" />}
              comingSoon={true}
            />
          </TabsContent>

          <TabsContent value="assessment-manager">
            <HoldingPage 
              title="Assessment Manager Configuration" 
              description="This is where you'll set up assessment frameworks, reporting structures, and data visualization preferences."
              icon={<FileSpreadsheet className="h-16 w-16 text-green-500" />}
              comingSoon={true}
            />
          </TabsContent>

          <TabsContent value="writing-assessment">
            <HoldingPage 
              title="Writing Assessment Configuration" 
              description="This is where you'll define writing criteria, customize rubrics, and set up progress tracking parameters."
              icon={<Edit3 className="h-16 w-16 text-purple-500" />}
              comingSoon={true}
            />
          </TabsContent>

          <TabsContent value="settings">
            <HoldingPage 
              title="Module Settings" 
              description="Configure global settings for the Teaching & Learning module, including access controls, defaults, and integrations."
              icon={<Settings className="h-16 w-16 text-gray-500" />}
              comingSoon={true}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageWrapper>
  );
}