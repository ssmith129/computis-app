import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./sidebar";
import { DashboardHeader } from "./header";
import { DashboardContent } from "./dashboard-content";

export function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col">
          <DashboardHeader />
          <DashboardContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
