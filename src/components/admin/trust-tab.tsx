'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Download, Save, X, Check, Image, PlusCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

// Mock trust data
const mockTrustData = [
  {
    id: 1,
    trustName: 'PENNINE ACADEMIES YORKSHIRE',
    trustCode: 'TR03728',
    groupId: 'TR03728',
    address: 'Pennine Academies Yorkshire Unit 10c Lister Court, Lister Mill, Beamsley Road',
    city: 'Bradford',
    county: 'Not recorded',
    postcode: 'BD9 4SH',
    phoneNumber: '01274 575353',
    companiesHouseNumber: '10975521',
    ukprn: '10067658',
    incorporatedOn: '21/09/2017',
    numberOfSchools: 7,
    localAuthority: 'Bradford',
    email: 'info@pennineacademies.org',
    website: 'https://www.pennineacademies.org',
    logo: null
  },
  {
    id: 2,
    trustName: 'HOLLINGWOOD ACADEMY TRUST',
    trustCode: 'TR12345',
    groupId: 'TR12345',
    address: '123 Education Lane',
    city: 'Leeds',
    county: 'West Yorkshire',
    postcode: 'LS1 3AB',
    phoneNumber: '0113 123 4567',
    companiesHouseNumber: '12345678',
    ukprn: '10098765',
    incorporatedOn: '15/05/2018',
    numberOfSchools: 3,
    localAuthority: 'Leeds',
    email: 'info@hollingwoodtrust.org',
    website: 'https://www.hollingwoodtrust.org',
    logo: null
  }
];

interface TrustData {
  id: number;
  trustName: string;
  trustCode: string;
  groupId: string;
  address: string;
  city: string;
  county: string;
  postcode: string;
  phoneNumber: string;
  companiesHouseNumber: string;
  ukprn: string;
  incorporatedOn: string;
  numberOfSchools: number;
  localAuthority: string;
  email: string;
  website: string;
  logo: string | null;
}

