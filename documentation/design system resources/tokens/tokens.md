# Computis Design Tokens

Design tokens are the foundational visual design values that ensure consistency across the Computis application. This document provides a comprehensive reference for AI code generation.

## Token Files

| File | Purpose |
|------|---------|
| `colors.json` | Complete color palette with HSL values |
| `colors.css` | CSS custom properties for colors |
| `typography.json` | Font families, sizes, weights, line heights |
| `spacing.json` | Spacing scale and component spacing |
| `shadows-borders.json` | Shadows, border radii, and visual effects |

---

## Color System

### Usage Pattern

All colors use CSS custom properties with HSL values:

```css
/* Definition (in :root) */
--primary: 218 91% 48%;

/* Usage in Tailwind */
.element {
  background-color: hsl(var(--primary));
  /* With opacity */
  background-color: hsl(var(--primary) / 0.5);
}
```

### Core Colors

| Token | HSL Value | Usage |
|-------|-----------|-------|
| `--background` | 0 0% 97% | Page background |
| `--foreground` | 0 0% 10% | Primary text |
| `--card` | 0 0% 100% | Card background |
| `--card-foreground` | 0 0% 10% | Card text |
| `--muted` | 210 40% 96.1% | Muted backgrounds |
| `--muted-foreground` | 215.4 16.3% 46.9% | Secondary text |

### Brand Colors

| Token | HSL Value | Hex | Usage |
|-------|-----------|-----|-------|
| `--primary` | 218 91% 48% | #1570EF | Primary actions, links |
| `--primary-foreground` | 0 0% 100% | #FFFFFF | Text on primary |
| `--secondary` | 210 40% 96.1% | - | Secondary buttons |
| `--accent` | 210 40% 96.1% | - | Hover states |
| `--destructive` | 0 84.2% 60.2% | #EF4444 | Destructive actions |

### Status Colors

```tsx
// Usage example
<Badge className="bg-status-success text-white">Success</Badge>
```

| Token | HSL Value | Hex | Usage |
|-------|-----------|-----|-------|
| `--status-success` | 142 76% 36% | #16A34A | Success states |
| `--status-warning` | 32 95% 44% | #DC6803 | Warning states |
| `--status-error` | 0 84% 60% | #EF4444 | Error states |
| `--status-info` | 201 96% 32% | #0369A1 | Info states |

### Chart Colors

For data visualization consistency:

| Token | Hex | Tailwind Class |
|-------|-----|----------------|
| `--chart-blue` | #3B82F6 | `chart-blue` |
| `--chart-green` | #10B981 | `chart-green` |
| `--chart-orange` | #F97316 | `chart-orange` |
| `--chart-yellow` | #EAB308 | `chart-yellow` |
| `--chart-cyan` | #06B6D4 | `chart-cyan` |
| `--chart-red` | #EF4444 | `chart-red` |

### Sidebar Colors (Dark Theme)

| Token | Value | Usage |
|-------|-------|-------|
| `--sidebar-background` | 0 0% 10% | Sidebar bg |
| `--sidebar-foreground` | 0 0% 100% | Sidebar text |
| `--sidebar-accent` | 0 0% 20% | Hover states |

---

## Typography

### Font Families

```tsx
// Sans-serif (default)
<p className="font-sans">Noto Sans for UI text</p>

// Monospace
<span className="font-mono">122,124</span>
```

| Family | Stack | Usage |
|--------|-------|-------|
| Sans | Noto Sans, system-ui, sans-serif | Body, headings, UI |
| Mono | JetBrains Mono, Fira Code, monospace | Code, numbers, addresses |

### Font Sizes

| Token | Size | Line Height | Tailwind |
|-------|------|-------------|----------|
| xs | 12px (0.75rem) | 16px | `text-xs` |
| sm | 14px (0.875rem) | 20px | `text-sm` |
| base | 16px (1rem) | 24px | `text-base` |
| lg | 18px (1.125rem) | 28px | `text-lg` |
| xl | 20px (1.25rem) | 28px | `text-xl` |
| 2xl | 24px (1.5rem) | 32px | `text-2xl` |

### Font Weights

