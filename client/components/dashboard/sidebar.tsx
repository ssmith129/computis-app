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
    href: "/",
  },
  {
    title: "Transactions",
    icon: ArrowLeftRight,
    href: "/transactions",
  },
  {
    title: "Wallets and Exchanges",
    icon: Wallet,
    href: "/wallets",
  },
  {
    title: "Clients",
    icon: Users,
    href: "/clients",
  },
];

const reportsItems = [
  {
    title: "IRS 8949",
    icon: FileText,
    href: "/irs-8949",
  },
  {
    title: "Gain/Loss",
    icon: TrendingUp,
    href: "/gain-loss",
  },
  {
    title: "Exports",
    icon: Download,
    href: "/exports",
  },
];

const settingsItems = [
  {
    title: "General Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "Preferences",
    icon: User,
    href: "/preferences",
  },
  {
    title: "Rule Engine",
    icon: Settings,
    href: "/rule-engine",
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

interface DashboardSidebarProps {
  activeItem?: string;
}

export function DashboardSidebar({ activeItem = "Dashboard" }: DashboardSidebarProps) {
  return (
    <Sidebar className="bg-sidebar border-r border-sidebar-border" style={{ width: "264px" }}>
      <SidebarHeader className="p-4 bg-sidebar">
        <div className="flex items-center">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/b9597295463998a42a59ddadf868fade81af1f2b?width=364"
            alt="Computis Logo" 
            className="h-10 w-auto"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 bg-sidebar text-sidebar-foreground">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => {
                const isActive = activeItem === item.title;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                      }`}
                    >
                      <a href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span className="font-semibold text-sm">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Reports Section */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-sidebar-foreground hover:text-sidebar-accent-foreground font-semibold text-sm">
                Reports
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {reportsItems.map((item) => {
                    const isActive = activeItem === item.title;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          className={`text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                            isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                          }`}
                        >
                          <a href={item.href}>
                            <item.icon className="h-5 w-5" />
                            <span className="font-semibold text-sm">{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Settings Section */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-sidebar-foreground hover:text-sidebar-accent-foreground font-semibold text-sm">
                Settings
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {settingsItems.map((item) => {
                    const isActive = activeItem === item.title;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          className={`text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                            isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                          }`}
                        >
                          <a href={item.href}>
                            <item.icon className="h-5 w-5" />
                            <span className="font-semibold text-sm">{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Help & Account Section */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-sidebar-foreground hover:text-sidebar-accent-foreground font-semibold text-sm">
                Help & Account
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {helpItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <item.icon className="h-5 w-5" />
                        <span className="font-semibold text-sm">{item.title}</span>
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
