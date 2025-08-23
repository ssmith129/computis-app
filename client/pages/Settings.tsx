import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { SettingsContent } from "@/components/settings/settings-content";

export default function Settings() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar activeItem="General Settings" />
        <SidebarInset className="flex flex-col">
          <DashboardHeader />
          <SettingsContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
