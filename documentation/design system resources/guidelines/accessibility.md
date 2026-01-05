# Accessibility Guidelines

All generated code must meet WCAG 2.1 AA compliance standards. This document outlines specific requirements for the Computis application.

## Overview

### Compliance Targets

- **WCAG 2.1 Level AA** - Minimum standard
- **Section 508** - Federal accessibility requirements
- **ARIA 1.2** - Accessible Rich Internet Applications

### Core Principles (POUR)

1. **Perceivable** - Information must be presentable in ways users can perceive
2. **Operable** - Interface must be operable by all users
3. **Understandable** - Information and UI must be understandable
4. **Robust** - Content must work with assistive technologies

---

## Color & Contrast

### Minimum Contrast Ratios

| Element | Ratio | WCAG Level |
|---------|-------|------------|
| Normal text | 4.5:1 | AA |
| Large text (18px+ or 14px bold) | 3:1 | AA |
| UI components & graphics | 3:1 | AA |
| Enhanced contrast | 7:1 | AAA |

### Color Usage Rules

```tsx
// ✅ Use semantic color tokens (built-in contrast)
<p className="text-foreground">Primary text</p>
<p className="text-muted-foreground">Secondary text</p>
<Button className="bg-primary text-primary-foreground">Action</Button>

// ✅ Don't rely on color alone
<Badge className="bg-red-100 text-red-800">
  <AlertCircle className="w-3 h-3 mr-1" />
  Error
</Badge>

// ❌ Color-only indication
<span className="text-red-500">Error</span>
```

### Status Indicators

Always pair color with text, icons, or patterns:

```tsx
// ✅ Status with icon and text
<div className="flex items-center gap-2">
  <CheckCircle className="h-4 w-4 text-green-600" />
  <span className="text-green-800">Completed</span>
</div>

// ✅ Status badge with semantic styling
<Badge className="bg-green-100 text-green-800 border-green-200">
  ✓ Completed
</Badge>
```

---

## Keyboard Navigation

### Focus Management

```tsx
// ✅ All interactive elements have visible focus
className="
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-ring
  focus-visible:ring-offset-2
"

// ✅ Skip to main content link
<a
  href="#main-content"
  className="skip-to-main"
>
  Skip to main content
</a>

// ✅ Focus trap in modals (Radix handles this)
<Dialog>
  <DialogContent>
    {/* Focus trapped within */}
  </DialogContent>
</Dialog>
```

### Keyboard Shortcuts

```tsx
// ✅ Support Enter and Space for buttons
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  }}
>
  Action
</button>

// ✅ Escape to close overlays (Radix handles this)
<Dialog>
  <DialogContent>
    {/* Escape closes dialog */}
  </DialogContent>
</Dialog>
```

### Tab Order

```tsx
// ✅ Logical tab order (use DOM order)
<form>
  <input name="first" />   {/* Tab 1 */}
  <input name="last" />    {/* Tab 2 */}
  <button type="submit" /> {/* Tab 3 */}
</form>

// ✅ Remove from tab order when hidden
<div hidden tabIndex={-1}>
  Not focusable when hidden
</div>

// ❌ Don't use positive tabindex
<input tabIndex={3} /> // Creates confusing tab order
```

---

## Screen Readers

### Semantic HTML

```tsx
// ✅ Use semantic elements
<header role="banner">
<nav role="navigation" aria-label="Main navigation">
<main role="main" id="main-content">
<aside role="complementary">
<footer role="contentinfo">

// ✅ Proper heading hierarchy
<h1>Page Title</h1>
<section>
  <h2>Section Title</h2>
  <h3>Subsection</h3>
</section>

// ❌ Skip heading levels
<h1>Title</h1>
<h3>Subsection</h3> // Missing h2
```

### ARIA Labels

```tsx
// ✅ Icon-only buttons need labels
<Button size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

<Button size="icon" aria-label="Delete transaction">
  <Trash className="h-4 w-4" />
</Button>

// ✅ Descriptive link text
<a href="/transactions">View all transactions</a>

// ❌ Non-descriptive text
<a href="/transactions">Click here</a>
```

### Live Regions

```tsx
// ✅ Announce dynamic content changes
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {message && <p>{message}</p>}
</div>

// ✅ Announce urgent alerts
<div
  role="alert"
  aria-live="assertive"
>
  Error: Transaction failed
</div>

// ✅ Loading states
<div aria-busy={isLoading} aria-live="polite">
  {isLoading ? <Skeleton /> : <Content />}
</div>
```

### Tables

```tsx
// ✅ Accessible table structure
<Table>
  <caption className="sr-only">Transaction History</caption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Date</TableHead>
      <TableHead scope="col">Type</TableHead>
      <TableHead scope="col">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>2024-01-15</TableCell>
      <TableCell>Buy</TableCell>
      <TableCell>0.5 BTC</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## Forms

### Labels & Instructions

```tsx
// ✅ Always associate labels with inputs
<div className="space-y-2">
  <Label htmlFor="email">Email address</Label>
  <Input
    id="email"
    type="email"
    aria-describedby="email-help email-error"
    aria-invalid={!!errors.email}
  />
  <p id="email-help" className="text-sm text-muted-foreground">
    We'll never share your email.
  </p>
  {errors.email && (
    <p id="email-error" className="text-sm text-destructive">
      {errors.email.message}
    </p>
  )}
