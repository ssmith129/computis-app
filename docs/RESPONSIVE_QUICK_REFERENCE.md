# Responsive Design Quick Reference Guide

## 🎯 Quick Start

### 1. New Page Template

```tsx
import { useIsMobile } from "@/hooks/use-mobile";

export default function MyPage() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <DashboardSidebar activeItem="My Page" />
        <SidebarInset className="flex flex-col min-w-0 flex-1">
          <DashboardHeader />
          <MyPageContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

### 2. Page Header

```tsx
<div className="page-titlebar">
  <div className="page-titlebar-content">
    <div>
      <h1 className="responsive-page-title">Title</h1>
      <p className="text-sm md:text-base text-muted-foreground">Description</p>
    </div>
    <div className="page-titlebar-actions">
      <Button>Primary</Button>
      <Button variant="outline">Secondary</Button>
    </div>
  </div>
</div>
```

### 3. Content Area

```tsx
<div className="p-4 md:p-6 space-y-4 md:space-y-6">{/* Your content */}</div>
```

---

## 📏 Spacing Scale

| Class                        | Mobile    | Tablet    | Desktop   |
| ---------------------------- | --------- | --------- | --------- |
| `responsive-page-padding`    | p-4       | p-6       | p-8       |
| `responsive-section-padding` | p-3       | p-4       | p-6       |
| `responsive-card-padding`    | p-3       | p-4       | p-5       |
| `space-y-responsive`         | space-y-3 | space-y-4 | space-y-6 |
| `gap-responsive`             | gap-3     | gap-4     | gap-6     |

**Quick Use**:

```tsx
<div className="responsive-page-padding space-y-responsive">
  {/* Content */}
</div>
```

---

## 📐 Grid Systems

### Stats Grid (2/4 columns)

```tsx
<div className="responsive-grid-stats">
  <StatCard />
  <StatCard />
  <StatCard />
  <StatCard />
</div>
```

**Breakpoints**: 2 cols (mobile/tablet) → 4 cols (desktop)

### Cards Grid (1/2/3 columns)

```tsx
<div className="responsive-grid-cards">
  <Card />
  <Card />
  <Card />
</div>
```

**Breakpoints**: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)

### Forms Grid (1/2 columns)

```tsx
<div className="responsive-grid-forms">
  <FormField />
  <FormField />
</div>
```

**Breakpoints**: 1 col (mobile) → 2 cols (tablet+)

### Wallets Grid (1/2/3/4 columns)

```tsx
<div className="card-grid-wallet">
  <WalletCard />
  <WalletCard />
  <WalletCard />
  <WalletCard />
</div>
```

**Breakpoints**: 1 col (mobile) → 2 cols (sm) → 3 cols (lg) → 4 cols (2xl)

### Auto Grid (1/2/3/4 columns)

```tsx
<div className="responsive-grid-auto">
  <Item />
  <Item />
  <Item />
  <Item />
</div>
```

**Breakpoints**: 1 col (mobile) → 2 cols (sm) → 3 cols (lg) → 4 cols (xl)

---

## 🎨 Typography

| Class                      | Mobile    | Tablet   | Desktop  |
| -------------------------- | --------- | -------- | -------- |
| `responsive-page-title`    | text-xl   | text-2xl | text-3xl |
| `responsive-section-title` | text-lg   | text-xl  | text-2xl |
| `responsive-card-title`    | text-base | text-lg  | text-lg  |

**Example**:

```tsx
<h1 className="responsive-page-title font-bold">Page Title</h1>
<h2 className="responsive-section-title font-semibold">Section Title</h2>
<h3 className="responsive-card-title font-semibold">Card Title</h3>
```

---

## 📱 Visibility Controls

### Show/Hide by Breakpoint

```tsx
{
  /* Mobile only */
}
<div className="mobile-only">Mobile Content</div>;

{
  /* Hide on mobile */
}
<div className="mobile-hide">Desktop Content</div>;

{
  /* Tablet and up */
}
<div className="tablet-up">Tablet+ Content</div>;

{
  /* Desktop only */
}
<div className="desktop-only">Desktop Only</div>;
```

### Conditional Text

```tsx
<Button>
  <Icon className="h-4 w-4 mr-2" />
  <span className="hidden sm:inline">Full Button Text</span>
  <span className="sm:hidden">Short</span>
</Button>
```

---

## 🎛️ Component Patterns

### Tabs (Scrollable on Mobile)

```tsx
<TabsList className="responsive-tabs-scroll lg:grid lg:grid-cols-5">
  <TabsTrigger value="tab1" className="flex-shrink-0">
    Tab 1
  </TabsTrigger>
  <TabsTrigger value="tab2" className="flex-shrink-0">
    Tab 2
  </TabsTrigger>
  <TabsTrigger value="tab3" className="flex-shrink-0">
    Tab 3
  </TabsTrigger>
  <TabsTrigger value="tab4" className="flex-shrink-0">
    Tab 4
  </TabsTrigger>
  <TabsTrigger value="tab5" className="flex-shrink-0">
    Tab 5
  </TabsTrigger>
</TabsList>
```

### Responsive Dialog

```tsx
<Dialog>
  <DialogContent className="responsive-dialog">
    <div className="responsive-dialog-content">{/* Content */}</div>
  </DialogContent>
</Dialog>
```

### Button Group

```tsx
<div className="responsive-button-group">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
  <Button>Action 3</Button>
