
import React, { useState } from 'react';
import { ClientLayout } from '@/components/layouts/ClientLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Upload, Users, Search, Trash2, Plus, FileText, Download } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  description: string;
  count: number;
  created: string;
  status: 'active' | 'inactive';
}

export default function GroupManagement() {
  const [groups, setGroups] = useState<Group[]>([
    { id: '1', name: 'VIP Customers', description: 'Premium customer list', count: 1250, created: '2024-01-15', status: 'active' },
    { id: '2', name: 'Newsletter Subscribers', description: 'Monthly newsletter recipients', count: 8500, created: '2024-01-10', status: 'active' },
    { id: '3', name: 'Promotional Campaign', description: 'Black Friday campaign targets', count: 3200, created: '2024-01-05', status: 'inactive' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [newGroup, setNewGroup] = useState({ name: '', description: '', numbers: '' });
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateGroup = () => {
    const numbersArray = newGroup.numbers.split('\n').filter(num => num.trim());
    const group: Group = {
      id: Date.now().toString(),
      name: newGroup.name,
      description: newGroup.description,
      count: numbersArray.length,
      created: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setGroups([...groups, group]);
    setNewGroup({ name: '', description: '', numbers: '' });
  };

  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter(group => group.id !== id));
  };

  return (
    <ClientLayout>
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Group Management</h1>
                <p className="text-purple-100 text-lg">Organize and manage your contact groups</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">{groups.length}</div>
                <div className="text-purple-100">Total Groups</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">{groups.reduce((sum, g) => sum + g.count, 0).toLocaleString()}</div>
                <div className="text-purple-100">Total Contacts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">{groups.filter(g => g.status === 'active').length}</div>
                <div className="text-purple-100">Active Groups</div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="manage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-purple-100 to-pink-100 p-1 rounded-2xl">
            <TabsTrigger value="manage" className="rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              Manage Groups
            </TabsTrigger>
            <TabsTrigger value="create" className="rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              Create New Group
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manage" className="space-y-6">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-purple-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Your Groups</CardTitle>
                    <CardDescription className="text-purple-100">Manage your contact groups</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                    <Input
                      placeholder="Search groups..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-xl"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-purple-50 to-pink-50">
                      <TableHead className="font-semibold text-purple-900">Group Name</TableHead>
                      <TableHead className="font-semibold text-purple-900">Description</TableHead>
                      <TableHead className="font-semibold text-purple-900">Contacts</TableHead>
                      <TableHead className="font-semibold text-purple-900">Created</TableHead>
                      <TableHead className="font-semibold text-purple-900">Status</TableHead>
                      <TableHead className="font-semibold text-purple-900">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGroups.map((group) => (
                      <TableRow key={group.id} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300">
                        <TableCell className="font-semibold text-purple-900">{group.name}</TableCell>
                        <TableCell className="text-gray-600">{group.description}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {group.count.toLocaleString()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">{group.created}</TableCell>
                        <TableCell>
                          <Badge variant={group.status === 'active' ? 'default' : 'secondary'} 
                                 className={group.status === 'active' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-500'}>
                            {group.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-purple-300 hover:bg-purple-50">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-blue-300 hover:bg-blue-50">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleDeleteGroup(group.id)}
                              className="border-red-300 hover:bg-red-50 text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <CardTitle className="text-2xl flex items-center space-x-3">
                    <Plus className="h-6 w-6" />
                    <span>Manual Entry</span>
                  </CardTitle>
                  <CardDescription className="text-blue-100">Create a group by pasting numbers</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Group Name</label>
                    <Input
                      placeholder="Enter group name..."
                      value={newGroup.name}
                      onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                      className="rounded-xl border-2 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Description</label>
                    <Input
                      placeholder="Enter description..."
                      value={newGroup.description}
                      onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                      className="rounded-xl border-2 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Phone Numbers (one per line)</label>
                    <Textarea
                      placeholder="Enter phone numbers, one per line..."
                      value={newGroup.numbers}
                      onChange={(e) => setNewGroup({ ...newGroup, numbers: e.target.value })}
                      className="min-h-[200px] rounded-xl border-2 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <Button 
                    onClick={handleCreateGroup} 
                    disabled={!newGroup.name || !newGroup.numbers}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl py-3 text-lg font-semibold"
                  >
                    Create Group
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-green-50 rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <CardTitle className="text-2xl flex items-center space-x-3">
                    <Upload className="h-6 w-6" />
                    <span>CSV Upload</span>
                  </CardTitle>
                  <CardDescription className="text-green-100">Upload numbers from a CSV file</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Group Name</label>
                    <Input
                      placeholder="Enter group name..."
                      className="rounded-xl border-2 border-green-200 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Description</label>
                    <Input
                      placeholder="Enter description..."
                      className="rounded-xl border-2 border-green-200 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-700">Upload CSV File</label>
                    <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors">
                      <Upload className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Drop your CSV file here, or click to browse</p>
                      <p className="text-sm text-gray-500">Supports files up to 500,000 numbers</p>
                      <Input
                        type="file"
                        accept=".csv"
                        onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                        className="mt-4"
                      />
                    </div>
                  </div>
                  <Button 
                    disabled={!csvFile}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl py-3 text-lg font-semibold"
                  >
                    Upload & Create Group
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ClientLayout>
  );
}
