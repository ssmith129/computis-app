import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { PreferencesContent } from "@/components/preferences/preferences-content";

export default function Preferences() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <DashboardSidebar activeItem="Preferences" />
        <SidebarInset className="flex flex-col min-w-0 flex-1">
          <DashboardHeader />
          <PreferencesContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
