# Form Patterns

> Standard form patterns and validation approaches for Computis.

## Basic Form Field

### Standard Field Structure

```tsx
<div className="space-y-2">
  <label htmlFor="field-name" className="text-sm font-medium">
    Field Label
    {required && <span className="text-destructive ml-1">*</span>}
  </label>
  <Input
    id="field-name"
    type="text"
    placeholder="Placeholder text"
    aria-describedby="field-help"
  />
  <p id="field-help" className="text-sm text-muted-foreground">
    Helper text explaining the field
  </p>
</div>
```

---

## Complete Form Example

### Contact Form

```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Handle submission
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields - Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="firstName"
                placeholder="John"
                aria-invalid={errors.firstName ? "true" : "false"}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
              />
              {errors.firstName && (
                <p id="firstName-error" className="text-sm text-destructive" role="alert">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="lastName"
                placeholder="Doe"
                aria-invalid={errors.lastName ? "true" : "false"}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-destructive">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : "email-help"}
            />
            {errors.email ? (
              <p id="email-error" className="text-sm text-destructive" role="alert">
                {errors.email}
              </p>
            ) : (
              <p id="email-help" className="text-sm text-muted-foreground">
                We'll never share your email.
              </p>
            )}
          </div>

          {/* Select Field */}
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <Select>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select a subject..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="support">Technical Support</SelectItem>
                <SelectItem value="billing">Billing Question</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Textarea Field */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="message"
              placeholder="How can we help you?"
              rows={4}
              aria-invalid={errors.message ? "true" : "false"}
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-start space-x-3">
            <Checkbox id="terms" aria-describedby="terms-label" />
            <div className="space-y-1 leading-none">
              <label
                id="terms-label"
                htmlFor="terms"
                className="text-sm font-medium cursor-pointer"
              >
                I agree to the terms and conditions
              </label>
              <p className="text-sm text-muted-foreground">
                By checking this, you agree to our Terms of Service.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
```

---

## Form Validation Patterns

### Error State

```tsx
// Input with error
<div className="space-y-2">
  <label htmlFor="email" className="text-sm font-medium">
    Email
  </label>
  <Input
    id="email"
    type="email"
    className="border-destructive focus-visible:ring-destructive/20"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <p id="email-error" className="text-sm text-destructive" role="alert">
    Please enter a valid email address
  </p>
</div>
```

### Success State

```tsx
// Input with success
<div className="space-y-2">
  <label htmlFor="username" className="text-sm font-medium">
    Username
  </label>
  <Input
    id="username"
    className="border-green-500 focus-visible:ring-green-500/20"
    aria-describedby="username-success"
  />
  <p id="username-success" className="text-sm text-green-600">
    Username is available!
  </p>
</div>
```

### Loading/Validating State

```tsx
// Input while validating
<div className="space-y-2">
  <label htmlFor="domain" className="text-sm font-medium">
    Domain
  </label>
  <div className="relative">
    <Input id="domain" className="pr-10" />
    <div className="absolute right-3 top-1/2 -translate-y-1/2">
      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
    </div>
  </div>
  <p className="text-sm text-muted-foreground">Checking availability...</p>
</div>
```

---

## Field Types

### Password with Toggle

```tsx
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordField() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor="password" className="text-sm font-medium">
        Password
      </label>
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          className="pr-10"
          aria-describedby="password-requirements"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      <p id="password-requirements" className="text-sm text-muted-foreground">
        Must be at least 8 characters with a number and symbol
      </p>
    </div>
  );
}
```

### Search Input

```tsx
import { Search, X } from "lucide-react";

function SearchField({ value, onChange, onClear }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="pl-10 pr-10"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
```

### Currency Input

```tsx
import { DollarSign } from "lucide-react";

function CurrencyField() {
  return (
    <div className="space-y-2">
      <label htmlFor="amount" className="text-sm font-medium">
        Amount
      </label>
      <div className="relative">
        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          className="pl-10 font-mono"
        />
      </div>
    </div>
  );
}
```

### Date Range Picker

```tsx
import { Calendar } from "lucide-react";

function DateRangeField() {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="space-y-2 flex-1">
        <label htmlFor="startDate" className="text-sm font-medium">
          Start Date
        </label>
        <div className="relative">
          <Input id="startDate" type="date" className="pr-10" />
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>
      <div className="space-y-2 flex-1">
        <label htmlFor="endDate" className="text-sm font-medium">
          End Date
        </label>
        <div className="relative">
          <Input id="endDate" type="date" className="pr-10" />
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
```

---

## Form Layouts

### Inline Form

```tsx
<form className="flex gap-2">
  <Input placeholder="Enter email" className="flex-1" />
  <Button type="submit">Subscribe</Button>
</form>
```

### Stacked Form

```tsx
<form className="space-y-4">
  <div className="space-y-2">
    <label>Email</label>
    <Input type="email" />
  </div>
  <div className="space-y-2">
    <label>Password</label>
    <Input type="password" />
  </div>
  <Button type="submit" className="w-full">Sign In</Button>
</form>
```

### Multi-Column Form

```tsx
<form className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <label>First Name</label>
      <Input />
    </div>
    <div className="space-y-2">
      <label>Last Name</label>
      <Input />
    </div>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="md:col-span-2 space-y-2">
      <label>Street Address</label>
      <Input />
    </div>
    <div className="space-y-2">
      <label>Zip Code</label>
      <Input />
    </div>
  </div>
</form>
```

---

## Form Actions

### Standard Actions

```tsx
<div className="flex justify-end gap-2">
  <Button type="button" variant="outline">
    Cancel
  </Button>
  <Button type="submit">
    Save Changes
  </Button>
</div>
```

### Destructive Action

```tsx
<div className="flex justify-between">
  <Button type="button" variant="destructive">
    Delete
  </Button>
  <div className="flex gap-2">
    <Button type="button" variant="outline">Cancel</Button>
    <Button type="submit">Save</Button>
  </div>
</div>
```

### Full Width Submit

```tsx
<Button type="submit" className="w-full">
  Create Account
</Button>
```

---

## Accessibility Checklist

✅ All inputs have associated `<label>` elements  
✅ Required fields marked with `aria-required="true"` or visual indicator  
✅ Error messages use `role="alert"` and `aria-describedby`  
✅ Invalid fields have `aria-invalid="true"`  
✅ Helper text linked with `aria-describedby`  
✅ Form has clear submit button  
✅ Loading states disable form and show spinner  
✅ Focus management after submission errors  

---

*Use these patterns consistently across all Computis forms.*
