# Header Layout Refactor Documentation

## Overview

This document describes the header layout refactoring implemented to create a full-width, independent header container across all pages of the Computis web application.

## Architecture Changes

### Before Refactoring

```
SidebarProvider (max-width: 1920px)
└── Container
    ├── Sidebar
    └── SidebarInset
        ├── Header (constrained by max-width)
        └── Page Content
```

### After Refactoring

```
Full-Width Container
├── Header Container (100% width)
│   └── Header Content (max-width: 1920px, centered)
└── SidebarProvider
    └── Main Content Container (max-width: 1920px, centered)
        ├── Sidebar
        └── SidebarInset
            └── Page Content
```

## Key Components

### AppLayout Component

**Location:** `client/components/layout/AppLayout.tsx`

This new component serves as the main layout wrapper for all application pages. It provides:

1. **Full-Width Header Container**
   - Spans 100% of viewport width
   - Contains header with centered max-width content (1920px)
   - Consistent background color from sidebar theme

2. **Constrained Content Area**
   - Main content constrained to 1920px max-width
   - Centered on screens wider than 1920px
   - Contains sidebar and page content

**Props:**

- `children`: Page content to render
- `activeItem?`: Currently active navigation item (for sidebar highlighting)

**Usage:**

```tsx
import { AppLayout } from "@/components/layout/AppLayout";
import { TransactionsContent } from "@/components/transactions/transactions-content";

export default function Transactions() {
  return (
    <AppLayout activeItem="Transactions">
      <TransactionsContent />
    </AppLayout>
  );
}
```

### DashboardLayout Component

**Location:** `client/components/dashboard/dashboard-layout.tsx`

Updated to use the new `AppLayout` component. Now serves as a convenience wrapper for the dashboard page specifically.

## Implementation Details

### Header Styling

The header container uses the following structure:

```tsx
<div className="w-full bg-sidebar border-b border-sidebar-border flex-shrink-0">
  <div className="w-full max-w-[1920px] mx-auto">
    <DashboardHeader />
  </div>
</div>
```

**CSS Classes Breakdown:**

- `w-full`: Header container spans full viewport width
- `bg-sidebar`: Consistent background color
- `border-b border-sidebar-border`: Bottom border for visual separation
- `flex-shrink-0`: Prevents header from shrinking
- `max-w-[1920px]`: Constrains header content to maximum width
- `mx-auto`: Centers header content on ultra-wide screens

### Content Area Styling

```tsx
<div className="flex flex-1 min-h-0 w-full max-w-[1920px] mx-auto overflow-x-hidden">
  <DashboardSidebar activeItem={activeItem} />
  <SidebarInset className="flex flex-col min-w-0 flex-1">
    {children}
  </SidebarInset>
</div>
```

**CSS Classes Breakdown:**

- `flex flex-1`: Flexbox layout that grows to fill available space
- `min-h-0`: Allows content to shrink below minimum content size
- `w-full max-w-[1920px]`: Full width up to 1920px maximum
- `mx-auto`: Centers content on ultra-wide screens
- `overflow-x-hidden`: Prevents horizontal scrolling

## Pages Updated

All application pages have been updated to use the new `AppLayout`:

1. ✅ Index (Dashboard) - via `DashboardLayout`
2. ✅ Transactions
3. ✅ Clients
4. ✅ Wallets
5. ✅ Settings
6. ✅ DataAnomalyDetection
7. ✅ Exports
8. ✅ RuleEngine
9. ✅ WalletIngestion
10. ✅ Irs8949
11. ✅ GainLoss
12. ✅ Preferences
13. ✅ MyAccount - via `DashboardLayout`
14. ✅ HelpPage - via `DashboardLayout`
15. ✅ KeyboardShortcuts - via `DashboardLayout`

**Note:** NotFound page intentionally excluded as it doesn't use the application layout.

## Benefits

### 1. Visual Impact

- Header now spans full viewport width, providing better visual hierarchy
- Creates a more cohesive, app-like experience
- Better use of screen real estate on ultra-wide monitors

### 2. Consistency

- Single source of truth for layout structure
- All pages automatically inherit layout improvements
- Easier to maintain and update

### 3. Flexibility

- Header can now accommodate full-width elements if needed
- Content area remains optimally constrained for readability
- Easy to adjust max-width globally from one location

### 4. Code Quality

- Reduced code duplication across pages
- Cleaner page components (simple wrapper around content)
- Easier to understand and modify

## Responsive Behavior

### Mobile (< 768px)

- Header spans full width of mobile screen
- Sidebar becomes a mobile sheet overlay
- Content fills available space

### Tablet (768px - 1024px)

- Header spans full width
- Sidebar visible but collapsible
- Content optimally sized

### Desktop (1024px - 1920px)

- Header spans full width
- Sidebar always visible
- Content grows with viewport

### Ultra-Wide (> 1920px)

- Header spans full width with centered content (max 1920px)
- Main content area centered and constrained to 1920px
- Prevents content from stretching too wide

## Migration Guide

### Converting Existing Pages

**Before:**

```tsx
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { PageContent } from "@/components/page/page-content";

export default function Page() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <DashboardSidebar activeItem="Page" />
        <SidebarInset className="flex flex-col min-w-0 flex-1">
          <DashboardHeader />
          <PageContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

**After:**

```tsx
import { AppLayout } from "@/components/layout/AppLayout";
import { PageContent } from "@/components/page/page-content";

export default function Page() {
  return (
    <AppLayout activeItem="Page">
      <PageContent />
    </AppLayout>
  );
}
```

## Testing Checklist

- [x] Header spans full viewport width
- [x] Header content centered on ultra-wide screens
- [x] All pages use consistent layout
- [x] Navigation highlighting works correctly
- [x] Sidebar toggle functionality preserved
- [x] Mobile responsive behavior intact
- [x] No horizontal scrolling issues
- [x] Max-width constraints applied correctly
- [x] Visual consistency across all pages

## Future Enhancements

Potential improvements for consideration:

1. **Configurable Max-Width**: Add theme/config option to adjust max-width
2. **Full-Width Content Option**: Allow specific pages to opt-out of max-width constraint
3. **Header Variants**: Support different header layouts for different page types
4. **Sticky Header**: Option to make header sticky on scroll
5. **Custom Header Content**: Allow pages to inject custom header content

## Related Files

- `client/components/layout/AppLayout.tsx` - Main layout component
- `client/components/dashboard/dashboard-layout.tsx` - Dashboard-specific layout
- `client/components/dashboard/header.tsx` - Header component
- `client/components/ui/sidebar.tsx` - Sidebar components
- `client/global.css` - Global styles and utilities

## Support

For questions or issues related to this refactoring, please contact the development team or refer to the main project documentation.
