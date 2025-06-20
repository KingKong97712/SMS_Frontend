
import * as React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ClientManagement from "./pages/admin/ClientManagement";
import CountryManagement from "./pages/admin/CountryManagement";
import TrafficRates from "./pages/admin/TrafficRates";
import Packages from "./pages/admin/Packages";
import SMPPVendors from "./pages/admin/SMPPVendors";
import HTTPVendors from "./pages/admin/HTTPVendors";
import FundsManagement from "./pages/admin/FundsManagement";
import SMSFiltering from "./pages/admin/SMSFiltering";
import SystemSettings from "./pages/admin/SystemSettings";
import ClientDashboard from "./pages/client/ClientDashboard";
import GroupManagement from "./pages/client/GroupManagement";
import SenderIds from "./pages/client/SenderIds";
import ContentTemplates from "./pages/client/ContentTemplates";
import SendQuickSMS from "./pages/client/SendQuickSMS";
import SendBulkSMS from "./pages/client/SendBulkSMS";
import SendFileSMS from "./pages/client/SendFileSMS";
import CampaignCreation from "./pages/client/CampaignCreation";
import DeliveryReports from "./pages/client/DeliveryReports";
import QueuedMessages from "./pages/client/QueuedMessages";
import AccountSettings from "./pages/client/AccountSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/clients" element={<ClientManagement />} />
            <Route path="/admin/countries" element={<CountryManagement />} />
            <Route path="/admin/packages" element={<Packages />} />
            <Route path="/admin/smpp-vendors" element={<SMPPVendors />} />
            <Route path="/admin/http-vendors" element={<HTTPVendors />} />
            <Route path="/admin/funds" element={<FundsManagement />} />
            <Route path="/admin/filters" element={<SMSFiltering />} />
            <Route path="/admin/settings" element={<SystemSettings />} />
            
            {/* Client Routes */}
            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/client/groups" element={<GroupManagement />} />
            <Route path="/client/sender-ids" element={<SenderIds />} />
            <Route path="/client/templates" element={<ContentTemplates />} />
            <Route path="/client/quick-sms" element={<SendQuickSMS />} />
            <Route path="/client/bulk-sms" element={<SendBulkSMS />} />
            <Route path="/client/file-sms" element={<SendFileSMS />} />
            <Route path="/client/campaigns" element={<CampaignCreation />} />
            <Route path="/client/reports" element={<DeliveryReports />} />
            <Route path="/client/queue" element={<QueuedMessages />} />
            <Route path="/client/account" element={<AccountSettings />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
