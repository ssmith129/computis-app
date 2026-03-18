# Builder.io Design Generation Guide — Computis

## Stated Assumptions

1. **Builder.io plan tier:** Business or Enterprise plan with access to Design Tokens, Custom Components, Symbols, Content Models, Responsive Breakpoints, and CSS property bindings. Visual Editor with code export is available.
2. **Component architecture:** Computis uses React with Tailwind CSS and shadcn/ui primitives. Builder.io integration is via the `@builder.io/react` SDK, registering Custom Components that wrap existing React components. Symbols are used for reusable layout fragments (page headers, navigation). Custom Components are used for atomic UI elements (Button, Input, Badge, Tabs).
3. **Design token system:** Tokens are defined as CSS custom properties in `global.css` (HSL-format color values, rem-based spacing and typography scales) and extended via `tailwind.config.ts`. Builder.io Design Tokens will mirror these CSS variables so that visual edits in the Builder.io editor resolve to the same token system. Token names follow the existing convention: `--primary`, `--font-size-body-md`, `--space-4`, `--button-height-md`, etc.
4. **Responsive breakpoints:** Builder.io breakpoints are configured to match the Computis layout system — **Mobile**: < 768px, **Tablet**: 768px–1023px, **Desktop**: ≥ 1024px. The unused Tailwind custom breakpoints (`ipad: 834px`, `ipad-landscape: 1194px`, `desktop: 1920px`) are intentionally excluded from the Builder.io configuration.
5. **Content scope:** This guide covers all 18 pages and 60+ components identified across both audit documents. Where the two source documents diverge in issue count (the markdown document identifies 20 consolidated findings labeled F-001 through F-020; the DOCX document enumerates 47 distinct inconsistency patterns across 13 sections), this guide maps every discrete finding from both to an actionable directive. Directive IDs reference both the markdown finding codes (F-XXX) and the DOCX section numbers (§X.X).

---

## How to Use This Guide

Feed individual category sections (or the full document) into Builder.io's design generation prompt field when creating or editing Sections, Symbols, or page layouts. Each directive is written as an executable instruction: paste the **Builder.io Action** text directly as a generation constraint. For batch operations, group directives by the page or Symbol being edited and include all relevant directives in a single prompt to ensure they are applied atomically rather than in conflicting sequence.

---

## 1. Design Tokens & Global Configuration

### 1.1 Register Canonical Design Token Set in Builder.io — P0
- **Audit ref:** F-003 (typography bypass, 99:1 ratio), F-004 (color bypass, 80+ instances), §4 (design token bypass)
- **Issue:** The existing design token system is defined in CSS but 99% of component implementations hardcode Tailwind utility values instead of referencing tokens, making the token system inert.
- **Builder.io Action:** In Builder.io Settings → Design Tokens, register the following token groups exactly as defined in `global.css :root`. **Typography:** `font-size-display-lg: 1.5rem`, `font-size-display-sm: 1.25rem`, `font-size-heading-lg: 1.125rem`, `font-size-heading-md: 1rem`, `font-size-heading-sm: 0.875rem`, `font-size-body-lg: 0.9375rem`, `font-size-body-md: 0.875rem`, `font-size-body-sm: 0.8125rem`, `font-size-caption: 0.75rem`, `font-size-overline: 0.6875rem`. **Spacing:** `space-1: 0.25rem`, `space-2: 0.5rem`, `space-3: 0.75rem`, `space-4: 1rem`, `space-5: 1.25rem`, `space-6: 1.5rem`, `space-8: 2rem`. **Component sizing:** `button-height-sm: 2rem`, `button-height-md: 2.25rem`, `button-height-lg: 2.75rem`, `input-height-sm: 2rem`, `input-height-md: 2.25rem`, `input-height-lg: 2.75rem`, `table-row-height: 2.5rem`, `card-padding-compact: 0.75rem`, `card-padding-standard: 1rem`, `card-padding-featured: 1.25rem`. **Border radius:** `radius-sm: 0.25rem`, `radius-md: 0.375rem`, `radius-lg: 0.5rem`, `radius-xl: 0.75rem`. **Shadows:** `shadow-xs: 0 1px 2px rgba(0,0,0,0.05)`, `shadow-sm: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)`, `shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)`.
- **Expected Result:** Every visual property in the Builder.io editor references a named token. Changing a token value propagates to all components consuming it without touching individual component code.

### 1.2 Register Semantic Color Token Palette — P0
- **Audit ref:** F-004 (semantic color bypass), F-018 (duplicate status tokens), F-019 (mixed hex/HSL formats), §6.1 (duplicate status systems), §6.2 (30+ hardcoded colors), §6.3 (hex values in CSS)
- **Issue:** Two overlapping status color token sets exist (`--success` vs `--status-success`) with conflicting warning values (38% vs 44% lightness). Seven additional hex-format color variables (`--blue-500` through `--purple-500`) coexist alongside the HSL system and do not match their HSL counterparts.
- **Builder.io Action:** In Design Tokens → Colors, register a single canonical set: **Primary:** `primary: hsl(218 91% 45%)`, `primary-hover: hsl(218 91% 40%)`, `primary-light: hsl(213 97% 87%)`, `primary-foreground: hsl(0 0% 100%)`. **Semantic status:** `success: hsl(142 76% 36%)`, `success-bg: hsl(138 76% 87%)`, `success-text: hsl(142 71% 20%)`. `warning: hsl(32 95% 38%)`, `warning-bg: hsl(48 96% 89%)`, `warning-text: hsl(32 95% 27%)`. `error: hsl(0 84% 60%)`, `error-bg: hsl(0 86% 93%)`, `error-text: hsl(0 71% 30%)`. `info: hsl(201 96% 32%)`, `info-bg: hsl(199 89% 94%)`, `info-text: hsl(201 96% 26%)`. **Neutrals:** `foreground: hsl(0 0% 10%)`, `muted-foreground: hsl(215.4 16.3% 46.9%)`, `background: hsl(0 0% 97%)`, `card: hsl(0 0% 100%)`, `border: hsl(214.3 31.8% 91.4%)`. **Chart colors:** `chart-blue: hsl(218 91% 45%)`, `chart-green: hsl(142 76% 36%)`, `chart-orange: hsl(32 95% 44%)`, `chart-yellow: hsl(48 96% 53%)`, `chart-cyan: hsl(188 86% 53%)`, `chart-red: hsl(0 84% 60%)`. Do NOT register `--status-*` duplicates or `--blue-500` through `--purple-500` hex values. These are deprecated.
- **Expected Result:** A single source of truth for every color in the system. Warning color resolves to `hsl(32 95% 38%)` globally. Chart components reference `chart-*` tokens in HSL format. No hex-format color variables remain.

