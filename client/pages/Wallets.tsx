import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { WalletsContent } from "@/components/wallets/wallets-content";

export default function Wallets() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <DashboardSidebar activeItem="Wallets and Exchanges" />
        <SidebarInset className="flex flex-col min-w-0 flex-1">
          <DashboardHeader />
          <WalletsContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
