import { 
  BarChart3, 
  ArrowLeftRight, 
  Wallet, 
  Users, 
  FileText, 
  Settings, 
  HelpCircle, 
  User, 
  Keyboard,
  ChevronDown,
  TrendingUp,
  Download
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const mainNavItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    isActive: true,
  },
  {
    title: "Transactions", 
    icon: ArrowLeftRight,
  },
  {
    title: "Wallets and Exchanges",
    icon: Wallet,
  },
  {
    title: "Clients",
    icon: Users,
  },
];

const reportsItems = [
  {
    title: "IRS 8949",
    icon: FileText,
  },
  {
    title: "Gain/Loss", 
    icon: TrendingUp,
  },
  {
    title: "CSV Exports",
    icon: Download,
  },
];

const settingsItems = [
  {
    title: "General Settings",
    icon: Settings,
  },
  {
    title: "Preferences",
    icon: User,
  },
  {
    title: "Rule Engine",
    icon: Settings,
  },
];

const helpItems = [
  {
    title: "My Account",
    icon: User,
  },
  {
    title: "Help Page",
    icon: HelpCircle,
  },
  {
    title: "Keyboard Shortcuts",
    icon: Keyboard,
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar className="bg-sidebar border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/b9597295463998a42a59ddadf868fade81af1f2b?width=364"
            alt="Computis Logo" 
            className="h-10 w-auto"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={item.isActive}
                    className={item.isActive ? "bg-sidebar-accent" : ""}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Reports Section */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                Reports
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {reportsItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Settings Section */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                Settings
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {settingsItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Help & Account Section */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                Help & Account
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {helpItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