### 1.3 Configure Builder.io Responsive Breakpoints — P1
- **Audit ref:** F-020 (breakpoint mismatch), §5.2 (clamp() conflict implying viewport-dependent sizing)
- **Issue:** Three custom Tailwind breakpoints (`ipad: 834px`, `ipad-landscape: 1194px`, `desktop: 1920px`) are defined but never used in any component. Meanwhile, `global.css` media queries use 640px/768px/1024px/1920px. The two systems create confusion about which breakpoints to target.
- **Builder.io Action:** In Builder.io Settings → Responsive, define exactly three breakpoints: **Small (Mobile)**: max-width `767px`. **Medium (Tablet)**: min-width `768px`, max-width `1023px`. **Large (Desktop)**: min-width `1024px`. Do not create breakpoints for 834px, 1194px, or 1920px. All Responsive Styles applied to Sections, Boxes, and Columns in the Builder.io editor must target only these three breakpoints.
- **Expected Result:** Builder.io-generated responsive CSS uses the same breakpoints as the existing global.css media queries. No orphaned or unused breakpoint definitions.

### 1.4 Remove Competing clamp() Typography Overrides — P0
- **Audit ref:** F-010 (conflicting CSS typography scaling), §5.2 (CSS clamp() conflict)
- **Issue:** `global.css` applies `clamp()`-based responsive sizing to all h1–h4 elements (h1 ranges 28–36px) AND a dynamic root font-size `clamp(16px, 0.8vw + 12px, 18px)`. These override the fixed design token values (heading-lg: 18px), making token-based typography unpredictable across viewport widths.
- **Builder.io Action:** In any Builder.io Custom Code block or global CSS override, add the following reset to neutralize the competing system: `html { font-size: 16px !important; } h1, h2, h3, h4 { font-size: inherit !important; }`. This restores predictable rem-based token resolution. All heading sizes must then be controlled exclusively via Builder.io Design Tokens (`font-size-display-lg`, `font-size-heading-lg`, etc.) applied as Responsive Styles on the relevant Text or Box block.
- **Expected Result:** A `text-heading-lg` token always resolves to exactly 18px regardless of viewport width. The root font-size is fixed at 16px, making all rem values deterministic.

### 1.5 Set Canonical Font Family — P2
- **Audit ref:** F-017 (font family documentation mismatch), §12.2 (token adoption migration)
- **Issue:** `DESIGN_SYSTEM.md` references "DM Sans" but `tailwind.config.ts` declares "Noto Sans" as the actual sans-serif family. This documentation drift causes developers to specify the wrong font.
- **Builder.io Action:** In Builder.io Design Tokens → Typography, set `font-family-sans: "Noto Sans", system-ui, sans-serif` and `font-family-mono: "JetBrains Mono", "Fira Code", monospace`. Ensure the Builder.io editor's default font picker resolves to "Noto Sans" for all text blocks. Do not reference "DM Sans" anywhere.
- **Expected Result:** Every Text block created in Builder.io uses Noto Sans by default, matching the deployed codebase.

---

## 2. Component Consistency (Symbols & Custom Components)

### 2.1 Consolidate Button into Single Custom Component — P0
- **Audit ref:** F-001 (duplicate button systems), §3.1 (dual button systems with 8-property conflict table), §3.3 (raw HTML buttons)
- **Issue:** Two button components (`Button` and `EnhancedButton`) export conflicting `buttonVariants`, use different sizing systems (token-based 36px vs hardcoded 40px), different transition behaviors, different active states, and different success/warning colors. Additionally, 6+ raw `<button>` HTML elements on the Dashboard bypass both components entirely.
- **Builder.io Action:** Register a single `ComputisButton` Custom Component in Builder.io with the following input props: `variant` (enum: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `success`, `warning`), `size` (enum: `sm`, `md`, `lg`, `icon`), `loading` (boolean), `disabled` (boolean), `leftIcon` (optional slot), `rightIcon` (optional slot). Map size values to Design Tokens: `sm` → `var(--button-height-sm)` (32px), `md` → `var(--button-height-md)` (36px), `lg` → `var(--button-height-lg)` (44px). Set base styles: `border-radius: var(--radius-md)` (6px), `transition: all 200ms ease`, `font-family: var(--font-family-sans)`, `font-weight: 500`. Set interaction states: `hover` → `box-shadow: var(--shadow-sm)`, `active` → `transform: scale(0.98)`, `focus-visible` → `outline: 2px solid var(--ring); outline-offset: 2px`. Map variant colors to semantic tokens: `default` → `background: var(--primary)`, `success` → `background: var(--success)`, `warning` → `background: var(--warning)`, `destructive` → `background: var(--error)`. Set `color: white` for all filled variants. Delete references to `EnhancedButton` and all raw `<button>` elements.
- **Expected Result:** Every button in the Builder.io editor resolves to a single component with consistent 36px default height, 6px border radius, semantic token colors, uniform transition behavior (`all 200ms`), active press feedback (`scale 0.98`), and WCAG-compliant focus rings.

