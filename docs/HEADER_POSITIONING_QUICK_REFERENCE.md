# Header Positioning - Quick Reference Guide

## TL;DR - The Solution

**Problem:** Header needs to be positioned to the right of the sidebar without overlapping.

**Solution:** CSS Grid with two columns - sidebar (fixed 16rem) and main content (flexible 1fr).

```css
/* Desktop: Two columns */
@media (min-width: 768px) {
  .app-layout-grid {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;
  }
}

/* Mobile: Single column */
@media (max-width: 767px) {
  .app-layout-grid {
    grid-template-columns: 1fr;
  }
}
```

## Visual Layout Comparison

### Before (Header Above Sidebar)

```
┌─────────────────────────────────────┐
│           HEADER                    │
├──────────┬──────────────────────────┤
│          │                          │
│ SIDEBAR  │        CONTENT           │
│          │                          │
└──────────┴──────────────────────────┘
```

### After (Header Right of Sidebar)

```
┌──────────┬──────────────────────────┐
│          │         HEADER           │
│ SIDEBAR  ├──────────────────────────┤
│          │                          │
│          │        CONTENT           │
└──────────┴──────────────────────────┘
```

## Essential CSS (Copy-Paste Ready)

### 1. Grid Container

```css
.app-layout-grid {
  display: grid;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
}

/* Mobile: Stack vertically */
@media (max-width: 767px) {
  .app-layout-grid {
    grid-template-columns: 1fr;
  }
}

/* Desktop: Two columns */
@media (min-width: 768px) {
  .app-layout-grid {
    grid-template-columns: var(--sidebar-width) 1fr;
  }
}
```

### 2. Sidebar Configuration

```css
/* Sidebar width variable */
:root {
  --sidebar-width: 16rem; /* 256px */
}

/* Desktop sidebar */
@media (min-width: 768px) {
  .sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    z-index: 30;
  }
}

/* Mobile: Hide sidebar (use sheet overlay) */
@media (max-width: 767px) {
  .sidebar {
    display: none;
  }
}
```

### 3. Header Configuration

```css
.header-container {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  flex-shrink: 0;
  isolation: isolate;
}
```

### 4. Right Column

```css
.app-layout-right-column {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 0; /* Critical! */
}
```

## React Component Structure

```tsx
<div className="app-layout-grid">
  {/* Sidebar - Left column on desktop, hidden on mobile */}
  <Sidebar />
  
  {/* Right column - Header + Content */}
  <div className="app-layout-right-column">
    
    {/* Header - Sticky within right column */}
    <div className="header-container">
      <Header />
    </div>
    
    {/* Content - Scrollable */}
    <main>
      {children}
    </main>
    
  </div>
</div>
```

## Key Breakpoints

| Screen Size | Grid Columns | Header Width | Sidebar |
|-------------|-------------|--------------|---------|
| < 768px | `1fr` | 100% | Hidden (sheet) |
| ≥ 768px | `16rem 1fr` | Calc by grid | Visible |

## Width Calculations

### Desktop (≥768px)

```
Total Width: 100vw
Sidebar: 16rem (256px)
Header: 100% of right column = 100vw - 256px
Content: Same as header width
```

**Example at 1920px viewport:**
- Sidebar: 256px
- Header: 1664px (automatically calculated by grid)
- Content: 1664px

### Mobile (<768px)

```
Total Width: 100vw
Sidebar: Hidden
Header: 100vw
Content: 100vw
```

## Common Sidebar Widths

```css
/* Narrow */
--sidebar-width: 12rem; /* 192px */

/* Standard (Recommended) */
--sidebar-width: 16rem; /* 256px */

/* Wide */
--sidebar-width: 20rem; /* 320px */

/* Collapsed */
--sidebar-width-icon: 3rem; /* 48px */
```

## Z-Index Stack

```
50 - Header (sticky)
40 - Mobile sidebar sheet
30 - Desktop sidebar
10 - Content
```

## Preventing Overlap Checklist

