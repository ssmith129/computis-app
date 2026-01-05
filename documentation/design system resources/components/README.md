# Component Library Overview

> Complete catalog of UI components for Computis, optimized for Builder.io Fusion AI generation.

## Component Categories

### 1. Primitives (Base Components)
Low-level, reusable UI building blocks from Radix UI + shadcn/ui patterns.

| Component | File | Description |
|-----------|------|-------------|
| [Button](./primitives/button.md) | `button.tsx` | Primary action triggers |
| [Input](./primitives/input.md) | `input.tsx` | Text input fields |
| [Card](./primitives/card.md) | `card.tsx` | Content containers |
| [Badge](./primitives/badge.md) | `badge.tsx` | Status indicators |
| [Table](./primitives/table.md) | `table.tsx` | Data tables |
| [Select](./primitives/select.md) | `select.tsx` | Dropdown selection |
| [Dialog](./primitives/dialog.md) | `dialog.tsx` | Modal dialogs |
| [Tabs](./primitives/tabs.md) | `tabs.tsx` | Tabbed navigation |
| [Checkbox](./primitives/checkbox.md) | `checkbox.tsx` | Boolean inputs |
| [Switch](./primitives/switch.md) | `switch.tsx` | Toggle controls |
| [Tooltip](./primitives/tooltip.md) | `tooltip.tsx` | Hover information |
| [Progress](./primitives/progress.md) | `progress.tsx` | Progress indicators |
| [Skeleton](./primitives/skeleton.md) | `skeleton.tsx` | Loading placeholders |
| [Alert](./primitives/alert.md) | `alert.tsx` | Alert messages |
| [Separator](./primitives/separator.md) | `separator.tsx` | Visual dividers |

### 2. Enhanced Components
Extended versions with additional features like loading states, validation, and tooltips.

| Component | File | Description |
|-----------|------|-------------|
| [EnhancedButton](./primitives/enhanced-button.md) | `enhanced-button.tsx` | Button with loading, tooltip, badge |
| [EnhancedInput](./primitives/enhanced-input.md) | `enhanced-input.tsx` | Input with validation, icons |

### 3. Composite Components
Complex components built from multiple primitives.

| Component | Description |
|-----------|-------------|
| [Loading States](./composite/loading-states.md) | Skeleton, spinner, error states |
| [DataTable](./composite/data-table.md) | Sortable, filterable tables |
| [Dashboard Card](./composite/dashboard-card.md) | Metric display cards |
| [Form Field](./composite/form-field.md) | Label + input + error |

### 4. Layout Components
Page structure and navigation components.

| Component | File | Description |
|-----------|------|-------------|
| Sidebar | `sidebar.tsx` | Navigation sidebar |
| Sheet | `sheet.tsx` | Slide-out panels |
| Drawer | `drawer.tsx` | Bottom/side drawers |
| ScrollArea | `scroll-area.tsx` | Custom scroll containers |

---

## Component Architecture

### Import Pattern
```tsx
// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Utility
import { cn } from "@/lib/utils";

// Icons
import { ChevronDown, Loader2 } from "lucide-react";
```

### Composition Pattern
```tsx
// Cards are composed from sub-components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Ref Forwarding
All components use `React.forwardRef`:
```tsx
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("base-styles", className)} {...props} />
  )
);
Component.displayName = "Component";
```

---

## Styling Conventions

### Base Styles
```tsx
// Always use cn() for className merging
className={cn(
  "base-styles-that-always-apply",
  variant === "special" && "conditional-styles",
  className // User-provided classes last
)}
```

### Interactive States
```tsx
// Standard interactive state pattern
"transition-colors"
"hover:bg-accent hover:text-accent-foreground"
"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
"disabled:pointer-events-none disabled:opacity-50"
```

### Size Patterns
```tsx
// Standard height scale
"h-9"   // Small
"h-10"  // Default
"h-11"  // Large (touch-friendly)
"h-12"  // Extra large
```

---

## Common Props Interface

### Base HTML Attributes
```tsx
// Extend native HTML attributes
interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props
}

// For specific elements
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
```

### Variant Props (with CVA)
```tsx
import { VariantProps } from "class-variance-authority";

interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // Additional custom props
}
```

### asChild Pattern (Radix Slot)
```tsx
import { Slot } from "@radix-ui/react-slot";

interface Props {
  asChild?: boolean;
}

const Comp = asChild ? Slot : "button";
```

---

## Quick Component Usage Examples

### Button
```tsx
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>
```

### Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Input
```tsx
<Input type="text" placeholder="Enter text..." />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input disabled placeholder="Disabled" />
```

### Table
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
      <TableHead>Column 2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data 1</TableCell>
      <TableCell>Data 2</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Select
```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Dialog
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    <div>Dialog content</div>
    <DialogFooter>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## Component Index by Feature

### Form Components
- Input, EnhancedInput
- Select
- Checkbox
- Switch
- RadioGroup
- Textarea, EnhancedTextarea
- Form (react-hook-form integration)

### Feedback Components
- Alert
- Badge
- Toast, Toaster
- Progress
- Skeleton
- Loading States

### Navigation Components
- Tabs
- Navigation Menu
- Breadcrumb
- Pagination
- Sidebar

### Overlay Components
- Dialog
- Sheet
- Drawer
- Popover
- Dropdown Menu
- Context Menu
- Alert Dialog
- Tooltip
- Hover Card

### Data Display
- Table
- Card
- Avatar
- Badge
- Separator

### Layout Components
- ScrollArea
- Collapsible
- Accordion
- Resizable

---

*For detailed documentation on each component, see the individual markdown files in the `primitives/` and `composite/` directories.*