### 2.2 Consolidate Input into Single Custom Component — P0
- **Audit ref:** F-002 (duplicate input systems), §3.2 (dual input systems — 22 lines vs 303 lines)
- **Issue:** `Input` (token-based, no validation UI) and `EnhancedInput` (hardcoded sizing, validation states, password toggle, loading spinner) coexist. Settings page uses `Input`; other forms use `EnhancedInput`. Validation border colors are hardcoded (`border-red-500`) instead of using `--error` tokens.
- **Builder.io Action:** Register a single `ComputisInput` Custom Component in Builder.io with input props: `variant` (enum: `default`, `error`, `success`, `warning`), `size` (enum: `sm`, `md`, `lg`), `label` (string), `description` (string), `errorMessage` (string), `successMessage` (string), `showPasswordToggle` (boolean), `loading` (boolean), `leftIcon` (optional slot), `rightIcon` (optional slot). Map size to Design Tokens: `sm` → `var(--input-height-sm)` (32px), `md` → `var(--input-height-md)` (36px), `lg` → `var(--input-height-lg)` (44px). Set base styles: `border-radius: var(--radius-md)`, `border: 1px solid var(--border)`, `font-size: var(--font-size-body-md)`, `transition: all 200ms ease`. Map validation borders to semantic tokens: `error` → `border-color: var(--error)`, `success` → `border-color: var(--success)`, `warning` → `border-color: var(--warning)`. Set focus style: `ring: 2px solid var(--ring); ring-offset: 2px`. Delete `EnhancedInput` registration.
- **Expected Result:** All form inputs across Settings, Preferences, Wallet Ingestion, and Rule Engine render at identical heights with token-based validation colors that respond to theme changes.

### 2.3 Define Tab Component Variants as Separate Symbols — P1
- **Audit ref:** F-012 (tabs overridden heavily per page), §9 (4 different tab UI patterns)
- **Issue:** The base `Tabs` component (`h-10`, `rounded-md`, `bg-muted`) is overridden differently on every page — Dashboard role tabs use `h-11 rounded-lg bg-gray-100`; Dashboard sub-tabs use transparent background with yellow underline; Settings uses a full-width grid; Gain/Loss uses the standard base.
- **Builder.io Action:** Create three Tab Symbols in Builder.io, each with locked internal styling: **Symbol: PillTabs** — For role/mode selection. Height: `44px`. Background: `var(--gray-100)`. Active indicator: `background: white; box-shadow: var(--shadow-sm)`. Border-radius: `var(--radius-lg)`. Padding: `4px`. **Symbol: UnderlineTabs** — For content section navigation. Height: `auto`. Background: `transparent`. Active indicator: `border-bottom: 2px solid var(--accent)` (gold). No background change on active. **Symbol: SegmentedTabs** — For settings/config. Layout: CSS Grid, equal-width columns. Height: `40px`. Background: `var(--muted)`. Active indicator: `background: white; shadow: var(--shadow-sm)`. Register each as a locked Symbol — page-level className overrides must not alter internal tab styling.
- **Expected Result:** Tabs on Dashboard use PillTabs for role selection and UnderlineTabs for content sub-navigation. Settings uses SegmentedTabs. Gain/Loss, IRS-8949, Exports use UnderlineTabs. No per-page style overrides exist.

### 2.4 Register Status Badge with Token-Bound Variants — P1
- **Audit ref:** F-011 (3 status color patterns), §6.2 (hardcoded status colors on Wallets page)
- **Issue:** Status indicators use three incompatible approaches: the Badge component uses semantic tokens correctly; the Wallets page hardcodes `text-green-600 bg-green-50 border-green-200` via a `getStatusColor()` helper; the Transactions classification uses raw `bg-green-500` / `bg-yellow-500` / `bg-red-500`.
- **Builder.io Action:** Register a `StatusBadge` Custom Component with a `status` prop (enum: `success`, `warning`, `error`, `info`, `neutral`). Bind each variant's colors to Design Tokens: `success` → `background: var(--success-bg); color: var(--success-text); border: 1px solid var(--success)`. `warning` → `background: var(--warning-bg); color: var(--warning-text); border: 1px solid var(--warning)`. `error` → `background: var(--error-bg); color: var(--error-text); border: 1px solid var(--error)`. `info` → `background: var(--info-bg); color: var(--info-text); border: 1px solid var(--info)`. `neutral` → `background: var(--gray-100); color: var(--gray-700)`. Set `border-radius: 9999px` (pill), `font-size: var(--font-size-overline)`, `font-weight: 500`, `padding: 2px 8px`. This replaces all hardcoded `getStatusColor()` functions, inline status classes, and raw progress bar colors.
- **Expected Result:** "Connected" status on Wallets, "High confidence" on Transactions, and anomaly flags on Dashboard all render with identical green/yellow/red values derived from semantic tokens.

---

## 3. Typography & Hierarchy