- [x] Grid columns used (not floats or absolute positioning)
- [x] Sidebar width is fixed (`16rem` not `auto`)
- [x] Header width is `100%` (of grid column)
- [x] Z-index: Header (50) > Sidebar (30)
- [x] `min-width: 0` on right column
- [x] `overflow-x: hidden` on grid container

## Responsive Behavior

### What Happens When Window Resizes?

1. **Sidebar Column**: Stays fixed at 16rem (256px)
2. **Header Column**: Automatically expands/contracts
3. **No Manual Calculations**: Grid handles everything
4. **Smooth Transitions**: CSS transitions for visual smoothness

### Example Resize Sequence

```
1280px viewport:
┌────────┬────────────────────┐
│ 256px  │      1024px        │
└────────┴────────────────────┘

1920px viewport:
┌────────┬──────────────────────────┐
│ 256px  │         1664px           │
└────────┴──────────────────────────┘

768px viewport (breakpoint):
┌────────┬────────┐
│ 256px  │ 512px  │
└────────┴────────┘

767px viewport (mobile):
┌────────────────┐
│   Full Width   │
│     Header     │
└────────────────┘
(Sidebar hidden)
```

## Troubleshooting Quick Fixes

### Problem: Header overlaps sidebar

```css
/* Solution: Ensure proper grid setup */
.app-layout-grid {
  grid-template-columns: var(--sidebar-width) 1fr;
  /* NOT auto 1fr */
}
```

### Problem: Horizontal scrollbar

```css
/* Solution: Prevent overflow */
.app-layout-grid > * {
  min-width: 0;
  overflow-x: hidden;
}
```

### Problem: Header too narrow

```css
/* Solution: Add min-width to right column */
.app-layout-right-column {
  min-width: 0; /* Allows shrinking */
}
```

### Problem: Jumpy resize

```css
/* Solution: Add transitions */
.app-layout-grid {
  transition: grid-template-columns 200ms ease-in-out;
}
```

## Mobile Considerations

### Sidebar Becomes Sheet Overlay

```tsx
// Hide desktop sidebar
@media (max-width: 767px) {
  .sidebar {
    display: none;
  }
}

// Show mobile sheet
<Sheet>
  <SheetContent side="left">
    <Sidebar />
  </SheetContent>
</Sheet>
```

### Header Full-Width on Mobile

```css
@media (max-width: 767px) {
  .header-container {
    width: 100%;
    left: 0;
  }
}
```

## Testing Commands

### Browser DevTools

```javascript
// Check grid columns
getComputedStyle(document.querySelector('.app-layout-grid'))
  .gridTemplateColumns
// Expected: "256px 1fr" on desktop

// Check header width
document.querySelector('.header-container').offsetWidth
// Expected: viewport width - 256px on desktop

// Check for overlap
const sidebar = document.querySelector('.sidebar');
const header = document.querySelector('.header-container');
const sidebarRect = sidebar.getBoundingClientRect();
const headerRect = header.getBoundingClientRect();
console.log('Overlap:', sidebarRect.right > headerRect.left);
// Expected: false
```

## Performance Tips

```css
/* Use containment */
.header-container {
  contain: layout style paint;
}

/* Use will-change sparingly */
.sidebar[data-transitioning] {
  will-change: transform;
}

/* Remove will-change after animation */
.sidebar {
  will-change: auto;
}
```

## Browser Support

- ✅ Chrome 57+ (95%+ users)
- ✅ Firefox 52+ (95%+ users)
- ✅ Safari 10.1+ (95%+ users)
- ✅ Edge 16+ (95%+ users)

**Total Coverage:** 96%+ of global users

## One-Line Summary

**CSS Grid with `grid-template-columns: var(--sidebar-width) 1fr` automatically positions the header to the right of the sidebar without overlap, and adjusts responsively during window resize.**

---

## Need Help?

See the full documentation: [`HEADER_SIDEBAR_POSITIONING.md`](./HEADER_SIDEBAR_POSITIONING.md)
