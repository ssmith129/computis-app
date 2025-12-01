import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { DataAnomalyDetectionContent } from "@/components/data-anomaly-detection/data-anomaly-detection-content";
import { useIsMobile } from "@/hooks/use-mobile";

export default function DataAnomalyDetection() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <DashboardSidebar activeItem="Transactions" />
        <SidebarInset className="flex flex-col min-w-0 flex-1">
          <DashboardHeader />
          <DataAnomalyDetectionContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