### 3.1 Enforce Token-Based Typography on All Text Blocks — P0
- **Audit ref:** F-003 (99% of typography bypasses tokens — 597 hardcoded vs 6 token usages), §4 (design token bypass table)
- **Issue:** 410 instances of `text-sm`, 163 of `text-xs`, and 24 of `text-base` hardcode typography sizes instead of using the 10-level token scale.
- **Builder.io Action:** In every Builder.io Section and Symbol, apply typography exclusively via Design Token references. Use this mapping for all Text blocks: **Page titles** → `font-size: var(--font-size-heading-lg)` (18px), `font-weight: 600`, `letter-spacing: -0.01em`, `line-height: 1.375`. **Section headings** → `font-size: var(--font-size-heading-md)` (16px), `font-weight: 600`. **Card titles** → `font-size: var(--font-size-heading-sm)` (14px), `font-weight: 500`. **Body text (default)** → `font-size: var(--font-size-body-md)` (14px), `line-height: 1.5`. **Dense/compact UI text** → `font-size: var(--font-size-body-sm)` (13px). **Labels and captions** → `font-size: var(--font-size-caption)` (12px), `letter-spacing: 0.01em`. **Overlines/eyebrows** → `font-size: var(--font-size-overline)` (11px), `font-weight: 500`, `letter-spacing: 0.05em`, `text-transform: uppercase`. **Stat/metric values** → `font-size: var(--font-size-display-sm)` (20px), `font-weight: 700`, `letter-spacing: -0.02em`. Do NOT use Tailwind classes `text-sm`, `text-xs`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, or `text-3xl` in any Builder.io-generated output.
- **Expected Result:** Changing `--font-size-body-md` from `0.875rem` to `0.9375rem` in Design Tokens updates all body text across every page simultaneously.

### 3.2 Standardize Page Title Pattern Across All Pages — P0
- **Audit ref:** F-005 (text-gray-900 vs text-foreground on h1), F-006 (Dashboard uses text-xl sm:text-2xl while others use text-2xl), §5.1 (three h1 patterns across 18 pages)
- **Issue:** Page titles use three conflicting patterns: Dashboard uses `text-xl sm:text-2xl text-gray-900` (responsive, hardcoded color); Wallets uses `text-2xl text-gray-900` (hardcoded color); 10+ other pages use `text-2xl text-foreground` (semantic color). Data Anomaly detail uses `text-xl font-semibold` (different weight). None use the defined `text-heading-lg` token.
- **Builder.io Action:** Create a `PageTitle` Symbol containing a single Text block with these locked styles: `font-size: var(--font-size-heading-lg)` (18px) at all breakpoints (no responsive size change), `font-weight: 700`, `color: var(--foreground)`, `letter-spacing: -0.01em`, `line-height: 1.375`. The Symbol accepts a `title` Content Binding (string). Apply this Symbol to the titlebar Section of every page: Dashboard, Transactions, Wallets, Wallet Ingestion, Settings, Preferences, Gain/Loss, IRS-8949, Exports, Rule Engine, Clients, Data Anomaly Detection, Users Management, Permissions, Tax Entities, Help, My Account, and Design System Showcase. Do not use `text-gray-900` anywhere — always `var(--foreground)`.
- **Expected Result:** Every page title renders at 18px/700/foreground with no per-page deviation. Dark mode switches `--foreground` to a light color; no page shows black-on-dark text.

### 3.3 Standardize Page Subtitle Pattern — P1
- **Audit ref:** F-007 (subtitle color fragmentation — 3 patterns), §5.1 (subtitle inconsistency implied)
- **Issue:** Page subtitles use `text-gray-500` (Dashboard, Wallets), `text-muted-foreground` (most other pages), or `text-gray-500 mt-1` with an extra explicit margin (Wallets only). These resolve to different HSL values (`hsl(220 9% 46%)` vs `hsl(215.4 16.3% 46.9%)`).
- **Builder.io Action:** Extend the `PageTitle` Symbol to include a subtitle Text block beneath the title with: `font-size: var(--font-size-body-md)` (14px), `font-weight: 400`, `color: var(--muted-foreground)`, `margin-top: 4px`. The subtitle accepts a `subtitle` Content Binding (string). Remove all hardcoded `text-gray-500` references on page descriptions. Do not apply explicit `mt-1` margins — the 4px margin is baked into the Symbol.
- **Expected Result:** All page subtitles render in `muted-foreground` at 14px with consistent 4px top margin. Color adapts correctly in dark mode.

### 3.4 Use Monospace Token for Financial Data — P2
- **Audit ref:** §4 (token bypass includes spacing/typography), component inventory showing `font-mono` used inconsistently
- **Issue:** Wallet addresses, transaction amounts, and table values inconsistently apply `font-mono`. Some use `font-mono text-xs`, others `font-mono text-sm`, and chart tooltips use `font-mono font-medium tabular-nums`.
- **Builder.io Action:** For any Text block displaying crypto addresses, hash values, transaction amounts, or tabular numeric data, apply: `font-family: var(--font-family-mono)`, `font-size: var(--font-size-body-sm)` (13px), `font-variant-numeric: tabular-nums`. Do not mix mono font with `text-xs` or `text-sm` — always use the `body-sm` token.
- **Expected Result:** All monospaced financial data renders at a uniform 13px with tabular number spacing for column alignment.

---

## 4. Color System & Theming

