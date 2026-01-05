# AI Generation Guidelines

This document provides structured guidelines for Builder.io Fusion AI to generate consistent, high-quality code for the Computis application.

## Quick Reference

### Essential Rules

1. ✅ Use TypeScript with proper interfaces
2. ✅ Use CSS custom properties via Tailwind
3. ✅ Import `cn()` for className merging
4. ✅ Follow mobile-first responsive design
5. ✅ Include ARIA attributes for accessibility
6. ✅ Use Radix UI primitives for complex interactions
7. ❌ Never hardcode color values
8. ❌ Never use inline styles for theming
9. ❌ Never skip focus states on interactive elements

## File Organization

```
client/
├── components/
│   ├── ui/              # Primitive components (button, input, etc.)
│   ├── dashboard/       # Dashboard-specific components
│   ├── transactions/    # Transaction module components
│   ├── layout/          # Layout components
│   └── [module]/        # Module-specific components
├── pages/               # Page components (route-level)
├── hooks/               # Custom React hooks
└── lib/                 # Utilities and helpers
```

---

## Naming Conventions

See `naming-conventions.md` for detailed rules.

### Quick Reference

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `DashboardCard.tsx` |
| Hooks | camelCase with `use` prefix | `useMobile.tsx` |
| Utilities | kebab-case | `responsive-utils.ts` |
| CSS | kebab-case | `global.css` |
| Props Interface | `ComponentNameProps` | `ButtonProps` |
| Variants | Descriptive names | `variant="destructive"` |

---

## Code Patterns

### Component Template

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Description of prop */
  variant?: "default" | "alternate";
  /** Another prop */
  isActive?: boolean;
}

const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, variant = "default", isActive, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "flex items-center rounded-md",
          // Variant styles
          variant === "default" && "bg-background",
          variant === "alternate" && "bg-secondary",
          // State styles
          isActive && "ring-2 ring-primary",
          // Allow override
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

