# AI Code Generation Patterns

> Comprehensive guide for Builder.io Fusion AI to generate consistent, high-quality code for Computis.

## 🎯 Overview

This document provides specific patterns, templates, and rules that AI code generators should follow when creating components, pages, and features for the Computis application.

---

## 📋 Component Generation Template

### Standard Component Template

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

// 1. Define Props Interface
export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Primary content */
  children?: React.ReactNode;
  /** Visual variant */
  variant?: "default" | "secondary" | "outline";
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

// 2. Define Component with forwardRef
const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  (
    {
      className,
      children,
      variant = "default",
      size = "md",
      loading = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "base-classes-here",
          // Variant styles
          variant === "default" && "default-variant-classes",
          variant === "secondary" && "secondary-variant-classes",
          // Size styles
          size === "sm" && "small-size-classes",
          size === "lg" && "large-size-classes",
          // State styles
          loading && "loading-state-classes",
          disabled && "disabled-state-classes",
          // Custom className last
          className
        )}
        aria-busy={loading}
        aria-disabled={disabled}
        {...props}
      >
        {loading ? <LoadingSpinner /> : children}
      </div>
    );
  }
);

// 3. Set displayName
ComponentName.displayName = "ComponentName";

// 4. Export
export { ComponentName };
```

### CVA Variant Template

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva(
  // Base styles (always applied)
  "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    />
  )
);
ComponentName.displayName = "ComponentName";

export { ComponentName, componentVariants };
```

---

## 🎨 Styling Patterns

### Color Usage

```tsx
// ✅ CORRECT: Use semantic color tokens
"bg-primary"
"text-primary-foreground"
"bg-secondary"
"text-muted-foreground"
"border-border"
"bg-destructive"
"bg-card"

// ✅ Status colors
"text-status-success"
"bg-status-warning"
"border-status-error"
"text-status-info"

// ❌ WRONG: Never use hardcoded Tailwind colors
"bg-blue-500"
"text-gray-600"
"border-red-500"
```

### Opacity Modifiers

```tsx
// ✅ Use opacity for hover/variants
"bg-primary/90"        // 90% opacity
"hover:bg-primary/80"  // 80% on hover
"bg-muted/50"          // 50% muted background
```

### Focus States

```tsx
// ✅ Standard focus pattern
"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

// ✅ Ring offset with background
"ring-offset-background"
```

### Disabled States

```tsx
// ✅ Standard disabled pattern
"disabled:pointer-events-none disabled:opacity-50"
"disabled:cursor-not-allowed"

// ✅ ARIA integration
<button disabled aria-disabled="true">
```

### Transitions

```tsx
// ✅ Smooth color transitions
"transition-colors"

// ✅ All property transitions
"transition-all duration-200"

// ✅ Specific transitions
"transition-transform duration-300 ease-in-out"
```

---

## 📐 Layout Patterns

### Container Pattern
```tsx
<div className="container mx-auto px-4 md:px-6 lg:px-8">
  {/* Page content */}
</div>
```

### Page Layout
```tsx
<div className="app-content">
  <div className="p-4 md:p-6 space-y-6">
    {/* Page header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Page Title</h1>
        <p className="text-sm text-muted-foreground">Page description</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">Secondary</Button>
        <Button>Primary Action</Button>
      </div>
    </div>
    
    {/* Page content */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Content sections */}
    </div>
  </div>
</div>
```

### Card Grid
```tsx
// ✅ Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
  {items.map(item => <Card key={item.id}>...</Card>)}
</div>

// ✅ Auto-fit grid
<div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
```

### Flex Layouts
```tsx
// ✅ Responsive row to column
<div className="flex flex-col md:flex-row gap-4">

// ✅ Space between items
<div className="flex items-center justify-between">

// ✅ Centered content
<div className="flex items-center justify-center min-h-[200px]">
```

---

## 🔤 Typography Patterns

### Headings
```tsx
// Page title
<h1 className="text-2xl font-semibold leading-none tracking-tight">

// Section title
<h2 className="text-lg font-semibold leading-none tracking-tight">

// Card title
<h3 className="text-sm font-medium text-muted-foreground">
```

### Body Text
```tsx
// Primary text
<p className="text-sm">

// Secondary/muted text
<p className="text-sm text-muted-foreground">

// Small/help text
<p className="text-xs text-muted-foreground">
```

### Numbers and Data
```tsx
// Monetary values
<span className="font-mono text-lg font-bold">$12,345.67</span>

// Percentages
<span className="font-mono text-sm">+12.5%</span>

// IDs/Addresses
<span className="font-mono text-xs">0x1234...5678</span>
```

