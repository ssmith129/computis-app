import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { Irs8949Content } from "@/components/irs-8949/irs-8949-content";

export default function Irs8949() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar activeItem="IRS 8949" />
        <SidebarInset className="flex flex-col">
          <DashboardHeader />
          <Irs8949Content />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
