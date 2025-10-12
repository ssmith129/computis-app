import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { ExportsContent } from "@/components/exports/exports-content";

export default function Exports() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <DashboardSidebar activeItem="Exports" />
        <SidebarInset className="flex flex-col min-w-0 flex-1">
          <DashboardHeader />
          <ExportsContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