export default function TrustTab() {
  const [trusts, setTrusts] = useState<TrustData[]>(mockTrustData);
  const [selectedTrust, setSelectedTrust] = useState<TrustData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const csvInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  
  // Filter trusts based on search term
  const filteredTrusts = trusts.filter(trust => 
    trust.trustName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trust.trustCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trust.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission for edit or create
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTrust) {
      if (isCreating) {
        // Add new trust
        setTrusts([...trusts, { ...selectedTrust, id: Math.max(0, ...trusts.map(t => t.id)) + 1 }]);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        // Update existing trust
        setTrusts(trusts.map(trust => 
          trust.id === selectedTrust.id ? selectedTrust : trust
        ));
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
      // Reset state
      setIsEditing(false);
      setIsCreating(false);
      setSelectedTrust(null);
      setLogoPreview(null);
    }
  };
  
  // Handle changes to form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedTrust) {
      setSelectedTrust({ ...selectedTrust, [name]: value });
    }
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
      if (selectedTrust) {
        setSelectedTrust({ ...selectedTrust, logo: result });
      }
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
        const results = processCSV(csvData);
        
        if (results.length > 0) {
          // Update trusts with imported data
          setTrusts(prevTrusts => {
            // Create a map of existing trusts by code for quick lookup
            const existingTrustMap = new Map(prevTrusts.map(trust => [trust.trustCode, trust]));
            
            // Process imported trusts
            const processedTrusts = results.map(newTrust => {
              if (existingTrustMap.has(newTrust.trustCode)) {
                // Update existing trust
                const existingTrust = existingTrustMap.get(newTrust.trustCode)!;
                return { ...existingTrust, ...newTrust };
              } else {
                // Add new trust
                return { ...newTrust, id: Math.max(0, ...prevTrusts.map(t => t.id)) + 1 };
              }
            });
            
            // Combine with trusts not in the import
            const codesInImport = new Set(results.map(t => t.trustCode));
            const unchangedTrusts = prevTrusts.filter(trust => !codesInImport.has(trust.trustCode));
            
            return [...unchangedTrusts, ...processedTrusts];
          });
          
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
  
  // Process CSV data based on the actual format from SCHOOLGLE/src/app/admin/Trust_Import.csv
  const processCSV = (csvData: string): TrustData[] => {
    const lines = csvData.split('\n');
    if (lines.length < 2) {
      throw new Error('CSV file must contain at least a header row and a data row');
    }
    
    // Extract headers (first line)
    const headerLine = lines[0];
    const headers = headerLine.split(',').map(header => 
      header.replace(/^"/, '').replace(/"$/, '').trim()
    );
    
    // Create a mapping from CSV headers to our data model
    const fieldMapping: Record<string, keyof TrustData | null> = {
      'Group name': 'trustName',
      'Group id': 'groupId',
      'Group id': 'trustCode', // Mapping multiple headers to same field
      'Group Street': 'address',
      'Group Town': 'city',
      'Group County': 'county',
      'Group Postcode': 'postcode',
      'Companies house number': 'companiesHouseNumber',
      'Incorporated on (open date)': 'incorporatedOn',
      'Number of linked providers': 'numberOfSchools',
      'Local Authority': 'localAuthority',
      'UKPRN': 'ukprn',
      // Fields not directly in the CSV
      'Telephone Number': 'phoneNumber',
      'Email': 'email',
      'Website': 'website'
    };
    
    // Parse data rows
    const results: TrustData[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; // Skip empty lines
      
      // Split by comma but respect quoted values
      const values: string[] = [];
      let currentValue = '';
      let inQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim()); // Add the last value
      
      // Create trust data object
      const trustData: Partial<TrustData> = { logo: null };
      
      // Map CSV values to trustData fields
      headers.forEach((header, index) => {
        const mappedField = fieldMapping[header];
        if (mappedField && index < values.length) {
          const value = values[index].replace(/^"/, '').replace(/"$/, '');
          
          // Handle numeric fields
          if (mappedField === 'numberOfSchools') {
            trustData[mappedField] = parseInt(value) || 0;
          } else {
            (trustData as any)[mappedField] = value;
          }
        }
      });
      
      // Ensure we have the required fields
      if (trustData.trustName && trustData.trustCode) {
        results.push(trustData as TrustData);
      }
    }
    
    return results;
  };
  
  // Download template based on actual format
  const downloadTemplate = () => {
    // Headers based on the actual file format
    const headerRow = [
      'UID', 'Group id', 'Group name', 'Group Type', 'Group Type (code)', 
      'Open date', 'Incorporated on (open date)', 'Companies house number',
      'Group Street', 'Group Locality', 'Group Address 3', 'Group Town', 
      'Group County', 'Group Postcode', 'Number of linked providers',
      'Local Authority', 'UKPRN', 'Delegation information', 'Corporate contact'
    ];
    
    // Sample data row
    const sampleRow = [
      '12345', 'TR12345', 'EXAMPLE TRUST NAME', 'Multi-academy trust', '06',
      '', '01/01/2020', '12345678', 'Example Street Address', 'Example Locality',
      '', 'Example Town', 'Example County', 'AB12 3CD', '5',
      'Example Authority', '10012345', '', ''
    ];
    
    const csvContent = [
      headerRow.join(','),
      sampleRow.join(',')
    ].join('\n');
    
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

  // Handle edit trust
  const handleEditTrust = (trust: TrustData) => {
    setSelectedTrust({ ...trust });
    setLogoPreview(trust.logo);
    setIsEditing(true);
    setIsCreating(false);
  };
  
  // Handle create new trust
  const handleCreateTrust = () => {
    setSelectedTrust({
      id: 0,
      trustName: '',
      trustCode: '',
      groupId: '',
      address: '',
      city: '',
      county: '',
      postcode: '',
      phoneNumber: '',
      companiesHouseNumber: '',
      ukprn: '',
      incorporatedOn: '',
      numberOfSchools: 0,
      localAuthority: '',
      email: '',
      website: '',
      logo: null
    });
    setLogoPreview(null);
    setIsCreating(true);
    setIsEditing(false);
  };
  
  // Handle delete trust
  const handleDeleteTrust = (trustId: number) => {
    if (confirm('Are you sure you want to delete this trust? This action cannot be undone.')) {
      setTrusts(trusts.filter(trust => trust.id !== trustId));
    }
  };

  return (
    <div className="space-y-6">
      {!isEditing && !isCreating ? (
        <>
          <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Trust Management</h2>
              <p className="text-gray-500 dark:text-gray-400">Manage your educational trusts</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => csvInputRef.current?.click()}>
                <FileText className="mr-2 h-4 w-4" />
                Import CSV
              </Button>
              <Button onClick={handleCreateTrust}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Trust
              </Button>
            </div>
          </div>
          
          <input
            type="file"
            accept=".csv"
            ref={csvInputRef}
            onChange={handleCsvImport}
            className="hidden"
          />
          
          {uploadSuccess && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4 mb-4">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                  Trust data imported successfully!
                </p>
              </div>
            </div>
          )}
          
          {uploadError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-4">
              <div className="flex items-center">
                <X className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                <p className="text-red-700 dark:text-red-300 text-sm font-medium">
                  {uploadError}
                </p>
              </div>
            </div>
          )}
          
          <Card className="border border-gray-200 dark:border-gray-700 mb-6">
            <CardHeader className="bg-gray-50 dark:bg-gray-800">
              <CardTitle className="text-lg">Import / Export</CardTitle>
              <CardDescription>
                Import trust data from CSV or download a template
              </CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" onClick={downloadTemplate} className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
                <Button 
                  onClick={() => csvInputRef.current?.click()} 
                  disabled={isUploading}
                  className="flex-1"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Import from CSV
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                The CSV template follows the official Department for Education format for multi-academy trusts.
                Required fields include Group id, Group name, and Group Postcode.
              </p>
            </CardContent>
          </Card>
          
          <div className="mb-4">
            <Input
              placeholder="Search trusts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-800">
                  <TableHead className="font-semibold">Trust Name</TableHead>
                  <TableHead className="font-semibold">Trust Code</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="font-semibold">Schools</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrusts.length > 0 ? (
                  filteredTrusts.map((trust) => (
                    <TableRow key={trust.id} className="border-t border-gray-200 dark:border-gray-700">
                      <TableCell className="font-medium">
                        {trust.trustName}
                      </TableCell>
                      <TableCell>{trust.trustCode}</TableCell>
                      <TableCell>{trust.city}, {trust.postcode}</TableCell>
                      <TableCell>{trust.numberOfSchools}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handleEditTrust(trust)}>
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteTrust(trust.id)}>
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No trusts found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardHeader className="bg-gray-50 dark:bg-gray-800">
            <CardTitle className="text-lg">
              {isCreating ? 'Add New Trust' : 'Edit Trust'}
            </CardTitle>
            <CardDescription>
              {isCreating 
                ? 'Enter details for the new trust' 
                : `Editing ${selectedTrust?.trustName}`}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6 md:col-span-2">
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
                        <Label htmlFor="logo-upload">Trust Logo</Label>
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
                          type="button"
                          onClick={() => {
                            setLogoPreview(null);
                            if (selectedTrust) {
                              setSelectedTrust({ ...selectedTrust, logo: null });
                            }
                            if (logoInputRef.current) {
                              logoInputRef.current.value = '';
                            }
                          }}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Remove Logo
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="trustName">Trust Name</Label>
                    <Input
                      id="trustName"
                      name="trustName"
                      value={selectedTrust?.trustName || ''}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="trustCode">Trust Code</Label>
                    <Input
                      id="trustCode"
                      name="trustCode"
                      value={selectedTrust?.trustCode || ''}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Usually starts with "TR" followed by numbers</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="companiesHouseNumber">Companies House Number</Label>
                    <Input
                      id="companiesHouseNumber"
                      name="companiesHouseNumber"
                      value={selectedTrust?.companiesHouseNumber || ''}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="incorporatedOn">Incorporated On</Label>
                    <Input
                      id="incorporatedOn"
                      name="incorporatedOn"
                      value={selectedTrust?.incorporatedOn || ''}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="ukprn">UKPRN</Label>
                    <Input
                      id="ukprn"
                      name="ukprn"
                      value={selectedTrust?.ukprn || ''}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={selectedTrust?.address || ''}
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
                        value={selectedTrust?.city || ''}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="county">County</Label>
                      <Input
                        id="county"
                        name="county"
                        value={selectedTrust?.county || ''}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="postcode">Postcode</Label>
                    <Input
                      id="postcode"
                      name="postcode"
                      value={selectedTrust?.postcode || ''}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={selectedTrust?.phoneNumber || ''}
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
                      value={selectedTrust?.email || ''}
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
                      value={selectedTrust?.website || ''}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setIsCreating(false);
                  setSelectedTrust(null);
                  setLogoPreview(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {isCreating ? 'Create Trust' : 'Save Changes'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
}