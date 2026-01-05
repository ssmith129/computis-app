# Responsive Design Guidelines

Mobile-first responsive design patterns for the Computis application, ensuring optimal experience across all device sizes.

## Breakpoint System

### Standard Breakpoints

| Name | Min Width | CSS Variable | Usage |
|------|-----------|--------------|-------|
| `sm` | 640px | - | Small tablets, landscape phones |
| `md` | 768px | - | Tablets (portrait) |
| `ipad` | 834px | - | iPad portrait |
| `lg` | 1024px | - | Small laptops, tablets (landscape) |
| `ipad-landscape` | 1194px | - | iPad landscape |
| `xl` | 1280px | - | Desktop |
| `2xl` | 1400px | - | Large desktop (container max) |
| `desktop` | 1920px | - | Ultra-wide displays |

### Usage in Tailwind

```tsx
// Mobile-first approach (default styles are mobile)
<div className="
  grid-cols-1      // Mobile: 1 column
  sm:grid-cols-2   // 640px+: 2 columns
  md:grid-cols-2   // 768px+: still 2 columns
  lg:grid-cols-3   // 1024px+: 3 columns
  xl:grid-cols-4   // 1280px+: 4 columns
"/>
```

### Container Configuration

```tsx
// Container with centered padding
container: {
  center: true,
  padding: "2rem",
  screens: {
    "2xl": "1400px", // Max width
  },
}
```

---

## Layout Patterns

### App Layout Grid

The application uses a CSS Grid-based layout:

```
Desktop (≥768px):
┌────────────┬────────────────────────────┐
│            │         HEADER             │
│  SIDEBAR   ├────────────────────────────┤
│  (16rem)   │                            │
│            │         CONTENT            │
└────────────┴────────────────────────────┘

Mobile (<768px):
┌──────────────────────────────────────────┐
│              HEADER                      │
├──────────────────────────────────────────┤
│                                          │
│              CONTENT                     │
└──────────────────────────────────────────┘
(Sidebar as overlay sheet)
```

### Implementation

```tsx
// Layout grid classes
<div className="app-layout-grid">
  <aside className="sidebar-container" data-sidebar="sidebar">
    {/* Sidebar content */}
  </aside>
  <div className="app-layout-right-column">
    <header className="header-container">
      {/* Header content */}
    </header>
    <main className="app-content">
      {/* Page content */}
    </main>
  </div>
</div>
```

### CSS Variables for Sidebar

```css
:root {
  --sidebar-width: 16rem;        /* 256px - Desktop */
  --sidebar-width-mobile: 18rem; /* 288px - Mobile sheet */
  --sidebar-width-icon: 3rem;    /* 48px - Collapsed */
}
```

---

## Mobile Patterns

### Touch Targets

```tsx
// Minimum 44x44px touch targets
<Button size="default" />  // h-11 = 44px ✓
<Button size="icon" className="h-11 w-11" />  // 44x44px ✓

// Custom touch target class
<button className="touch-target">
  <Icon />
</button>
```

### Mobile Navigation

```tsx
// Mobile sidebar as sheet overlay
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu className="h-5 w-5" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="w-[--sidebar-width-mobile]">
    {/* Navigation items */}
  </SheetContent>
</Sheet>
```

### Horizontal Scrolling

```tsx
// Cards that scroll horizontally on mobile
<div className="scrollable-cards">
  <div className="flex gap-4">
    {cards.map((card) => (
      <Card key={card.id} className="flex-shrink-0 w-64">
        {/* Card content */}
      </Card>
    ))}
  </div>
</div>

// Table with horizontal scroll
<div className="scrollable-table">
  <Table minWidth="800px">
    {/* Table content */}
  </Table>
</div>
```

---

## Grid Patterns

### Responsive Card Grid

```tsx
// 1 → 2 → 3 columns pattern
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {cards.map((card) => (
    <Card key={card.id}>{/* ... */}</Card>
  ))}
</div>

// Using CSS variable for min width
<div className="responsive-grid" style={{ "--min-card-width": "300px" }}>
  {/* Auto-fills based on available space */}
</div>
```

### Dashboard Cards

```tsx
// Dashboard metric cards (6 cards)
<div className="space-y-4">
  {/* First row: 3 cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {topRowCards}
  </div>
  {/* Second row: 3 cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {bottomRowCards}
  </div>
</div>
```

---

## Typography Scaling

### Fluid Typography

```css
/* Base font size */
html {
  font-size: clamp(16px, 0.8vw + 12px, 18px);
}

/* Heading sizes */
h1 { font-size: clamp(1.75rem, 1.2rem + 1.2vw, 2.25rem); }
h2 { font-size: clamp(1.5rem, 1.1rem + 0.9vw, 1.875rem); }
h3 { font-size: clamp(1.25rem, 1rem + 0.6vw, 1.5rem); }
h4 { font-size: clamp(1.125rem, 0.95rem + 0.4vw, 1.25rem); }
```

### Responsive Text Classes

