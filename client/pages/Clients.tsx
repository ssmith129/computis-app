import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { ClientsContent } from "@/components/clients/clients-content";

export default function Clients() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <DashboardSidebar activeItem="Clients" />
        <SidebarInset className="flex flex-col min-w-0 flex-1">
          <DashboardHeader />
          <ClientsContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