| Weight | Value | Tailwind | Usage |
|--------|-------|----------|-------|
| Normal | 400 | `font-normal` | Body text |
| Medium | 500 | `font-medium` | Labels, nav items |
| Semibold | 600 | `font-semibold` | Headings, buttons |
| Bold | 700 | `font-bold` | Metrics, emphasis |

### Typography Presets

```tsx
// Page title
<h1 className="text-2xl font-semibold leading-none tracking-tight">
  Dashboard
</h1>

// Card title
<h3 className="text-sm font-medium text-gray-600">
  Total Transactions
</h3>

// Metric value
<span className="text-xl font-bold text-gray-900">
  122,124
</span>

// Help text
<p className="text-sm text-muted-foreground">
  Last updated 5 minutes ago
</p>
```

---

## Spacing

### Base Unit

All spacing uses a **4px base unit**.

### Spacing Scale

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| 1 | 4px | `p-1`, `m-1`, `gap-1` | Tight spacing |
| 2 | 8px | `p-2`, `m-2`, `gap-2` | Small spacing |
| 3 | 12px | `p-3`, `m-3`, `gap-3` | Compact |
| 4 | 16px | `p-4`, `m-4`, `gap-4` | Default |
| 5 | 20px | `p-5`, `m-5`, `gap-5` | Medium |
| 6 | 24px | `p-6`, `m-6`, `gap-6` | Large |
| 8 | 32px | `p-8`, `m-8`, `gap-8` | Extra large |

### Component Spacing

```tsx
// Card
<Card className="p-6">
  <CardHeader className="p-6" />
  <CardContent className="p-6 pt-0" />
</Card>

// Button
<Button className="h-11 px-4 py-2">Default</Button>
<Button size="sm" className="h-11 px-3">Small</Button>
<Button size="lg" className="h-12 px-8">Large</Button>
<Button size="icon" className="h-11 w-11">Icon</Button>

// Input
<Input className="h-11 px-3 py-2" />
```

---

## Border Radius

### Scale

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| sm | 4px | `rounded-sm` | Small elements |
| md | 6px | `rounded-md` | Buttons, inputs |
| lg | 8px | `rounded-lg` | Cards, dialogs |
| full | 9999px | `rounded-full` | Badges, avatars |

### Component Defaults

| Component | Border Radius |
|-----------|---------------|
| Button | `rounded-md` |
| Card | `rounded-lg` |
| Input | `rounded-md` |
| Badge | `rounded-full` |
| Avatar | `rounded-full` |

---

## Shadows

| Level | Tailwind | Usage |
|-------|----------|-------|
| sm | `shadow-sm` | Subtle elevation |
| default | `shadow` | Cards (default) |
| md | `shadow-md` | Dropdowns, popovers |
| lg | `shadow-lg` | Modals, dialogs |

---

## Breakpoints

| Name | Min Width | Tailwind Prefix | Device |
|------|-----------|-----------------|--------|
| sm | 640px | `sm:` | Small tablets |
| md | 768px | `md:` | Tablets |
| ipad | 834px | `ipad:` | iPad portrait |
| lg | 1024px | `lg:` | Laptops |
| ipad-landscape | 1194px | `ipad-landscape:` | iPad landscape |
| xl | 1280px | `xl:` | Desktop |
| 2xl | 1400px | `2xl:` | Large desktop |
| desktop | 1920px | `desktop:` | Ultra-wide |

### Mobile-First Pattern

```tsx
// Always use mobile-first approach
<div className="
  grid grid-cols-1      // Mobile: 1 column
  md:grid-cols-2        // Tablet: 2 columns
  lg:grid-cols-3        // Desktop: 3 columns
  gap-4
">
```

---

## Focus States

All interactive elements use consistent focus styling:

```tsx
className="
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-ring
  focus-visible:ring-offset-2
"
```

---

## AI Generation Guidelines

When generating code with these tokens:

1. **Always use CSS variables** - Never hardcode color values
2. **Use Tailwind classes** - Prefer utility classes over custom CSS
3. **Follow spacing scale** - Use the 4px base unit system
4. **Maintain accessibility** - Use appropriate contrast ratios
5. **Mobile-first** - Start with mobile styles, add breakpoints for larger screens
