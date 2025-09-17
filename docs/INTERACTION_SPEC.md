# Interaction Specification

This document defines complete action-response workflows for all interactive elements across the app. It follows the existing design system (colors, typography, spacing, components) and provides exact copy, transitions, and edge cases.

Contents

- Global interaction patterns
- Header & Navigation
- Dashboard
- Transactions
- Wallets & Exchanges
- Clients
- Exports
- Rule Engine
- Data Anomaly Detection
- IRS Form 8949
- Gain/Loss Report
- Wallet Ingestion
- Tables, Cards, Forms

## Global Interaction Patterns

- Focus/keyboard: All interactive elements use focus-visible ring. Keyboard navigation: Tab/Shift+Tab cycle focus; Enter/Space activate; Esc dismiss menus/modals.
- Pointer/touch: Minimum touch target 44x44. Hover states on desktop, active feedback on touch. Animations 150–200ms ease-out; respect motion-reduce.
- Notifications: Use toasts for success/error/neutral. Placement: top-right. Duration: 3.5s success/info, 6s error. ARIA live polite/assertive as needed.
- Loading: Buttons show spinner on long operations (>300ms). Disable while loading. Copy changes to reflect action (e.g., "Generating…").

## Header & Navigation

Components: client/components/dashboard/header.tsx, .../notifications-dropdown.tsx, .../ui/sidebar.tsx

1. Search

- Trigger: User types; Enter submits.
- Response: Input reflects value; on Enter, show toast: "Search submitted: <query>".
- Destination: (current) stays on page; future: route to results.
- Content: Toast success: "Showing results for '<query>'".
- Edge: Empty query → toast error: "Please enter a search term." No redirect.

2. Notifications

- Trigger: Click bell.
- Response: Dropdown opens; unread badge visible; "Mark all read" available.
- Destination: Dropdown; "View all" future route (/notifications).
- Content: Mark all read button label: "Mark all read"; item titles and descriptions as provided.
- Edge: No items → placeholder "You're all caught up."; Offline → toast error: "Unable to load notifications."

3. User Menu

- Trigger: Click avatar/name.
- Response: Menu opens with Help & Account items from menu-config.
- Destination: External/internal links per item.
- Content: Item labels from configuration.
- Edge: Link failure → toast error: "Couldn’t open link."

4. Sidebar Navigation

- Trigger: Click item or use arrow keys/Enter when focused.
- Response: Route changes; active state updates; tooltip on collapsed state.
- Destination: Target route.
- Content: Tooltip = item label.
- Edge: Route not found → show NotFound page.

## Dashboard

File: client/components/dashboard/dashboard-content.tsx

- Page header
  - Trigger: Scroll.
  - Response: Sticky header remains visible.
  - Content: Title "Dashboard", subtitle "View all your key metrics and data here".

- Tabs
  - Trigger: Click a TabsTrigger.
  - Response: Active underline; relevant panel shown.
  - Destination: In-page panel switch.
  - Edge: Keyboard nav via Left/Right; Home/End jump ends.

## Transactions

Files: .../transactions/transactions-content.tsx

- Filters (Confidence/Status)
  - Trigger: Click filter chip button.
  - Response: Active style; table filtered.
  - Content: Button text is filter value; toast info: "Filter applied: <name>" (optional).
  - Edge: No results → empty state in table: "No transactions match the filters."

- Bulk Actions (Filters, Bulk Tag, AI Classify)
  - Trigger: Click button.
  - Response: Open filter panel (future), tag modal, or show classification progress.
  - Content:
    - Filters: "Filters"
    - Bulk Tag: modal title "Bulk Tag Transactions"; primary "Apply Tags"; cancel "Cancel".
    - AI Classify: toast "AI classification started"; success "AI classification complete"; error "AI classification failed".
  - Edge: None selected → toast error: "Select transactions to tag."; Long run: show progress toast.

- Table Row Actions
  - Trigger: Click row or row action.
  - Response: Row highlights; actions menu opens.
  - Destination: Detail (future) or inline actions.

- Insights/Flags Cards
  - Trigger: Click "Hide Legend" or "View All".
  - Response: Toggle legend visibility; navigate to Data Anomaly Detection (/data-anomaly-detection).

## Wallets & Exchanges

Files: client/pages/Wallets.tsx, .../wallets/wallets-content.tsx

- Add Wallet / Add Exchange
  - Trigger: Click in header.
  - Response: Navigate to /wallet-ingestion.
  - Content: Button labels as shown.

- Wallet/Exchange Cards
  - Trigger: Click arrow button.
  - Response: Navigate to detail page (future) or show toast: "Opening <name>".
  - Edge: Syncing status shows blue icon; error shows red icon with tooltip "Sync error".

- Add New Connection Card
  - Trigger: Click card.
  - Response: Navigate to /wallet-ingestion.

## Clients

File: .../clients/clients-content.tsx

- Header actions
  - Filters: Opens inline filter panel (future); toast: "Filters coming soon" now.
  - Add Client: Opens modal: Title "Add Client"; fields: Name (required), Type; Primary "Create".
  - Success: Toast "Client created"; close modal.
  - Edge: Missing name → inline error: "Client name is required."

