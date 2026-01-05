# Naming Conventions

Consistent naming ensures code maintainability and helps AI generate predictable, recognizable code patterns.

## File Naming

### Components

| Type | Convention | Example |
|------|------------|---------|
| Component files | PascalCase | `DashboardCard.tsx` |
| Index exports | lowercase | `index.ts` |
| Barrel exports | lowercase | `index.tsx` |

```
components/
├── ui/
│   ├── button.tsx          # Single component
│   ├── card.tsx            # Multi-export component
│   └── loading-states.tsx  # Multiple related components
├── dashboard/
│   ├── dashboard-cards.tsx
│   ├── dashboard-content.tsx
│   └── header.tsx
```

### Hooks

| Type | Convention | Example |
|------|------------|---------|
| Hook files | kebab-case | `use-mobile.tsx` |
| Hook function | camelCase with `use` | `useMobile` |

```
hooks/
├── use-mobile.tsx
├── use-toast.ts
└── use-gestures.ts
```

### Utilities

| Type | Convention | Example |
|------|------------|---------|
| Utility files | kebab-case | `responsive-utils.ts` |
| Function names | camelCase | `formatCurrency` |

### Pages

| Type | Convention | Example |
|------|------------|---------|
| Page files | PascalCase | `Transactions.tsx` |
| Route paths | kebab-case | `/wallet-ingestion` |

---

## Component Naming

### React Components

```tsx
// ✅ PascalCase for component names
function DashboardCard() {}
const TransactionTable = () => {};

// ✅ Component with forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(...);
Button.displayName = "Button";

// ❌ Wrong
function dashboardCard() {}  // camelCase
function dashboard_card() {} // snake_case
```

### Props Interfaces

```tsx
// ✅ ComponentNameProps pattern
interface ButtonProps {}
interface DashboardCardProps {}
interface TransactionTableProps {}

// ✅ With extension
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// ✅ With variant props
interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
```

### Event Handlers

```tsx
// ✅ Props: on + Event
interface Props {
  onClick?: () => void;
  onSubmit?: (data: FormData) => void;
  onChange?: (value: string) => void;
}

// ✅ Internal handlers: handle + Action
function Component() {
  const handleClick = () => {};
  const handleSubmit = (data: FormData) => {};
  const handleValueChange = (value: string) => {};
}
```

---

## CSS Class Naming

### Tailwind Classes

Use Tailwind's standard utility classes:

```tsx
// ✅ Standard Tailwind
<div className="flex items-center justify-between p-4 bg-background" />

// ✅ With responsive prefixes
<div className="text-sm md:text-base lg:text-lg" />

// ✅ With state prefixes
<button className="hover:bg-primary/90 focus-visible:ring-2" />
```

### Custom Classes

When custom classes are needed, use BEM-inspired naming:

```css
/* Block */
.app-header {}
.dashboard-card {}
.transaction-table {}

/* Block__Element */
.app-header__title {}
.dashboard-card__value {}

/* Block--Modifier */
.dashboard-card--highlighted {}
.transaction-table--compact {}
```

### Component-Specific Classes

```css
/* Layout components */
.app-layout-grid {}
.app-content {}
.page-titlebar {}

/* Feature components */
.responsive-table-container {}
.scrollable-cards {}

/* Utility classes */
.touch-target {}
.scrollbar-hide {}
```

---

## TypeScript Conventions

### Type Aliases vs Interfaces

```tsx
// ✅ Use interface for object shapes (extendable)
interface User {
  id: string;
  name: string;
}

// ✅ Use type for unions, intersections, primitives
type Status = "pending" | "completed" | "failed";
type ID = string | number;
```

### Generic Types

```tsx
// ✅ Single letter for simple generics
function identity<T>(value: T): T { return value; }

// ✅ Descriptive names for complex generics
interface TableProps<TData extends Record<string, unknown>> {
  data: TData[];
  columns: Column<TData>[];
}
```

### Enum vs Union

```tsx
// ✅ Prefer union types (tree-shakeable)
type Size = "sm" | "md" | "lg";
type Variant = "default" | "destructive" | "outline";

// ❌ Avoid enums (generates extra JS code)
enum Size { SM, MD, LG }
```

---

## Variant Naming

### Button Variants

```tsx
const buttonVariants = cva("...", {
  variants: {
    variant: {
      default: "...",      // Primary action
      secondary: "...",    // Secondary action
      destructive: "...",  // Dangerous action
      outline: "...",      // Bordered style
      ghost: "...",        // No background
      link: "...",         // Link style
    },
    size: {
      default: "...",      // Standard size (44px height)
      sm: "...",           // Small
      lg: "...",           // Large
      icon: "...",         // Square icon button
    },
  },
});
```

### Badge Variants

```tsx
const badgeVariants = cva("...", {
  variants: {
    variant: {
      default: "...",      // Primary color
      secondary: "...",    // Muted style
      destructive: "...",  // Error/warning
      outline: "...",      // Bordered
    },
  },
});
```

### Status Naming

```tsx
// ✅ Semantic status names
type TransactionStatus = 
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

// ✅ Status badge mapping
const statusConfig = {
  pending: { variant: "secondary", label: "Pending" },
  processing: { variant: "default", label: "Processing" },
  completed: { variant: "success", label: "Completed" },
  failed: { variant: "destructive", label: "Failed" },
};
```

---

## Directory Structure

### Feature-Based Organization

```
client/
├── components/
│   ├── ui/                    # Shared primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   ├── dashboard/             # Dashboard feature
│   │   ├── dashboard-cards.tsx
│   │   ├── dashboard-content.tsx
│   │   └── header.tsx
│   ├── transactions/          # Transactions feature
│   │   ├── transactions-table.tsx
│   │   ├── transaction-details-modal.tsx
│   │   └── transactions-content.tsx
│   └── layout/                # Layout components
│       ├── AppLayout.tsx
│       └── scrollable-layout.tsx
├── pages/                     # Route pages
│   ├── Index.tsx
│   ├── Transactions.tsx
│   └── Settings.tsx
├── hooks/                     # Shared hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
└── lib/                       # Utilities
    ├── utils.ts
    └── responsive-utils.ts
```

---

## Import Organization

```tsx
// 1. React imports
import * as React from "react";
import { useState, useEffect } from "react";

// 2. Third-party imports
import { useForm } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";

// 3. Radix UI imports
import * as DialogPrimitive from "@radix-ui/react-dialog";

// 4. Internal absolute imports
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// 5. Internal relative imports (same feature)
import { TransactionRow } from "./transaction-row";

// 6. Types (at the end of imports)
import type { Transaction } from "@/types";
```
