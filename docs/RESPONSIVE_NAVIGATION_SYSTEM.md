# Responsive Navigation System Documentation

## Overview

This document describes the comprehensive responsive navigation system implemented for the Computis web application. The system ensures that the header and sidebar maintain their structural integrity across all screen sizes, prevent overlapping, and provide an optimal user experience on mobile, tablet, and desktop devices.

## Architecture

### Component Structure

```
AppLayout (Root Layout Container)
├── Header Container (Full-width, z-index: 50)
│   └── DashboardHeader
│       ├── Search Bar (Responsive width)
│       ├── Notifications Dropdown
│       └── User Profile Menu
└── Content Container (Max-width: 1920px, centered)
    ├── Sidebar (z-index: 30)
    │   └── DashboardSidebar
    │       ├── Logo
    │       ├── Main Navigation
    │       ├── Reports Section
    │       ├── Settings Section
    │       └── Help & Account Section
    └── Main Content Area (z-index: 10)
        └── Page Content (SidebarInset)
```

## Responsive Breakpoints

### Mobile (<640px)

- **Header**: Compact layout, minimal padding (0.5rem)
- **Sidebar**: Full-screen overlay sheet from left
- **Layout**: Vertical stack
- **Search Bar**: Max-width 200px
- **User Name**: Hidden
- **Spacing**: Tight gaps (0.5rem)

### Tablet (640px - 1024px)

- **Header**: Medium spacing (0.75rem padding)
- **Sidebar**: Collapsible, positioned beside content
- **Layout**: Side-by-side with collapse option
- **Search Bar**: Max-width 280px - 384px
- **User Name**: Hidden
- **Spacing**: Medium gaps (0.75rem)

### Desktop (1024px - 1920px)

- **Header**: Full layout (0.75rem - 1rem padding)
- **Sidebar**: Always visible, fixed width (16rem)
- **Layout**: Side-by-side, persistent
- **Search Bar**: Max-width 448px - 512px
- **User Name**: Visible
- **Spacing**: Comfortable gaps (1rem - 1.5rem)

### Ultra-Wide (>1920px)

- **Layout**: Centered with max-width constraint
- **Header Content**: Centered within 1920px
- **Main Content**: Centered within 1920px
- **White Space**: Equal margins on both sides

## Z-Index Strategy

### Layering System

```
z-[200]+   Modals, Dialogs, Critical Overlays
z-[100]    Toasts, Notifications
z-60-90    Reserved for future use
z-50       App Header (DashboardHeader)
z-40       Page Section Headers, Mobile Sidebar Sheet
z-30       Desktop Sidebar Navigation
z-20       Page Overlays, Floating Elements
z-10       Main Content Area
z-0        Base Content, Backgrounds
```

### Implementation Details

```css
/* Header - Always on top */
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  isolation: isolate; /* Creates new stacking context */
}

/* Sidebar - Below header, above content */
/* Desktop */
@media (min-width: 768px) {
  .sidebar-container {
    position: relative;
    z-index: 30;
  }
}

/* Mobile - Sheet overlay */
@media (max-width: 767px) {
  .sidebar-container {
    position: fixed;
    z-index: 40; /* Above content, below header */
  }
}

/* Main Content */
.app-content {
  position: relative;
  z-index: 10;
}
```

## Layout Techniques

### 1. Flexbox Layout (Primary)

The main layout uses Flexbox for flexibility and simplicity:

```tsx
// AppLayout.tsx
<div className="min-h-screen w-full flex flex-col overflow-x-hidden">
  {/* Header */}
  <div className="sticky top-0 z-50">
    <DashboardHeader />
  </div>

  {/* Content Area */}
  <SidebarProvider>
    <div className="flex flex-1 min-h-0">
      {/* Sidebar - 16rem fixed width on desktop */}
      <DashboardSidebar />

      {/* Main Content - Fills remaining space */}
      <SidebarInset className="flex flex-col min-w-0 flex-1">
        {children}
      </SidebarInset>
    </div>
  </SidebarProvider>
</div>
```

**Benefits:**

- Simple, predictable layout
- Natural flex behavior for responsive resizing
- Easy to understand and maintain
- Excellent browser support

