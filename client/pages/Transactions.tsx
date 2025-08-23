import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { TransactionsContent } from "@/components/transactions/transactions-content";

export default function Transactions() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar activeItem="Transactions" />
        <SidebarInset className="flex flex-col">
          <DashboardHeader />
          <TransactionsContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