### With CVA (Class Variance Authority)

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva(
  // Base classes (always applied)
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
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

function Component({ className, variant, size, ...props }: ComponentProps) {
  return (
    <element
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

### Radix UI Integration Pattern

```tsx
import * as React from "react";
import * as PrimitiveName from "@radix-ui/react-primitive-name";
import { cn } from "@/lib/utils";

const Root = PrimitiveName.Root;
const Trigger = PrimitiveName.Trigger;

const Content = React.forwardRef<
  React.ElementRef<typeof PrimitiveName.Content>,
  React.ComponentPropsWithoutRef<typeof PrimitiveName.Content>
>(({ className, ...props }, ref) => (
  <PrimitiveName.Content
    ref={ref}
    className={cn(
      "z-50 rounded-md border bg-popover p-4 shadow-md",
      "animate-in fade-in-0 zoom-in-95",
      className
    )}
    {...props}
  />
));
Content.displayName = PrimitiveName.Content.displayName;

export { Root, Trigger, Content };
```

---

## Styling Guidelines

### Color Usage

```tsx
// ✅ CORRECT - Use CSS variables
<div className="bg-background text-foreground" />
<div className="bg-primary text-primary-foreground" />
<div className="border-border" />
<div className="text-muted-foreground" />

// ❌ WRONG - Hardcoded colors
<div className="bg-white text-black" />
<div className="bg-[#1570EF]" />
```

### Status Colors

```tsx
// Success
<div className="bg-green-100 text-green-800 border-green-200" />

// Warning
<div className="bg-yellow-100 text-yellow-800 border-yellow-200" />

// Error
<div className="bg-red-100 text-red-800 border-red-200" />

// Info
<div className="bg-blue-50 text-blue-800 border-blue-200" />
```

### Responsive Design

```tsx
// ✅ Mobile-first approach
<div className="
  grid
  grid-cols-1        // Mobile: 1 column
  md:grid-cols-2     // Tablet: 2 columns
  lg:grid-cols-3     // Desktop: 3 columns
  gap-4
"/>

// ✅ Responsive spacing
<div className="
  p-4
  sm:p-6
  lg:p-8
"/>

// ✅ Responsive text
<h1 className="
  text-xl
  sm:text-2xl
  lg:text-3xl
"/>
```

### Touch Targets

```tsx
// ✅ Minimum 44x44px touch targets
<Button size="default" /> // h-11 = 44px
<Button size="icon" />    // h-11 w-11 = 44x44px

// ✅ Using touch-target utility
<button className="touch-target">
  <Icon />
</button>
```

---

## Accessibility Requirements

See `accessibility.md` for comprehensive guidelines.

### Required Patterns

```tsx
// ✅ Keyboard navigation
<button
  onClick={handleClick}
  onKeyDown={(e) => e.key === "Enter" && handleClick()}
/>

// ✅ Focus states (built into components)
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

// ✅ Screen reader labels
<button aria-label="Close dialog">
  <X className="h-4 w-4" />
</button>

// ✅ Semantic HTML
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// ✅ Form labels
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" aria-describedby="email-error" />
<p id="email-error" className="text-destructive text-sm">
  Please enter a valid email
</p>
```

### ARIA Attributes

```tsx
// Dialog
<Dialog aria-labelledby="dialog-title" aria-describedby="dialog-description">
  <DialogTitle id="dialog-title">Title</DialogTitle>
  <DialogDescription id="dialog-description">Description</DialogDescription>
</Dialog>

// Loading states
<div aria-busy="true" aria-live="polite">
  <Skeleton />
</div>

// Tabs
<Tabs>
  <TabsList role="tablist">
    <TabsTrigger role="tab" aria-selected="true">Tab 1</TabsTrigger>
  </TabsList>
</Tabs>
```

---

## Performance Guidelines

See `performance.md` for detailed optimization strategies.

### Key Patterns

```tsx
// ✅ Lazy loading for routes
const LazyComponent = React.lazy(() => import("./Component"));

<Suspense fallback={<PageLoading />}>
  <LazyComponent />
</Suspense>

// ✅ Memoization for expensive renders
const MemoizedComponent = React.memo(({ data }) => {
  // Expensive render
});

// ✅ Callback memoization
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);

// ✅ Avoid unnecessary re-renders
const value = useMemo(() => computeExpensive(data), [data]);
```

---

## Common Patterns

### Page Layout

```tsx
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export function PageName() {
  return (
    <DashboardLayout>
      {/* Page title bar */}
      <div className="page-titlebar px-6 py-4">
        <h1 className="text-2xl font-semibold">Page Title</h1>
        <p className="text-muted-foreground">Page description</p>
      </div>
      
      {/* Page content */}
      <div className="app-content p-6 space-y-6">
        {/* Content sections */}
      </div>
    </DashboardLayout>
  );
}
```

### Data Table Page

```tsx
export function TablePage() {
  return (
    <>
      {/* Filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Input placeholder="Search..." className="w-64" />
          <Select>{/* Filter options */}</Select>
        </div>
        <Button>
          <Plus /> Add New
        </Button>
      </div>
      
      {/* Table */}
      <Card>
        <Table>
          <TableHeader>{/* Headers */}</TableHeader>
          <TableBody>{/* Rows */}</TableBody>
        </Table>
      </Card>
      
      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Showing 1-10 of 100
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </>
  );
}
```

### Form Pattern

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

export function FormComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

---

## Do's and Don'ts

### ✅ Do

- Use semantic HTML elements
- Include alt text for images
- Use forwardRef for DOM elements
- Keep components focused and single-purpose
- Use TypeScript interfaces for props
- Add displayName to forwardRef components
- Use CSS variables for theming
- Implement loading and error states

### ❌ Don't

- Hardcode color values
- Use inline styles for theming
- Create deeply nested component trees
- Skip accessibility attributes
- Use any type in TypeScript
- Ignore mobile responsiveness
- Create components without focus states
- Use setTimeout for animations (use CSS/Framer Motion)
