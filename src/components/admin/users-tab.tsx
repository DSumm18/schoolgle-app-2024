'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Upload, Download, PlusCircle, Search, Check, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Mock user data
const mockUsers = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', userLevel: 'Admin', modules: ['Estates', 'HR', 'Finance'] },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', userLevel: 'Staff', modules: ['Estates'] },
  { id: 3, firstName: 'Mark', lastName: 'Johnson', email: 'mark.johnson@example.com', userLevel: 'Teacher', modules: ['HR'] },
];

// Mock modules in the system
const availableModules = ['Estates', 'HR', 'Finance', 'Academic', 'Attendance'];

export default function UsersTab() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userLevel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadSuccess(false);
    setUploadError('');

    // Read the CSV file
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string;
        const result = processCSV(csvData);
        
        // Update users with new data
        setUsers(prevUsers => {
          // Create a map of existing users by email for quick lookup
          const existingUserMap = new Map(prevUsers.map(user => [user.email, user]));
          
          // Process new users, updating existing ones or adding new ones
          const processedUsers = result.map(newUser => {
            if (existingUserMap.has(newUser.email)) {
              // Update existing user
              const existingUser = existingUserMap.get(newUser.email)!;
              return { ...existingUser, ...newUser };
            } else {
              // Add new user
              return { ...newUser, id: Math.max(0, ...prevUsers.map(u => u.id)) + 1 };
            }
          });
          
          // Combine updated/new users with existing users that weren't in the import
          const emailsInImport = new Set(result.map(u => u.email));
          const unchangedUsers = prevUsers.filter(user => !emailsInImport.has(user.email));
          
          return [...unchangedUsers, ...processedUsers];
        });
        
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      } catch (error) {
        console.error('Error processing CSV:', error);
        setUploadError('Failed to process the CSV file. Please check the format.');
      } finally {
        setIsUploading(false);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    
    reader.onerror = () => {
      setUploadError('Failed to read the file.');
      setIsUploading(false);
    };
    
    reader.readAsText(file);
  };
  
  // Process CSV data
  const processCSV = (csvData: string) => {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    // Check if required headers exist
    const requiredHeaders = ['FirstName', 'LastName', 'Email', 'UserLevel'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    
    if (missingHeaders.length > 0) {
      throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
    }
    
    // Extract module columns
    const moduleHeaders = headers.filter(h => 
      !requiredHeaders.includes(h) && 
      availableModules.includes(h)
    );
    
    // Parse rows
    return lines.slice(1).filter(line => line.trim() !== '').map(line => {
      const values = line.split(',').map(v => v.trim());
      const user: any = {
        firstName: values[headers.indexOf('FirstName')],
        lastName: values[headers.indexOf('LastName')],
        email: values[headers.indexOf('Email')],
        userLevel: values[headers.indexOf('UserLevel')],
        modules: [],
      };
      
      // Process module access
      moduleHeaders.forEach(moduleHeader => {
        const moduleValue = values[headers.indexOf(moduleHeader)];
        if (moduleValue && moduleValue.toLowerCase() === 'yes') {
          user.modules.push(moduleHeader);
        }
      });
      
      return user;
    });
  };
  
  // Download template
  const downloadTemplate = () => {
    // Create CSV header
    const headerRow = ['FirstName', 'LastName', 'Email', 'UserLevel', ...availableModules];
    const csvContent = [headerRow.join(',')].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'User_Import_Template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Simulate delete user functionality
  const handleDeleteUser = (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };
  
  // Simulate edit user functionality
  const handleEditUser = (userId: number) => {
    alert(`Edit user with ID: ${userId}`);
    // In a real app, this would open a modal or navigate to an edit page
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Management</h2>
          <p className="text-gray-500 dark:text-gray-400">Add, edit, or remove users from the system</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => alert('Add user functionality')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>
      
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3 bg-gray-50 dark:bg-gray-800">
          <CardTitle className="text-lg">Import Users from CSV</CardTitle>
          <CardDescription>
            Upload a CSV file with user data or download a template
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="py-2"
                disabled={isUploading}
              />
              {isUploading && (
                <div className="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-2 border-indigo-600 rounded-full border-t-transparent"></div>
                </div>
              )}
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" onClick={downloadTemplate} className="flex-1 md:flex-initial">
                <Download className="mr-2 h-4 w-4" />
                Template
              </Button>
              <Button 
                onClick={() => fileInputRef.current?.click()} 
                disabled={isUploading}
                className="flex-1 md:flex-initial"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload CSV
              </Button>
            </div>
          </div>
          
          {uploadSuccess && (
            <div className="mt-3 flex items-center text-sm text-green-600 dark:text-green-400">
              <Check className="h-4 w-4 mr-1" />
              CSV imported successfully!
            </div>
          )}
          
          {uploadError && (
            <div className="mt-3 flex items-center text-sm text-red-600 dark:text-red-400">
              <X className="h-4 w-4 mr-1" />
              {uploadError}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-9 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filteredUsers.length} users found
        </div>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">User Level</TableHead>
              <TableHead className="font-semibold">Module Access</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-t border-gray-200 dark:border-gray-700">
                  <TableCell className="font-medium">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.userLevel === 'Admin' ? 'default' : 'outline'}>
                      {user.userLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.modules.map((module) => (
                        <Badge 
                          key={module} 
                          variant="secondary" 
                          className="bg-gray-100 dark:bg-gray-700 text-xs"
                        >
                          {module}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEditUser(user.id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteUser(user.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}