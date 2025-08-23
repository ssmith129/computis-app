import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { DataAnomalyDetectionContent } from "@/components/data-anomaly-detection/data-anomaly-detection-content";

export default function DataAnomalyDetection() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar activeItem="Transactions" />
        <SidebarInset className="flex flex-col">
          <DashboardHeader />
          <DataAnomalyDetectionContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
