import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { GainLossContent } from "@/components/gain-loss/gain-loss-content";
import { useIsMobile } from "@/hooks/use-mobile";

export default function GainLoss() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <DashboardSidebar activeItem="Gain/Loss" />
        <SidebarInset className="flex flex-col min-w-0 flex-1">
          <DashboardHeader />
          <GainLossContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
