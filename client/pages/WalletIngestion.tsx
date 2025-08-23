import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { WalletIngestionContent } from "@/components/wallet-ingestion/wallet-ingestion-content";

export default function WalletIngestion() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar activeItem="Wallets and Exchanges" />
        <SidebarInset className="flex flex-col">
          <DashboardHeader />
          <WalletIngestionContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