</div>

// ✅ Required field indication
<Label htmlFor="name">
  Name <span className="text-destructive">*</span>
  <span className="sr-only">(required)</span>
</Label>
```

### Error Handling

```tsx
// ✅ Accessible error messages
<FormField>
  <FormLabel>Amount</FormLabel>
  <FormControl>
    <Input
      aria-invalid={!!error}
      aria-describedby={error ? "amount-error" : undefined}
    />
  </FormControl>
  <FormMessage id="amount-error" role="alert" />
</FormField>

// ✅ Error summary for form
<div role="alert" aria-labelledby="error-heading">
  <h2 id="error-heading">Please fix the following errors:</h2>
  <ul>
    <li><a href="#email">Email is required</a></li>
    <li><a href="#password">Password must be 8+ characters</a></li>
  </ul>
</div>
```

### Form Groups

```tsx
// ✅ Group related fields
<fieldset>
  <legend>Payment Method</legend>
  <RadioGroup>
    <RadioGroupItem value="card" id="card" />
    <Label htmlFor="card">Credit Card</Label>
    <RadioGroupItem value="crypto" id="crypto" />
    <Label htmlFor="crypto">Cryptocurrency</Label>
  </RadioGroup>
</fieldset>
```

---

## Touch & Pointer

### Touch Targets

```tsx
// ✅ Minimum 44x44px touch targets
<Button size="default" />  // h-11 = 44px
<Button size="icon" />     // h-11 w-11 = 44x44px

// ✅ Custom touch target utility
<button className="touch-target">
  <Icon />
</button>

// In CSS:
.touch-target {
  min-width: 44px;
  min-height: 44px;
}
```

### Pointer Interactions

```tsx
// ✅ Support both hover and focus
<Tooltip>
  <TooltipTrigger>
    {/* Opens on hover AND focus */}
    <Button>Hover or focus me</Button>
  </TooltipTrigger>
  <TooltipContent>Information</TooltipContent>
</Tooltip>

// ✅ Don't require hover for essential actions
// All information should be accessible via click/tap
```

---

## Motion & Animation

### Reduced Motion

```tsx
// ✅ Respect prefers-reduced-motion
className="
  transition-colors
  motion-reduce:transition-none
"

// In CSS (global.css already includes this):
@media (prefers-reduced-motion: reduce) {
  .responsive-table-container,
  .responsive-transactions-table * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Essential Motion

```tsx
// ✅ Keep essential animations brief
.animate-in {
  animation-duration: 200ms;
}

// ✅ Provide pause controls for auto-playing content
<Carousel>
  <Button onClick={pause} aria-label="Pause carousel">
    Pause
  </Button>
</Carousel>
```

---

## Images & Media

### Alt Text

```tsx
// ✅ Descriptive alt text
<img src="chart.png" alt="Bar chart showing BTC price increase of 15% in Q1 2024" />

// ✅ Decorative images
<img src="decoration.png" alt="" role="presentation" />

// ✅ Complex images with extended description
<figure>
  <img
    src="complex-chart.png"
    alt="Quarterly performance chart"
    aria-describedby="chart-desc"
  />
  <figcaption id="chart-desc">
    Detailed description of the chart data...
  </figcaption>
</figure>
```

### Icons

```tsx
// ✅ Decorative icons (with visible text)
<Button>
  <Plus className="h-4 w-4" aria-hidden="true" />
  Add Transaction
</Button>

// ✅ Meaningful icons (without visible text)
<Button size="icon" aria-label="Add transaction">
  <Plus className="h-4 w-4" />
</Button>
```

---

## Testing Checklist

### Automated Testing

- [ ] Run axe-core on all pages
- [ ] Check color contrast with browser dev tools
- [ ] Validate HTML structure

### Manual Testing

- [ ] Navigate entire interface with keyboard only
- [ ] Test with screen reader (VoiceOver, NVDA)
- [ ] Verify at 200% zoom
- [ ] Test with reduced motion enabled
- [ ] Test on mobile devices

### Screen Reader Testing

- [ ] All content is announced correctly
- [ ] Form errors are announced
- [ ] Dynamic content changes announced
- [ ] Focus management works in modals

---

## Component-Specific Requirements

### Dialog/Modal

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent
    aria-labelledby="dialog-title"
    aria-describedby="dialog-description"
  >
    <DialogHeader>
      <DialogTitle id="dialog-title">Title</DialogTitle>
      <DialogDescription id="dialog-description">
        Description
      </DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogClose asChild>
      <Button aria-label="Close">
        <X />
      </Button>
    </DialogClose>
  </DialogContent>
</Dialog>
```

### Dropdown Menu

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button aria-haspopup="menu">
      Options
      <ChevronDown aria-hidden="true" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent role="menu">
    <DropdownMenuItem role="menuitem">Edit</DropdownMenuItem>
    <DropdownMenuItem role="menuitem">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Tabs

```tsx
<Tabs>
  <TabsList role="tablist" aria-label="Transaction views">
    <TabsTrigger value="all" role="tab" aria-selected={value === "all"}>
      All
    </TabsTrigger>
    <TabsTrigger value="pending" role="tab" aria-selected={value === "pending"}>
      Pending
    </TabsTrigger>
  </TabsList>
  <TabsContent value="all" role="tabpanel">
    {/* Content */}
  </TabsContent>
</Tabs>
```