</div>
```

### Flex Stack (Vertical → Horizontal)

```tsx
<div className="responsive-flex-stack">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Flex Between

```tsx
<div className="responsive-flex-between">
  <div>Left Content</div>
  <div>Right Content</div>
</div>
```

---

## 🎯 Icon Sizing

| Class                | Mobile      | Desktop |
| -------------------- | ----------- | ------- |
| `responsive-icon-sm` | h-3.5 w-3.5 | h-4 w-4 |
| `responsive-icon`    | h-4 w-4     | h-5 w-5 |
| `responsive-icon-lg` | h-5 w-5     | h-6 w-6 |

**Example**:

```tsx
<Icon className="responsive-icon" />
```

---

## 👆 Touch Targets

### Auto-Enhanced (Mobile)

All buttons, links, and interactive elements automatically get:

- `min-height: 44px`
- `min-width: 44px`

To opt-out:

```tsx
<button className="no-touch-enhance">Small Button</button>
```

### Manual Touch Target

```tsx
<Button className="touch-target">Touch-Friendly Button</Button>
```

---

## 🖼️ Images & Media

### Responsive Image

```tsx
<img className="responsive-image" src="..." alt="..." />
```

### Responsive Avatar

```tsx
<Avatar className="responsive-avatar">
  {/* h-8 w-8 on mobile, h-10 w-10 on desktop */}
</Avatar>
```

---

## 🏷️ Badges & Tags

### Responsive Badge

```tsx
<Badge className="responsive-badge">Label</Badge>
```

**Size**: text-xs px-2 py-0.5 (mobile) → text-sm px-2.5 py-1 (desktop)

---

## 🔘 Button Sizing

| Class                  | Mobile      | Desktop        |
| ---------------------- | ----------- | -------------- |
| `responsive-button-sm` | h-8 text-xs | h-9 text-sm    |
| `responsive-button`    | h-9 text-sm | h-10 text-base |

**Example**:

```tsx
<Button className="responsive-button">Responsive Button</Button>
```

---

## 📦 Container Widths

### Responsive Container

```tsx
<div className="container-responsive">
  {/* Constrained width with responsive padding */}
</div>
```

**Breakpoints**:

- Mobile: 100% width, px-4
- Tablet: max-w-screen-md, px-6
- Desktop: max-w-screen-lg, px-8
- Large: max-w-screen-xl

---

## ⚡ Common Recipes

### Page with Stats and Cards

```tsx
<div className="app-content">
  <div className="page-titlebar">
    <div className="page-titlebar-content">
      <div>
        <h1 className="responsive-page-title">Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground">Overview</p>
      </div>
      <div className="page-titlebar-actions">
        <Button>New</Button>
      </div>
    </div>
  </div>

  <div className="p-4 md:p-6 space-y-4 md:space-y-6">
    {/* Stats */}
    <div className="responsive-grid-stats">
      <StatCard />
      <StatCard />
      <StatCard />
      <StatCard />
    </div>

    {/* Cards */}
    <div className="responsive-grid-cards">
      <Card />
      <Card />
      <Card />
    </div>
  </div>
</div>
```

### Form Page

```tsx
<div className="app-content">
  <div className="page-titlebar">
    <div className="page-titlebar-content">
      <h1 className="responsive-page-title">Settings</h1>
      <div className="page-titlebar-actions">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </div>
    </div>
  </div>

  <div className="p-4 md:p-6 space-y-4 md:space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="responsive-grid-forms">
          <FormField label="First Name" />
          <FormField label="Last Name" />
          <FormField label="Email" />
          <FormField label="Phone" />
        </div>
      </CardContent>
    </Card>
  </div>
</div>
```

---

## 🔍 Debugging Tips

### Check Current Breakpoint

```tsx
<div className="fixed bottom-4 right-4 bg-black text-white px-2 py-1 text-xs z-50">
  <span className="sm:hidden">XS</span>
  <span className="hidden sm:inline md:hidden">SM</span>
  <span className="hidden md:inline lg:hidden">MD</span>
  <span className="hidden lg:inline xl:hidden">LG</span>
  <span className="hidden xl:inline">XL</span>
</div>
```

### Inspect Mobile

- Chrome DevTools: F12 → Toggle Device Toolbar (Ctrl+Shift+M)
- Responsive mode: 375px, 768px, 1024px, 1440px

---

## ✅ Checklist

### New Page/Component

- [ ] Use `useIsMobile()` hook for sidebar
- [ ] Apply `.page-titlebar-content` to header
- [ ] Use responsive padding classes
- [ ] Choose appropriate grid system
- [ ] Test on mobile (320px+)
- [ ] Test on tablet (768px+)
- [ ] Test on desktop (1024px+)
- [ ] Verify touch targets (44x44px)
- [ ] Check text readability
- [ ] Test keyboard navigation

---

## 📚 Learn More

- **Full Audit**: `docs/RESPONSIVE_AUDIT_REPORT.md`
- **Implementation Summary**: `docs/RESPONSIVE_IMPLEMENTATION_SUMMARY.md`
- **Transactions Table**: `docs/RESPONSIVE_TRANSACTIONS_TABLE.md`
- **Global CSS**: `client/global.css` (search for "RESPONSIVE")

---

**Last Updated**: December 2024  
**Version**: 1.0  
**Status**: Production Ready