### 2. Grid Layout (Alternative for complex layouts)

Available for content areas requiring precise grid control:

```css
.responsive-layout-grid {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .responsive-layout-content-grid {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;
  }
}
```

## Responsive Units

### CSS Custom Properties (Preferred)

```css
:root {
  /* Sidebar dimensions */
  --sidebar-width: 16rem; /* 256px on desktop */
  --sidebar-width-mobile: 18rem; /* 288px on mobile sheet */
  --sidebar-width-icon: 3rem; /* 48px when collapsed */

  /* Header height */
  --header-height: 3.5rem; /* 56px */
  --header-height-mobile: 3rem; /* 48px */
}
```

### Relative Units Usage

- **rem**: Font sizes, padding, margins, fixed widths
  - `1rem = 16px` (browser default)
  - Scales with user's browser font size settings
  - Example: `padding: 0.75rem` (12px)

- **em**: Component-relative sizing
  - Relative to parent font size
  - Example: `margin: 1em` (16px if parent is 16px)

- **%**: Responsive widths
  - Percentage of parent container
  - Example: `width: 100%` (full width)

- **vw/vh**: Viewport-relative
  - Percentage of viewport width/height
  - Example: `min-height: 100vh` (full viewport height)

- **fr**: Grid fractional units
  - Fraction of available space in grid
  - Example: `grid-template-columns: 1fr 3fr`

### Unit Selection Guide

| Use Case        | Recommended Unit     | Example                 |
| --------------- | -------------------- | ----------------------- |
| Font sizes      | `rem`                | `text-base` (1rem)      |
| Padding/Margins | `rem`                | `p-4` (1rem)            |
| Component width | `rem` or `%`         | `w-64` (16rem)          |
| Container width | `%` with `max-width` | `w-full max-w-[1920px]` |
| Heights         | `vh` or `auto`       | `min-h-screen` (100vh)  |
| Borders         | `px`                 | `border` (1px)          |
| Grid columns    | `fr`                 | `grid-cols-[16rem_1fr]` |

## Preventing Overlap

### Header-Sidebar Overlap Prevention

```tsx
// AppLayout.tsx
<div className="sticky top-0 z-50" style={{ isolation: 'isolate' }}>
  <DashboardHeader />
</div>

<div className="flex flex-1 relative">
  <DashboardSidebar /> {/* z-30 */}
  <SidebarInset />     {/* z-10 */}
</div>
```

**Key Techniques:**

1. **Stacking Context Isolation**: `isolation: isolate` on header prevents z-index conflicts
2. **Higher Z-Index**: Header (z-50) > Sidebar (z-30) > Content (z-10)
3. **Sticky Positioning**: Header sticks to top, doesn't interfere with sidebar
4. **Relative Positioning**: Sidebar and content in normal document flow

### Content Overflow Prevention

```css
/* Prevent horizontal overflow */
.app-layout-root {
  overflow-x: hidden;
  max-width: 100vw;
}

/* Prevent content from pushing sidebar */
.main-content {
  min-width: 0; /* Allow flex items to shrink below content size */
  flex: 1; /* Fill available space */
}
```

### Mobile Sheet Overlay

```tsx
// Mobile sidebar as overlay sheet
<Sheet>
  <SheetContent
    side="left"
    className="w-[--sidebar-width-mobile]"
    style={{ zIndex: 40 }}
  >
    <Sidebar />
  </SheetContent>
</Sheet>
```

## Media Queries

### Mobile First Approach

```css
/* Base styles (Mobile) */
.app-header {
  min-height: 3rem;
  padding: 0.5rem;
}

/* Small devices (≥640px) */
@media (min-width: 640px) {
  .app-header {
    min-height: 3.5rem;
    padding: 0.75rem;
  }
}

/* Medium devices (≥768px) - Tablet */
@media (min-width: 768px) {
  .sidebar-container {
    position: relative;
    z-index: 30;
  }
}

/* Large devices (≥1024px) - Desktop */
@media (min-width: 1024px) {
  .app-header {
    padding: 0.75rem 1rem;
  }
}

/* Extra large devices (≥1920px) - Ultra-wide */
@media (min-width: 1920px) {
  .layout-container {
    max-width: 1920px;
    margin-left: auto;
    margin-right: auto;
  }
}
```

