# Input Component

> Text input field for user data entry.

## Import

```tsx
import { Input } from "@/components/ui/input";
```

## Source File
`client/components/ui/input.tsx`

---

## API Reference

### Props

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `"text"` | Input type (text, email, password, etc.) |
| `placeholder` | `string` | - | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | - | Additional CSS classes |
| `value` | `string` | - | Controlled value |
| `onChange` | `function` | - | Change handler |

---

## Usage Examples

### Basic Input
```tsx
<Input type="text" placeholder="Enter your name" />
```

### Email Input
```tsx
<Input type="email" placeholder="email@example.com" />
```

### Password Input
```tsx
<Input type="password" placeholder="Enter password" />
```

### Disabled State
```tsx
<Input disabled placeholder="Cannot edit" />
```

### With Label
```tsx
<div className="space-y-2">
  <label htmlFor="email" className="text-sm font-medium">
    Email
  </label>
  <Input 
    id="email" 
    type="email" 
    placeholder="email@example.com" 
  />
</div>
```

### With Icon (Left)
```tsx
import { Search } from "lucide-react";

<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input className="pl-10" placeholder="Search..." />
</div>
```

### With Icon (Right)
```tsx
import { Eye, EyeOff } from "lucide-react";

<div className="relative">
  <Input type={showPassword ? "text" : "password"} className="pr-10" />
  <button 
    className="absolute right-3 top-1/2 -translate-y-1/2"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
  </button>
</div>
```

### With Error State
```tsx
<div className="space-y-2">
  <Input 
    className="border-destructive focus-visible:ring-destructive/20" 
    aria-invalid="true"
    aria-describedby="error-message"
  />
  <p id="error-message" className="text-sm text-destructive" role="alert">
    This field is required
  </p>
</div>
```

### With Helper Text
```tsx
<div className="space-y-2">
  <Input type="password" aria-describedby="password-help" />
  <p id="password-help" className="text-sm text-muted-foreground">
    Must be at least 8 characters
  </p>
</div>
```

### Number Input
```tsx
<Input 
  type="number" 
  min={0} 
  max={100} 
  step={1}
  className="font-mono"
/>
```

### File Input
```tsx
<Input 
  type="file" 
  accept=".csv,.xlsx"
  className="file:bg-transparent file:border-0 file:text-sm file:font-medium"
/>
```

---

## Styling Details

### Base Styles
```css
flex h-11 w-full rounded-md
border border-input
bg-background
px-3 py-2
text-base
ring-offset-background
file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground
placeholder:text-muted-foreground
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
disabled:cursor-not-allowed disabled:opacity-50
md:text-sm
```

### Key Measurements

| Property | Value | Purpose |
|----------|-------|---------|
| Height | `h-11` (44px) | Touch-friendly target |
| Padding | `px-3 py-2` | Comfortable text area |
| Border Radius | `rounded-md` | Consistent with design |
| Font Size | `text-base` mobile, `md:text-sm` desktop | Prevent iOS zoom |

### State Styles

| State | Styles |
|-------|--------|
| Default | `border-input` |
| Focus | `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` |
| Disabled | `disabled:cursor-not-allowed disabled:opacity-50` |
| Error | Add `border-destructive focus-visible:ring-destructive/20` |

---

## Accessibility

### Required Attributes

```tsx
// Always associate label with input
<label htmlFor="field-id">Label</label>
<Input id="field-id" />

// For error states
<Input 
  aria-invalid="true"
  aria-describedby="error-id"
/>
<span id="error-id" role="alert">Error message</span>

// For helper text
<Input aria-describedby="help-id" />
<span id="help-id">Helper text</span>
```

### Keyboard Support
- Tab to focus
- Type to enter text
- Standard text editing shortcuts

### Screen Reader Considerations
```tsx
// Required fields
<Input required aria-required="true" />

// Placeholder is not a label replacement!
<label htmlFor="email" className="sr-only">Email</label>
<Input id="email" placeholder="Email" />
```

---

## Form Integration

### With react-hook-form
```tsx
import { useForm } from "react-hook-form";

const { register, handleSubmit, formState: { errors } } = useForm();

<form onSubmit={handleSubmit(onSubmit)}>
  <Input 
    {...register("email", { required: true })}
    aria-invalid={errors.email ? "true" : "false"}
  />
  {errors.email && <span role="alert">Email is required</span>}
</form>
```

### Controlled Input
```tsx
const [value, setValue] = useState("");

<Input 
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

---

## AI Generation Rules

### DO ✅
```tsx
// Always pair with labels
<label htmlFor="name">Name</label>
<Input id="name" />

// Use proper types
<Input type="email" />
<Input type="tel" />
<Input type="url" />

// Handle error states properly
<Input 
  aria-invalid={!!error}
  aria-describedby={error ? "error-msg" : undefined}
/>
```

### DON'T ❌
```tsx
// Don't rely on placeholder as label
<Input placeholder="Name" /> // No label!

// Don't use hardcoded colors for errors
<Input className="border-red-500" /> // Use border-destructive

// Don't skip accessibility attributes
<Input /> // Missing id, no associated label
```

---

## Complete Implementation

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
```
