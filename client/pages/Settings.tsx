import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { SettingsContent } from "@/components/settings/settings-content";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Settings() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <DashboardSidebar activeItem="General Settings" />
        <SidebarInset className="flex flex-col min-w-0 flex-1">
          <DashboardHeader />
          <SettingsContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
