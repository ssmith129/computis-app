import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardContent } from "./dashboard-content";

interface DashboardLayoutProps {
  activeItem?: string;
}

export function DashboardLayout({
  activeItem = "Dashboard",
}: DashboardLayoutProps) {
  return (
    <AppLayout activeItem={activeItem}>
      <DashboardContent />
    </AppLayout>
  );
}
