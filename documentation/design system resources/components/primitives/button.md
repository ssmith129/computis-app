# Button Component

> Primary interactive element for triggering actions.

## Import

```tsx
import { Button, buttonVariants } from "@/components/ui/button";
```

## Source File
`client/components/ui/button.tsx`

---

## API Reference

### Props

```tsx
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"default"` | Visual style variant |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | Button size |
| `asChild` | `boolean` | `false` | Render as child element (Slot) |
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | - | Additional CSS classes |

---

## Variants

### Visual Variants

```tsx
// Primary action (default)
<Button variant="default">Save Changes</Button>

// Secondary action
<Button variant="secondary">Cancel</Button>

// Outline style
<Button variant="outline">Edit</Button>

// Ghost/transparent
<Button variant="ghost">More Options</Button>

// Destructive/danger
<Button variant="destructive">Delete</Button>

// Link style
<Button variant="link">Learn More</Button>
```

### Size Variants

```tsx
// Default size (h-11)
<Button size="default">Default</Button>

// Small (h-11, less padding)
<Button size="sm">Small</Button>

// Large (h-12)
<Button size="lg">Large</Button>

// Icon only (h-11 w-11)
<Button size="icon">
  <Settings className="h-4 w-4" />
</Button>
```

---

## Usage Examples

### Basic Button
```tsx
<Button onClick={() => handleSave()}>
  Save Changes
</Button>
```

### With Icon
```tsx
import { Plus } from "lucide-react";

<Button>
  <Plus className="h-4 w-4 mr-1" />
  Add Item
</Button>
```

### Loading State
```tsx
import { Loader2 } from "lucide-react";

<Button disabled>
  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
  Saving...
</Button>
```

### Icon-Only Button
```tsx
import { Settings } from "lucide-react";

<Button size="icon" variant="ghost" aria-label="Settings">
  <Settings className="h-4 w-4" />
</Button>
```

### As Link (asChild)
```tsx
import { Link } from "wouter";

<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

### Button Group
```tsx
<div className="flex gap-2">
  <Button variant="outline">Cancel</Button>
  <Button>Submit</Button>
</div>
```

---

## Styling Details

### Base Styles
```css
inline-flex items-center justify-center gap-0
whitespace-nowrap rounded-md
text-sm font-medium
ring-offset-background transition-colors
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
disabled:pointer-events-none disabled:opacity-50
[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:mr-1
```

### Variant Styles

| Variant | Background | Text | Hover |
|---------|------------|------|-------|
| default | `bg-primary` | `text-primary-foreground` | `hover:bg-primary/90` |
| secondary | `bg-secondary` | `text-secondary-foreground` | `hover:bg-secondary/80` |
| outline | `border border-input bg-background` | inherit | `hover:bg-accent hover:text-accent-foreground` |
| ghost | transparent | inherit | `hover:bg-accent hover:text-accent-foreground` |
| destructive | `bg-destructive` | `text-destructive-foreground` | `hover:bg-destructive/90` |
| link | transparent | `text-primary` | `hover:underline` |

### Size Styles

| Size | Height | Padding | Border Radius |
|------|--------|---------|---------------|
| default | `h-11` | `px-4 py-2` | `rounded-md` |
| sm | `h-11` | `px-3` | `rounded-md` |
| lg | `h-12` | `px-8` | `rounded-md` |
| icon | `h-11 w-11` | none | `rounded-md` |

---

## Accessibility

### Required Attributes

```tsx
// Icon-only buttons MUST have aria-label
<Button size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// Loading state should indicate loading
<Button disabled aria-busy="true">
  <Loader2 className="animate-spin" />
  Loading...
</Button>
```

### Keyboard Support
- `Enter` or `Space` activates the button
- Focus visible ring for keyboard navigation
- Tab navigable

### Screen Reader
```tsx
// For icon-only, include sr-only text
<Button size="icon" aria-label="Settings">
  <Settings className="h-4 w-4" />
  <span className="sr-only">Settings</span>
</Button>
```

---

## AI Generation Rules

### DO ✅
```tsx
// Use semantic variants
<Button variant="destructive">Delete Account</Button>

// Include loading states
<Button disabled={isLoading}>
  {isLoading && <Loader2 className="animate-spin mr-2" />}
  {isLoading ? "Saving..." : "Save"}
</Button>

// Proper aria-labels for icons
<Button size="icon" aria-label="Edit item">
  <Pencil className="h-4 w-4" />
</Button>
```

### DON'T ❌
```tsx
// Don't use hardcoded colors
<Button className="bg-blue-500">Wrong</Button>

// Don't skip loading feedback
<Button disabled>Submit</Button> // No visual feedback

// Don't forget aria-label on icon buttons
<Button size="icon">
  <X className="h-4 w-4" /> // Missing aria-label!
</Button>
```

---

## Complete Implementation

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-0 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:mr-1",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-11 rounded-md px-3",
        lg: "h-12 rounded-md px-8",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```
