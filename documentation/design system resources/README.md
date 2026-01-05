# Computis Design System for Builder.io Fusion AI

> **Version:** 2.0.0  
> **Last Updated:** December 2024  
> **Purpose:** Comprehensive design system optimized for Builder.io Fusion AI code generation

## 🎯 Overview

This design system provides Builder.io Fusion AI with everything needed to generate consistent, accessible, and maintainable React/TypeScript code that perfectly matches the Computis crypto tax management platform.

## 🏗️ Architecture Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | React 18 + TypeScript | Core application framework |
| **Styling** | Tailwind CSS + CSS Variables | Utility-first styling with theming |
| **Components** | Radix UI Primitives | Accessible, unstyled component base |
| **Patterns** | shadcn/ui | Component patterns and variants |
| **Variants** | class-variance-authority (cva) | Type-safe component variants |
| **Icons** | Lucide React | Consistent iconography |

## 📁 Directory Structure

```
design system resources/
├── README.md                           # This file
├── tokens/                             # Design tokens
│   ├── colors.json                     # Color palette (JSON)
│   ├── colors.css                      # CSS custom properties
│   ├── typography.json                 # Typography tokens
│   ├── spacing.json                    # Spacing scale
│   ├── shadows-borders.json            # Visual effects
│   └── tokens.md                       # Human-readable docs
├── components/                         # Component documentation
│   ├── README.md                       # Component library overview
│   ├── primitives/                     # Base UI components
│   │   ├── button.md
│   │   ├── input.md
│   │   ├── card.md
│   │   ├── table.md
│   │   ├── select.md
│   │   ├── dialog.md
│   │   └── ...
│   ├── composite/                      # Complex components
│   │   ├── dashboard-card.md
│   │   ├── data-table.md
│   │   └── ...
│   └── patterns/                       # Common UI patterns
│       ├── forms.md
│       ├── navigation.md
│       └── layouts.md
├── guidelines/                         # AI generation guidelines
│   ├── README.md
│   ├── naming-conventions.md
│   ├── accessibility.md
│   ├── responsive-design.md
│   ├── performance.md
│   └── ai-code-patterns.md
├── storybook/                          # Storybook integration
│   ├── README.md
│   └── stories/
│       └── *.stories.tsx
└── examples/                           # Usage examples
    ├── page-layouts.md
    ├── form-patterns.md
    └── data-display.md
```

---

## 🚀 Quick Start for AI Code Generation

### Essential Imports Template

```tsx
// ALWAYS include these imports
import * as React from "react";
import { cn } from "@/lib/utils";

// For variant-based components
import { cva, type VariantProps } from "class-variance-authority";

// For Radix primitives (replace [component] with actual name)
import * as ComponentPrimitive from "@radix-ui/react-[component]";

// Common icons
import { Loader2, ChevronDown, Check, X } from "lucide-react";
```

### The `cn()` Utility

The `cn` function merges class names intelligently:

```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Usage:**
```tsx
<div className={cn(
  "base-classes",
  conditional && "conditional-classes",
  className // Always spread props.className last
)} />
```

---

## 🎨 Design Tokens Quick Reference

### Color System

**CRITICAL:** All colors use HSL format via CSS custom properties:

```tsx
// ✅ CORRECT - Use CSS variables with hsl()
className="bg-primary text-primary-foreground"
className="text-muted-foreground"
className="border-border"

