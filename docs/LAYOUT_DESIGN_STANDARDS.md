# Layout Design System Standards

## Overview

This document establishes consistent layout patterns, spacing standards, and responsive design principles for the Computis application to ensure visual consistency and maintainable code.

## Z-Index Hierarchy

### Standardized Layers

```css
/* Z-Index Layering Strategy */
z-0 to z-10:    Base content, backgrounds
z-20:           Page overlays, floating elements
z-30:           Navigation sidebars, fixed navigation
z-40:           Page section headers, sticky content
z-50:           App header, main navigation, dropdowns
z-60-90:        Reserved for future use
z-[100]:        Toasts, notifications
z-[200]+:       Modals, dialogs, critical overlays
```

### Semantic Class Usage

Always use semantic classes instead of arbitrary z-index values:

✅ **Correct**:

```jsx
<header className="app-header">...</header>
<div className="page-titlebar">...</div>
```

❌ **Incorrect**:

```jsx
<header className="z-[50]">...</header>
<div className="z-[40]">...</div>
```

### Stacking Context Isolation

Use `isolation: isolate` to create new stacking contexts:

```css
.app-header {
  isolation: isolate; /* Prevents z-index conflicts */
}
```

## Spacing Scale

### Standardized Spacing Units

Use consistent spacing scale based on 4px grid:

| Class | Value | Use Case                         |
| ----- | ----- | -------------------------------- |
| `p-2` | 8px   | Compact buttons, badges          |
| `p-3` | 12px  | Small cards, list items          |
| `p-4` | 16px  | Standard cards, sections         |
| `p-5` | 20px  | Card headers, prominent sections |
| `p-6` | 24px  | Page containers, main sections   |
| `p-8` | 32px  | Large containers, page headers   |

### Spacing Patterns by Component

#### Cards

```jsx
// Standard Card
<Card className="p-5">
  <CardHeader className="pb-4">...</CardHeader>
  <CardContent className="space-y-3">...</CardContent>
</Card>

// Compact Card
<Card className="p-4">
  <CardHeader className="pb-3">...</CardHeader>
  <CardContent className="space-y-2">...</CardContent>
</Card>
```

#### Page Layouts

```jsx
// Standard Page
<div className="app-content">
  <div className="page-titlebar p-6">...</div>
  <div className="p-6 space-y-6">...</div>
</div>

// Dense Page
<div className="app-content">
  <div className="page-titlebar p-4">...</div>
  <div className="p-4 space-y-4">...</div>
</div>
```

#### Grid Spacing

```jsx
// Standard Grid
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

// Compact Grid
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// Dense Grid
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
```

## Responsive Breakpoint Strategy

### Standard Breakpoints

```javascript
// tailwind.config.ts
screens: {
  sm: '640px',    // Mobile landscape
  md: '768px',    // Tablet portrait
  lg: '1024px',   // Tablet landscape / Small desktop
  xl: '1280px',   // Desktop
  '2xl': '1400px' // Large desktop
}
```

### Tablet-Specific Breakpoints

```javascript
// Custom breakpoints for precise tablet targeting
screens: {
  'ipad': '834px',           // iPad Pro 10.9" portrait
  'ipad-landscape': '1194px', // iPad Pro 10.9" landscape
}
```

### Breakpoint Usage Guidelines

#### Mobile-First Approach (Preferred)

✅ **Correct**:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

❌ **Incorrect**:

```jsx
<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
```

#### Tablet-Specific Adjustments

```jsx
// When tablet needs different layout than mobile/desktop
<div className="
  grid grid-cols-1           // Mobile: 1 column
  md:grid-cols-2             // Tablet: 2 columns
  lg:grid-cols-3             // Desktop: 3 columns
  xl:grid-cols-4             // Large desktop: 4 columns
">
```

## Layout Patterns

### Standard Page Structure

```jsx
<div className="app-content">
  {/* Sticky Page Header */}
  <div className="page-titlebar">
    <div className="flex items-center justify-between p-6">
      <div>
        <h1 className="text-2xl font-bold">Page Title</h1>
        <p className="text-gray-500 mt-1">Description</p>
      </div>
      <div className="flex items-center gap-3">{/* Actions */}</div>
    </div>
  </div>

  {/* Scrollable Content */}
  <div className="p-6 space-y-6">{/* Page content */}</div>
</div>
```

### Card Grid Pattern

```jsx
{
  /* Responsive Card Grid */
}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  <Card className="p-5">
    <CardContent>...</CardContent>
  </Card>
</div>;
```

### Two-Column Layout Pattern

```jsx
{
  /* Main/Sidebar Layout */
}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">{/* Main content */}</div>
  <div>{/* Sidebar */}</div>
</div>;
```

## Scroll Container Standards

### Primary Scroll Container

```css
.app-content {
  flex: 1;
  min-height: 0; /* Allow flex shrinking */
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch; /* Smooth iOS scroll */
  overscroll-behavior-y: contain; /* Prevent scroll chaining */
}
```

### Horizontal Scroll Containers

```jsx
{
  /* Scrollable Cards */
}
<div className="scrollable-cards">
  {cards.map((card) => (
    <Card key={card.id}>...</Card>
  ))}
</div>;

{
  /* Scrollable Table */
}
<div className="scrollable-table">
  <Table>...</Table>
</div>;
```

## Sticky Element Standards

### Header Sticky Pattern

```css
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  isolation: isolate; /* Create new stacking context */
}
```

### Page Title Sticky Pattern

```css
.page-titlebar {
  position: sticky;
  top: 0; /* Or calculate based on header height */
  z-index: 40;
  isolation: isolate;
}
```

