# Data Display Patterns

> Patterns for displaying data in tables, cards, and charts for Computis.

## Data Tables

### Basic Data Table

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const data = [
  { id: 1, name: "Bitcoin", symbol: "BTC", amount: "0.5", value: "$21,500", status: "active" },
  { id: 2, name: "Ethereum", symbol: "ETH", amount: "4.2", value: "$7,140", status: "pending" },
  { id: 3, name: "Solana", symbol: "SOL", amount: "50", value: "$1,450", status: "completed" },
];

function DataTableExample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead className="font-mono">Amount</TableHead>
          <TableHead className="font-mono">Value</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-10"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.symbol}</p>
              </div>
            </TableCell>
            <TableCell className="font-mono">{item.amount}</TableCell>
            <TableCell className="font-mono font-medium">{item.value}</TableCell>
            <TableCell>
              <StatusBadge status={item.status} />
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Table with Selection

```tsx
import { Checkbox } from "@/components/ui/checkbox";

function SelectableTable({ data, selectedIds, onSelectionChange }) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map((item) => item.id));
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((i) => i !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onCheckedChange={handleSelectAll}
              aria-label="Select all rows"
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow
            key={item.id}
            data-state={selectedIds.includes(item.id) ? "selected" : undefined}
          >
            <TableCell>
              <Checkbox
                checked={selectedIds.includes(item.id)}
                onCheckedChange={() => handleSelectOne(item.id)}
                aria-label={`Select ${item.name}`}
              />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell className="font-mono">{item.amount}</TableCell>
            <TableCell>
              <StatusBadge status={item.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Sortable Table Header

```tsx
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

function SortableHeader({ column, currentSort, onSort, children }) {
  const isSorted = currentSort?.column === column;
  const direction = isSorted ? currentSort.direction : null;

  return (
    <TableHead
      className="cursor-pointer hover:bg-muted/50 select-none"
      onClick={() => onSort(column)}
    >
      <div className="flex items-center gap-1">
        {children}
        {isSorted ? (
          direction === "asc" ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )
        ) : (
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
    </TableHead>
  );
}
```

---

## Status Badges

### Status Badge Component

```tsx
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, XCircle, Loader2 } from "lucide-react";

const statusConfig = {
  active: {
    label: "Active",
    variant: "default",
    icon: CheckCircle,
    className: "bg-green-100 text-green-800 border-green-200",
  },
  pending: {
    label: "Pending",
    variant: "outline",
    icon: Clock,
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  completed: {
    label: "Completed",
    variant: "secondary",
    icon: CheckCircle,
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  failed: {
    label: "Failed",
    variant: "destructive",
    icon: XCircle,
    className: "bg-red-100 text-red-800 border-red-200",
  },
  processing: {
    label: "Processing",
    variant: "outline",
    icon: Loader2,
    className: "bg-gray-100 text-gray-800 border-gray-200",
  },
};

function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={config.className}>
      <Icon className={`h-3 w-3 mr-1 ${status === "processing" ? "animate-spin" : ""}`} />
      {config.label}
    </Badge>
  );
}
```

### Transaction Type Badge

```tsx
function TransactionTypeBadge({ type }) {
  const variants = {
    buy: { label: "Buy", className: "bg-green-100 text-green-800" },
    sell: { label: "Sell", className: "bg-red-100 text-red-800" },
    transfer: { label: "Transfer", className: "bg-blue-100 text-blue-800" },
    swap: { label: "Swap", className: "bg-purple-100 text-purple-800" },
    stake: { label: "Stake", className: "bg-orange-100 text-orange-800" },
    reward: { label: "Reward", className: "bg-emerald-100 text-emerald-800" },
  };

  const config = variants[type] || { label: type, className: "" };

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
```

---

## Metric Cards

### Simple Metric Card

```tsx
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

function MetricCard({ title, value, change, changeType, icon: Icon }) {
  const isPositive = changeType === "positive";

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
        </div>
        {change && (
          <div className="flex items-center gap-1 mt-2">
            {isPositive ? (
              <ArrowUp className="h-3 w-3 text-green-600" />
            ) : (
              <ArrowDown className="h-3 w-3 text-red-600" />
            )}
            <span className={`text-xs font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {change}
            </span>
            <span className="text-xs text-muted-foreground">vs last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

### Metric Card with Sparkline

```tsx
function MetricCardWithChart({ title, value, change, data }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className={`text-xs ${parseFloat(change) >= 0 ? "text-green-600" : "text-red-600"}`}>
              {change}
            </p>
          </div>
          <div className="w-20 h-12">
            {/* Mini sparkline chart */}
            <Sparkline data={data} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## Lists and Feeds

### Activity Feed

```tsx
function ActivityFeed({ activities }) {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <activity.icon className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm">
              <span className="font-medium">{activity.user}</span>
              {" "}{activity.action}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {activity.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Key-Value List

```tsx
function KeyValueList({ items }) {
  return (
    <dl className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between gap-4">
          <dt className="text-sm text-muted-foreground">{item.label}</dt>
          <dd className="text-sm font-medium text-right">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

// Usage
<KeyValueList
  items={[
    { label: "Total Assets", value: "$45,231.89" },
    { label: "Cost Basis", value: "$32,000.00" },
    { label: "Unrealized Gain", value: "$13,231.89" },
    { label: "Tax Year", value: "2024" },
  ]}
/>
```

---

## Empty States

### No Data Empty State

```tsx
import { InboxIcon } from "lucide-react";

function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="p-4 bg-muted rounded-full mb-4">
        <InboxIcon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-4">
        {description}
      </p>
      {action}
    </div>
  );
}

// Usage
<EmptyState
  title="No transactions found"
  description="Get started by connecting a wallet or importing your transaction history."
  action={
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      Add Transaction
    </Button>
  }
/>
```

### Search No Results

```tsx
function NoSearchResults({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <Search className="h-8 w-8 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">No results found</h3>
      <p className="text-sm text-muted-foreground">
        No results match "{query}". Try adjusting your search or filters.
      </p>
    </div>
  );
}
```

---

## Loading States

### Table Skeleton

```tsx
import { Skeleton } from "@/components/ui/skeleton";

function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array.from({ length: columns }).map((_, i) => (
            <TableHead key={i}>
              <Skeleton className="h-4 w-20" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Card Grid Skeleton

```tsx
function CardGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-3 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

---

## Number Formatting

### Currency Display

```tsx
function formatCurrency(value, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Usage
<span className="font-mono font-medium">
  {formatCurrency(45231.89)}
</span>
// Output: $45,231.89
```

### Crypto Amount Display

```tsx
function formatCryptoAmount(value, decimals = 8) {
  const formatted = parseFloat(value).toFixed(decimals);
  // Remove trailing zeros
  return formatted.replace(/\.?0+$/, "");
}

// Usage
<span className="font-mono">
  {formatCryptoAmount(0.00042100)} BTC
</span>
// Output: 0.000421 BTC
```

### Percentage Display

```tsx
function formatPercentage(value, showSign = true) {
  const formatted = Math.abs(value).toFixed(2);
  const sign = value >= 0 ? "+" : "-";
  return showSign ? `${sign}${formatted}%` : `${formatted}%`;
}

// Usage with color
<span className={value >= 0 ? "text-green-600" : "text-red-600"}>
  {formatPercentage(12.5)}
</span>
// Output: +12.50% (green)
```

---

*Use these patterns consistently for all data display across Computis.*
