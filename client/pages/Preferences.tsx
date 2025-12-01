import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { PreferencesContent } from "@/components/preferences/preferences-content";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Preferences() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
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
