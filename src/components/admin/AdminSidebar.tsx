
import React from 'react';
import { useLocation } from 'react-router-dom';
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
  Globe,
  Settings,
  Package,
  DollarSign,
  BarChart3,
  Shield,
  Router,
  MessageSquare,
  Filter
} from "lucide-react";

const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Client Management",
    url: "/admin/clients",
    icon: Users,
  },
  {
    title: "Countries",
    url: "/admin/countries",
    icon: Globe,
  },
  {
    title: "Traffic & Rates",
    url: "/admin/traffic",
    icon: BarChart3,
  },
  {
    title: "Packages",
    url: "/admin/packages",
    icon: Package,
  },
  {
    title: "SMPP Vendors",
    url: "/admin/smpp-vendors",
    icon: Router,
  },
  {
    title: "HTTP Vendors",
    url: "/admin/http-vendors",
    icon: MessageSquare,
  },
  {
    title: "Funds Management",
    url: "/admin/funds",
    icon: DollarSign,
  },
  {
    title: "SMS Filtering",
    url: "/admin/filters",
    icon: Filter,
  },
  {
    title: "System Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const location = useLocation();
  
  return (
    <Sidebar className="border-r border-gray-200 bg-white shadow-lg">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Admin Panel
            </h2>
            <p className="text-sm text-gray-500">SMS Platform</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`w-full mb-1 transition-all duration-200 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:border-l-4 hover:border-red-500 ${
                        isActive ? 'bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 text-red-700' : ''
                      }`}
                    >
                      <a href={item.url} className="flex items-center space-x-3 px-3 py-2 rounded-lg">
                        <item.icon className={`h-5 w-5 ${isActive ? 'text-red-600' : 'text-gray-500'}`} />
                        <span className={`text-sm font-medium ${isActive ? 'text-red-700' : 'text-gray-700'}`}>
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
