import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { RuleEngineContent } from "@/components/rule-engine/rule-engine-content";

export default function RuleEngine() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar activeItem="Rule Engine" />
        <SidebarInset className="flex flex-col">
          <DashboardHeader />
          <RuleEngineContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
