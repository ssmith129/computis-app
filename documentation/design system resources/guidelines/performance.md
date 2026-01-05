# Performance Guidelines

Best practices for ensuring optimal performance in the Computis application.

## Core Principles

1. **Minimize bundle size** - Tree-shake, code-split, lazy load
2. **Optimize rendering** - Reduce re-renders, use memoization
3. **Efficient data loading** - Cache, prefetch, paginate
4. **Asset optimization** - Compress images, optimize fonts

---

## Component Optimization

### Memoization

```tsx
// ✅ Memoize expensive components
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});

// ✅ Memoize callback functions
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return <Child onClick={handleClick} />;
}

// ✅ Memoize expensive computations
function DataTable({ data, filters }) {
  const filteredData = useMemo(() => {
    return data.filter((item) => matchesFilters(item, filters));
  }, [data, filters]);

  return <Table data={filteredData} />;
}
```

### When to Use React.memo

```tsx
// ✅ Use memo for:
// - Pure components with stable props
// - Components in lists
// - Components that receive objects/arrays

const TableRow = React.memo(function TableRow({ transaction }) {
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.amount}</td>
    </tr>
  );
});

// ❌ Don't use memo for:
// - Components that always receive new props
// - Very simple components (overhead > benefit)
// - Components that need to re-render often
```

### Avoid Unnecessary Re-renders

```tsx
// ❌ Creates new object every render
<Component style={{ color: "red" }} />

// ✅ Define outside component or use useMemo
const styles = { color: "red" };
<Component style={styles} />

// ❌ Creates new function every render
<Button onClick={() => handleClick(id)} />

// ✅ Use useCallback with stable reference
const handleButtonClick = useCallback(() => {
  handleClick(id);
}, [id]);
<Button onClick={handleButtonClick} />
```

---

## Code Splitting

### Route-Based Splitting

```tsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PageLoading } from "@/components/ui/loading-states";

// Lazy load page components
const Dashboard = lazy(() => import("@/pages/EnhancedDashboard"));
const Transactions = lazy(() => import("@/pages/Transactions"));
const Exports = lazy(() => import("@/pages/Exports"));
const Settings = lazy(() => import("@/pages/Settings"));

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/exports" element={<Exports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

### Component-Based Splitting

```tsx
// Lazy load heavy components
const ChartComponent = lazy(() => import("./ChartComponent"));
const DataTable = lazy(() => import("./DataTable"));

function Dashboard() {
  return (
    <div>
      <Suspense fallback={<Skeleton className="h-64" />}>
        <ChartComponent />
      </Suspense>
      <Suspense fallback={<TableLoadingSkeleton />}>
        <DataTable />
      </Suspense>
    </div>
  );
}
```

### Named Exports with Lazy Loading

```tsx
// For named exports, use an intermediate module
const DashboardCards = lazy(() =>
  import("@/components/dashboard/dashboard-cards").then((module) => ({
    default: module.DashboardCards,
  }))
);
```

---

## Data Loading

### React Query Patterns

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Basic query with caching
function useTransactions(filters) {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => fetchTransactions(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Optimistic updates
function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTransaction,
    onMutate: async (newData) => {
      await queryClient.cancelQueries(["transactions"]);
      const previous = queryClient.getQueryData(["transactions"]);
      queryClient.setQueryData(["transactions"], (old) =>
        old.map((t) => (t.id === newData.id ? newData : t))
      );
      return { previous };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(["transactions"], context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
  });
}
```

### Pagination

```tsx
function TransactionsList() {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", { page, pageSize }],
    queryFn: () => fetchTransactions({ page, pageSize }),
    keepPreviousData: true, // Smooth pagination
  });

  return (
    <>
      <Table data={data?.items} />
      <Pagination
        current={page}
        total={data?.totalPages}
        onChange={setPage}
      />
    </>
  );
}
```

### Infinite Scroll

```tsx
import { useInfiniteQuery } from "@tanstack/react-query";

function InfiniteList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["items"],
    queryFn: ({ pageParam = 1 }) => fetchItems(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return (
    <div>
      {data.pages.map((page) =>
        page.items.map((item) => <Item key={item.id} {...item} />)
      )}
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      )}
    </div>
  );
}
```

---

## Rendering Performance

### Virtualization for Long Lists

