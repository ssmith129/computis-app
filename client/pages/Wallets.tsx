import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { WalletsContent } from "@/components/wallets/wallets-content";

export default function Wallets() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar activeItem="Wallets and Exchanges" />
        <SidebarInset className="flex flex-col">
          <DashboardHeader />
          <div className="bg-white border-b border-gray-200 px-6 py-6 text-left">
            <div className="max-w-7xl mx-auto text-left">
              <h1 className="text-2xl font-bold text-gray-900">
                Wallets and Exchanges
              </h1>
              <p className="text-gray-500 mt-1">
                Connect and manage your crypto wallets and exchange accounts
              </p>
            </div>
          </div>
          <WalletsContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
