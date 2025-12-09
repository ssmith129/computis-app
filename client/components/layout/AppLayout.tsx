import { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

interface AppLayoutProps {
  children: ReactNode;
  activeItem?: string;
}

/**
 * AppLayout Component
 *
 * Responsive layout structure with:
 * - Full-width header (z-index: 50)
 * - Side navigation (z-index: 30 on desktop, mobile sheet on < 768px)
 * - Main content area with max-width constraint
 *
 * Breakpoints:
 * - Mobile: < 768px (sidebar as overlay sheet)
 * - Tablet: 768px - 1024px (collapsible sidebar)
 * - Desktop: > 1024px (persistent sidebar)
 * - Ultra-wide: > 1920px (centered layout)
 */
export function AppLayout({ children, activeItem }: AppLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
      {/*
        Full-width header container
        - Spans 100% viewport width
        - z-index: 50 (above sidebar at z-30)
        - Sticky positioning on scroll
        - Isolated stacking context to prevent z-index conflicts
      */}
      <div
        className="w-full bg-sidebar border-b border-sidebar-border flex-shrink-0 sticky top-0 z-50"
        style={{ isolation: 'isolate' }}
      >
        <div className="w-full max-w-[1920px] mx-auto">
          <DashboardHeader />
        </div>
      </div>

      {/*
        Main content area with sidebar
        - Max-width: 1920px (centered on ultra-wide)
        - Flexbox layout (row on desktop, column on mobile)
        - Sidebar: 16rem on desktop, full-width sheet on mobile
        - Content: Fills remaining space
      */}
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-1 min-h-0 w-full max-w-[1920px] mx-auto overflow-x-hidden relative">
          {/*
            Sidebar Navigation
            - Desktop (≥768px): Fixed width sidebar (16rem)
            - Mobile (<768px): Sheet overlay from left
            - z-index: 30 (below header)
          */}
          <DashboardSidebar activeItem={activeItem} />

          {/*
            Main Content Area
            - Flexbox column layout
            - Fills remaining horizontal space
            - Scrollable content
            - Responsive padding
          */}
          <SidebarInset className="flex flex-col min-w-0 flex-1">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
