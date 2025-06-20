
import React, { useState } from 'react';
import { ClientLayout } from '@/components/layouts/ClientLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Upload, Send, File, MessageSquare, AlertCircle, CheckCircle, X } from 'lucide-react';

export default function SendFileSMS() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [selectedSenderId, setSelectedSenderId] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [processing, setProcessing] = useState(false);
  const [sending, setSending] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);

  const senderIds = [
    { id: 'COMPANY', status: 'approved' },
    { id: 'PROMO', status: 'pending' },
    { id: 'ALERT', status: 'approved' }
  ];

  const templates = [
    { id: '1', name: 'Welcome Message', content: 'Welcome {{name}}! Thank you for joining {{company}}.' },
    { id: '2', name: 'Promotional Offer', content: 'Hi {{name}}! Get {{discount}}% off on your next purchase.' },
    { id: '3', name: 'Event Reminder', content: 'Hello {{name}}, reminder for the event on {{date}}.' }
  ];

  const characterCount = message.length;
  const smsCount = Math.ceil(characterCount / 160) || 1;

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setProcessing(true);

    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted phone numbers
    const mockNumbers = Array.from({ length: Math.floor(Math.random() * 1000) + 100 }, (_, i) => 
      `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`
    );
    setPhoneNumbers(mockNumbers);
    setProcessing(false);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setPhoneNumbers([]);
  };

  const handleUseTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setMessage(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const handleSendSMS = async () => {
    setSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    setSending(false);
    // Reset form or show success message
  };

  return (
    <ClientLayout>
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Upload className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Send SMS from File</h1>
                <p className="text-violet-100 text-lg">Upload a file and send SMS to all numbers</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">{uploadedFile ? '1' : '0'}</div>
                <div className="text-violet-100">File Uploaded</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">{phoneNumbers.length.toLocaleString()}</div>
                <div className="text-violet-100">Numbers Found</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">{smsCount}</div>
                <div className="text-violet-100">SMS Parts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">${(0.05 * smsCount * phoneNumbers.length).toFixed(2)}</div>
                <div className="text-violet-100">Est. Cost</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-violet-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <Upload className="h-6 w-6" />
                  <span>Upload File</span>
                </CardTitle>
                <CardDescription className="text-violet-100">Upload a .txt, .csv, or .xlsx file containing phone numbers</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {!uploadedFile ? (
                  <div className="border-2 border-dashed border-violet-300 rounded-2xl p-12 text-center hover:border-violet-500 transition-colors">
                    <Upload className="h-16 w-16 text-violet-500 mx-auto mb-6" />
                    <h3 className="text-xl font-semibold text-violet-900 mb-2">Drop your file here</h3>
                    <p className="text-gray-600 mb-6">Or click to browse and select a file</p>
                    <div className="space-y-2 text-sm text-gray-500 mb-6">
                      <p>• Supports .txt, .csv, .xlsx files</p>
                      <p>• Maximum file size: 50MB</p>
                      <p>• Up to 500,000 phone numbers</p>
                      <p>• One number per line for .txt files</p>
                    </div>
                    <Input
                      type="file"
                      accept=".txt,.csv,.xlsx"
                      onChange={handleFileUpload}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-violet-100 rounded-xl">
                            <File className="h-8 w-8 text-violet-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-violet-900">{uploadedFile.name}</h3>
                            <p className="text-gray-600">Size: {(uploadedFile.size / 1024).toFixed(1)} KB</p>
                            {processing ? (
                              <div className="flex items-center space-x-2 mt-2">
                                <div className="animate-spin h-4 w-4 border-2 border-violet-500 border-t-transparent rounded-full"></div>
                                <span className="text-violet-600">Processing file...</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2 mt-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-green-600">{phoneNumbers.length} numbers extracted</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={handleRemoveFile}
                          className="border-red-300 hover:bg-red-50 text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {phoneNumbers.length > 0 && (
                      <div className="bg-white rounded-2xl border-2 border-violet-200 p-6">
                        <h4 className="font-semibold text-violet-900 mb-4">Phone Numbers Preview</h4>
                        <div className="max-h-32 overflow-y-auto bg-gray-50 rounded-xl p-4 font-mono text-sm">
                          {phoneNumbers.slice(0, 10).map((number, index) => (
                            <div key={index} className="text-gray-700">{number}</div>
                          ))}
                          {phoneNumbers.length > 10 && (
                            <div className="text-gray-500 italic">... and {phoneNumbers.length - 10} more</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <MessageSquare className="h-6 w-6" />
                  <span>Message Content</span>
                </CardTitle>
                <CardDescription className="text-blue-100">Compose your SMS message for all recipients</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[150px] rounded-xl border-2 border-blue-200 focus:border-blue-500"
                  />
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span>{characterCount}/160 characters</span>
                      {characterCount > 160 && (
                        <span className="ml-2 text-orange-600">({smsCount} SMS parts)</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {characterCount > 0 && characterCount <= 160 && (
                        <Badge className="bg-green-500">1 SMS</Badge>
                      )}
                      {characterCount > 160 && (
                        <Badge className="bg-orange-500">{smsCount} SMS</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-orange-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <CardTitle className="text-xl">Sender ID</CardTitle>
                <CardDescription className="text-orange-100">Choose your sender identity</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {senderIds.map((sender) => (
                  <div 
                    key={sender.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedSenderId === sender.id 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-orange-300'
                    } ${sender.status !== 'approved' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => sender.status === 'approved' && setSelectedSenderId(sender.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">{sender.id}</span>
                      <Badge 
                        className={sender.status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'}
                      >
                        {sender.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-green-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <CardTitle className="text-xl">Quick Templates</CardTitle>
                <CardDescription className="text-green-100">Use predefined templates</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {templates.map((template) => (
                  <div 
                    key={template.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedTemplate === template.id 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    <div className="font-semibold text-green-800 mb-2">{template.name}</div>
                    <div className="text-sm text-gray-600 truncate">{template.content}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-purple-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                <CardTitle className="text-xl">Send SMS</CardTitle>
                <CardDescription className="text-purple-100">Review and send your file campaign</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <div className="font-semibold mb-2">Campaign Summary:</div>
                      <div>File: {uploadedFile?.name || 'No file selected'}</div>
                      <div>Recipients: {phoneNumbers.length.toLocaleString()}</div>
                      <div>SMS Parts: {(smsCount * phoneNumbers.length).toLocaleString()}</div>
                      <div className="font-semibold">Total Cost: ${(0.05 * smsCount * phoneNumbers.length).toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleSendSMS}
                  disabled={!uploadedFile || phoneNumbers.length === 0 || !message || !selectedSenderId || processing || sending}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 rounded-xl py-4 text-lg font-semibold"
                >
                  {sending ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="h-5 w-5" />
                      <span>Send SMS to All Numbers</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
