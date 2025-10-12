import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./sidebar";
import { DashboardHeader } from "./header";
import { DashboardContent } from "./dashboard-content";

interface DashboardLayoutProps {
  activeItem?: string;
}

export function DashboardLayout({ activeItem = "Dashboard" }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <DashboardSidebar activeItem={activeItem} />
        <SidebarInset className="flex flex-col min-w-0 flex-1">
          <DashboardHeader />
          <DashboardContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