// ❌ WRONG - Never use hardcoded colors
className="bg-blue-500"
className="text-gray-600"
```

### Core Color Tokens

| Token | CSS Variable | Usage |
|-------|--------------|-------|
| `background` | `--background` | Page backgrounds |
| `foreground` | `--foreground` | Primary text |
| `card` | `--card` | Card backgrounds |
| `primary` | `--primary` | Primary actions, brand |
| `secondary` | `--secondary` | Secondary actions |
| `muted` | `--muted` | Subtle backgrounds |
| `muted-foreground` | `--muted-foreground` | Secondary text |
| `accent` | `--accent` | Hover states |
| `destructive` | `--destructive` | Dangerous actions |
| `border` | `--border` | Borders |
| `input` | `--input` | Input borders |
| `ring` | `--ring` | Focus rings |

### Status Colors

| Token | Usage |
|-------|-------|
| `status-success` | Success states, positive |
| `status-warning` | Warning states, caution |
| `status-error` | Error states, negative |
| `status-info` | Informational states |

### Typography

| Font | CSS Class | Usage |
|------|-----------|-------|
| Noto Sans | `font-sans` | UI text, headings |
| JetBrains Mono | `font-mono` | Code, numbers, addresses |

### Spacing Scale (Base: 4px)

| Token | Value | Common Uses |
|-------|-------|-------------|
| `0.5` | 2px | Tight spacing |
| `1` | 4px | Icon gaps |
| `2` | 8px | Compact padding |
| `3` | 12px | Default gaps |
| `4` | 16px | Section padding |
| `6` | 24px | Card padding |
| `8` | 32px | Large spacing |

### Breakpoints

| Name | Min Width | Target |
|------|-----------|--------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `ipad` | 834px | iPad portrait |
| `lg` | 1024px | Laptops |
| `ipad-landscape` | 1194px | iPad landscape |
| `xl` | 1280px | Desktops |
| `2xl` | 1400px | Large desktops |
| `desktop` | 1920px | Ultra-wide |

---

## 🧩 Component Patterns

### Standard Component Structure

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ComponentNameProps 
  extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props
  variant?: "default" | "alternate";
}

const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "base-styles-here",
          // Variant styles
          variant === "alternate" && "alternate-styles",
          // Custom className last
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ComponentName.displayName = "ComponentName";

export { ComponentName };
```

### CVA Variant Pattern

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const componentVariants = cva(
  // Base styles (always applied)
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}
```

---

## ♿ Accessibility Requirements

### WCAG 2.1 AA Compliance Checklist

1. **Color Contrast**
   - Normal text: ≥ 4.5:1
   - Large text (18px+): ≥ 3:1
   - UI components: ≥ 3:1

2. **Keyboard Navigation**
   ```tsx
   // All interactive elements must be focusable
   <button
     className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
   />
   ```

3. **Touch Targets**
   ```tsx
   // Minimum 44x44px for mobile
   <button className="min-w-[44px] min-h-[44px]" />
   ```

4. **Screen Reader Support**
   ```tsx
   // Icon-only buttons need labels
   <button aria-label="Close dialog">
     <X className="h-4 w-4" />
     <span className="sr-only">Close</span>
   </button>
   ```

5. **Form Accessibility**
   ```tsx
   <label htmlFor="email">Email</label>
   <input 
     id="email"
     aria-describedby="email-error"
     aria-invalid={hasError}
   />
   {hasError && <span id="email-error" role="alert">Error message</span>}
   ```

---

## 📏 Responsive Design Patterns

### Mobile-First Approach

```tsx
// Always start with mobile, add breakpoints for larger screens
<div className="
  flex flex-col              {/* Mobile: stack vertically */}
  md:flex-row                {/* Tablet+: row layout */}
  gap-4                      {/* Mobile gap */}
  md:gap-6                   {/* Tablet+ gap */}
">
```

### Grid Patterns

```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// Auto-fit grid
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
```

### Container Pattern

```tsx
<div className="container mx-auto px-4 md:px-6 lg:px-8">
```

---

## 🔗 File References

### Import Aliases

| Alias | Path |
|-------|------|
| `@/components` | `client/components` |
| `@/components/ui` | `client/components/ui` |
| `@/lib` | `client/lib` |
| `@/hooks` | `client/hooks` |

### Component Locations

| Component Type | Path |
|---------------|------|
| UI Primitives | `client/components/ui/*.tsx` |
| Page Components | `client/pages/*.tsx` |
| Feature Components | `client/components/[feature]/*.tsx` |
| Hooks | `client/hooks/*.ts` |
| Utilities | `client/lib/*.ts` |

---

## 🤖 AI Generation Guidelines Summary

### DO ✅

- Use TypeScript with proper interfaces
- Use CSS variables via Tailwind (`bg-primary`, not `bg-blue-500`)
- Use `cn()` for all className merging
- Use `React.forwardRef` for all components
- Include proper ARIA attributes
- Follow mobile-first responsive patterns
- Use semantic HTML elements

### DON'T ❌

- Hardcode color values
- Skip accessibility attributes
- Use inline styles
- Create components without displayName
- Ignore keyboard navigation
- Use `any` type

---

## 📚 Related Documentation

- [Component Library →](./components/README.md)
- [Design Tokens →](./tokens/tokens.md)
- [AI Code Patterns →](./guidelines/ai-code-patterns.md)
- [Accessibility Guide →](./guidelines/accessibility.md)
- [Responsive Design →](./guidelines/responsive-design.md)
- [Storybook Stories →](./storybook/README.md)

---

*This design system is automatically synchronized with the Computis codebase. For updates, regenerate from source.*
