# System-Wide Design Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Design System Specifications](#design-system-specifications)
3. [Component Library](#component-library)
4. [Responsive Design Guidelines](#responsive-design-guidelines)
5. [Integration Patterns](#integration-patterns)
6. [Performance Guidelines](#performance-guidelines)

## Architecture Overview

### Application Structure
```
Crypto Tax Platform
├── Client Application (React/TypeScript)
│   ├── Pages (Route Components)
│   ├── Components (Reusable UI)
│   ├── Hooks (Custom Logic)
│   └── Utils (Helper Functions)
├── API Layer (Serverless Functions)
│   ├── Data Processing
│   ├── File Uploads
│   └── Report Generation
└── Shared (Common Types/Utils)
```

### Component Hierarchy
```
App
├── SidebarProvider
│   ├── DashboardSidebar
│   └── SidebarInset
│       ├── DashboardHeader
│       └── PageContent
│           ├── PageTitlebar
│           └── MainContent
```

### State Management Pattern
- **Local State**: React useState for component-specific data
- **Global State**: React Context for app-wide settings
- **Server State**: TanStack Query for API data management
- **Form State**: React Hook Form for complex forms

## Design System Specifications

### Color System

#### Primary Palette
```css
:root {
  /* Primary Brand Colors */
  --primary: 218 91% 48%;           /* #1e7df0 - Primary Blue */
  --primary-foreground: 0 0% 100%;  /* #ffffff - White Text */
  
  /* Background Colors */
  --background: 0 0% 97%;           /* #f7f7f7 - Light Gray */
  --foreground: 0 0% 10%;           /* #1a1a1a - Dark Text */
  
  /* Surface Colors */
  --card: 0 0% 100%;                /* #ffffff - White Cards */
  --muted: 210 40% 96.1%;           /* #f1f5f9 - Muted Background */
  --muted-foreground: 215.4 16.3% 46.9%; /* #64748b - Muted Text */
}
```

#### Sidebar Color System
```css
:root {
  /* Dark Sidebar Theme */
  --sidebar-background: 0 0% 10%;   /* #1a1a1a - Dark Background */
  --sidebar-foreground: 0 0% 100%;  /* #ffffff - White Text */
  --sidebar-accent: 0 0% 20%;       /* #333333 - Hover States */
  --sidebar-border: 0 0% 20%;       /* #333333 - Borders */
}
```

#### Status Colors
```css
:root {
  /* Status Indicators */
  --status-success: 142 76% 36%;    /* #16a34a - Success Green */
  --status-warning: 32 95% 44%;     /* #f59e0b - Warning Amber */
  --status-error: 0 84% 60%;        /* #ef4444 - Error Red */
  --status-info: 201 96% 32%;       /* #0ea5e9 - Info Blue */
}
```

### Typography System

#### Font Hierarchy
```css
/* Base Typography */
html {
  font-size: clamp(16px, 0.8vw + 12px, 18px);
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Heading Scale */
h1 { font-size: clamp(1.75rem, 1.2rem + 1.2vw, 2.25rem); }
h2 { font-size: clamp(1.5rem, 1.1rem + 0.9vw, 1.875rem); }
h3 { font-size: clamp(1.25rem, 1rem + 0.6vw, 1.5rem); }
h4 { font-size: clamp(1.125rem, 0.95rem + 0.4vw, 1.25rem); }
```

#### Text Styles
- **Body**: 16px (1rem) regular, line-height 1.5
- **Small**: 14px (0.875rem) regular, line-height 1.4
- **Caption**: 12px (0.75rem) regular, line-height 1.3
- **Label**: 14px (0.875rem) medium, line-height 1.2

### Spacing System

#### Base Scale (4px grid)
```css
/* Spacing Scale */
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.25rem;  /* 20px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-10: 2.5rem;  /* 40px */
--spacing-12: 3rem;    /* 48px */
```

#### Layout Dimensions
```css
/* Component Dimensions */
--sidebar-width: 16rem;        /* 256px - Desktop Sidebar */
--sidebar-width-mobile: 18rem; /* 288px - Mobile Sidebar */
--header-height: 4rem;         /* 64px - Header Height */
--touch-target: 2.75rem;       /* 44px - Minimum Touch Target */
```

### Component Specifications

#### Buttons
```css
/* Button Base Styles */
.button-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  white-space: nowrap;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: colors 0.15s ease-in-out;
  
  /* Icon Spacing */
  & svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.25rem;
  }
}

/* Button Sizes */
.button-sm { height: 2.75rem; padding: 0 0.75rem; }
.button-default { height: 2.75rem; padding: 0 1rem; }
.button-lg { height: 3rem; padding: 0 2rem; }
.button-icon { height: 2.75rem; width: 2.75rem; }
```

#### Cards
```css
.card {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid hsl(var(--border));
}

.card-content {
  padding: 1.5rem;
}
```

#### Tables
```css
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.table-header {
  height: 3rem;
  padding: 0 1rem;
  text-align: left;
  font-weight: 500;
  color: hsl(var(--muted-foreground));
}

.table-cell {
  padding: 1rem;
  border-bottom: 1px solid hsl(var(--border));
}
```

## Component Library

### Core Components

#### Layout Components
- **SidebarProvider**: App-wide sidebar state management
- **Sidebar**: Collapsible navigation sidebar
- **SidebarInset**: Main content area with sidebar
- **DashboardHeader**: Top navigation and search
- **PageTitlebar**: Sticky page title section

#### Data Display
- **Table**: Responsive data tables with sorting
- **Card**: Content containers with headers
- **Badge**: Status and category indicators
- **StatusBadge**: Specialized status indicators
- **Progress**: Progress bars and loading states

#### Input Components
- **Button**: Primary, secondary, destructive variants
- **Input**: Text inputs with validation states
- **Select**: Dropdown selection components
- **Checkbox**: Multi-select checkboxes
- **Switch**: Toggle switches for settings

#### Feedback Components
- **Toast**: Success, error, warning notifications
- **Dialog**: Modal dialogs for actions
- **Sheet**: Slide-out panels for forms
- **Alert**: Inline alert messages
- **Loading**: Skeleton and spinner states

#### Navigation
- **Tabs**: Content section navigation
- **Breadcrumb**: Page hierarchy navigation
- **Pagination**: Data table pagination

### Touch & Responsive Components
- **TouchZoomContainer**: Pinch-to-zoom wrapper
- **SwipeHandler**: Swipe gesture detection
- **LongPressButton**: Long-press interactions

## Responsive Design Guidelines

### Breakpoint System
```css
/* Breakpoints */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Mobile-First Approach
1. **Base styles**: Mobile (320px+)
2. **Tablet enhancement**: md (768px+)
3. **Desktop optimization**: lg (1024px+)

### Touch Optimization
- **Minimum touch targets**: 44px × 44px
- **Touch gestures**: Swipe, pinch, long-press
- **Momentum scrolling**: Enabled on scroll containers
- **Visual feedback**: Touch states and animations

### Responsive Patterns

#### Sidebar Behavior
- **Mobile**: Overlay sidebar with backdrop
- **Tablet**: Collapsible sidebar
- **Desktop**: Persistent sidebar with collapse option

#### Data Tables
- **Mobile**: Horizontal scroll with fixed columns
- **Tablet**: Responsive columns with priority
- **Desktop**: Full table layout

#### Forms
- **Mobile**: Single column, full-width inputs
- **Tablet**: Two-column layout for related fields
- **Desktop**: Multi-column with logical grouping

## Integration Patterns

### API Integration
```typescript
// TanStack Query Pattern
const useTransactions = (filters: TransactionFilters) => {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => fetchTransactions(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### Form Integration
```typescript
// React Hook Form Pattern
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
  defaultValues: initialData,
});
```

### Toast Integration
```typescript
// Toast Notification Pattern
import { toast } from "@/hooks/use-toast";

const handleSuccess = () => {
  toast({
    title: "Success",
    description: "Transaction imported successfully",
  });
};
```

### Theme Integration
```typescript
// Dark Mode Support
const { theme, setTheme } = useTheme();

// CSS Custom Properties
document.documentElement.style.setProperty('--custom-color', value);
```

## Performance Guidelines

### Code Splitting
- **Route-based**: Lazy load page components
- **Component-based**: Dynamic imports for heavy components
- **Library splitting**: Separate vendor bundles

### Image Optimization
- **Responsive images**: Multiple sizes with srcset
- **Lazy loading**: Intersection Observer for below-fold images
- **WebP format**: Modern format with fallbacks

### Bundle Optimization
- **Tree shaking**: Remove unused code
- **Compression**: Gzip/Brotli compression
- **Caching**: Long-term caching with hash-based filenames

### Runtime Performance
- **Virtual scrolling**: For large data sets
- **Debounced search**: Reduce API calls
- **Memoization**: React.memo and useMemo for expensive operations

---

## Implementation Guidelines

### Component Development
1. **Design tokens**: Use CSS custom properties
2. **Accessibility**: WCAG 2.1 AA compliance
3. **Testing**: Unit tests for logic, integration tests for interactions
4. **Documentation**: Storybook stories for each component

### Code Standards
1. **TypeScript**: Strict mode with comprehensive types
2. **ESLint**: Consistent code formatting
3. **Prettier**: Automated code formatting
4. **Conventional Commits**: Structured commit messages

---

**Last Updated:** [Current Date]
**Version:** 1.0
**Maintained by:** Design System Team
