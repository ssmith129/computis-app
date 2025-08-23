import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { GainLossContent } from "@/components/gain-loss/gain-loss-content";

export default function GainLoss() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar activeItem="Gain/Loss" />
        <SidebarInset className="flex flex-col">
          <DashboardHeader />
          <GainLossContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