```tsx
// Text that scales with viewport
<h1 className="text-xl sm:text-2xl lg:text-3xl">
  Page Title
</h1>

// Body text adjustments
<p className="text-sm md:text-base">
  Content text
</p>
```

---

## Spacing Patterns

### Responsive Padding

```tsx
// Page container padding
<div className="p-4 sm:p-6 lg:p-8">
  {/* Content */}
</div>

// Section spacing
<section className="space-y-4 md:space-y-6">
  {/* Section content */}
</section>
```

### Gap Utilities

```tsx
// Responsive gaps
<div className="flex gap-2 sm:gap-3 lg:gap-4">
  {/* Items */}
</div>

<div className="grid gap-4 md:gap-6">
  {/* Grid items */}
</div>
```

---

## Component Responsive Patterns

### Buttons

```tsx
// Full-width on mobile, auto-width on desktop
<Button className="w-full sm:w-auto">
  Action
</Button>

// Stack buttons on mobile, row on desktop
<div className="flex flex-col sm:flex-row gap-2">
  <Button>Primary</Button>
  <Button variant="outline">Secondary</Button>
</div>
```

### Tables

```tsx
// Responsive table with priority columns
<Table scrollable minWidth="600px">
  <TableHeader>
    <TableRow>
      {/* Always visible */}
      <TableHead className="w-24">Date</TableHead>
      {/* Hidden on mobile */}
      <TableHead className="hidden md:table-cell">Type</TableHead>
      {/* Always visible */}
      <TableHead className="w-28">Amount</TableHead>
      {/* Hidden on mobile */}
      <TableHead className="hidden md:table-cell">Status</TableHead>
    </TableRow>
  </TableHeader>
</Table>
```

### Forms

```tsx
// Two-column form on desktop
<form className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label htmlFor="firstName">First Name</Label>
      <Input id="firstName" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="lastName">Last Name</Label>
      <Input id="lastName" />
    </div>
  </div>
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" />
  </div>
</form>
```

### Dialogs

```tsx
// Full-screen on mobile, centered modal on desktop
<DialogContent className="
  w-full h-full sm:max-w-lg sm:h-auto
  sm:rounded-lg
">
  {/* Dialog content */}
</DialogContent>
```

---

## Hiding/Showing Elements

### Visibility Classes

```tsx
// Hidden on mobile, visible on desktop
<span className="hidden md:inline">Desktop only text</span>

// Visible on mobile, hidden on desktop
<span className="md:hidden">Mobile only text</span>

// Show/hide at specific breakpoints
<div className="hidden sm:block md:hidden lg:block">
  Visible on sm and lg+
</div>
```

### Common Patterns

```tsx
// Mobile: hamburger menu, Desktop: full nav
<nav>
  <Button className="md:hidden">
    <Menu />
  </Button>
  <ul className="hidden md:flex gap-4">
    {navItems}
  </ul>
</nav>

// Mobile: stack, Desktop: row
<div className="flex flex-col md:flex-row gap-4">
  {items}
</div>

// Mobile: full-width search, Desktop: constrained
<Input className="w-full md:w-64 lg:w-80" placeholder="Search..." />
```

---

## Tablet-Specific Patterns

### iPad Portrait (768px - 1024px)

```tsx
// Optimize for tablet portrait
@media (min-width: 768px) and (max-width: 1024px) {
  .tablet-stack {
    flex-direction: column;
  }
  .tablet-full {
    width: 100%;
  }
}
```

### iPad Landscape (1024px - 1194px)

```tsx
// Optimize for tablet landscape
<div className="
  flex-col
  md:flex-col      /* Tablet portrait: stack */
  ipad-landscape:flex-row  /* iPad landscape: row */
  lg:flex-row      /* Desktop: row */
">
  {content}
</div>
```

---

## Performance Considerations

### Image Optimization

```tsx
// Responsive images
<img
  srcSet="
    /image-sm.jpg 640w,
    /image-md.jpg 1024w,
    /image-lg.jpg 1920w
  "
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
  src="/image-md.jpg"
  alt="Description"
  className="w-full h-auto"
/>
```

### Lazy Loading

```tsx
// Lazy load below-fold content
const BelowFold = React.lazy(() => import("./BelowFold"));

<Suspense fallback={<Skeleton className="h-64" />}>
  <BelowFold />
</Suspense>
```

### Conditional Rendering

```tsx
import { useIsMobile } from "@/hooks/use-mobile";

function ResponsiveComponent() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileLayout />;
  }

  return <DesktopLayout />;
}
```

---

## Testing Checklist

### Device Testing

- [ ] iPhone SE (375px)
- [ ] iPhone 14 Pro (393px)
- [ ] iPad Mini (768px)
- [ ] iPad Pro 11" (834px)
- [ ] iPad Pro 12.9" (1024px)
- [ ] MacBook Air (1440px)
- [ ] Desktop (1920px)

### Orientation Testing

- [ ] Portrait mode
- [ ] Landscape mode
- [ ] Rotation transitions

### Zoom Testing

- [ ] 100% zoom
- [ ] 150% zoom
- [ ] 200% zoom (WCAG requirement)
