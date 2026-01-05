# Table Component

> Data display component with scrollable and responsive features.

## Import

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
```

## Source File
`client/components/ui/table.tsx`

---

## Sub-Components

| Component | HTML Element | Purpose |
|-----------|-------------|---------|
| `Table` | `<table>` | Container with scroll wrapper |
| `TableHeader` | `<thead>` | Header section |
| `TableBody` | `<tbody>` | Body section |
| `TableFooter` | `<tfoot>` | Footer section |
| `TableHead` | `<th>` | Header cell |
| `TableRow` | `<tr>` | Table row |
| `TableCell` | `<td>` | Data cell |
| `TableCaption` | `<caption>` | Table description |

---

## Custom Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scrollable` | `boolean` | `true` | Enable horizontal scroll |
| `minWidth` | `string` | `"600px"` | Minimum table width |

---

## Usage Examples

### Basic Table
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>Active</TableCell>
      <TableCell>$100.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### With Caption
```tsx
<Table>
  <TableCaption>A list of recent transactions</TableCaption>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
</Table>
```

### With Footer
```tsx
<Table>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell>$2,500.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

### Non-Scrollable Table
```tsx
<Table scrollable={false}>
  {/* Table will wrap/overflow normally */}
</Table>
```

### Custom Min Width
```tsx
<Table minWidth="800px">
  {/* Wider minimum for more columns */}
</Table>
```

### Transactions Table (Computis Pattern)
```tsx
<Table minWidth="1000px">
  <TableHeader>
    <TableRow>
      <TableHead className="w-14 pl-4">
        <Checkbox aria-label="Select all" />
      </TableHead>
      <TableHead className="w-24">Date</TableHead>
      <TableHead className="w-20">Type</TableHead>
      <TableHead className="w-36">Asset</TableHead>
      <TableHead className="w-24 font-mono">Amount</TableHead>
      <TableHead className="w-28 font-mono">FMV</TableHead>
      <TableHead className="w-32">Classification</TableHead>
      <TableHead className="w-24">Status</TableHead>
      <TableHead className="w-28">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {transactions.map((tx) => (
      <TableRow key={tx.id}>
        <TableCell className="pl-4">
          <Checkbox aria-label={`Select ${tx.id}`} />
        </TableCell>
        <TableCell>{tx.date}</TableCell>
        <TableCell>
          <Badge variant={tx.type === 'buy' ? 'default' : 'secondary'}>
            {tx.type}
          </Badge>
        </TableCell>
        <TableCell className="font-medium">{tx.asset}</TableCell>
        <TableCell className="font-mono">{tx.amount}</TableCell>
        <TableCell className="font-mono">{tx.fmv}</TableCell>
        <TableCell>
          <Badge variant="outline">{tx.classification}</Badge>
        </TableCell>
        <TableCell>
          <Badge variant={getStatusVariant(tx.status)}>{tx.status}</Badge>
        </TableCell>
        <TableCell>
          <Button size="sm" variant="ghost">Edit</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Sortable Header
```tsx
<TableHead 
  className="cursor-pointer hover:bg-muted/50"
  onClick={() => handleSort('name')}
>
  <div className="flex items-center gap-1">
    Name
    {sortField === 'name' && (
      sortDirection === 'asc' 
        ? <ChevronUp className="h-4 w-4" />
        : <ChevronDown className="h-4 w-4" />
    )}
  </div>
</TableHead>
```

### With Row Selection
```tsx
<TableRow 
  data-state={selected ? "selected" : undefined}
  className="data-[state=selected]:bg-muted"
>
  <TableCell>
    <Checkbox 
      checked={selected}
      onCheckedChange={handleSelect}
    />
  </TableCell>
  {/* Other cells */}
</TableRow>
```

---

## Styling Details

### Table Wrapper (Scrollable)
```css
relative w-full max-w-full box-border
overflow-x-auto overflow-y-hidden scroll-smooth touch-pan-x
```

### Table Element
```css
w-full caption-bottom text-sm
min-w-[var(--table-min-width)]  /* Custom property for minWidth */
```

### Header Row
```css
border-b
```

### Header Cell (TableHead)
```css
h-12 px-4 text-left align-middle
font-medium text-muted-foreground
[&:has([role=checkbox])]:pr-0
```

### Body Row
```css
border-b transition-colors
hover:bg-muted/50
data-[state=selected]:bg-muted
```

### Body Cell (TableCell)
```css
p-4 align-middle
[&:has([role=checkbox])]:pr-0
```

### Footer
```css
border-t bg-muted/50 font-medium
[&>tr]:last:border-b-0
```

---

## Responsive Patterns

### Column Visibility
```tsx
// Hide columns on mobile
<TableHead className="hidden md:table-cell">Full Column</TableHead>
<TableCell className="hidden md:table-cell">{data}</TableCell>
```

### Sticky Columns
```tsx
// Sticky first column
<TableCell className="sticky left-0 z-10 bg-card">
  {/* Always visible content */}
</TableCell>

// Sticky actions column
<TableCell className="sticky right-0 z-10 bg-card">
  <Button>Actions</Button>
</TableCell>
```

### Mobile Card View Alternative
```tsx
{/* Table on desktop, cards on mobile */}
<div className="hidden md:block">
  <Table>...</Table>
</div>
<div className="md:hidden space-y-4">
  {data.map(item => (
    <Card key={item.id}>...</Card>
  ))}
</div>
```

---

## Accessibility

### Required Attributes
```tsx
// Table should have accessible caption or aria-label
<Table aria-label="List of transactions">

// OR use TableCaption
<Table>
  <TableCaption>A list of your recent transactions</TableCaption>
</Table>
```

### Sortable Headers
```tsx
<TableHead 
  role="columnheader"
  aria-sort={sorted ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}
>
  <button aria-label={`Sort by name, currently ${sorted ? direction : 'unsorted'}`}>
    Name
  </button>
</TableHead>
```

### Selection
```tsx
<TableRow 
  aria-selected={selected}
  role="row"
>
  <TableCell role="cell">
    <Checkbox aria-label={`Select row ${id}`} />
  </TableCell>
</TableRow>
```

---

## AI Generation Rules

### DO ✅
```tsx
// Use semantic table structure
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>...</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>...</TableCell>
    </TableRow>
  </TableBody>
</Table>

// Use font-mono for numbers/codes
<TableCell className="font-mono">$1,234.56</TableCell>

// Add proper width constraints
<TableHead className="w-24">Date</TableHead>
```

### DON'T ❌
```tsx
// Don't use div-based tables
<div className="table">
  <div className="table-row">...</div>
</div>

// Don't forget scrollable wrapper
<table> // Use <Table> instead for scroll handling

// Don't skip accessibility
<Table> // Missing aria-label or caption
```

---

## Complete Implementation

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    scrollable?: boolean;
    minWidth?: string;
  }
>(({ className, scrollable = true, minWidth = "600px", ...props }, ref) => (
  <div
    className={cn(
      "relative w-full max-w-full box-border",
      scrollable
        ? "overflow-x-auto overflow-y-hidden scroll-smooth touch-pan-x"
        : "overflow-x-hidden overflow-y-auto"
    )}
    style={{ WebkitOverflowScrolling: "touch" }}
  >
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom text-sm",
        scrollable && "min-w-[var(--table-min-width)]",
        className
      )}
      style={{ "--table-min-width": minWidth } as React.CSSProperties}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

// Additional sub-components...
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
```