### 4.1 Replace All Hardcoded Color Classes with Token References — P0
- **Audit ref:** F-004 (systematic bypass of semantic color tokens — 80+ instances), §6.2 (30+ hardcoded color instances with specific file listing)
- **Issue:** Components use `bg-blue-600`, `bg-green-600`, `bg-green-500`, `bg-red-500`, `bg-red-600`, `bg-yellow-500`, `bg-purple-600` instead of `var(--primary)`, `var(--success)`, `var(--error)`, `var(--warning)`.
- **Builder.io Action:** In every Builder.io Section, Symbol, and Custom Component, enforce this color mapping for all `background-color`, `color`, and `border-color` properties: `bg-blue-600` / `bg-blue-700` → `var(--primary)` / `var(--primary-hover)`. `bg-green-600` / `bg-green-500` → `var(--success)`. `bg-red-500` / `bg-red-600` → `var(--error)`. `bg-yellow-500` → `var(--warning)`. `bg-purple-600` → create a `var(--chart-purple)` token if needed, or remove. `text-gray-900` → `var(--foreground)`. `text-gray-500` → `var(--muted-foreground)`. `text-green-600` / `text-red-600` / `text-blue-600` → `var(--success)` / `var(--error)` / `var(--info)`. Any color not in the Design Token set must not appear in Builder.io output.
- **Expected Result:** Changing `--primary` from `hsl(218 91% 45%)` to any other value updates every button, link, and brand element simultaneously. Dark mode theming requires only token-level changes.

### 4.2 Eliminate Duplicate Status Token Set — P1
- **Audit ref:** F-018 (duplicate status token sets), §6.1 (warning color conflict — 38% vs 44% lightness)
- **Issue:** `--status-success`, `--status-warning`, `--status-error`, `--status-info` duplicate the semantic set with a conflicting warning value.
- **Builder.io Action:** In Builder.io Design Tokens, register ONLY the semantic set (`success`, `warning`, `error`, `info` with `-bg` and `-text` variants). Do not register any token with the `status-` prefix. If any existing Builder.io Symbol or Content entry references `var(--status-warning)` or similar, rebind it to `var(--warning)`. Standardize warning on `hsl(32 95% 38%)` (higher contrast, WCAG AA compliant).
- **Expected Result:** One warning color exists system-wide. No `--status-*` tokens appear in any Builder.io output.

### 4.3 Remove Hex-Format Color Variables — P2
- **Audit ref:** F-019 (mixed CSS format — 7 hex values alongside HSL system), §6.3 (direct hex values in CSS lines 161–167)
- **Issue:** `--blue-500: #3b82f6` through `--purple-500: #8b5cf6` use hex format and their values differ from the HSL chart tokens (`--chart-blue` resolves to `#0B5ED7`, not `#3b82f6`).
- **Builder.io Action:** Do not register `--blue-500`, `--green-500`, `--orange-500`, `--yellow-500`, `--cyan-500`, `--red-500`, or `--purple-500` as Design Tokens. Any Builder.io chart component or animated element that needs these colors must reference the `chart-*` token set (`chart-blue`, `chart-green`, `chart-orange`, `chart-yellow`, `chart-cyan`, `chart-red`) which are defined in HSL format and participate in the theming system.
- **Expected Result:** No hex-format color variables exist in the Builder.io token registry. All chart/animation colors use the HSL-based `chart-*` tokens.

---

## 5. Layout & Spacing

### 5.1 Create Standardized Page Layout Symbol — P0
- **Audit ref:** F-009 (page content padding inconsistency — 3 patterns), §7.1 (page content padding), §8 (page header inconsistencies — 4 different padding/layout patterns), §12.4 (standardized page template recommendation)
- **Issue:** Dashboard uses `p-4 sm:p-6` (responsive); most pages use `p-6` (fixed); Rule Engine uses `p-4` (smaller). Header layouts vary between `flex-col` (Dashboard), `flex justify-between` (Settings, Wallets), and different padding values.
- **Builder.io Action:** Create a `PageLayout` Symbol in Builder.io with two named slots: `titlebar` and `content`. **Titlebar Section:** Use a `Box` block with `padding: 16px` at Mobile breakpoint, `padding: 24px` at Tablet and Desktop breakpoints. Internal layout: `display: flex; flex-direction: column; gap: 4px`. Include sub-slots for `title` (PageTitle Symbol), `subtitle` (Text block), and `actions` (horizontal Box, `display: flex; gap: 12px; align-items: center`, positioned via `justify-content: space-between` at Desktop, stacked below title at Mobile). Add `border-bottom: 1px solid var(--border)` and `position: sticky; top: 0; z-index: 40; background: var(--background)`. **Content Section:** Use a `Box` with `padding: 16px` at Mobile, `padding: 24px` at Tablet/Desktop. Internal spacing: `display: flex; flex-direction: column; gap: 24px`. Apply this Symbol as the wrapper for every page.
- **Expected Result:** Navigating between any two pages shows zero horizontal content shift. Titlebar and content padding are always 16px on mobile, 24px on tablet/desktop.

### 5.2 Standardize Card Padding via Token-Bound Symbols — P1
- **Audit ref:** F-013 (arbitrary padding — 5 values from p-3 to p-8, 50+ overrides), §7.2 (card padding fragmentation)
- **Issue:** Card content uses `p-3`, `p-4`, `p-5`, `p-6`, and `p-8` with no correlation to card purpose. The design system defines three tokens (`compact: 12px`, `standard: 16px`, `featured: 20px`) but these are overridden everywhere.
- **Builder.io Action:** Register three Card Symbols in Builder.io: **CompactCard** — `padding: var(--card-padding-compact)` (12px). Use for: stat/metric cards, table filter bars, dense data displays. **StandardCard** — `padding: var(--card-padding-standard)` (16px). Use for: form sections, data tables, standard content areas. **FeaturedCard** — `padding: var(--card-padding-featured)` (20px). Use for: hero sections, primary CTA areas, onboarding prompts. All three share: `background: var(--card)`, `border: 1px solid var(--border)`, `border-radius: var(--radius-lg)` (8px), `box-shadow: var(--shadow-xs)`. Do not allow `p-5`, `p-6`, or `p-8` as overrides on any Card block in the Builder.io editor. Wallet stat cards, Dashboard role view cards, and upload area cards must use the appropriate Card Symbol — not a generic Box with ad-hoc padding.
- **Expected Result:** Every card on every page uses one of three padding tiers. `p-0` overrides followed by re-applied custom padding no longer appear.