### Orientation-Specific Queries

```css
/* Portrait tablet */
@media (min-width: 768px) and (max-width: 834px) and (orientation: portrait) {
  .sidebar-container {
    width: var(--sidebar-width-icon);
  }
}

/* Landscape mobile */
@media (max-width: 767px) and (orientation: landscape) {
  .app-header {
    min-height: 2.5rem;
  }
}
```

## Accessibility Features

### 1. Skip to Main Content

```tsx
// Add to AppLayout
<a
  href="#main-content"
  className="skip-to-main"
  tabIndex={0}
>
  Skip to main content
</a>

<main id="main-content" tabIndex={-1}>
  {children}
</main>
```

### 2. ARIA Labels

```tsx
// Header
<header role="banner" aria-label="Main navigation header">

// Search
<div role="search">
  <Input aria-label="Search" />
</div>

// User menu
<button aria-label="User menu" aria-haspopup="menu">
```

### 3. Keyboard Navigation

```tsx
// Focus management
<DropdownMenuTrigger
  className="focus-visible:ring-2 focus-visible:ring-ring"
  aria-label="User menu"
>
```

### 4. Screen Reader Support

```tsx
// Icon-only buttons
<Search aria-hidden="true" />
<span className="sr-only">Search</span>

// Visual status indicators
<span className="sr-only">3 unread notifications</span>
```

### 5. Minimum Touch Targets

```css
/* WCAG 2.1 Level AAA: 44x44px minimum */
@media (max-width: 767px) {
  .nav-item {
    min-width: 44px;
    min-height: 44px;
  }
}
```

## Performance Optimizations

### 1. CSS Containment

```css
.app-header {
  contain: layout style paint;
}
```

**Benefits:**

- Limits reflow/repaint scope
- Improves rendering performance
- Prevents layout thrashing

### 2. Transform-Based Animations

```css
.sidebar-container {
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Benefits:**

- Hardware-accelerated
- Smooth 60fps animations
- Better battery life on mobile

### 3. Will-Change Optimization

```css
.app-header {
  will-change: transform;
}
```

**Use Cases:**

- Elements that animate frequently
- Sticky headers
- Slide-in sidebars

### 4. Lazy Loading Sidebar Content

```tsx
// Only render sidebar content when needed
{
  isSidebarOpen && <SidebarContent />;
}
```

## Browser Support

### Modern Browsers (Full Support)

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

### Features Used

- **Flexbox**: 100% support
- **CSS Grid**: 100% support
- **CSS Custom Properties**: 100% support
- **Sticky Positioning**: 98%+ support
- **CSS Containment**: 95%+ support

### Fallbacks

```css
/* Fallback for older browsers without containment */
@supports not (contain: layout) {
  .app-header {
    overflow: hidden;
  }
}

/* Fallback for browsers without sticky positioning */
@supports not (position: sticky) {
  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
}
```

## Testing Guidelines

### Responsive Testing

1. **Mobile Devices**
   - iPhone SE (375px)
   - iPhone 12/13/14 (390px)
   - iPhone 14 Pro Max (430px)
   - Android (360px - 414px)

2. **Tablets**
   - iPad (768px)
   - iPad Pro (1024px)
   - Android tablets (800px - 1280px)

3. **Desktop**
   - 1366px (Laptop)
   - 1920px (Full HD)
   - 2560px (QHD)
   - 3840px (4K)

### Overlap Testing Checklist

- [ ] Header doesn't overlap sidebar on any screen size
- [ ] Sidebar doesn't overlap content on any screen size
- [ ] Mobile sheet overlay doesn't interfere with header
- [ ] Dropdowns appear above all other elements
- [ ] Modals appear above header and sidebar
- [ ] Toasts appear in correct position (top-right)
- [ ] No horizontal scrollbar at any breakpoint
- [ ] Content remains accessible when sidebar is open (mobile)
- [ ] Focus trap works correctly in mobile sheet
- [ ] Keyboard navigation works across all breakpoints

### Z-Index Testing

```javascript
// Check z-index values in DevTools
const header = document.querySelector(".app-header");
const sidebar = document.querySelector(".sidebar-container");
const content = document.querySelector(".app-content");