---

## 📝 Form Patterns

### Form Field Template
```tsx
<div className="space-y-2">
  <label htmlFor="field-id" className="text-sm font-medium">
    Field Label
    {required && <span className="text-destructive ml-1">*</span>}
  </label>
  <Input
    id="field-id"
    type="text"
    placeholder="Placeholder text"
    aria-describedby={error ? "field-error" : "field-help"}
    aria-invalid={error ? "true" : "false"}
  />
  {error ? (
    <p id="field-error" className="text-sm text-destructive" role="alert">
      {error}
    </p>
  ) : (
    <p id="field-help" className="text-sm text-muted-foreground">
      Helper text
    </p>
  )}
</div>
```

### Form Layout
```tsx
<form onSubmit={handleSubmit} className="space-y-6">
  {/* Form fields */}
  <div className="space-y-4">
    {/* Field 1 */}
    {/* Field 2 */}
  </div>
  
  {/* Form actions */}
  <div className="flex justify-end gap-2">
    <Button type="button" variant="outline" onClick={handleCancel}>
      Cancel
    </Button>
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin mr-2" />
          Saving...
        </>
      ) : (
        "Save"
      )}
    </Button>
  </div>
</form>
```

### Select Field
```tsx
<div className="space-y-2">
  <label htmlFor="select-field" className="text-sm font-medium">
    Select Option
  </label>
  <Select onValueChange={handleChange} defaultValue={defaultValue}>
    <SelectTrigger id="select-field">
      <SelectValue placeholder="Select..." />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
    </SelectContent>
  </Select>
</div>
```

---

## 🔄 Loading States

### Button Loading
```tsx
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
      Loading...
    </>
  ) : (
    "Submit"
  )}
</Button>
```

### Page Loading
```tsx
<div className="flex items-center justify-center min-h-[400px]">
  <div className="flex flex-col items-center gap-4">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <p className="text-sm text-muted-foreground">Loading...</p>
  </div>
</div>
```

### Skeleton Loading
```tsx
<Card>
  <CardHeader>
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-4 w-2/3" />
  </CardHeader>
  <CardContent className="space-y-4">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-4/5" />
    <Skeleton className="h-4 w-3/5" />
  </CardContent>
</Card>
```

---

## ⚠️ Error States

### Error Message
```tsx
<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
  <div className="flex items-start gap-3">
    <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
    <div>
      <h3 className="font-medium text-destructive">Error Title</h3>
      <p className="text-sm text-destructive/80 mt-1">
        Error description with details.
      </p>
    </div>
  </div>
</div>
```

### Empty State
```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <div className="p-4 bg-muted rounded-full mb-4">
    <InboxIcon className="h-8 w-8 text-muted-foreground" />
  </div>
  <h3 className="text-lg font-semibold mb-2">No items found</h3>
  <p className="text-sm text-muted-foreground max-w-sm mb-4">
    Get started by creating your first item.
  </p>
  <Button>
    <Plus className="h-4 w-4 mr-2" />
    Create Item
  </Button>
</div>
```

---

## 🎯 CRITICAL Rules for AI Generation

### ALWAYS DO ✅

1. **Use TypeScript** with proper interfaces
2. **Use `cn()`** for all className merging
3. **Use `React.forwardRef`** for all components
4. **Set `displayName`** on all components
5. **Use semantic color tokens** (bg-primary, not bg-blue-500)
6. **Include ARIA attributes** for accessibility
7. **Handle all states** (loading, error, empty, disabled)
8. **Use mobile-first** responsive design
9. **Add focus-visible** styles for keyboard navigation

### NEVER DO ❌

1. **Never use hardcoded colors** (no bg-blue-500, text-gray-600)
2. **Never skip accessibility** (always include aria-labels, roles)
3. **Never use inline styles** except for dynamic values
4. **Never use `any` type** in TypeScript
5. **Never skip loading/error states**
6. **Never forget displayName** on forwardRef components
7. **Never use non-semantic HTML** (use button for buttons, not div)
8. **Never skip focus states** for interactive elements

---

## 📦 Import Conventions

### Standard Component Imports
```tsx
// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Utility
import { cn } from "@/lib/utils";

// Icons (Lucide)
import { 
  Loader2, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  X, 
  AlertCircle,
  Settings,
  Search,
  Filter
} from "lucide-react";

// Hooks
import { useState, useEffect, useCallback, useMemo } from "react";
```

---

*This guide should be referenced by Builder.io Fusion AI for every code generation task.*