### 5.3 Standardize Section Gap Spacing — P1
- **Audit ref:** §7.2 (spacing tokens defined but unused), §12.4 (section spacing: space-y-6 recommendation)
- **Issue:** Vertical spacing between page sections uses inconsistent values — `space-y-4`, `space-y-6`, raw `mb-3`, `mb-4`, `mt-5` — with no mapping to the defined `gap-dense` (8px) / `gap-comfortable` (16px) / `gap-spacious` (24px) tokens.
- **Builder.io Action:** In every Builder.io page Section, set vertical gap between child blocks using Design Tokens only: **Within cards (dense)** → `gap: var(--space-2)` (8px). **Between card groups on a page** → `gap: var(--space-6)` (24px). **Between form fields within a card** → `gap: var(--space-4)` (16px). Do not use arbitrary margin-bottom or margin-top values on individual blocks.
- **Expected Result:** Consistent visual rhythm between sections. Changing `--space-6` adjusts all section gaps simultaneously.

---

## 6. Responsive Behavior

### 6.1 Apply Responsive Padding to PageLayout Symbol — P0
- **Audit ref:** F-009 (padding inconsistency), §8 (page header inconsistencies — Dashboard responsive vs others fixed)
- **Issue:** Only Dashboard uses responsive `p-4 sm:p-6`; all other pages use fixed `p-6`, causing wasted space on mobile and inconsistency across pages.
- **Builder.io Action:** In the `PageLayout` Symbol (directive 5.1), set Responsive Styles on both titlebar and content Box blocks: **Mobile (< 768px):** `padding: 16px`. **Tablet (768–1023px):** `padding: 24px`. **Desktop (≥ 1024px):** `padding: 24px`. These responsive values are locked inside the Symbol — individual pages must not override them.
- **Expected Result:** Every page automatically gains responsive padding. Mobile views show 16px padding; tablet/desktop show 24px. No per-page responsive padding logic is needed.