console.log("Header z-index:", getComputedStyle(header).zIndex); // 50
console.log("Sidebar z-index:", getComputedStyle(sidebar).zIndex); // 30
console.log("Content z-index:", getComputedStyle(content).zIndex); // 10
```

## Troubleshooting

### Issue: Sidebar Overlaps Header on Mobile

**Solution:**

```css
/* Ensure header has higher z-index */
.app-header {
  z-index: 50;
}

/* Mobile sidebar should be below header */
@media (max-width: 767px) {
  .sidebar-container {
    z-index: 40;
  }
}
```

### Issue: Content Jumps When Sidebar Toggles

**Solution:**

```tsx
// Reserve space for sidebar
<div className="sidebar-spacer" style={{ width: "var(--sidebar-width)" }} />
```

### Issue: Horizontal Scrollbar Appears

**Solution:**

```css
/* Prevent overflow */
html,
body {
  overflow-x: hidden;
  max-width: 100vw;
}
```

### Issue: Header Cuts Off on Small Screens

**Solution:**

```tsx
// Use responsive padding and min-width
<header className="p-2 sm:p-3 min-w-0">
```

## Code Examples

### Complete Responsive Header

```tsx
export function DashboardHeader() {
  return (
    <header
      className="
        app-header 
        flex 
        items-center 
        justify-between 
        gap-2 sm:gap-3 
        p-2 sm:p-3 
        flex-shrink-0 
        h-auto 
        min-h-[3.5rem]
        overflow-x-hidden
        w-full
      "
      role="banner"
      aria-label="Main navigation header"
    >
      <div
        className="
          flex items-center bg-sidebar-accent rounded-lg 
          px-2 sm:px-3 py-2 flex-1 min-w-0 
          max-w-[200px] sm:max-w-[280px] md:max-w-sm lg:max-w-md xl:max-w-lg 
          transition-all duration-200
        "
        role="search"
      >
        <Search className="h-4 w-4 sm:h-5 sm:w-5 text-white shrink-0 mr-2 sm:mr-3" />
        <Input
          placeholder="Search..."
          className="bg-transparent border-none text-white"
          aria-label="Search"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-3 lg:gap-6 shrink-0">
        <NotificationsDropdown />
        <UserProfileMenu />
      </div>
    </header>
  );
}
```

### Complete Responsive Layout

```tsx
export function AppLayout({ children, activeItem }: AppLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
      {/* Header - z-50 */}
      <div
        className="w-full bg-sidebar border-b border-sidebar-border flex-shrink-0 sticky top-0 z-50"
        style={{ isolation: "isolate" }}
      >
        <div className="w-full max-w-[1920px] mx-auto">
          <DashboardHeader />
        </div>
      </div>

      {/* Content - z-30 (sidebar), z-10 (main) */}
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-1 min-h-0 w-full max-w-[1920px] mx-auto overflow-x-hidden relative">
          <DashboardSidebar activeItem={activeItem} />
          <SidebarInset className="flex flex-col min-w-0 flex-1">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
```

## Summary

This responsive navigation system provides:

✅ **No Overlapping**: Proper z-index management ensures header, sidebar, and content never overlap  
✅ **Responsive**: Works perfectly on mobile, tablet, desktop, and ultra-wide screens  
✅ **Accessible**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support  
✅ **Performant**: CSS containment, hardware-accelerated animations, and optimized rendering  
✅ **Maintainable**: Clean code, semantic HTML, and comprehensive documentation  
✅ **Browser Support**: Works on all modern browsers  
✅ **Flexible**: Flexbox and Grid layouts adapt to content  
✅ **Future-Proof**: Scalable architecture for future enhancements

## Additional Resources

- [MDN: CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [MDN: CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [MDN: Z-Index](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Responsive Design Best Practices](https://web.dev/responsive-web-design-basics/)
