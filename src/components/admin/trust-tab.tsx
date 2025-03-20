'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Download, Save, X, Check, Image } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Mock trust data
const mockTrustData = {
  trustName: 'Pennine Academies Yorkshire',
  trustCode: 'PAY123',
  address: 'Trust House, Academy Road',
  city: 'Bradford',
  postcode: 'BD1 2AB',
  phoneNumber: '01234567890',
  email: 'info@pennineacademies.org',
  website: 'https://www.pennineacademies.org',
  ceo: 'John Smith',
  cfo: 'Jane Doe',
  logo: null
};

export default function TrustTab() {
  const [trustData, setTrustData] = useState(mockTrustData);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  
  const csvInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  
  // Handle changes to form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTrustData(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };
  
  // Handle save changes
  const handleSave = () => {
    // In a real app, this would save to a database
    alert('Trust data saved successfully!');
    setIsDirty(false);
  };
  
  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }
    
    // Read and display the image
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setLogoPreview(result);
      setTrustData(prev => ({ ...prev, logo: result }));
      setIsDirty(true);
      setUploadError('');
    };
    
    reader.onerror = () => {
      setUploadError('Failed to read the image file.');
    };
    
    reader.readAsDataURL(file);
  };
  
  // Handle CSV import
  const handleCsvImport = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        
        if (result) {
          setTrustData(result);
          setIsDirty(true);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
        }
      } catch (error) {
        console.error('Error processing CSV:', error);
        setUploadError('Failed to process the CSV file. Please check the format.');
      } finally {
        setIsUploading(false);
        // Reset file input
        if (csvInputRef.current) {
          csvInputRef.current.value = '';
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
    if (lines.length < 2) {
      throw new Error('CSV file must contain at least a header row and a data row');
    }
    
    const headers = lines[0].split(',').map(h => h.trim());
    const dataLine = lines[1];
    const values = dataLine.split(',').map(v => v.trim());
    
    // Create a map of header to value
    const dataMap: Record<string, string> = {};
    headers.forEach((header, index) => {
      if (index < values.length) {
        dataMap[header] = values[index];
      }
    });
    
    // Map CSV headers to trust data properties
    const trustDataMap: Record<string, keyof typeof trustData> = {
      'TrustName': 'trustName',
      'TrustCode': 'trustCode',
      'Address': 'address',
      'City': 'city',
      'Postcode': 'postcode',
      'PhoneNumber': 'phoneNumber',
      'Email': 'email',
      'Website': 'website',
      'CEO': 'ceo',
      'CFO': 'cfo',
    };
    
    // Create new trust data object with imported values
    const newTrustData = { ...trustData };
    for (const csvHeader in trustDataMap) {
      const propertyName = trustDataMap[csvHeader];
      if (dataMap[csvHeader]) {
        newTrustData[propertyName] = dataMap[csvHeader];
      }
    }
    
    return newTrustData;
  };
  
  // Download template
  const downloadTemplate = () => {
    const headerRow = ['TrustName', 'TrustCode', 'Address', 'City', 'Postcode', 'PhoneNumber', 'Email', 'Website', 'CEO', 'CFO'];
    const csvContent = [headerRow.join(',')].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'Trust_Import_Template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Trust Information</h2>
        <p className="text-gray-500 dark:text-gray-400">Manage details about your educational trust</p>
      </div>
      
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3 bg-gray-50 dark:bg-gray-800">
          <CardTitle className="text-lg">Import Trust Data</CardTitle>
          <CardDescription>
            Upload a CSV file with trust information or download a template
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Input
                type="file"
                accept=".csv"
                ref={csvInputRef}
                onChange={handleCsvImport}
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
                onClick={() => csvInputRef.current?.click()} 
                disabled={isUploading}
                className="flex-1 md:flex-initial"
              >
                <Upload className="mr-2 h-4 w-4" />
                Import CSV
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
      
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3 bg-gray-50 dark:bg-gray-800">
          <CardTitle className="text-lg">Trust Logo</CardTitle>
          <CardDescription>
            Upload your trust's logo for use throughout the system
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-40 h-40 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
              {logoPreview ? (
                <img 
                  src={logoPreview} 
                  alt="Trust Logo" 
                  className="w-full h-full object-contain" 
                />
              ) : (
                <div className="text-center p-4">
                  <Image className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">No logo uploaded</p>
                </div>
              )}
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <Label htmlFor="logo-upload">Upload Logo</Label>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  ref={logoInputRef}
                  onChange={handleLogoUpload}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Recommended size: 400 x 400 pixels, PNG or JPEG format
                </p>
              </div>
              
              {uploadError && (
                <div className="flex items-center text-sm text-red-600 dark:text-red-400">
                  <X className="h-4 w-4 mr-1" />
                  {uploadError}
                </div>
              )}
              
              {logoPreview && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    setLogoPreview(null);
                    setTrustData(prev => ({ ...prev, logo: null }));
                    if (logoInputRef.current) {
                      logoInputRef.current.value = '';
                    }
                    setIsDirty(true);
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Remove Logo
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3 bg-gray-50 dark:bg-gray-800">
          <CardTitle className="text-lg">Trust Details</CardTitle>
          <CardDescription>
            Basic information about your educational trust
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label htmlFor="trustName">Trust Name</Label>
                <Input
                  id="trustName"
                  name="trustName"
                  value={trustData.trustName}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="trustCode">Trust Code</Label>
                <Input
                  id="trustCode"
                  name="trustCode"
                  value={trustData.trustCode}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={trustData.address}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={trustData.city}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input
                    id="postcode"
                    name="postcode"
                    value={trustData.postcode}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={trustData.phoneNumber}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={trustData.email}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={trustData.website}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ceo">CEO Name</Label>
                  <Input
                    id="ceo"
                    name="ceo"
                    value={trustData.ceo}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cfo">CFO Name</Label>
                  <Input
                    id="cfo"
                    name="cfo"
                    value={trustData.cfo}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <Button onClick={handleSave} disabled={!isDirty}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
}