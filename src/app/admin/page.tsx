'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UsersTab from '@/components/admin/users-tab';
import TrustTab from '@/components/admin/trust-tab';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  },
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <PageWrapper title="Admin">
      <motion.div
        className="flex-1 px-4 lg:px-8 py-8 max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
          
          <Card className="mb-8 bg-white dark:bg-gray-800 shadow-md">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="text-xl text-gray-800 dark:text-gray-200">System Administration</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Manage users, trusts, schools and system settings
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="trust">Trust</TabsTrigger>
                  <TabsTrigger value="schools">Schools</TabsTrigger>
                </TabsList>
                
                <TabsContent value="users">
                  <UsersTab />
                </TabsContent>
                
                <TabsContent value="trust">
                  <TrustTab />
                </TabsContent>
                
                <TabsContent value="schools">
                  <div className="text-center py-16">
                    <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">Schools Management</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      This section is under development and will be available soon.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}