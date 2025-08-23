import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { PreferencesContent } from "@/components/preferences/preferences-content";

export default function Preferences() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar activeItem="Preferences" />
        <SidebarInset className="flex flex-col">
          <DashboardHeader />
          <PreferencesContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
