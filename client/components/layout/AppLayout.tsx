import { ReactNode } from "react";
import { SidebarProvider, SidebarInset, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

interface AppLayoutProps {
  children: ReactNode;
  activeItem?: string;
}

/**
 * Inner layout component that can access SidebarContext
 * Adjusts header width/offset based on sidebar collapsed vs expanded state
 */
function AppLayoutInner({ children, activeItem }: AppLayoutProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  /*
   * Determine the CSS offset for the fixed header:
   * - Expanded sidebar: left offset = --sidebar-width (16rem)
   * - Collapsed sidebar: left offset = --sidebar-width-icon (3rem)
   */
  const sidebarOffset = isCollapsed
    ? "var(--sidebar-width-icon)"
    : "var(--sidebar-width)";

  return (
    <div className="app-layout-grid min-h-screen w-full max-w-full overflow-x-hidden box-border">
      <DashboardSidebar activeItem={activeItem} />

      <div className="app-layout-right-column flex flex-col min-h-screen min-w-0 max-w-full overflow-x-hidden">
        {/* Fixed Header - dynamically adjusts left/width based on sidebar state */}
        <div
          className="header-container-fixed bg-sidebar border-b border-sidebar-border fixed top-0 z-50 w-full overflow-hidden transition-[left,width] duration-200 ease-linear"
          style={{
            isolation: "isolate",
            left: `var(--header-left, 0px)`,
            width: `var(--header-width, 100%)`,
            // CSS custom properties set via media query override below
            ["--header-left" as string]: undefined,
            ["--header-width" as string]: undefined,
          }}
        >
          {/* Use inline style for the dynamic sidebar offset on md+ screens */}
          <style>{`
            @media (min-width: 768px) {
              .header-container-fixed {
                left: ${sidebarOffset} !important;
                width: calc(100% - ${sidebarOffset}) !important;
              }
            }
          `}</style>
          <div className="w-full max-w-[1920px] mx-auto overflow-hidden">
            <DashboardHeader />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 min-h-0 w-full max-w-[1920px] mx-auto overflow-x-hidden pt-[3.5rem] box-border">
          <SidebarInset className="flex flex-col min-w-0 flex-1 w-full max-w-full overflow-x-hidden box-border">
            {children}
          </SidebarInset>
        </div>
      </div>
    </div>
  );
}

/**
 * AppLayout Component
 *
 * Layout structure with collapsible sidebar:
 *
 * Expanded (Desktop):
 * ┌──────────┬─────────────────────┐
 * │  LOGO    │     HEADER          │
 * │  ☰      ├─────────────────────┤
 * │  NAV     │                     │
 * │  ITEMS   │     CONTENT         │
 * └──────────┴─────────────────────┘
 *
 * Collapsed (Desktop):
 * ┌───┬────────────────────────────┐
 * │ ☰ │     HEADER                 │
 * │   ├────────────────────────────┤
 * │ 🔘│                            │
 * │ 🔘│     CONTENT                │
 * └───┴────────────────────────────┘
 *
 * Mobile (< 768px):
 * ┌─────────────────────────────┐
 * │  ☰    HEADER                │
 * ├─────────────────────────────┤
 * │        CONTENT              │
 * └─────────────────────────────┘
 * (Sidebar becomes overlay sheet)
 */
export function AppLayout({ children, activeItem }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppLayoutInner activeItem={activeItem}>
        {children}
      </AppLayoutInner>
    </SidebarProvider>
  );
}
