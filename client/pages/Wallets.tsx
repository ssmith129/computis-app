import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { WalletsContent } from "@/components/wallets/wallets-content";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Wallets() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar activeItem="Wallets and Exchanges" />
        <SidebarInset className="flex flex-col">
          <DashboardHeader />
          <div className="border-b border-border bg-background px-6 py-6 text-left">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  Wallets and Exchanges
                </h1>
                <p className="text-gray-500 mt-1">
                  Connect and manage your crypto wallets and exchange accounts
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button className="gap-0" asChild>
                  <Link to="/wallet-ingestion">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Wallet
                  </Link>
                </Button>
                <Button variant="outline" className="gap-0" asChild>
                  <Link to="/wallet-ingestion">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Exchange
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <WalletsContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