```tsx
import { useVirtualizer } from "@tanstack/react-virtual";

function VirtualizedList({ items }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="h-96 overflow-auto">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {items[virtualItem.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Debouncing & Throttling

```tsx
import { useDebouncedCallback } from "use-debounce";

function SearchInput({ onSearch }) {
  const [value, setValue] = useState("");

  // Debounce search requests
  const debouncedSearch = useDebouncedCallback((searchTerm) => {
    onSearch(searchTerm);
  }, 300);

  const handleChange = (e) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return <Input value={value} onChange={handleChange} />;
}
```

---

## Asset Optimization

### Images

```tsx
// Use appropriate image formats
// - WebP for photos (80% smaller than JPEG)
// - SVG for icons and illustrations
// - PNG only when transparency needed

// Lazy load images
<img
  loading="lazy"
  src="/image.webp"
  alt="Description"
/>

// Responsive images
<picture>
  <source
    media="(min-width: 1024px)"
    srcSet="/image-large.webp"
  />
  <source
    media="(min-width: 640px)"
    srcSet="/image-medium.webp"
  />
  <img src="/image-small.webp" alt="Description" />
</picture>
```

### Icons

```tsx
// ✅ Import only needed icons
import { Plus, Minus, Edit } from "lucide-react";

// ❌ Don't import entire icon library
import * as Icons from "lucide-react";
```

### Fonts

```tsx
// Preload critical fonts
<link
  rel="preload"
  href="/fonts/noto-sans-400.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>

// Use font-display: swap for FOUT
@font-face {
  font-family: "Noto Sans";
  font-display: swap;
  src: url("/fonts/noto-sans-400.woff2") format("woff2");
}
```

---

## Bundle Optimization

### Tree Shaking

```tsx
// ✅ Named imports (tree-shakeable)
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

// ❌ Default imports of large modules
import _ from "lodash";
import * as dateFns from "date-fns";

// ✅ Import specific lodash functions
import debounce from "lodash/debounce";
```

### Dynamic Imports

```tsx
// Load heavy libraries on demand
async function exportToCSV(data) {
  const { Parser } = await import("json2csv");
  const parser = new Parser();
  return parser.parse(data);
}

// Load polyfills conditionally
if (!window.ResizeObserver) {
  import("resize-observer-polyfill");
}
```

---

## CSS Performance

### Tailwind Optimization

```tsx
// ✅ Use Tailwind's built-in optimizations
// PurgeCSS removes unused styles automatically

// ✅ Avoid dynamic class generation
const color = "blue";
// ❌ This won't be purged correctly
<div className={`bg-${color}-500`} />

// ✅ Use explicit classes
<div className={color === "blue" ? "bg-blue-500" : "bg-red-500"} />
```

### CSS-in-JS Considerations

```tsx
// ✅ Pre-defined variants (extracted at build time)
const buttonVariants = cva("...", {
  variants: { ... }
});

// ❌ Avoid runtime style calculations
const Component = styled.div`
  padding: ${props => props.size * 4}px;
`;
```

---

## Monitoring

### Performance Metrics

```tsx
// Web Vitals monitoring
import { onCLS, onFID, onLCP, onFCP, onTTFB } from "web-vitals";

function reportWebVitals(metric) {
  console.log(metric);
  // Send to analytics
}

onCLS(reportWebVitals);
onFID(reportWebVitals);
onLCP(reportWebVitals);
```

### Target Metrics

| Metric | Target | Description |
|--------|--------|-------------|
| LCP | < 2.5s | Largest Contentful Paint |
| FID | < 100ms | First Input Delay |
| CLS | < 0.1 | Cumulative Layout Shift |
| TTI | < 3.8s | Time to Interactive |
| FCP | < 1.8s | First Contentful Paint |

---

## Checklist

### Build Optimization
- [ ] Code splitting enabled for routes
- [ ] Tree shaking configured
- [ ] Source maps disabled in production
- [ ] Assets compressed (gzip/brotli)

### Runtime Performance
- [ ] React.memo for expensive components
- [ ] useCallback/useMemo where beneficial
- [ ] Virtualization for long lists
- [ ] Debounced user inputs

### Loading Performance
- [ ] Critical CSS inlined
- [ ] Fonts preloaded
- [ ] Images lazy loaded
- [ ] Above-fold content prioritized
