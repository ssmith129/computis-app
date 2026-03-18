# COMPUTIS Design System Consistency Audit

**Comprehensive UI/UX Findings Report & Recommendations Guide**

| | |
|---|---|
| **Prepared** | March 2026 |
| **Platform** | https://computis.netlify.app/ |
| **Repository** | github.com/ssmith129/computis-app |
| **Scope** | Full-stack design system audit (13 pages, 60+ components) |

---

## Executive Summary

This report documents **20 design system inconsistencies** identified through a comprehensive code-level audit of the Computis crypto tax preparation platform. The audit examined 13 application pages, 60+ UI components, and 1,347 lines of global CSS across the live deployment and source repository.

**The most significant finding is that the design system exists primarily on paper.** While comprehensive design tokens are defined in `global.css` and `tailwind.config.ts`, component implementations overwhelmingly bypass these tokens in favor of hardcoded Tailwind utility classes. Only **1% of typography references** use the defined token system (6 token usages vs 597 hardcoded). Color tokens are similarly underutilized, with 80+ instances of raw color values.

### Severity Summary

| Severity | Count | % of Total | Est. Components Affected |
|----------|-------|------------|--------------------------|
| 🔴 **Critical** | 4 | 20% | All (~60+) |
| 🟠 **High** | 6 | 30% | 30–40 |
| 🔵 **Medium** | 6 | 30% | 15–25 |
| 🟢 **Low** | 4 | 20% | 5–10 |

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Audit Methodology](#audit-methodology)
3. [Findings by Severity](#findings-by-severity)
   - 3.1 [Critical Issues (4)](#31-critical-issues)
   - 3.2 [High Issues (6)](#32-high-issues)
   - 3.3 [Medium Issues (6)](#33-medium-issues)
   - 3.4 [Low Issues (4)](#34-low-issues)
4. [Findings by Category Matrix](#findings-by-category-matrix)
5. [Design System Recommendations](#design-system-recommendations)
6. [Implementation Roadmap](#implementation-roadmap)
7. [Appendix: Component Inventory](#appendix-component-inventory)

---

## Audit Methodology

This audit was conducted through direct source code analysis of the Computis repository and live platform testing. The methodology included:

- Static analysis of all 60+ component files in `client/components/` for pattern deviations
- `grep`-based quantitative analysis of class usage frequency (typography, color, spacing)
- Cross-referencing design tokens defined in `global.css` and `tailwind.config.ts` against actual component usage
- Page-by-page comparison of header patterns, content padding, and interactive element styling
- Review of responsive CSS media queries for breakpoint consistency
- Comparison of `DESIGN_SYSTEM.md` documentation against implemented code

**Pages audited:** Dashboard, Transactions, Wallets, Wallet Ingestion, Settings, Preferences, Gain/Loss, IRS-8949, Exports, Rule Engine, Clients, Data Anomaly Detection, and Design System Showcase.

---

## Findings by Severity

### 3.1 Critical Issues

Issues that fundamentally undermine the design system or create accessibility failures.

---

#### F-001: Duplicate Button Component Systems with Conflicting APIs

| | |
|---|---|
| **Category** | Component Architecture |
| **Severity** | 🔴 Critical |
| **Pages Affected** | System-wide (all pages importing either component) |
| **Frequency** | 2 component files, ~50+ usage instances |

**Description:** Two parallel button components exist: `Button` (`button.tsx`) and `EnhancedButton` (`enhanced-button.tsx`). They export the same named export `buttonVariants`, creating namespace collisions. They use different sizing systems:

- **Button** uses design tokens: `h-btn-md`, `h-btn-sm`, `h-btn-lg`
- **EnhancedButton** uses hardcoded Tailwind values: `h-10`, `h-9`, `h-11`

The default variant in Button references `bg-blue-600` directly instead of the design token `bg-primary`. This creates unpredictable rendering where buttons on the same page can appear at different heights.

**Impact:** Buttons rendered inconsistently across pages; developers cannot rely on a single source of truth.

---

#### F-002: Duplicate Input Component Systems with Divergent Sizing

| | |
|---|---|
| **Category** | Component Architecture |
| **Severity** | 🔴 Critical |
| **Pages Affected** | Settings, Preferences, Wallet Ingestion, Rule Engine |
| **Frequency** | 2 component files, ~30+ form field instances |

**Description:** Two input components co-exist: `Input` (`input.tsx`) uses design tokens (`h-input-md`, `text-body-md`) while `EnhancedInput` (`enhanced-input.tsx`) uses hardcoded Tailwind classes (`h-10`, `h-9`, `h-11`, `text-sm`). The EnhancedInput also hardcodes color values for validation states (`border-red-500`, `border-green-500`, `border-yellow-500`) instead of using the semantic design tokens (`--error`, `--success`, `--warning`). Settings page uses Input while other forms may use EnhancedInput, creating visual mismatches.

**Impact:** Form inputs at different heights/styles on the same page; validation colors inconsistent with design system.

---

#### F-003: Design Token Typography System Almost Entirely Unused

| | |
|---|---|
| **Category** | Typography |
| **Severity** | 🔴 Critical |
| **Pages Affected** | All pages system-wide |
| **Frequency** | 597 hardcoded instances vs 6 token usages (~99:1 ratio) |

**Description:** The design system defines a comprehensive typography scale with 10 semantic tokens (`text-display-lg` through `text-overline`) in `global.css` and `tailwind.config.ts`. However, analysis reveals:

| Source | Count |
|--------|-------|
| `text-sm` (hardcoded) | 410 |
| `text-xs` (hardcoded) | 163 |
| `text-base` (hardcoded) | 24 |
| **Design token classes** | **6** |

This means **99% of typography references bypass the design system entirely**. The defined scale exists only on paper.

**Impact:** Design system provides no actual governance; changes to typography tokens have near-zero effect on the live UI.

---

#### F-004: Systematic Bypass of Semantic Color Tokens

| | |
|---|---|
| **Category** | Color System |
| **Severity** | 🔴 Critical |
| **Pages Affected** | Dashboard, Transactions, Wallets, all chart components |
| **Frequency** | 80+ hardcoded color instances across components |

**Description:** Despite defining semantic color tokens (`--success`, `--warning`, `--error`, `--info` with bg/text variants), components overwhelmingly use raw Tailwind color classes: `bg-blue-600`, `bg-green-600`, `text-red-500`, `bg-yellow-500`, etc.

The `dashboard-content.tsx` alone contains 6+ raw HTML `<button>` elements using `bg-blue-600`, `bg-green-600`, and `bg-purple-600` instead of the `Button` component with semantic variants. The `enhanced-button.tsx` success variant uses `bg-green-600` while the base `button.tsx` uses `bg-success` — different color values for the same semantic intent.

**Impact:** Theme changes or dark mode implementation would require modifying hundreds of individual files instead of token values.

---

### 3.2 High Issues

Issues that significantly impact usability, brand consistency, or dark mode readiness.

---

#### F-005: Page Title Color Inconsistency (text-gray-900 vs text-foreground)

| | |
|---|---|
| **Category** | Typography |
| **Severity** | 🟠 High |
| **Pages Affected** | Dashboard (`/`), Wallets (`/wallets`) vs all other pages |
| **Frequency** | 14 h1 elements audited, 3 use hardcoded gray-900 |

**Description:** Page titles (`<h1>` elements) use two different color approaches:

- **Dashboard & Wallets:** `text-gray-900` (hardcoded)
- **All other pages:** `text-foreground` (semantic token)

In light mode these appear similar, but `text-gray-900` will not adapt to dark mode while `text-foreground` will, creating a broken dark mode experience on 2 of 12+ pages.

**Impact:** Dark mode will render black text on dark backgrounds for Dashboard and Wallets pages.

---

#### F-006: Dashboard Page Title Uses Different Responsive Pattern

| | |
|---|---|
| **Category** | Typography |
| **Severity** | 🟠 High |
| **Pages Affected** | Dashboard (`/`) vs all other pages |
| **Frequency** | 1 of 14 page titles deviates on size, 1 on weight |

**Description:** Dashboard h1 uses `text-xl sm:text-2xl` while every other page consistently uses `text-2xl`. The Data Anomaly detail page uses `text-xl font-semibold` (different weight). This creates a visually smaller heading on the most-visited page of the application.

**Impact:** Dashboard appears subordinate to sub-pages; inconsistent visual hierarchy.

---

#### F-007: Subtitle/Description Text Color Fragmentation

| | |
|---|---|
| **Category** | Typography |
| **Severity** | 🟠 High |
| **Pages Affected** | Dashboard, Wallets (hardcoded) vs other pages (semantic) |
| **Frequency** | 14 subtitle instances, 4 use hardcoded values |

**Description:** Page subtitle paragraphs beneath h1 elements use three different color approaches:

1. `text-gray-500` — Dashboard, Wallets
2. `text-muted-foreground` — Transactions, Settings, Gain/Loss, IRS-8949
3. `text-gray-500 mt-1` with explicit margin — Wallets only

The `muted-foreground` token resolves to `hsl(215.4 16.3% 46.9%)` while `gray-500` resolves to `hsl(220 9% 46%)` — visually similar but semantically disconnected.

**Impact:** Inconsistent dark mode behavior; complicates systematic color changes.

---

#### F-008: Raw HTML Buttons Bypass Component System on Dashboard

| | |
|---|---|
| **Category** | Interactive States |
| **Severity** | 🟠 High |
| **Pages Affected** | Dashboard (`/`) — specifically CTA buttons within role view cards |
| **Frequency** | 6 raw button instances in dashboard-content.tsx |

**Description:** The `dashboard-content.tsx` contains 6+ raw `<button>` HTML elements with inline Tailwind classes (e.g., `w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors`) instead of using the `<Button>` component. These raw buttons lack:

- Focus ring styles (accessibility)
- Consistent sizing via design tokens
- Disabled state handling
- The `rounded-md` border radius the Button component uses (they use `rounded-lg` instead)

**Impact:** Missing keyboard focus indicators (WCAG 2.4.7 failure); inconsistent border radius; no disabled state.

---

#### F-009: Page Content Padding Inconsistency

| | |
|---|---|
| **Category** | Spacing & Layout |
| **Severity** | 🟠 High |
| **Pages Affected** | Dashboard vs Transactions vs Settings vs Rule Engine |
| **Frequency** | 12+ page-level padding declarations, 3 patterns observed |

**Description:** Page content areas use mixed padding patterns:

| Page | Titlebar Padding | Content Padding |
|------|------------------|-----------------|
| Dashboard | `p-4 sm:p-6` (responsive) | `p-4 sm:p-6` (responsive) |
| Transactions | `p-6` (fixed) | `p-6` (fixed) |
| Settings | `p-6` (fixed) | `p-6` (fixed) |
| Rule Engine | `p-4` (nested section) | `p-6` (fixed) |

**Impact:** Content jumps horizontally when navigating between pages; breaks visual continuity.

---

#### F-010: Conflicting CSS Typography Scaling Systems

| | |
|---|---|
| **Category** | Responsive Behavior |
| **Severity** | 🟠 High |
| **Pages Affected** | System-wide (all pages) |
| **Frequency** | 2 competing systems in global.css affecting all content |

**Description:** `global.css` defines two competing typography approaches:

1. **Design tokens** with fixed sizes: `--font-size-heading-lg: 1.125rem` (18px)
2. **clamp()-based responsive system** on base h1-h4 elements: `h1 { font-size: clamp(1.75rem, 1.2rem + 1.2vw, 2.25rem) }` — ranges from 28px to 36px

The clamp system on `h1` ranges from 28–36px, but the design token `heading-lg` is fixed at 18px. Any `<h1>` tag will use the clamp size unless overridden, making the token system effectively dead for headings.

Additionally, the root `html` font-size uses `clamp(16px, 0.8vw + 12px, 18px)`, which means all rem-based token values shift unpredictably across viewport widths.

**Impact:** Design tokens produce different visual results at different viewport widths; impossible to predict exact sizes.

---

### 3.3 Medium Issues

Noticeable inconsistencies that affect visual polish and developer experience.

---

#### F-011: Inconsistent Status Color Implementation Across Components

| | |
|---|---|
| **Category** | Color System |
| **Severity** | 🔵 Medium |
| **Pages Affected** | Wallets, Transactions, Dashboard anomaly flags |
| **Frequency** | 3 distinct status color patterns across 5+ components |

**Description:** Status colors are implemented three different ways:

1. **Badge component** correctly uses semantic tokens (`bg-success-bg`, `text-success-text`)
2. **Wallets page** hardcodes status colors inline (`text-green-600 bg-green-50 border-green-200`)
3. **Transaction classification** uses raw classes (`bg-green-500`, `bg-yellow-500`, `bg-red-500`)

The wallets implementation even defines a `getStatusColor()` helper function that returns hardcoded Tailwind classes instead of referencing design tokens.

**Impact:** Status colors shift between different greens/reds/yellows depending on the page.

---

#### F-012: Tabs Component Styling Overridden Heavily at Page Level

| | |
|---|---|
| **Category** | Component Architecture |
| **Severity** | 🔵 Medium |
| **Pages Affected** | Dashboard, Settings, Gain/Loss, IRS-8949 |
| **Frequency** | 4+ pages with heavy tab overrides |

**Description:** The base Tabs component defines a consistent style (`h-10`, `rounded-md`, `bg-muted`). However, nearly every page overrides this extensively:

- **Dashboard role tabs:** `h-11 items-center justify-start rounded-lg bg-gray-100 p-1`
- **Dashboard sub-tabs:** `h-auto p-0 bg-transparent border-0` with custom underline (`border-b-2 border-yellow-400`)
- **Settings:** `grid w-full grid-cols-5`

**Impact:** Tab navigation looks and behaves differently on every page; learning curve increases.

---

#### F-013: Arbitrary Padding Values Across Card-like Components

| | |
|---|---|
| **Category** | Spacing & Layout |
| **Severity** | 🔵 Medium |
| **Pages Affected** | Dashboard, Wallets, Transactions, Exports, Wallet Ingestion |
| **Frequency** | 50+ overridden padding instances |

**Description:** The design system defines three card padding tokens: `compact` (12px), `standard` (16px), and `featured` (20px). The Card component uses `p-standard`. However, page-level code frequently overrides with: `p-3` (12px), `p-4` (16px), `p-5` (20px), `p-6` (24px), and even `p-8` (32px). Many of these are applied directly to `CardContent` with `className='p-0'` to override the base, then re-applying custom padding.

**Impact:** Cards have inconsistent internal spacing; visual rhythm breaks between sections.

---

#### F-014: Inconsistent Icon Sizing Across Similar Contexts

| | |
|---|---|
| **Category** | Iconography |
| **Severity** | 🔵 Medium |
| **Pages Affected** | Settings, Wallets, Dashboard, Notifications |
| **Frequency** | 4 different icon size patterns in similar contexts |

**Description:** Icons in similar contexts use different sizes:

| Context | Size Used |
|---------|-----------|
| Page header action buttons | `h-4 w-4` |
| Wallet status icons | `h-3.5 w-3.5` |
| Card header icons (Settings) | `h-5 w-5` |
| Notification badge icons | No explicit size (defaults to 24px) |

**Impact:** Subtle but cumulative visual inconsistency; icons appear to "jump" in size between sections.

---

#### F-015: Button Transition Properties Differ Between Components

| | |
|---|---|
| **Category** | Interactive States |
| **Severity** | 🔵 Medium |
| **Pages Affected** | System-wide wherever buttons are used |
| **Frequency** | 3 different transition patterns |

**Description:**

| Component | Transition | Press Feedback | Hover Shadow |
|-----------|------------|----------------|--------------|
| Button | `transition-colors` | None | None |
| EnhancedButton | `transition-all duration-200` | `active:scale-95` | `hover:shadow-md` |
| Raw dashboard buttons | `transition-colors` | None | None |

Clicking buttons produces different feedback: EnhancedButton shrinks on press, Button and raw buttons do not.

**Impact:** Inconsistent micro-interaction feedback reduces perceived quality.

---

#### F-016: Mixed Border Radius Values on Similar Elements

| | |
|---|---|
| **Category** | Border Radius |
| **Severity** | 🔵 Medium |
| **Pages Affected** | System-wide |
| **Frequency** | 4 different radius values on interactive elements |

**Description:**

| Element | Radius |
|---------|--------|
| Buttons (component) | `rounded-md` (6px) |
| Cards | `rounded-lg` (8px) |
| Raw dashboard buttons | `rounded-lg` (8px) |
| Input fields | `rounded-md` (6px) |
| Tab containers | Mixed `rounded-md` / `rounded-lg` |

The design system defines tokens (`--radius-sm: 4px`, `--radius-md: 6px`, `--radius-lg: 8px`, `--radius-xl: 12px`) but these are inconsistently mapped — the Tailwind config maps both `xs` and `sm` to `--radius-sm`.

**Impact:** CTA buttons and their container cards have mismatched corner radii.

---

### 3.4 Low Issues

Minor variations with minimal direct user impact but relevant for system hygiene.

---

#### F-017: Font Family Declaration vs Documentation Mismatch

| | |
|---|---|
| **Category** | Typography |
| **Severity** | 🟢 Low |
| **Pages Affected** | Documentation vs implementation |
| **Frequency** | 1 instance (systemic documentation issue) |

**Description:** The `DESIGN_SYSTEM.md` documentation references "DM Sans" as the primary font. The actual `tailwind.config.ts` declares "Noto Sans" as the sans-serif font family. Developers referencing the design system doc will specify the wrong font.

**Impact:** Developer confusion when referencing design system documentation.

---

#### F-018: Duplicate Status Color Token Sets

| | |
|---|---|
| **Category** | Color System |
| **Severity** | 🟢 Low |
| **Pages Affected** | global.css token definitions |
| **Frequency** | 2 overlapping token sets (8 tokens duplicated) |

**Description:** The CSS defines two overlapping sets of status colors:

1. **Semantic set:** `--success`, `--warning`, `--error`, `--info` with `-bg` and `-text` variants
2. **Dashboard set:** `--status-success`, `--status-warning`, `--status-error`, `--status-info`

The `--status-warning` (`32 95% 44%`) differs from `--warning` (`32 95% 38%`) — they are slightly different orange values.

**Impact:** Developer confusion about which token set to use; subtle color differences between sections.

---

#### F-019: Mixed CSS Format for Color Values

| | |
|---|---|
| **Category** | Color System |
| **Severity** | 🟢 Low |
| **Pages Affected** | global.css, animated chart components |
| **Frequency** | 7 hex color definitions alongside HSL system |

**Description:** The design system uses HSL values for all token-based colors (e.g., `--primary: 218 91% 45%`). However, a section labeled "Color values for animated components" defines raw hex values (`--blue-500: #3b82f6`, `--green-500: #10b981`, etc.). These hex values do not correspond to the HSL token values: `--chart-blue` resolves to `#0B5ED7` while `--blue-500` is `#3b82f6` — two different blues for chart/animation use.

**Impact:** Chart elements may render in slightly different blues depending on which variable is referenced.

---

#### F-020: Breakpoint System Mismatch Between Tailwind and CSS

| | |
|---|---|
| **Category** | Responsive Behavior |
| **Severity** | 🟢 Low |
| **Pages Affected** | System-wide CSS/config |
| **Frequency** | 3 unused custom breakpoints; 2 breakpoint standards in parallel |

**Description:** Tailwind config extends with custom breakpoints: `ipad` (834px), `ipad-landscape` (1194px), `desktop` (1920px). But `global.css` media queries use standard breakpoints: 640px, 767px, 768px, 1024px, 1920px. The `ipad` and `ipad-landscape` breakpoints defined in Tailwind are never used in any component file.

**Impact:** Dead code in config; potential confusion when adding new responsive behaviors.

---

## Findings by Category Matrix

Cross-reference of all findings organized by component category and severity level.

| Category | 🔴 Critical | 🟠 High | 🔵 Medium | 🟢 Low | **Total** |
|----------|-------------|---------|-----------|--------|-----------|
| Component Architecture | 2 | — | 1 | — | **3** |
| Typography | 1 | 2 | — | 1 | **4** |
| Color System | 1 | 1 | 1 | 2 | **5** |
| Interactive States | — | 1 | 1 | — | **2** |
| Spacing & Layout | — | 1 | 1 | — | **2** |
| Responsive Behavior | — | 1 | — | 1 | **2** |
| Iconography | — | — | 1 | — | **1** |
| Border Radius | — | — | 1 | — | **1** |
| **TOTAL** | **4** | **6** | **6** | **4** | **20** |

The heaviest concentration of issues falls in **Color System** (5 findings) and **Typography** (4 findings), which together represent 45% of all identified issues. These two categories share a root cause: the design token system is defined but not enforced in component implementations.

---

## Design System Recommendations

### 5.1 Component Consolidation

Eliminate duplicate components by merging `Button` + `EnhancedButton` and `Input` + `EnhancedInput` into single, feature-complete components.

**Recommended unified Button specification:**

| Property | Value | Notes |
|----------|-------|-------|
| Default Height | 36px (`h-btn-md`) | Use design token `var(--button-height-md)` |
| Small Height | 32px (`h-btn-sm`) | Use design token `var(--button-height-sm)` |
| Large Height | 44px (`h-btn-lg`) | Use design token `var(--button-height-lg)` |
| Border Radius | 6px (`rounded-md`) | Matches `--radius-md` token; consistent with inputs |
| Primary Color | `bg-primary` | Resolves to `hsl(218 91% 45%)`; replaces `bg-blue-600` |
| Transition | `transition-all 200ms` | Include `hover:shadow-sm` and `active:scale-[0.98]` |
| Focus Ring | `ring-2 ring-ring` | Required for WCAG 2.4.7 compliance |

After consolidation, delete `enhanced-button.tsx` and `enhanced-input.tsx`. Add loading state, leftIcon/rightIcon, and tooltip support to the primary components.

### 5.2 Typography Standardization

Replace all hardcoded Tailwind text sizes with the defined design token classes. Remove the `clamp()`-based heading system from `global.css` base layer to eliminate the competing scaling system.

| Context | Before (Hardcoded) | After (Token) | CSS Variable |
|---------|---------------------|---------------|--------------|
| Page titles | `text-2xl` / `text-xl` | `text-heading-lg` | `--font-size-heading-lg: 1.125rem` (18px) |
| Section headings | `text-lg` | `text-heading-md` | `--font-size-heading-md: 1rem` (16px) |
| Card titles | `text-sm font-semibold` | `text-heading-sm` | `--font-size-heading-sm: 0.875rem` (14px) |
| Body text | `text-sm` | `text-body-md` | `--font-size-body-md: 0.875rem` (14px) |
| Dense UI text | `text-xs` | `text-body-sm` | `--font-size-body-sm: 0.8125rem` (13px) |
| Labels/captions | `text-xs` | `text-caption` | `--font-size-caption: 0.75rem` (12px) |
| Overlines | `text-xs uppercase` | `text-overline` | `--font-size-overline: 0.6875rem` (11px) |

### 5.3 Unified Color Palette

Consolidate the dual status color token sets. Remove `--status-*` tokens and use `--success`/`--warning`/`--error`/`--info` exclusively. Replace all hardcoded Tailwind color classes with semantic equivalents.

**Critical replacements:**

- `bg-blue-600` / `hover:bg-blue-700` → `bg-primary` / `hover:bg-primary-hover`
- `bg-green-600` / `bg-green-500` → `bg-success`
- `bg-red-500` / `bg-red-600` → `bg-error` (or `bg-destructive`)
- `bg-yellow-500` → `bg-warning`
- `text-gray-900` → `text-foreground` (on all page titles)
- `text-gray-500` → `text-muted-foreground` (on all subtitles)
- Remove `--blue-500` through `--purple-500` hex overrides; use chart token set instead
- Remove `--status-*` duplicate token set from `global.css`

### 5.4 Spacing System Enforcement

Standardize page-level padding to a single responsive pattern and enforce card padding tokens:

- **All page titlebars:** `p-4 sm:p-6` (responsive, mobile-first)
- **All page content areas:** `p-4 sm:p-6` (matching titlebar)
- **Standard cards** (most cases): `p-standard` (16px) via CardContent
- **Compact cards** (stat cards, dense data): `p-compact` (12px)
- **Featured cards** (hero content, CTA): `p-featured` (20px)
- Eliminate all `p-5` and `p-8` usages; map to nearest token
- Gap between sections: `gap-comfortable` (16px) or `gap-spacious` (24px)

---

## Implementation Roadmap

Recommended phased approach prioritizing highest-impact changes and minimizing regression risk.

| Phase | Timeline | Scope | Findings Addressed | Risk |
|-------|----------|-------|--------------------|------|
| **1: Foundation** | Week 1–2 | Merge duplicate components (Button, Input). Remove `clamp()` heading overrides. Establish ESLint rule to flag hardcoded color/size classes. | F-001, F-002, F-010 | Medium |
| **2: Token Adoption** | Week 3–4 | Replace all `text-gray-900`/`text-gray-500` with semantic tokens. Migrate typography from `text-sm`/`text-xs` to `text-body-md`/`text-body-sm`. Fix page title consistency. | F-003, F-005, F-006, F-007 | Low |
| **3: Color Migration** | Week 5–6 | Replace all hardcoded `bg-blue-600`/`bg-green-600`/etc. with semantic tokens. Remove `--status-*` duplicate tokens. Consolidate hex color overrides. Fix dashboard raw buttons. | F-004, F-008, F-011, F-018, F-019 | Low |
| **4: Polish** | Week 7–8 | Standardize spacing/padding across all pages. Normalize icon sizes. Align border-radius usage. Remove tab component overrides. Clean up unused breakpoints. Update `DESIGN_SYSTEM.md`. | F-009, F-012–F-017, F-020 | Low |

**Estimated Total Effort:** 8 weeks with 1 frontend developer at 50% allocation. Phase 1 requires the most careful testing due to component API changes. Phases 2–4 are low-risk find-and-replace operations that can be partially automated.

**Governance Recommendation:** After completing all phases, implement an ESLint plugin (e.g., `eslint-plugin-tailwindcss` with custom rules) to prevent hardcoded color and typography classes from re-entering the codebase. Add a CI check that flags any direct usage of `text-sm`, `text-xs`, `bg-blue-*`, `bg-green-*`, `bg-red-*`, or `bg-yellow-*` in component files.

---

## Appendix: Component Inventory

Complete inventory of UI components examined during this audit, their location, and token adoption status.

| Component | Path | Uses Tokens? | Issues Found |
|-----------|------|-------------|--------------|
| Button | `ui/button.tsx` | Partial | F-001 |
| EnhancedButton | `ui/enhanced-button.tsx` | No | F-001 |
| Input | `ui/input.tsx` | Yes | F-002 |
| EnhancedInput | `ui/enhanced-input.tsx` | No | F-002 |
| Card / CardHeader | `ui/card.tsx` | Yes | — |
| Badge | `ui/badge.tsx` | Yes | — |
| Tabs / TabsTrigger | `ui/tabs.tsx` | Partial | F-012 |
| Table / TableRow | `ui/table.tsx` | Partial | — |
| Dialog | `ui/dialog.tsx` | Yes | — |
| Select | `ui/select.tsx` | Yes | — |
| Switch | `ui/switch.tsx` | Yes | — |
| Loading States | `ui/loading-states.tsx` | No | F-004 |
| DashboardContent | `dashboard/dashboard-content.tsx` | No | F-004–F-010 |
| TransactionsContent | `transactions/transactions-content.tsx` | Partial | F-003, F-005 |
| WalletsContent | `wallets/wallets-content.tsx` | No | F-005, F-007, F-011 |
| SettingsContent | `settings/settings-content.tsx` | Partial | F-009 |
| GainLossContent | `gain-loss/gain-loss-content.tsx` | Partial | F-005 |
| IRS8949Content | `irs-8949/irs-8949-content.tsx` | Partial | F-005 |
| ExportsContent | `exports/exports-content.tsx` | Partial | F-005 |
| Sidebar | `dashboard/sidebar.tsx` | Yes | — |
| Header | `dashboard/header.tsx` | Yes | — |

---

*End of Report*
