# Card Component

> Container for grouping related content and actions.

## Import

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
```

## Source File
`client/components/ui/card.tsx`

---

## Sub-Components

| Component | Purpose | Default Styles |
|-----------|---------|----------------|
| `Card` | Outer container | `rounded-lg border bg-card shadow-sm` |
| `CardHeader` | Title/description container | `flex flex-col space-y-1.5 p-6` |
| `CardTitle` | Main heading | `text-2xl font-semibold leading-none tracking-tight` |
| `CardDescription` | Subtitle/description | `text-sm text-muted-foreground` |
| `CardContent` | Main content area | `p-6 pt-0` |
| `CardFooter` | Actions/buttons area | `flex items-center p-6 pt-0` |

---

## Usage Examples

### Basic Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
</Card>
```

### Card with Footer
```tsx
<Card>
  <CardHeader>
    <CardTitle>Create Account</CardTitle>
    <CardDescription>Enter your details below.</CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      <Input placeholder="Email" />
    </form>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Submit</Button>
  </CardFooter>
</Card>
```

### Metric Card (Dashboard)
```tsx
<Card>
  <CardContent className="p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Total Revenue
        </p>
        <p className="text-2xl font-bold">$45,231.89</p>
      </div>
      <DollarSign className="h-4 w-4 text-muted-foreground" />
    </div>
    <p className="text-xs text-muted-foreground mt-2">
      +20.1% from last month
    </p>
  </CardContent>
</Card>
```

### Interactive Card
```tsx
<Card className="cursor-pointer hover:border-primary transition-colors">
  <CardHeader>
    <CardTitle>Clickable Card</CardTitle>
  </CardHeader>
</Card>
```

### Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

### Card with Chart
```tsx
<Card>
  <CardHeader>
    <CardTitle>Portfolio Performance</CardTitle>
    <CardDescription>Last 30 days</CardDescription>
  </CardHeader>
  <CardContent>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        {/* Chart components */}
      </LineChart>
    </ResponsiveContainer>
  </CardContent>
</Card>
```

### Status Card
```tsx
<Card className="border-l-4 border-l-status-success">
  <CardContent className="p-4">
    <div className="flex items-center gap-2">
      <CheckCircle className="h-5 w-5 text-status-success" />
      <span className="font-medium">All Systems Operational</span>
    </div>
  </CardContent>
</Card>
```

---

## Styling Variations

### Compact Card
```tsx
<Card className="p-0">
  <CardContent className="p-4">
    Compact content
  </CardContent>
</Card>
```

### Elevated Card
```tsx
<Card className="shadow-lg">
  {/* More prominent shadow */}
</Card>
```

### Borderless Card
```tsx
<Card className="border-0 shadow-none bg-transparent">
  {/* No visual container */}
</Card>
```

### Full-width Card
```tsx
<Card className="w-full">
  {/* Takes full width of parent */}
</Card>
```

---

## Accessibility

### Semantic Structure
```tsx
// Use proper heading hierarchy
<Card>
  <CardHeader>
    <CardTitle as="h2">Section Title</CardTitle>
  </CardHeader>
</Card>
```

### Interactive Cards
```tsx
// Make clickable cards keyboard accessible
<Card 
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  className="cursor-pointer focus-visible:ring-2 focus-visible:ring-ring"
>
  {/* Content */}
</Card>
```

### Linked Cards
```tsx
// Wrap entire card in link for navigation
<Link href="/details">
  <Card className="hover:border-primary transition-colors">
    <CardHeader>
      <CardTitle>View Details</CardTitle>
    </CardHeader>
  </Card>
</Link>
```

---

## AI Generation Rules

### DO ✅
```tsx
// Use consistent padding
<CardHeader>
  <CardTitle>Title</CardTitle>
</CardHeader>
<CardContent>Content</CardContent> // pt-0 removes top padding

// Use CardDescription for subtitles
<CardHeader>
  <CardTitle>Title</CardTitle>
  <CardDescription>Subtitle here</CardDescription>
</CardHeader>

// Use semantic colors
<Card className="border-l-4 border-l-status-warning">
```

### DON'T ❌
```tsx
// Don't add redundant padding
<CardContent className="p-6 pt-6"> // pt-0 is intentional

// Don't skip CardHeader structure
<Card>
  <div className="p-6">
    <h3>Title</h3> // Should use CardHeader + CardTitle
  </div>
</Card>

// Don't use hardcoded colors
<Card className="border-blue-500">
```

---

## Complete Implementation

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
```
