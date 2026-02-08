# Computis Design System v2.0

**Comprehensive Design System Documentation**  
*Optimized for density, usability, and WCAG 2.1 AA compliance*

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Design Tokens](#design-tokens)
3. [Typography](#typography)
4. [Colors](#colors)
5. [Spacing](#spacing)
6. [Components](#components)
7. [Layout Patterns](#layout-patterns)
8. [Accessibility](#accessibility)
9. [Best Practices](#best-practices)

---

## Overview

The Computis Design System v2.0 has been optimized to:

- **Maximize screen real estate** - Reduced component sizes by 15-20%
- **Improve data density** - Optimized for financial/crypto data display
- **Maintain readability** - WCAG 2.1 AA compliant contrast ratios
- **Ensure consistency** - Unified design tokens across all components
- **Support scalability** - Flexible system for future growth

### Key Improvements

| Aspect | Before | After | Impact |
|--------|--------|-------|--------|
| Button Height (Medium) | 44px | 36px | +18% vertical space |
| Card Padding | 24px | 16px | +33% content area |
| Typography | 16px base | 14px base | +12% content density |
| Table Row Height | 48px | 40px | +16% rows per screen |

---

## Design Tokens

All design tokens are defined as CSS custom properties in `global.css` and extended through Tailwind configuration.

### Accessing Tokens

```css
/* Direct CSS variable */
.my-element {
  color: var(--color-primary);
  font-size: var(--font-size-body-md);
  padding: var(--space-4);
}
```

```tsx
/* Tailwind utility class */
<div className="text-body-md text-primary p-4">
  Content
</div>
```

---

## Typography

### Type Scale

The typography scale has been optimized for better data density while maintaining readability.

| Name | Size | Use Case | Class |
|------|------|----------|-------|
| Display Large | 24px | Hero metrics, KPIs | `text-display-lg` |
| Display Small | 20px | Large metrics | `text-display-sm` |
| Heading Large | 18px | Page titles | `text-heading-lg` |
| Heading Medium | 16px | Section headers | `text-heading-md` |
| Heading Small | 14px | Card titles | `text-heading-sm` |
| Body Large | 15px | Important content | `text-body-lg` |
| **Body Medium** | **14px** | **Default body text** | `text-body-md` |
| Body Small | 13px | Table cells, dense UI | `text-body-sm` |
| Caption | 12px | Labels, hints | `text-caption` |
| Overline | 11px | Category labels | `text-overline` |

### Typography Examples

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function TypographyExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-heading-lg">Dashboard Overview</CardTitle>
        <p className="text-body-sm text-muted-foreground">
          Your portfolio performance at a glance
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <span className="text-caption text-muted-foreground">Total Value</span>
            <p className="text-display-lg font-bold">$1,234,567.89</p>
          </div>
          <div className="text-body-md">
            This is standard body text optimized for readability at 14px.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Font Weights

- **Normal (400)**: Body text
- **Medium (500)**: Card titles, labels
- **Semibold (600)**: Section headings
- **Bold (700)**: Display text, emphasis

---

## Colors

### Primary Brand Colors

```tsx
// Computis Blue
<Button className="bg-primary hover:bg-primary-hover">
  Primary Action
</Button>

// Computis Gold (Accent)
<Badge className="bg-accent text-accent-foreground">
  Premium
</Badge>
```

### Semantic Status Colors

All semantic colors are WCAG AA compliant with proper background/text combinations.

```tsx
import { Badge } from "@/components/ui/badge";

export function StatusBadges() {
  return (
    <div className="flex gap-2">
      <Badge variant="success">Verified</Badge>
      <Badge variant="warning">Pending Review</Badge>
      <Badge variant="error">Failed</Badge>
      <Badge variant="info">Processing</Badge>
      <Badge variant="neutral">Draft</Badge>
    </div>
  );
}
```

### Color Palette

| Color | Variable | Hex | Use Case |
|-------|----------|-----|----------|
| Primary | `--color-primary` | #2563EB | Brand, CTAs |
| Accent | `--color-accent` | #D4AF37 | Gold highlights |
| Success | `--color-success` | #16A34A | Positive actions |
| Warning | `--color-warning` | #B45309 | Caution states |
| Error | `--color-error` | #DC2626 | Errors, alerts |
| Info | `--color-info` | #0369A1 | Informational |

### Background Utilities

```tsx
<div className="bg-success-soft text-success-text p-4 rounded-md">
  Transaction successfully processed
</div>

<div className="bg-warning-soft text-warning-text p-4 rounded-md">
  This wallet requires verification
</div>
```

---

## Spacing

### Spacing Scale

Based on a 4px grid system for precise alignment.

| Token | Value | Class | Use Case |
|-------|-------|-------|----------|
| `--space-0-5` | 2px | `p-0.5` | Fine adjustments |
| `--space-1` | 4px | `p-1` | Tight spacing |
| `--space-2` | 8px | `p-2` | Dense UI |
| `--space-3` | 12px | `p-3` | Compact padding |
| **`--space-4`** | **16px** | **`p-4`** | **Standard spacing** |
| `--space-5` | 20px | `p-5` | Featured content |
| `--space-6` | 24px | `p-6` | Generous spacing |
| `--space-8` | 32px | `p-8` | Large spacing |

### Semantic Spacing

```tsx
// Card density options
<Card className="p-compact">  {/* 12px padding */}
<Card className="p-standard"> {/* 16px padding - default */}
<Card className="p-featured"> {/* 20px padding */}

// Component gaps
<div className="flex gap-dense">      {/* 8px gap */}
<div className="flex gap-comfortable"> {/* 16px gap */}
<div className="flex gap-spacious">    {/* 24px gap */}
```

---

## Components

### Buttons

Optimized sizes for better density while maintaining touch targets.

```tsx
import { Button } from "@/components/ui/button";

export function ButtonExamples() {
  return (
    <div className="flex gap-4 items-center">
      {/* Sizes */}
      <Button size="sm">Small (32px)</Button>
      <Button size="default">Medium (36px)</Button>
      <Button size="lg">Large (44px)</Button>
      
      {/* Variants */}
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}
```

### Badge

Compact status indicators with semantic colors.

```tsx
import { Badge } from "@/components/ui/badge";

export function BadgeExamples() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="error">Failed</Badge>
      <Badge variant="info">Processing</Badge>
      <Badge variant="neutral">Draft</Badge>
    </div>
  );
}
```

### Cards

Cards now use optimized padding for better content density.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function CardExample() {
  return (
    <Card className="p-standard"> {/* 16px padding */}
      <CardHeader>
        <CardTitle className="text-heading-lg">
          Portfolio Overview
        </CardTitle>
        <CardDescription>
          Current holdings and performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-caption text-muted-foreground">Total Value</span>
            <span className="text-body-md font-semibold">$123,456.78</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Inputs

Reduced height for better form density.

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputExample() {
  return (
    <div className="space-y-2">
      <Label htmlFor="wallet" className="text-body-sm font-medium">
        Wallet Address
      </Label>
      <Input
        id="wallet"
        placeholder="0x..."
        className="h-input-md" {/* 36px height */}
      />
    </div>
  );
}
```

### Tables

Optimized for displaying large datasets efficiently.

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function TransactionsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-caption">Date</TableHead>
          <TableHead className="text-caption">Asset</TableHead>
          <TableHead className="text-caption">Amount</TableHead>
          <TableHead className="text-caption">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="text-body-sm">2026-02-08</TableCell>
          <TableCell className="text-body-sm font-medium">BTC</TableCell>
          <TableCell className="text-body-sm font-mono">0.5000</TableCell>
          <TableCell>
            <Badge variant="success">Verified</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

---

## Layout Patterns

### Dashboard Cards Grid

```tsx
export function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-comfortable">
      <Card className="p-standard">
        <CardHeader>
          <p className="text-caption text-muted-foreground">Total Portfolio</p>
          <p className="text-display-sm font-bold">$1.2M</p>
        </CardHeader>
      </Card>
      {/* More cards... */}
    </div>
  );
}
```

### Data Table Layout

```tsx
export function DataTableLayout() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-heading-lg">Recent Transactions</h2>
        <Button size="sm">Export</Button>
      </div>
      
      {/* Table Container */}
      <Card className="p-0">
        <Table>
          {/* Table content */}
        </Table>
      </Card>
    </div>
  );
}
```

---

## Accessibility

### WCAG 2.1 AA Compliance

All color combinations meet WCAG 2.1 AA standards:

- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

### Focus States

All interactive elements include visible focus indicators:

```tsx
<Button>
  {/* Automatically includes focus-visible:ring-2 */}
  Accessible Button
</Button>
```

### Touch Targets

Minimum touch target size is 44x44px (WCAG Success Criterion 2.5.5):

- Small buttons: 32px (use sparingly, desktop only)
- Medium buttons: 36px (default)
- Large buttons: 44px (mobile-friendly)

### Screen Reader Support

Use semantic HTML and ARIA labels:

```tsx
<Button aria-label="Delete transaction">
  <TrashIcon className="h-4 w-4" />
</Button>
```

---

## Best Practices

### 1. Consistent Spacing

✅ **Good**: Use design tokens
```tsx
<div className="p-standard gap-comfortable">
```

❌ **Bad**: Arbitrary values
```tsx
<div className="p-[17px] gap-[13px]">
```

### 2. Typography Hierarchy

✅ **Good**: Semantic headings
```tsx
<h1 className="text-heading-lg">Page Title</h1>
<h2 className="text-heading-md">Section Title</h2>
<p className="text-body-md">Body content</p>
```

❌ **Bad**: Inconsistent sizes
```tsx
<div className="text-xl">Page Title</div>
<div className="text-lg">Section Title</div>
```

### 3. Semantic Colors

✅ **Good**: Status-appropriate colors
```tsx
<Badge variant="success">Verified</Badge>
<Badge variant="warning">Pending</Badge>
```

❌ **Bad**: Generic colors for status
```tsx
<Badge className="bg-green-500">Verified</Badge>
<Badge className="bg-yellow-500">Pending</Badge>
```

### 4. Component Density

✅ **Good**: Appropriate density for context
```tsx
{/* Dashboard - use standard padding */}
<Card className="p-standard">

{/* Data table - use compact padding */}
<Card className="p-compact">
```

### 5. Responsive Design

✅ **Good**: Mobile-first approach
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
```

---

## Quick Reference

### Common Patterns

```tsx
// Status Badge
<Badge variant="success">Active</Badge>

// Primary Action Button
<Button variant="default" size="default">Save Changes</Button>

// Compact Data Card
<Card className="p-compact">
  <div className="space-y-2">
    <p className="text-caption text-muted-foreground">Label</p>
    <p className="text-body-md font-semibold">Value</p>
  </div>
</Card>

// Form Input
<div className="space-y-2">
  <Label className="text-body-sm">Field Label</Label>
  <Input className="h-input-md" />
</div>

// Data Table Row
<TableRow>
  <TableCell className="text-body-sm">Cell content</TableCell>
</TableRow>
```

---

## Design Token Reference

### Complete Token List

See `computis-design-tokens.json` and `computis-design-tokens.css` for the complete list of available design tokens.

### Using Tokens in Components

```tsx
// Typography
className="text-heading-lg"
className="text-body-md"
className="text-caption"

// Colors
className="text-primary"
className="bg-success-soft"
className="border-warning"

// Spacing
className="p-standard"
className="gap-comfortable"
className="m-4"

// Sizing
className="h-btn-md"
className="h-input-md"
className="h-table-row"
```

---

## Migration Guide

### Updating Existing Components

1. **Replace arbitrary sizes with tokens:**
   ```tsx
   // Before
   <Button className="h-11">Click me</Button>
   
   // After
   <Button size="default">Click me</Button>
   ```

2. **Use semantic badge variants:**
   ```tsx
   // Before
   <Badge className="bg-green-100 text-green-800">Success</Badge>
   
   // After
   <Badge variant="success">Success</Badge>
   ```

3. **Update card padding:**
   ```tsx
   // Before
   <CardHeader className="p-6">
   
   // After
   <CardHeader> {/* Now uses p-standard by default */}
   ```

4. **Optimize table density:**
   ```tsx
   // TableHead and TableCell now use optimized heights automatically
   // No changes needed - already updated!
   ```

---

## Support & Resources

- **Design Tokens**: See `code/client/global.css` for complete variable definitions
- **Tailwind Config**: See `code/tailwind.config.ts` for utility extensions
- **Component Library**: See `code/client/components/ui/` for all components

For questions or contributions, refer to the project's main documentation.

---

**Last Updated**: February 2026  
**Version**: 2.0.0