### 6.2 Set Responsive Grid Columns for Dashboard and Wallet Cards — P1
- **Audit ref:** §8 (page header layout varies), component inventory (DashboardContent uses variable grid layouts)
- **Issue:** Dashboard stat cards, wallet cards, and anomaly overview cards use different grid configurations: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`, `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`, etc.
- **Builder.io Action:** Create a `MetricGrid` Symbol using a Builder.io `Columns` block with Responsive Styles: **Mobile:** 1 column, `gap: 12px`. **Tablet:** 2 columns, `gap: 16px`. **Desktop:** 4 columns, `gap: 16px`. Use this Symbol for Dashboard stat rows, Wallets overview stats, Export summary cards, and Anomaly overview cards. For Wallet card grids (which may exceed 4 items), use a CSS Grid Box with `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` and `gap: 16px` at all breakpoints.
- **Expected Result:** All metric/stat card grids follow the same responsive column pattern. No page defines its own grid-cols responsive classes.

---

## 7. Visual Design & Polish

### 7.1 Unify Border Radius Across Interactive Elements — P1
- **Audit ref:** F-016 (mixed border radius — 4 values on interactive elements), §10 (border radius: buttons = rounded-md, cards = rounded-lg, raw buttons = rounded-lg, badges = rounded-full)
- **Issue:** Buttons use `rounded-md` (6px), cards use `rounded-lg` (8px), raw Dashboard buttons use `rounded-lg` (8px), input fields use `rounded-md` (6px). The Tailwind config maps both `xs` and `sm` to `--radius-sm`, creating a redundant alias.
- **Builder.io Action:** In Builder.io, enforce this border-radius mapping for all blocks: **Interactive elements (buttons, inputs, selects):** `border-radius: var(--radius-md)` (6px). **Container elements (cards, modals, sheets, popovers):** `border-radius: var(--radius-lg)` (8px). **Pill elements (badges, tags, status indicators):** `border-radius: 9999px`. **Tab containers:** `border-radius: var(--radius-lg)` (8px). Do not use `rounded-lg` on buttons or `rounded-md` on cards. Remove the redundant `radius-xs` alias — use `radius-sm` (4px) only for small checkbox/radio elements.
- **Expected Result:** Buttons and inputs share 6px radius. Cards and containers share 8px radius. No mismatch between CTAs and their parent containers.

### 7.2 Standardize Icon Sizing by Context — P1
- **Audit ref:** F-014 (4 icon size patterns in similar contexts), §10 (3 sizes: h-3.5, h-4, h-5 with no documented mapping)
- **Issue:** Page header action icons use `h-4 w-4` (16px); wallet status icons use `h-3.5 w-3.5` (14px); card header icons in Settings use `h-5 w-5` (20px); notification badge icons have no explicit size (default 24px).
- **Builder.io Action:** Register icon size tokens in Builder.io Design Tokens: `icon-sm: 14px` (for inline status indicators within badges/pills), `icon-md: 16px` (default — for buttons, form controls, table actions, navigation items), `icon-lg: 20px` (for card section headers and standalone decorative icons). In every Custom Component and Symbol that renders an icon, bind `width` and `height` to the appropriate icon token. Never leave an icon without an explicit size (Lucide icons default to 24px when unspecified, which is too large for most Computis UI contexts).
- **Expected Result:** All button icons are 16×16px. All status badge icons are 14×14px. All card section header icons are 20×20px. No icon renders at its default 24px.

### 7.3 Standardize Box Shadow Usage — P2
- **Audit ref:** F-015 (EnhancedButton adds hover:shadow-md; Button and raw buttons have no hover shadow), §3.1 (hover shadow inconsistency)
- **Issue:** Hover shadow treatment is inconsistent — `EnhancedButton` adds `shadow-md` on hover while `Button` and raw buttons add none.
- **Builder.io Action:** In the unified `ComputisButton` Custom Component (directive 2.1), set hover state to: `box-shadow: var(--shadow-sm)` (subtle, not `shadow-md`). For cards, set: base `box-shadow: var(--shadow-xs)`, hover `box-shadow: var(--shadow-sm)`. Do not use `shadow-md` or `shadow-lg` on hover for interactive elements — reserve these for modals and popovers.
- **Expected Result:** Buttons show a consistent subtle shadow lift on hover. Cards show a slightly elevated shadow. Shadow intensity scales logically: xs (base) → sm (hover) → md (elevated) → lg (overlay).

---

## 8. Interaction States & Accessibility

### 8.1 Apply Uniform Focus Ring to All Interactive Elements — P0
- **Audit ref:** F-008 (raw HTML buttons lack focus rings — WCAG 2.4.7 failure), §3.3 (raw buttons missing focus rings and aria attributes), §10 (focus ring: Button has ring-offset-2, raw buttons have none, EnhancedButton adds scale)
- **Issue:** 6+ raw `<button>` elements on the Dashboard have no `:focus-visible` styles, failing WCAG 2.4.7 (Focus Visible). The `Button` component has `ring-2 ring-ring ring-offset-2`; `EnhancedButton` also has it; raw buttons have nothing.
- **Builder.io Action:** In Builder.io Global Styles (or in every Custom Component and Symbol that contains a clickable element), apply a universal focus style: `*:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; border-radius: inherit; }`. This must apply to: all `ComputisButton` instances, all `ComputisInput` instances, all `a[href]` links, all `TabsTrigger` elements, all checkbox and toggle controls. Do NOT rely on individual component `:focus` styles — use the global rule to guarantee coverage. Remove all raw `<button>` elements from Builder.io content and replace with the `ComputisButton` Custom Component.
- **Expected Result:** Keyboard-tabbing through any page shows a consistent 2px blue focus ring on every interactive element. No interactive element is skipped or shows no ring.

### 8.2 Unify Button Transition and Active State Behavior — P1
- **Audit ref:** F-015 (3 transition patterns: transition-colors, transition-all 200ms, and transition-colors on raw buttons), §3.1 (EnhancedButton has active:scale-95, Button has none), §10 (loading states: EnhancedButton has Loader2, Button has none)
- **Issue:** Clicking `Button` produces no press feedback. Clicking `EnhancedButton` produces a scale-down animation. Raw buttons produce nothing. Loading is only available on `EnhancedButton`.
- **Builder.io Action:** In the unified `ComputisButton` Custom Component (directive 2.1), set: `transition: all 200ms ease` (covers color, shadow, and transform). `:hover` → `box-shadow: var(--shadow-sm)`. `:active` → `transform: scale(0.98)` (subtle — not 0.95 which is too aggressive). `loading: true` → display `Loader2` spinner icon (16×16px), set `cursor: not-allowed`, reduce `opacity: 0.7`. These behaviors are embedded in the Custom Component registration, not applied as per-instance style overrides.
- **Expected Result:** Every button on every page responds identically to hover (shadow), press (scale), and loading (spinner). No button is inert on interaction.

### 8.3 Ensure Disabled State Consistency — P1
- **Audit ref:** §3.3 (raw buttons lack disabled state handling), §10 (loading/disabled gaps)
- **Issue:** Raw HTML buttons have no disabled state styling or aria handling. The two button components implement disabled differently (`disabled:opacity-50` vs `disabled:pointer-events-none disabled:opacity-50`).
- **Builder.io Action:** In the `ComputisButton` Custom Component, set disabled state: `opacity: 0.5`, `pointer-events: none`, `cursor: not-allowed`, `aria-disabled: true`. When `loading` is `true`, treat the button as disabled (apply same styles). In the `ComputisInput` Custom Component, set disabled state: `opacity: 0.5`, `cursor: not-allowed`, `background: var(--muted)`. These are locked in the component definition — page-level overrides cannot alter disabled behavior.
- **Expected Result:** All disabled buttons are visually identical (50% opacity, no pointer events). All disabled inputs show a muted background. Assistive technologies correctly identify disabled state.

---

## 9. Content Model & Page Structure

### 9.1 Create Page Header Content Model — P1
- **Audit ref:** §8 (page header inconsistencies — 4 different patterns), §12.4 (standardized page template)
- **Issue:** Page headers vary in structure: Dashboard has no action buttons and wraps tabs inside the titlebar; Settings has "Reset" and "Save" buttons; Wallets has "Add Wallet" and "Add Exchange"; Rule Engine has "Create Rule". There is no shared Content Model governing what a page header contains.
- **Builder.io Action:** In Builder.io → Models, create a `PageHeader` Content Model with fields: `title` (string, required), `subtitle` (string, optional), `actions` (list of references to `ComputisButton` components, optional), `tabNavigation` (reference to a Tab Symbol, optional — renders below title/subtitle but inside the titlebar sticky area). In the `PageLayout` Symbol (directive 5.1), bind the titlebar slot to this Content Model. Each page's Builder.io content entry populates the model fields rather than constructing ad-hoc header HTML.
- **Expected Result:** Adding a new page requires only filling in the PageHeader model fields. Layout, spacing, sticky behavior, and responsive padding are inherited automatically from the PageLayout Symbol.

### 9.2 Create Metric Card Content Model — P2
- **Audit ref:** §7.2 (card padding fragmentation), Wallets stat cards, Dashboard stat cards, Exports summary cards all follow the same pattern but implement differently
- **Issue:** Multiple pages render "big number + label" stat cards with inconsistent padding, font sizes, and layout.
- **Builder.io Action:** In Builder.io → Models, create a `MetricCard` Content Model with fields: `value` (string — e.g., "521", "$32,300", "4"), `label` (string — e.g., "Total Transactions"), `icon` (optional image/SVG reference), `trend` (optional enum: `up`, `down`, `neutral`), `trendValue` (optional string — e.g., "+12%"). Bind to a `MetricCard` Symbol using `CompactCard` (12px padding): value rendered at `font-size: var(--font-size-display-sm)` (20px), `font-weight: 700`, `color: var(--foreground)`; label at `font-size: var(--font-size-body-sm)` (13px), `color: var(--muted-foreground)`.
- **Expected Result:** Dashboard stat cards, Wallets overview cards, and Export summary cards all render from the same Symbol/Model, eliminating per-page metric card implementations.

---

## 10. Documentation & Governance

### 10.1 Align DESIGN_SYSTEM.md with Builder.io Token Registry — P2
- **Audit ref:** F-017 (font family documentation mismatch — "DM Sans" in docs vs "Noto Sans" in code), §12.2 (token adoption migration map)
- **Issue:** The design system documentation references incorrect font families and outdated component specifications.
- **Builder.io Action:** After all Design Tokens are registered in Builder.io (directives 1.1–1.5), export the token registry as a JSON file via Builder.io's API. Use this as the single source of truth to regenerate `DESIGN_SYSTEM.md`. The document must list: the correct font family ("Noto Sans"), all typography tokens with their values, all color tokens in HSL format only (no hex), all spacing/sizing tokens, and the three responsive breakpoints. Mark the Builder.io token registry as the canonical source — the markdown document is a derived artifact.
- **Expected Result:** `DESIGN_SYSTEM.md` matches the live Builder.io configuration exactly. "DM Sans" appears nowhere.

### 10.2 Flag Hardcoded Values in Builder.io Content Review — P2
- **Audit ref:** F-003 (99% token bypass), F-004 (80+ hardcoded colors), §4 (design token bypass), §13 Phase 4 (ESLint governance)
- **Issue:** Without governance, new Builder.io content will re-introduce hardcoded values.
- **Builder.io Action:** In Builder.io editor configuration, set content validation rules (if available on the plan tier) to flag or block: any `font-size` not referencing a `--font-size-*` Design Token; any `background-color`, `color`, or `border-color` using raw hex or Tailwind class names instead of `var(--*)` tokens; any `padding` or `gap` using pixel values not in the spacing token set. If automated validation is not available, include a "Design System Compliance" checklist in the Builder.io content review workflow: "Does this content use only named Design Tokens for typography, color, and spacing?"
- **Expected Result:** New content created in Builder.io maintains token discipline. The 99:1 hardcoded-to-token ratio does not recur.

---

## Ambiguous Findings

### A.1 Loading State Pattern — Clarification Needed
- **Audit ref:** §10 ("Dashboard uses opacity-50 on entire content area" as loading state), F-015 (EnhancedButton has Loader2, Button has none)
- **Ambiguity:** The audit identifies that the Dashboard applies `opacity-50` to the entire content area during role-view transitions, but does not specify whether this should be replaced with a skeleton loader, a spinner overlay, or preserved as-is. The unified Button gets a spinner for its loading prop, but page-level loading patterns are not fully specified.
- **Clarification needed:** Should a `PageLoadingState` Symbol be created with a specific loading pattern (skeleton, spinner overlay, or opacity fade)? What is the desired page-level loading UX?

### A.2 Dark Mode Token Completeness — Clarification Needed
- **Audit ref:** F-005 and F-007 flag dark mode breakage from hardcoded colors; the global.css `.dark` class defines some overrides but the audit does not fully enumerate dark mode token coverage.
- **Ambiguity:** The audit identifies that `text-gray-900` will fail in dark mode and recommends `text-foreground`, but does not audit whether the full `.dark` token set in global.css is complete or whether additional dark mode tokens are missing (e.g., chart colors, card backgrounds, border colors in dark mode).
- **Clarification needed:** Should a full dark mode token audit be conducted, and should Builder.io Design Tokens include explicit dark-mode overrides for all color tokens?

### A.3 Help Page, My Account, and Design System Showcase — Scope Gap
- **Audit ref:** §14 Appendix lists 18 pages including Help Page, My Account, and Design System Showcase. The markdown report (F-001 through F-020) does not contain page-specific findings for these three pages.
- **Ambiguity:** It is unclear whether these three pages were audited for consistency issues but found compliant, or whether they were out of scope for the detailed finding analysis.
- **Clarification needed:** Should Builder.io directives be created specifically for these three pages, or should they simply inherit the global PageLayout Symbol and token system?
