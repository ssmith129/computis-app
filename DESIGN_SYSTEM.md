# Computis Design System

A comprehensive design system for crypto tax preparation applications, built with React, TypeScript, and Tailwind CSS.

## 🎨 Design Principles

### 1. **Accessibility First**
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

### 2. **Responsive Design**
- Mobile-first approach
- Breakpoint-based design
- Fluid typography and spacing
- Touch-friendly interactions

### 3. **Performance Optimized**
- Lightweight components
- Lazy loading support
- Efficient state management
- Optimized bundle size

### 4. **Developer Experience**
- TypeScript support
- Comprehensive prop interfaces
- Consistent API design
- Extensive documentation

## 🏗️ Architecture

### Component Structure
```
components/
├── ui/                     # Base UI components
│   ├── button.tsx
│   ├── enhanced-button.tsx # Enhanced with states & accessibility
│   ├── input.tsx
│   ├── enhanced-input.tsx  # Enhanced with validation & accessibility
│   ├── loading-states.tsx  # Loading, empty, error states
│   └── ...
├── dashboard/             # Dashboard-specific components
├── transactions/          # Transaction-related components
├── data-anomaly-detection/ # Anomaly detection components
└── ...
```

### Utility Structure
```
lib/
├── accessibility-utils.ts  # Accessibility helpers
├── responsive-utils.ts     # Responsive design utilities
└── utils.ts               # General utilities
```

## 📱 Responsive Breakpoints

```typescript
export const breakpoints = {
  sm: 640,   // Mobile landscape
  md: 768,   // Tablet portrait
  lg: 1024,  // Tablet landscape / Small desktop
  xl: 1280,  // Desktop
  "2xl": 1536, // Large desktop
}
```

## 🎯 Component Categories

### 1. **Base Components**

#### Button
Enhanced button component with multiple variants and states.

```tsx
import { EnhancedButton } from "@/components/ui/enhanced-button";

<EnhancedButton 
  variant="default" 
  size="md"
  loading={isLoading}
  loadingText="Processing..."
  leftIcon={<Save />}
  tooltip="Save changes"
>
  Save
</EnhancedButton>
```

**Variants:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `success`, `warning`
**Sizes:** `sm`, `default`, `lg`, `icon`
**States:** `loading`, `disabled`, `hover`, `focus`, `active`

#### Input
Enhanced input component with validation and accessibility features.

```tsx
import { EnhancedInput } from "@/components/ui/enhanced-input";

<EnhancedInput
  label="Email Address"
  description="Enter your work email"
  error="Invalid email format"
  required
  showPasswordToggle={type === "password"}
  leftIcon={<Mail />}
/>
```

**Variants:** `default`, `error`, `success`, `warning`
**Features:** Validation states, password toggle, icons, loading state

### 2. **Layout Components**

#### Responsive Grid
```tsx
import { responsiveGridClasses } from "@/lib/responsive-utils";

<div className={responsiveGridClasses.dashboard}>
  {/* 1 col mobile, 2 col tablet, 4 col desktop */}
</div>
```

#### Container
```tsx
import { getResponsiveContainer } from "@/lib/responsive-utils";

<div className={getResponsiveContainer("page")}>
  {/* Responsive page container */}
</div>
```

### 3. **State Components**

#### Loading States
```tsx
import { 
  PageLoading, 
  TableLoadingSkeleton, 
  SpinnerLoading 
} from "@/components/ui/loading-states";

// Full page loading
<PageLoading />

// Table loading
<TableLoadingSkeleton rows={5} columns={6} />

// Inline spinner
<SpinnerLoading size="md" text="Loading..." />
```

#### Empty States
```tsx
import { EmptyState } from "@/components/ui/loading-states";

<EmptyState
  icon={FileText}
  title="No transactions found"
  description="Upload your first transaction file to get started"
  action={<Button>Upload File</Button>}
/>
```

#### Error States
```tsx
import { ErrorState } from "@/components/ui/loading-states";

<ErrorState
  title="Failed to load data"
  description="Please check your connection and try again"
  onRetry={() => refetch()}
/>
```

## 🎮 Interactive States