### Implementation Requirements

1. ✅ Parent container must NOT have `overflow: hidden`
2. ✅ Parent container should use `min-height: 0` instead of `height: 0`
3. ✅ Sticky element must have explicit `top` value
4. ✅ Use `isolation: isolate` to prevent z-index conflicts

## Viewport Units Standards

### Recommended Units

#### Height Units

✅ **Use**:

- `min-h-screen` - For stable full-height containers
- `h-screen` - For fixed full-height elements
- `min-h-0` - For flex containers that need to shrink

❌ **Avoid**:

- `min-h-svh` - Causes layout shifts on mobile (address bar show/hide)
- `h-[100dvh]` - Dynamic viewport height, unreliable on older browsers

#### Width Units

✅ **Use**:

- `w-full` - Full width of parent
- `max-w-full` - Prevent overflow
- `w-screen` - Full viewport width (use sparingly)

❌ **Avoid**:

- Fixed pixel widths for layout containers
- `w-[100vw]` - Can cause horizontal scroll

## Touch Interaction Standards

### Touch Target Sizes

All interactive elements must meet 44x44px minimum:

```jsx
// Buttons
<Button className="min-h-[44px] min-w-[44px]">...</Button>

// Icon Buttons
<Button size="icon" className="h-11 w-11">
  <Icon className="h-5 w-5" />
</Button>

// Links
<a className="inline-block py-2 px-3">...</a> // Ensures 44px height
```

### Touch Utilities

```jsx
// Prevent text selection during touch
<div className="select-none">

// Optimize touch scrolling
<div className="touch-pan overflow-y-auto">

// Disable tap highlight
<button className="-webkit-tap-highlight-transparent">
```

### Scroll Optimization

```css
/* Apply to scrollable containers */
.scrollable {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
  overscroll-behavior-x: none;
  scroll-behavior: smooth;
}
```

## Performance Standards

### Layout Thrashing Prevention

✅ **Do**:

```jsx
// Batch layout reads
const heights = elements.map((el) => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = heights[i] + "px";
});
```

❌ **Don't**:

```jsx
// Causes forced reflow
elements.forEach((el) => {
  const height = el.offsetHeight; // Read
  el.style.height = height + "px"; // Write (forces reflow)
});
```

### Animation Performance

```css
/* Use transform/opacity for animations */
.animated {
  transition:
    transform 200ms,
    opacity 200ms;
  will-change: transform, opacity; /* Hint for GPU acceleration */
}

/* Avoid animating layout properties */
.avoid {
  transition: width 200ms; /* ❌ Causes layout recalculation */
}
```

## Accessibility Standards

### Focus Management

```jsx
// Visible focus indicators
<Button className="
  focus:ring-2
  focus:ring-offset-2
  focus:ring-primary
  focus:outline-none
">
```

### Skip Links

```jsx
// Provide skip to content link
<a
  href="#main-content"
  className="
    sr-only 
    focus:not-sr-only 
    focus:absolute 
    focus:top-0 
    focus:left-0 
    focus:z-50
  "
>
  Skip to content
</a>
```

### ARIA Landmarks

```jsx
<header role="banner">...</header>
<nav role="navigation">...</nav>
<main role="main" id="main-content">...</main>
<aside role="complementary">...</aside>
<footer role="contentinfo">...</footer>
```

## Component Library Standards

### Consistent Card Implementation

```jsx
// Standard Card Component Pattern
export function StandardCard({
  title,
  children,
  actions,
  variant = "default", // "default" | "compact" | "dense"
}) {
  const padding = {
    default: "p-5",
    compact: "p-4",
    dense: "p-3",
  }[variant];

  return (
    <Card className={padding}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {actions}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  );
}
```

### Button Patterns

```jsx
// Primary Action
<Button size="default" className="min-h-[44px]">
  Primary Action
</Button>

// Secondary Action
<Button variant="outline" size="default" className="min-h-[44px]">
  Secondary Action
</Button>

// Tertiary Action (Auto-hugging width)
<Button variant="ghost" size="sm" className="w-fit h-auto">
  Tertiary Action
</Button>
```

## Code Review Checklist

Before merging layout changes:

- [ ] Uses semantic z-index classes (not arbitrary values)
- [ ] Follows standardized spacing scale
- [ ] Implements mobile-first responsive design
- [ ] Uses `min-h-screen` instead of `min-h-svh`
- [ ] Sticky elements have `isolation: isolate`
- [ ] Parent containers use `min-h-0` not `h-0`
- [ ] Touch targets meet 44x44px minimum
- [ ] No horizontal scrollbars at any breakpoint
- [ ] Animations use transform/opacity only
- [ ] Proper ARIA landmarks and focus management

## Migration Guide

### Updating Existing Components

#### Step 1: Fix Scroll Container

```diff
.app-content {
  flex: 1;
- height: 0;
+ min-height: 0;
  overflow-y: auto;
}
```

#### Step 2: Add Stacking Context Isolation

```diff
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
+ isolation: isolate;
}
```

#### Step 3: Replace Viewport Units

```diff
<SidebarInset className="
- min-h-svh
+ min-h-screen
">
```

#### Step 4: Standardize Spacing

```diff
<Card
- className="p-6"
+ className="p-5"
>
  <CardHeader
-   className="pb-6"
+   className="pb-4"
  >
```

## Questions and Support

For questions about layout standards:

1. Check this document first
2. Review example implementations in codebase
3. Consult with design system maintainers
4. File issue with `design-system` label

## Version History

- v1.0.0 - Initial layout standards (Current)
