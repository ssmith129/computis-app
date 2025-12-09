import { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

interface AppLayoutProps {
  children: ReactNode;
  activeItem?: string;
}

export function AppLayout({ children, activeItem }: AppLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
      {/* Full-width header container - outside max-width constraint */}
      <div className="w-full bg-sidebar border-b border-sidebar-border flex-shrink-0">
        <div className="w-full max-w-[1920px] mx-auto">
          <DashboardHeader />
        </div>
      </div>

      {/* Main content area with sidebar - constrained to max-width */}
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-1 min-h-0 w-full max-w-[1920px] mx-auto overflow-x-hidden">
          <DashboardSidebar activeItem={activeItem} />
          <SidebarInset className="flex flex-col min-w-0 flex-1">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
