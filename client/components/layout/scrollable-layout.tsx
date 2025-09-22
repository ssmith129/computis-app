import React from "react";
import { cn } from "@/lib/utils";

/**
 * Main layout container that prevents horizontal scrolling
 * while allowing nested elements to scroll horizontally
 */
export interface ScrollableLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollableLayout({
  children,
  className,
}: ScrollableLayoutProps) {
  return (
    <div
      className={cn(
        // Prevent horizontal scrolling at main container level
        "min-h-screen w-full overflow-x-hidden",
        // Ensure full viewport width without horizontal scrollbars
        "max-w-full box-border",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Fixed header component with proper z-index management
 */
export interface FixedHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function FixedHeader({ children, className }: FixedHeaderProps) {
  return (
    <header
      className={cn(
        // Fixed positioning with high z-index
        "fixed top-0 left-0 right-0 z-50",
        // Styling
        "bg-sidebar border-b border-sidebar-border",
        // Prevent content from flowing under
        "h-auto",
        className,
      )}
    >
      {children}
    </header>
  );
}

/**
 * Fixed navigation sidebar with proper z-index
 */
export interface FixedNavigationProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
}

export function FixedNavigation({
  children,
  className,
  isOpen = true,
}: FixedNavigationProps) {
  return (
    <nav
      className={cn(
        // Fixed positioning with z-index below header
        "fixed left-0 top-0 bottom-0 z-30",
        // Width management
        "w-[--sidebar-width] transition-transform duration-300",
        // Conditional transform for collapsed state
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        // Styling
        "bg-sidebar border-r border-sidebar-border",
        className,
      )}
    >
      {children}
    </nav>
  );
}

/**
 * Content area that accounts for fixed header and navigation
 */
export interface ContentAreaProps {
  children: React.ReactNode;
  className?: string;
  hasHeader?: boolean;
  hasNavigation?: boolean;
  headerHeight?: string;
}

export function ContentArea({
  children,
  className,
  hasHeader = true,
  hasNavigation = true,
  headerHeight = "auto",
}: ContentAreaProps) {
  return (
    <main
      className={cn(
        // Positioning and spacing
        "flex-1 flex flex-col",
        // Account for fixed elements
        hasHeader && "pt-[var(--header-height,auto)]",
        hasNavigation && "lg:ml-[--sidebar-width]",
        // Prevent horizontal scrolling
        "overflow-x-hidden max-w-full",
        // Allow vertical scrolling
        "min-h-screen",
        className,
      )}
      style={
        {
          "--header-height": headerHeight,
        } as React.CSSProperties
      }
    >
      {children}
    </main>
  );
}

/**
 * Horizontally scrollable card container
 */
export interface ScrollableCardsProps {
  children: React.ReactNode;
  className?: string;
  gap?: string;
}

export function ScrollableCards({
  children,
  className,
  gap = "1rem",
}: ScrollableCardsProps) {
  return (
    <div
      className={cn(
        // Horizontal scrolling
        "overflow-x-auto overflow-y-hidden",
        // Prevent vertical scrollbar
        "scrollbar-hide",
        // Layout
        "flex items-start",
        // Smooth scrolling
        "scroll-smooth",
        // Mobile touch scrolling
        "touch-pan-x",
        className,
      )}
      style={{
        gap: gap,
        // Prevent scroll momentum on iOS
        WebkitOverflowScrolling: "touch",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Horizontally scrollable table wrapper
 */
export interface ScrollableTableProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollableTable({ children, className }: ScrollableTableProps) {
  return (
    <div
      className={cn(
        // Horizontal scrolling
        "overflow-x-auto overflow-y-hidden",
        // Table layout
        "relative w-full",
        // Smooth scrolling
        "scroll-smooth",
        // Styling
        "rounded-lg border border-border",
        "bg-card",
        // Mobile touch scrolling
        "touch-pan-x",
        className,
      )}
      style={{
        // Prevent scroll momentum on iOS
        WebkitOverflowScrolling: "touch",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Enhanced card component with optional horizontal scrolling
 */
export interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
  minWidth?: string;
}

export function EnhancedCard({
  children,
  className,
  scrollable = false,
  minWidth = "auto",
}: EnhancedCardProps) {
  return (
    <div
      className={cn(
        // Base card styling
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        // Scrollable behavior
        scrollable &&
          "overflow-x-auto overflow-y-hidden scroll-smooth touch-pan-x",
        // Prevent shrinking in flex containers
        scrollable && "flex-shrink-0",
        className,
      )}
      style={{
        minWidth: minWidth,
        // Prevent scroll momentum on iOS
        WebkitOverflowScrolling: scrollable ? "touch" : "auto",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Responsive grid that adapts to available space
 */
export interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  minCardWidth?: string;
  gap?: string;
}

export function ResponsiveGrid({
  children,
  className,
  minCardWidth = "300px",
  gap = "1rem",
}: ResponsiveGridProps) {
  return (
    <div
      className={cn(
        // CSS Grid with auto-fit
        "grid grid-cols-[repeat(auto-fit,minmax(var(--min-card-width),1fr))]",
        // Prevent horizontal overflow
        "overflow-x-hidden max-w-full",
        className,
      )}
      style={
        {
          "--min-card-width": minCardWidth,
          gap: gap,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
