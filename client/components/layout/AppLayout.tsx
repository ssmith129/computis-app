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
 * Layout structure with header positioned to the right of sidebar:
 *
 * Desktop Layout:
 * ┌────────┬─────────────────────┐
 * │        │     HEADER          │
 * │ SIDE   ├─────────────────────┤
 * │ NAV    │                     │
 * │        │     CONTENT         │
 * └────────┴─────────────────────┘
 *
 * Mobile Layout (< 768px):
 * ┌─────────────────────────────┐
 * │        HEADER               │
 * ├─────────────────────────────┤
 * │                             │
 * │        CONTENT              │
 * └─────────────────────────────┘
 * (Sidebar becomes overlay sheet)
 *
 * Breakpoints:
 * - Mobile: < 768px (header full-width, sidebar as overlay)
 * - Desktop: ≥ 768px (header to right of sidebar)
 */
export function AppLayout({ children, activeItem }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      {/*
        Grid Layout Container
        - Mobile: Single column (header stacks above content)
        - Desktop: Two columns (sidebar | header+content)
        - Sidebar width: 16rem (256px)
        - Right column: Fills remaining space
      */}
      <div className="app-layout-grid min-h-screen w-full overflow-x-hidden">
        {/*
          Sidebar Navigation
          - Desktop (≥768px): Fixed width column, full height
          - Mobile (<768px): Hidden (replaced by sheet overlay)
          - z-index: 30
        */}
        <DashboardSidebar activeItem={activeItem} />

        {/*
          Right Column Container (Header + Content)
          - Flexbox column layout
          - Header sticks to top of this column
          - Content scrolls independently
        */}
        <div className="app-layout-right-column flex flex-col min-h-screen min-w-0">
          {/*
            Header Container
            - Positioned to right of sidebar on desktop
            - Full-width on mobile
            - Sticky within right column
            - z-index: 50 (above sidebar)
            - Max-width: 1920px for ultra-wide screens
          */}
          <div
            className="header-container bg-sidebar border-b border-sidebar-border flex-shrink-0 sticky top-0 z-50 w-full"
            style={{ isolation: 'isolate' }}
          >
            <div className="w-full max-w-[1920px] mx-auto">
              <DashboardHeader />
            </div>
          </div>

          {/*
            Main Content Area
            - Flexbox column layout
            - Fills remaining vertical space
            - Scrollable
            - Max-width: 1920px for ultra-wide screens
          */}
          <div className="flex flex-1 min-h-0 w-full max-w-[1920px] mx-auto overflow-x-hidden">
            <SidebarInset className="flex flex-col min-w-0 flex-1 w-full">
              {children}
            </SidebarInset>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