- Tabs (Clients/Users/Tax Entities/Permissions)
  - Trigger: Click tab.
  - Response: Switch panel.

- Table
  - Trigger: Row selection checkbox / Select All.
  - Response: Selection state updates; bulk bar appears when >0 selected.
  - Bulk actions: "Delete", "Export" with confirmation dialog.
  - Edge: 0 selected → disable bulk actions.

- Pagination
  - Trigger: Prev/Next or page number.
  - Response: Table page changes.

## Exports

File: .../exports/exports-content.tsx

- Year selection
  - Trigger: Click year button.
  - Response: Active style; cards/tables reflect year.

- View Audit Trail
  - Trigger: Click link button.
  - Response: Navigate to /audit (future) or toast "Audit trail coming soon".

- Export History
  - Trigger: Click button.
  - Response: Open modal listing recent exports.
  - Content: Title "Export History"; Close.

- Generate Now
  - Trigger: Click button.
  - Response: Button enters loading; after success show toast success "Export generated" and download starts.
  - Edge: Validation error → toast error with reason; network error → retry CTA.

- Configuration / Data Validation
  - Trigger: Interact with forms.
  - Response: Live validation; save button enables when changed.

## Rule Engine

File: .../rule-engine/rule-engine-content.tsx

- Tabs (All, Merge, Income, Expense, Split)
  - Trigger: Click tab.
  - Response: Table filters by type.

- View Audit Log
  - Trigger: Click button.
  - Response: Navigate to audit page (future) or toast info.

- New Rule
  - Trigger: Click button.
  - Response: Open CreateRuleModal.
  - Content: Title "Create Rule"; fields: Name, Type, Conditions, Actions; Primary "Create Rule"; Secondary "Cancel".
  - Success: Toast "Rule created"; table refreshes.
  - Edge: Invalid condition → inline error; Conflicts detected → show conflicts panel with CTA "Resolve".

- Active Rules Table
  - Trigger: Row menu actions (Edit, Delete).
  - Response: Edit opens modal with prefilled values; Delete opens confirm dialog.
  - Confirm copy: Title "Delete rule?"; Body "This action cannot be undone."; Primary "Delete"; Secondary "Cancel".

## Data Anomaly Detection

File: .../data-anomaly-detection-content.tsx

- Header actions
  - Filters: Opens inline filters panel; Content labels as displayed.
  - Alert Settings: Opens modal "Anomaly Alerts" with toggles and thresholds; Save/Cancel.
  - Resolve All: Confirmation dialog then bulk resolve. Success toast: "All issues resolved".

- Filter Chips
  - Trigger: Click a chip.
  - Response: Chip becomes active; table filters.

- Issues Table
  - Trigger: Click row.
  - Response: Open AnomalyIssueDetails view; Close returns to list.

## IRS Form 8949

Files: .../irs-8949/irs-8949-content.tsx

- Year select
  - Trigger: Change Select.
  - Response: Data refreshes for year.

- Filters / Export Form
  - Trigger: Click Filter → open filters panel; Click Export → generate CSV/PDF.
  - Success toast: "Form 8949 exported".

- Tabs (Part I, Part II, Summary)
  - Trigger: Click tabs.
  - Response: Panels switch.

- Table row menu (View, Edit, Delete)
  - Trigger: Click row action menu.
  - Response: View opens details drawer; Edit opens modal; Delete confirm dialog.

## Gain/Loss Report

Files: .../gain-loss/gain-loss-content.tsx

- Year select / Filters / Export Report
  - Same patterns as 8949; success toast: "Report exported".

- Tabs (Summary, By Asset, Timeline, Tax Lots)
  - Trigger: Click tabs; Response: panel switches. Charts animate 200ms.

- Cards
  - Trigger: Click metric card → filter table below by that metric (optional enhancement).

## Wallet Ingestion

Files: .../wallet-ingestion/\*

- Upload Area
  - Trigger: Drag & drop or click "Upload".
  - Response: Show file preview; validate schema.
  - Errors: Invalid format → inline error "Unsupported file type."

- Steps (Review → Mapping → Validation → Recent Uploads)
  - Trigger: Click Next/Back.
  - Response: Step advances with progress indicator.
  - Success: Toast "Import completed"; navigate to Transactions.

## Tables, Cards, Forms

- Table behaviors: Sortable columns (if enabled), sticky headers, responsive overflow with horizontal scroll on small screens.
- Cards: Hover shadow increase; clickable regions use role=button and focus styles.
- Forms: Required fields marked; real-time validation where possible; helper text below inputs; error text in red 600.

## Transitions & Timing

- Dropdowns/Menus: 150ms fade/scale.
- Modals/Drawers: 200ms slide/fade; focus trapped; Esc closes.
- Navigation: Route change without page scroll reset for sticky headers.

## Accessibility

- ARIA labels for icon-only buttons (e.g., notifications, row actions).
- Live regions used for async operation status.
- Color contrast adheres to AA (or AAA where feasible).