### Button States
- **Default**: Base appearance
- **Hover**: Slight elevation and color change
- **Focus**: Ring outline for keyboard navigation
- **Active**: Pressed appearance with scale transform
- **Loading**: Spinner with disabled state
- **Disabled**: Reduced opacity and no interactions

### Input States
- **Default**: Clean border and background
- **Focus**: Ring outline and border color change
- **Error**: Red border and error message
- **Success**: Green border and success message
- **Warning**: Yellow border and warning message
- **Disabled**: Reduced opacity

## ♿ Accessibility Features

### Keyboard Navigation
```tsx
import { useKeyboardNavigation } from "@/lib/accessibility-utils";

const { handleKeyDown } = useKeyboardNavigation(items, {
  orientation: "vertical",
  loop: true,
  onActivate: (index) => selectItem(index),
  onEscape: () => closeMenu(),
});
```

### Focus Management
```tsx
import { useFocusManagement } from "@/lib/accessibility-utils";

const { trapFocus, restoreFocus } = useFocusManagement();

// Trap focus in modal
useEffect(() => {
  if (isOpen && modalRef.current) {
    const cleanup = trapFocus(modalRef.current);
    return cleanup;
  }
}, [isOpen]);
```

### Screen Reader Support
```tsx
import { useScreenReaderAnnouncement } from "@/lib/accessibility-utils";

const { announce } = useScreenReaderAnnouncement();

// Announce form submission
const handleSubmit = () => {
  announce("Form submitted successfully", "polite");
};
```

### ARIA Utilities
```tsx
import { aria } from "@/lib/accessibility-utils";

<button 
  {...aria.expanded(isOpen)}
  {...aria.controls("menu-id")}
  {...aria.label("Open menu")}
>
  Menu
</button>
```

## 📱 Responsive Patterns

### Mobile-First Design
All components are designed mobile-first and scale up:

```tsx
// ❌ Desktop-first (avoid)
<div className="grid-cols-4 md:grid-cols-2 sm:grid-cols-1">

// ✅ Mobile-first (preferred)
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

### Responsive Utilities
```tsx
import { 
  useIsMobile, 
  useIsTablet, 
  useIsDesktop,
  responsiveText,
  responsiveFlex 
} from "@/lib/responsive-utils";

const isMobile = useIsMobile();

// Responsive text
<h1 className={responsiveText.pageTitle}>Title</h1>

// Responsive flex layout
<div className={responsiveFlex.betweenStack}>
  <div>Left content</div>
  <div>Right content</div>
</div>
```

### Table Responsiveness
```tsx
// Horizontal scroll on mobile
<div className="overflow-x-auto">
  <Table>
    {/* Table content */}
  </Table>
</div>

// Hide columns on mobile
<TableCell className="hidden md:table-cell">
  Desktop only content
</TableCell>
```

## 🎨 Color System

### Primary Colors
- **Primary**: Used for main actions and brand elements
- **Secondary**: Used for secondary actions and backgrounds
- **Accent**: Used for highlights and interactive elements

### Semantic Colors
- **Success**: Green variants for positive actions
- **Warning**: Yellow/orange variants for caution
- **Error**: Red variants for errors and destructive actions
- **Info**: Blue variants for informational content

### Usage in Components
```tsx
// Using semantic variants
<Button variant="success">Save</Button>
<Button variant="warning">Caution</Button>
<Button variant="destructive">Delete</Button>

// Using in custom components
<Alert className="border-green-200 bg-green-50 text-green-700">
  Success message
</Alert>
```

## 📊 Data Visualization

### Dashboard Cards
```tsx
<Card className="hover:shadow-lg transition-shadow">
  <CardContent className="p-4">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <Icon className="h-5 w-5 text-primary" />
    </div>
  </CardContent>
</Card>
```

### Progress Indicators
```tsx
import { Progress } from "@/components/ui/progress";

<Progress value={75} className="h-2" />
```

### Status Badges
```tsx
<Badge variant="secondary" className="bg-green-100 text-green-700">
  Active
</Badge>
```

## 🔄 Animation Guidelines

### Transition Timing
- **Fast**: 150ms for hover states
- **Normal**: 200ms for general transitions
- **Slow**: 300ms for complex animations

### Easing Functions
- **Default**: `ease-in-out` for most transitions
- **Enter**: `ease-out` for elements appearing
- **Exit**: `ease-in` for elements disappearing

### Reduced Motion
Always respect user preferences:

```tsx
import { useReducedMotion } from "@/lib/accessibility-utils";

