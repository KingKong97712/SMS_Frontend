
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare,
  Send,
  Upload,
  BarChart3,
  FileText,
  Zap,
  Settings,
  Calendar,
  Target
} from "lucide-react";

const clientMenuItems = [
  {
    title: "Dashboard",
    url: "/client",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Send Quick SMS",
    url: "/client/quick-sms",
    icon: Zap,
  },
  {
    title: "Send Bulk SMS",
    url: "/client/bulk-sms",
    icon: Send,
  },
  {
    title: "Send from File",
    url: "/client/file-sms",
    icon: Upload,
  },
  {
    title: "Campaign Management",
    url: "/client/campaigns",
    icon: Target,
  },
  {
    title: "Group Management",
    url: "/client/groups",
    icon: Users,
  },
  {
    title: "Content Templates",
    url: "/client/templates",
    icon: FileText,
  },
  {
    title: "Sender IDs",
    url: "/client/sender-ids",
    icon: MessageSquare,
  },
  {
    title: "Delivery Reports",
    url: "/client/reports",
    icon: BarChart3,
  },
  {
    title: "Queued Messages",
    url: "/client/queue",
    icon: Calendar,
  },
  {
    title: "Account Settings",
    url: "/client/account",
    icon: Settings,
  },
];

export function ClientSidebar() {
  return (
    <Sidebar className="border-r border-gray-200 bg-white shadow-lg">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Client Portal
            </h2>
            <p className="text-sm text-gray-500">SMS Marketing</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {clientMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`w-full mb-1 transition-all duration-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:border-l-4 hover:border-green-500 ${
                      item.active ? 'bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 text-green-700' : ''
                    }`}
                  >
                    <a href={item.url} className="flex items-center space-x-3 px-3 py-2 rounded-lg">
                      <item.icon className={`h-5 w-5 ${item.active ? 'text-green-600' : 'text-gray-500'}`} />
                      <span className={`text-sm font-medium ${item.active ? 'text-green-700' : 'text-gray-700'}`}>
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
