import React, { useState } from 'react';
import { ClientLayout } from '@/components/layouts/ClientLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Eye, RotateCcw, Edit, Trash2, Calendar, RefreshCw, Clock } from "lucide-react";

export default function QueuedMessages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(false);
  
  const queuedMessages = [
    {
      id: 1,
      scheduledTime: "2024-01-16 09:00:00",
      smsType: "Campaign",
      recipient: "VIP Customers (150 contacts)",
      senderId: "PROMO",
      vendorRoute: "GlobalSMS HTTP",
      content: "🌟 Exclusive VIP offer! Get 30% off premium products. Limited time only!",
      retryCount: "0/3",
      status: "scheduled"
    },
    {
      id: 2,
      scheduledTime: "2024-01-15 18:30:00",
      smsType: "Bulk SMS",
      recipient: "+1234567890",
      senderId: "NOTIFY",
      vendorRoute: "FastRoute SMPP",
      content: "Your appointment is confirmed for tomorrow at 2 PM. Please arrive 15 minutes early.",
      retryCount: "1/3",
      status: "retrying"
    },
    {
      id: 3,
      scheduledTime: "2024-01-15 16:45:00",
      smsType: "Quick SMS",
      recipient: "+44987654321",
      senderId: "ALERT",
      vendorRoute: "CloudSMS API",
      content: "Security alert: New login detected from Chrome on Windows. If this wasn't you, contact support immediately.",
      retryCount: "0/3",
      status: "queued"
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      queued: "bg-blue-100 text-blue-800",
      scheduled: "bg-purple-100 text-purple-800",
      retrying: "bg-orange-100 text-orange-800"
    };
    return colors[status as keyof typeof colors] || colors.queued;
  };

  const handleSelectMessage = (messageId: number) => {
    setSelectedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const handleSelectAll = () => {
    setSelectedMessages(
      selectedMessages.length === queuedMessages.length 
        ? [] 
        : queuedMessages.map(msg => msg.id)
    );
  };

  return (
    <ClientLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Queued Messages
            </h1>
            <p className="text-gray-600 mt-2">Manage scheduled and pending SMS messages</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="autoRefresh" 
                checked={autoRefresh}
                onCheckedChange={(checked) => setAutoRefresh(checked === true)}
              />
              <Label htmlFor="autoRefresh" className="text-sm">Auto-refresh (30s)</Label>
            </div>
            <Button 
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-white to-orange-50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>SMS Type</Label>
                <select className="w-full p-2 border border-gray-200 rounded-md">
                  <option>All Types</option>
                  <option>Quick SMS</option>
                  <option>Bulk SMS</option>
                  <option>File SMS</option>
                  <option>Campaign</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <select className="w-full p-2 border border-gray-200 rounded-md">
                  <option>All Status</option>
                  <option>Queued</option>
                  <option>Scheduled</option>
                  <option>Retrying</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="flex space-x-2">
                  <Input placeholder="From" className="flex-1" />
                  <Input placeholder="To" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Number, campaign..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Total Queued", value: "247", icon: Clock, gradient: "from-blue-500 to-cyan-500" },
            { title: "Scheduled", value: "189", icon: Calendar, gradient: "from-purple-500 to-pink-500" },
            { title: "Retrying", value: "43", icon: RotateCcw, gradient: "from-orange-500 to-red-500" },
            { title: "Next Hour", value: "67", icon: Clock, gradient: "from-green-500 to-teal-500" }
          ].map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-xl">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`}></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bulk Actions */}
        {selectedMessages.length > 0 && (
          <Card className="shadow-xl border-0 bg-gradient-to-r from-red-50 to-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{selectedMessages.length} message(s) selected</p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Retry Selected
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Cancel Selected
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Messages Table */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
            <CardTitle className="text-gray-900">Queued SMS Messages</CardTitle>
            <CardDescription>Manage scheduled and pending messages</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedMessages.length === queuedMessages.length}
                      onCheckedChange={(checked) => {
                        if (checked === true) {
                          setSelectedMessages(queuedMessages.map(msg => msg.id));
                        } else {
                          setSelectedMessages([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead className="font-semibold">Scheduled Time</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Recipient</TableHead>
                  <TableHead className="font-semibold">Sender ID</TableHead>
                  <TableHead className="font-semibold">Vendor</TableHead>
                  <TableHead className="font-semibold">Message</TableHead>
                  <TableHead className="font-semibold">Retry</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queuedMessages.map((message) => (
                  <TableRow key={message.id} className="hover:bg-orange-50/50 transition-colors">
                    <TableCell>
                      <Checkbox 
                        checked={selectedMessages.includes(message.id)}
                        onCheckedChange={(checked) => {
                          if (checked === true) {
                            setSelectedMessages(prev => [...prev, message.id]);
                          } else {
                            setSelectedMessages(prev => prev.filter(id => id !== message.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-sm">{message.scheduledTime}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-orange-200 text-orange-600">
                        {message.smsType}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{message.recipient}</TableCell>
                    <TableCell className="font-mono">{message.senderId}</TableCell>
                    <TableCell className="text-sm">{message.vendorRoute}</TableCell>
                    <TableCell className="max-w-xs truncate">{message.content}</TableCell>
                    <TableCell className="font-mono text-sm">{message.retryCount}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(message.status)}>
                        {message.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Message Details</DialogTitle>
                              <DialogDescription>Complete information about this queued message</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">Scheduled Time</Label>
                                  <p className="font-mono">{message.scheduledTime}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">SMS Type</Label>
                                  <p>{message.smsType}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">Sender ID</Label>
                                  <p className="font-mono">{message.senderId}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">Vendor Route</Label>
                                  <p>{message.vendorRoute}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">Retry Count</Label>
                                  <p className="font-mono">{message.retryCount}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">Current Status</Label>
                                  <Badge className={getStatusColor(message.status)}>
                                    {message.status}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-600">Recipient(s)</Label>
                                <p className="p-2 bg-gray-50 rounded-md">{message.recipient}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-600">Message Content</Label>
                                <p className="p-3 bg-gray-50 rounded-md">{message.content}</p>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">Reschedule</Button>
                                <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                                  <RotateCcw className="h-4 w-4 mr-2" />
                                  Retry Now
                                </Button>
                                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
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
      </div>
    </ClientLayout>
  );
}