const prefersReducedMotion = useReducedMotion();

<div className={cn(
  "transition-all duration-200",
  prefersReducedMotion && "transition-none"
)}>
```

## 🧪 Testing Guidelines

### Component Testing
```tsx
// Test all interactive states
test("button handles loading state", () => {
  render(<Button loading>Submit</Button>);
  expect(screen.getByRole("button")).toBeDisabled();
  expect(screen.getByTestId("spinner")).toBeInTheDocument();
});

// Test accessibility
test("button has proper ARIA attributes", () => {
  render(<Button aria-label="Save document">Save</Button>);
  expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Save document");
});
```

### Responsive Testing
```tsx
// Test different viewport sizes
test("navigation adapts to mobile", () => {
  global.innerWidth = 640;
  global.dispatchEvent(new Event('resize'));
  
  render(<Navigation />);
  expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
});
```

## 📚 Usage Examples

### Form with Validation
```tsx
<form className={responsiveForm.fieldGroup}>
  <EnhancedInput
    label="Email"
    type="email"
    required
    error={errors.email}
    leftIcon={<Mail />}
  />
  
  <EnhancedInput
    label="Password"
    type="password"
    required
    showPasswordToggle
    error={errors.password}
  />
  
  <div className={responsiveForm.actions}>
    <Button variant="outline" type="button">
      Cancel
    </Button>
    <EnhancedButton 
      type="submit" 
      loading={isSubmitting}
      loadingText="Signing in..."
    >
      Sign In
    </EnhancedButton>
  </div>
</form>
```

### Data Table with States
```tsx
<Card>
  <CardContent className="p-0">
    {loading ? (
      <TableLoadingSkeleton rows={5} columns={4} />
    ) : data.length === 0 ? (
      <EmptyState
        icon={FileText}
        title="No transactions"
        description="Upload your first file to get started"
        action={<Button>Upload File</Button>}
      />
    ) : error ? (
      <ErrorState 
        title="Failed to load transactions"
        onRetry={() => refetch()}
      />
    ) : (
      <Table>
        {/* Table content */}
      </Table>
    )}
  </CardContent>
</Card>
```

### Responsive Dashboard Layout
```tsx
<div className={getResponsiveContainer("page")}>
  <div className={responsiveSpacing.section}>
    {/* Header */}
    <div className={responsiveFlex.betweenStack}>
      <h1 className={responsiveText.pageTitle}>Dashboard</h1>
      <Button>Add New</Button>
    </div>
    
    {/* Metrics Cards */}
    <div className={responsiveGridClasses.dashboard}>
      {metrics.map(metric => (
        <MetricCard key={metric.id} {...metric} />
      ))}
    </div>
    
    {/* Main Content */}
    <div className={responsiveGridClasses.twoColumn}>
      <Card>Chart</Card>
      <Card>Recent Activity</Card>
    </div>
  </div>
</div>
```

## 🔧 Development Guidelines

### Component Naming
- Use PascalCase for component names
- Prefix enhanced components with "Enhanced"
- Use descriptive names that indicate purpose

### Prop Design
- Always provide TypeScript interfaces
- Use semantic prop names
- Provide sensible defaults
- Support all common HTML attributes

### File Organization
- Group related components in folders
- Co-locate component-specific utilities
- Separate base components from composed components
- Keep documentation close to implementation

## 🚀 Performance Considerations

### Bundle Size
- Use tree-shaking friendly imports
- Lazy load heavy components
- Optimize SVG icons
- Minimize CSS output

### Runtime Performance
- Use React.memo for expensive components
- Optimize re-renders with proper dependency arrays
- Use CSS transforms for animations
- Implement virtualization for large lists

## 📝 Contributing

When adding new components:

1. **Follow accessibility guidelines**
2. **Support responsive design**
3. **Include all interactive states**
4. **Provide TypeScript interfaces**
5. **Add comprehensive documentation**
6. **Include usage examples**
7. **Test on multiple devices**

## 🔗 Related Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
