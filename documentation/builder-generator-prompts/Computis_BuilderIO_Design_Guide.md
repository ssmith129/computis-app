# Builder.io Design Generation Guide — Computis

## Assumptions

- **Builder.io plan tier:** Growth or Enterprise plan with access to Design Tokens, Custom Components, Symbols, Content Models, Responsive Styles, and the Visual Editor. If on a lower tier, some Custom Component and Design Token features may require upgrade.
- **Component architecture:** All shared UI elements (Button, Input, Card, Badge, Tabs, PageLayout) are registered as **Builder.io Symbols** for global reuse. Page-specific compositions use **Sections** and **Box** blocks. Complex interactive components (TransactionsTable, EnhancedPieCharts) are registered as **Custom Components** with Builder.io inputs.
- **Design token system:** Builder.io's native Design Tokens feature is used to store all values currently defined as CSS custom properties in `global.css`. Tokens are organized into groups: `color/`, `typography/`, `spacing/`, `sizing/`, `radius/`, `shadow/`. All token values reference the HSL-based system already documented in the Computis Design System v2.0.
- **Responsive breakpoints:** Builder.io Responsive Styles use three breakpoints matching the platform's actual usage: **mobile** (< 768px), **tablet** (768px–1023px), **desktop** (≥ 1024px). The unused `ipad` (834px) and `ipad-landscape` (1194px) Tailwind breakpoints are intentionally excluded from Builder.io configuration.
- **Font stack:** "Noto Sans" (sans-serif) is the production font per `tailwind.config.ts`. "JetBrains Mono" is used for monospace contexts. All Builder.io Text blocks use these families.

---

## How to Use This Guide

This guide translates every finding from the Computis Design System Consistency Audit into a Builder.io-native directive. Feed individual category sections (or the full document) into Builder.io's design generation prompt when creating or regenerating pages and components. Each directive specifies the exact Design Token, Symbol, or Block configuration to apply. Directives are tagged P0 (blocks usability), P1 (degrades quality), or P2 (refinement) so you can prioritize generation passes.

---

## 1. Design Tokens — Foundation

### 1.1 Register Canonical Typography Token Set — P0
- **Audit ref:** F-003 (Critical: Design Token Typography System Almost Entirely Unused); DOCX §4 (Design Token Bypass — 597 hardcoded vs 6 token usages)
- **Issue:** 99% of text sizing in the platform uses hardcoded values (`text-sm`, `text-xs`, `text-base`) instead of the defined design token scale, making the token system inert.
- **Builder.io Action:** Create a `typography/` Design Token group in Builder.io with the following tokens. Every Text block in every Section must reference these tokens — never raw pixel or rem values:
  - `typography/display-lg`: `1.5rem` (24px), weight 700, letter-spacing `-0.02em`, line-height 1.25
  - `typography/display-sm`: `1.25rem` (20px), weight 700, letter-spacing `-0.02em`, line-height 1.25
  - `typography/heading-lg`: `1.125rem` (18px), weight 600, letter-spacing `-0.01em`, line-height 1.375
  - `typography/heading-md`: `1rem` (16px), weight 600, line-height 1.375
  - `typography/heading-sm`: `0.875rem` (14px), weight 500, line-height 1.375
  - `typography/body-lg`: `0.9375rem` (15px), weight 400, line-height 1.5
  - `typography/body-md`: `0.875rem` (14px), weight 400, line-height 1.5
  - `typography/body-sm`: `0.8125rem` (13px), weight 400, line-height 1.5
  - `typography/caption`: `0.75rem` (12px), weight 400, letter-spacing `0.01em`, line-height 1.375
  - `typography/overline`: `0.6875rem` (11px), weight 500, letter-spacing `0.05em`, line-height 1.375, text-transform uppercase
- **Expected Result:** Any future token value change (e.g., bumping `body-md` from 14px to 15px) propagates to every Text block system-wide without per-page edits.

### 1.2 Register Canonical Color Token Set — P0
- **Audit ref:** F-004 (Critical: Systematic Bypass of Semantic Color Tokens); DOCX §6 (Color System Fragmentation — 30+ hardcoded instances)
- **Issue:** Components use raw Tailwind color classes (`bg-blue-600`, `bg-green-600`, `text-red-500`) instead of semantic tokens, preventing theme changes and dark mode from propagating.
- **Builder.io Action:** Create a `color/` Design Token group. All Box, Section, and Symbol background-color, color, and border-color properties must bind to these tokens — never raw hex or HSL:
  - `color/primary`: `hsl(218 91% 45%)` — `#0B5ED7`
  - `color/primary-hover`: `hsl(218 91% 40%)`
  - `color/primary-light`: `hsl(213 97% 87%)` — `#DBEAFE`
  - `color/primary-foreground`: `#FFFFFF`
  - `color/success`: `hsl(142 76% 36%)` — `#16A34A`
  - `color/success-bg`: `hsl(138 76% 87%)` — `#DCFCE7`
  - `color/success-text`: `hsl(142 71% 20%)` — `#166534`
  - `color/warning`: `hsl(32 95% 38%)` — `#B45309`
  - `color/warning-bg`: `hsl(48 96% 89%)` — `#FEF3C7`
  - `color/warning-text`: `hsl(32 95% 27%)` — `#92400E`
  - `color/error`: `hsl(0 84% 60%)` — `#DC2626`
  - `color/error-bg`: `hsl(0 86% 93%)` — `#FEE2E2`
  - `color/error-text`: `hsl(0 71% 30%)` — `#991B1B`
  - `color/info`: `hsl(201 96% 32%)` — `#0369A1`
  - `color/info-bg`: `hsl(199 89% 94%)` — `#E0F2FE`
  - `color/info-text`: `hsl(201 96% 26%)` — `#075985`
  - `color/foreground`: `hsl(0 0% 10%)`
  - `color/muted-foreground`: `hsl(215.4 16.3% 46.9%)`
  - `color/background`: `hsl(0 0% 97%)`
  - `color/card`: `hsl(0 0% 100%)`
  - `color/border`: `hsl(214.3 31.8% 91.4%)`
  - `color/accent`: `hsl(45 90% 51%)` — `#D4AF37` (Computis Gold)
  - `color/destructive`: `hsl(0 84% 60%)`
- **Expected Result:** Changing `color/primary` in Builder.io Design Tokens updates every button, link, and branded element globally. No component stores a raw color value.

### 1.3 Eliminate Duplicate Status Color Tokens — P1
- **Audit ref:** F-018 (Low: Duplicate Status Color Token Sets); DOCX §6.1 (warning color conflict: `32 95% 38%` vs `32 95% 44%`)
- **Issue:** Two parallel status color systems exist (`--success`/`--warning`/`--error`/`--info` and `--status-success`/`--status-warning`/etc.) with a conflicting warning value.
- **Builder.io Action:** Register only ONE status color set in Design Tokens (the `color/success`, `color/warning`, `color/error`, `color/info` entries from directive 1.2). Do NOT create a second `color/status-*` group. Standardize warning to `hsl(32 95% 38%)` (the higher-contrast value). Any Builder.io block referencing a status color must use the single canonical token.
- **Expected Result:** One source of truth for status colors across all Symbols and Sections; the 6% hue conflict is resolved.

### 1.4 Eliminate Hex Color Overrides for Chart/Animation — P2
- **Audit ref:** F-019 (Low: Mixed CSS Format for Color Values); DOCX §6.3 (hex values `--blue-500: #3b82f6` etc. diverge from HSL tokens)
- **Issue:** Seven hex color variables (`--blue-500` through `--purple-500`) exist outside the HSL system and produce different blues/greens than the semantic tokens.
- **Builder.io Action:** Create a `color/chart-*` Design Token sub-group with HSL values matching the existing chart token set: `color/chart-blue` = `hsl(218 91% 45%)`, `color/chart-green` = `hsl(142 76% 36%)`, `color/chart-orange` = `hsl(32 95% 44%)`, `color/chart-yellow` = `hsl(48 96% 53%)`, `color/chart-cyan` = `hsl(188 86% 53%)`, `color/chart-red` = `hsl(0 84% 60%)`. Any Custom Component rendering charts or animations must bind its color inputs to these tokens. Do NOT register the legacy hex block as Design Tokens.
- **Expected Result:** Chart colors match brand palette exactly; no orphaned hex values diverging from the theme.

### 1.5 Register Spacing Token Set — P1
- **Audit ref:** F-009 (High: Page Content Padding Inconsistency); F-013 (Medium: Arbitrary Padding Values); DOCX §7 (Spacing & Layout Drift — 5 different card padding values)
- **Issue:** Pages use 5+ arbitrary padding values (p-3, p-4, p-5, p-6, p-8) with no correlation to purpose; design token spacing utilities are ignored.
- **Builder.io Action:** Create a `spacing/` Design Token group using the 4px base unit scale:
  - `spacing/0`: `0`
  - `spacing/1`: `4px` (0.25rem)
  - `spacing/2`: `8px` (0.5rem)
  - `spacing/3`: `12px` (0.75rem)
  - `spacing/4`: `16px` (1rem)
  - `spacing/5`: `20px` (1.25rem)
  - `spacing/6`: `24px` (1.5rem)
  - `spacing/8`: `32px` (2rem)
  - `spacing/card-compact`: `12px`
  - `spacing/card-standard`: `16px`
  - `spacing/card-featured`: `20px`
  - `spacing/page-content`: `24px` (mobile: `16px`)
  - `spacing/section-gap`: `24px`

  All Box and Section padding/margin properties must bind to this token group.
- **Expected Result:** Spacing is governed by a single token scale; no arbitrary values outside the system.

### 1.6 Register Border Radius Token Set — P1
- **Audit ref:** F-016 (Medium: Mixed Border Radius Values); DOCX §10 (border radius drift: 3 patterns)
- **Issue:** Buttons use 6px, cards use 8px, raw buttons use 8px, inputs use 6px, tabs mix both — with a Tailwind config mapping bug where both `xs` and `sm` resolve to the same token.
- **Builder.io Action:** Create a `radius/` Design Token group:
  - `radius/sm`: `4px`
  - `radius/md`: `6px` (inputs, buttons, tab triggers)
  - `radius/lg`: `8px` (cards, modals, popovers)
  - `radius/xl`: `12px` (featured cards, hero sections)
  - `radius/full`: `9999px` (badges, pills, avatars)

  All Builder.io blocks must use these tokens for `border-radius`. Interactive elements (Button, Input, Select, TabsTrigger) use `radius/md`. Container elements (Card, Dialog, Sheet, Popover) use `radius/lg`.
- **Expected Result:** Consistent corner radii across all interactive and container elements; the `xs`/`sm` mapping conflict is eliminated.

### 1.7 Register Component Sizing Token Set — P1
- **Audit ref:** F-001 (Critical: Duplicate Button Systems — height conflicts); F-002 (Critical: Duplicate Input Systems — height conflicts)
- **Issue:** Button heights vary between 36px (token) and 40px (hardcoded). Input heights vary between token-based and hardcoded values.
- **Builder.io Action:** Create a `sizing/` Design Token group:
  - `sizing/button-sm`: `32px`
  - `sizing/button-md`: `36px`
  - `sizing/button-lg`: `44px`
  - `sizing/input-sm`: `32px`
  - `sizing/input-md`: `36px`
  - `sizing/input-lg`: `44px`
  - `sizing/table-row`: `40px`
  - `sizing/table-header`: `36px`
  - `sizing/icon-sm`: `14px` (h-3.5)
  - `sizing/icon-md`: `16px` (h-4)
  - `sizing/icon-lg`: `20px` (h-5)

  All Button Symbol height properties bind to `sizing/button-*`. All Input Symbol heights bind to `sizing/input-*`.
- **Expected Result:** Buttons and inputs render at identical heights regardless of which page or section uses them.

### 1.8 Register Shadow Token Set — P2
- **Audit ref:** F-015 (Medium: Button Transition Properties Differ — hover:shadow-md on some, none on others)
- **Issue:** Shadow application is inconsistent: EnhancedButton adds `hover:shadow-md`, base Button adds none.
- **Builder.io Action:** Create a `shadow/` Design Token group:
  - `shadow/xs`: `0 1px 2px rgba(0,0,0,0.05)`
  - `shadow/sm`: `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)`
  - `shadow/md`: `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)`
  - `shadow/lg`: `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)`

  The unified Button Symbol uses `shadow/sm` on hover. Cards use `shadow/xs` at rest.
- **Expected Result:** Shadow elevation is token-governed and consistent across all interactive elements.

---

## 2. Component Consistency — Symbols

### 2.1 Create Unified Button Symbol — P0
- **Audit ref:** F-001 (Critical: Duplicate Button Systems); F-008 (High: Raw HTML Buttons); F-015 (Medium: Transition Differences); DOCX §3.1, §3.3 (Dual Button Systems, Raw HTML Buttons)
- **Issue:** Three button implementations exist (Button component, EnhancedButton component, raw `<button>` elements) with conflicting heights (36px vs 40px), colors (`bg-success` vs `bg-green-600`), transitions, and border radii.
- **Builder.io Action:** Create a single **Builder.io Symbol** named `Computis/Button` with these inputs:
  - `variant` (enum): `primary`, `secondary`, `destructive`, `outline`, `ghost`, `link`, `success`, `warning`
  - `size` (enum): `sm`, `md`, `lg`, `icon`
  - `loading` (boolean): shows spinner, disables interaction
  - `leftIcon` / `rightIcon` (slot): optional icon slots
  - `disabled` (boolean)

  Symbol internal styles:
  - Height binds to `sizing/button-{size}` Design Token
  - `variant=primary` background binds to `color/primary`, hover to `color/primary-hover`
  - `variant=success` background binds to `color/success`; `variant=warning` to `color/warning`
  - Border radius binds to `radius/md` (6px)
  - Transition: `all 200ms ease`; hover adds box-shadow `shadow/sm`; active applies `transform: scale(0.98)`
  - Focus state: `outline: 2px solid` bound to `color/primary`, offset `2px` (WCAG 2.4.7)
  - Disabled state: `opacity: 0.5`, `pointer-events: none`

  Delete `EnhancedButton` from the Symbol library. Replace all 6 raw `<button>` instances in the Dashboard Section with this Symbol.
- **Expected Result:** Every button across all 18 pages renders from the same Symbol with consistent height, color, radius, transitions, focus ring, and disabled state.

### 2.2 Create Unified Input Symbol — P0
- **Audit ref:** F-002 (Critical: Duplicate Input Systems); DOCX §3.2 (Input uses h-input-md token; EnhancedInput uses h-10 hardcoded)
- **Issue:** Two input components with different heights, text sizes, and validation color approaches (semantic tokens vs hardcoded).
- **Builder.io Action:** Create a Builder.io Symbol named `Computis/Input` with these inputs:
  - `size` (enum): `sm`, `md`, `lg`
  - `variant` (enum): `default`, `error`, `success`, `warning`
  - `label` (string), `description` (string), `error` (string), `required` (boolean)
  - `leftIcon` / `rightIcon` (slot)
  - `showPasswordToggle` (boolean), `loading` (boolean)

  Symbol internal styles:
  - Height binds to `sizing/input-{size}` Design Token
  - Font-size binds to `typography/body-md`
  - Border-radius binds to `radius/md`
  - Default border color: `color/border`; focus ring: `color/primary`
  - `variant=error` border color: `color/error`; `variant=success`: `color/success`; `variant=warning`: `color/warning`
  - Validation message text uses `typography/body-sm` with corresponding `color/{variant}-text`

  Delete `EnhancedInput` and `EnhancedTextarea` from the Symbol library. All form Sections use this single Symbol.
- **Expected Result:** All form fields across Settings, Preferences, Wallet Ingestion, Rule Engine render at identical heights with token-governed validation colors.

### 2.3 Create Unified Tabs Symbol with Variants — P1
- **Audit ref:** F-012 (Medium: Tabs Component Styling Overridden Heavily); DOCX §9 (4 different tab UI patterns)
- **Issue:** The base Tabs component is overridden on every page with conflicting styles: pill tabs on Dashboard role selector, underline tabs on Dashboard content, grid tabs on Settings, default on Gain/Loss.
- **Builder.io Action:** Create a Builder.io Symbol named `Computis/Tabs` with a `variant` input (enum): `pill`, `underline`, `segmented`.
  - **`pill`** (for role/mode selection): Background `color/muted` (`hsl(210 40% 96%)`), height 44px, border-radius `radius/lg`, active trigger: `color/card` background with `shadow/xs`.
  - **`underline`** (for content sections): Transparent background, no height constraint, active trigger: `border-bottom: 2px solid` bound to `color/accent` (Computis Gold `#D4AF37`). Inactive text color: `color/muted-foreground`.
  - **`segmented`** (for settings/config): Full-width CSS grid layout, column count set via `columns` input (number). Background `color/muted`, active: `color/card` with `shadow/xs`.

  All page Sections must use this Symbol — no inline style overrides on TabsList or TabsTrigger blocks.
- **Expected Result:** Three intentional tab variants replace four ad-hoc override patterns; consistent behavior per variant across all pages.

### 2.4 Create PageLayout Symbol — P0
- **Audit ref:** F-006 (High: Dashboard Title Different Pattern); F-009 (High: Page Content Padding Inconsistency); DOCX §8 (Page Header Inconsistencies — padding, actions, layout vary per page)
- **Issue:** Page headers vary in padding (p-4, p-6, p-4 sm:p-6), title styles (text-xl vs text-2xl), layout structure (flex-col vs flex-between), and action placement.
- **Builder.io Action:** Create a Builder.io Symbol named `Computis/PageLayout` with these inputs:
  - `title` (string): Rendered as Text block, style bound to `typography/display-sm`, color `color/foreground`, weight 700
  - `subtitle` (string): Rendered as Text block, style bound to `typography/body-md`, color `color/muted-foreground`
  - `actions` (slot): Right-aligned action area for buttons
  - `tabBar` (slot): Optional slot below title for Tabs Symbol
  - `children` (slot): Page body content

  Symbol internal layout:
  - Title bar: Box block with `position: sticky`, `top: 0`, `z-index: 40`, background `color/background`, border-bottom `1px solid` `color/border`. Padding: Responsive Style — mobile `16px`, desktop `24px`.
  - Title + actions: Columns block with two columns — left (title/subtitle stacked) and right (actions slot, right-aligned).
  - Content area: Box block with padding bound via Responsive Styles — mobile `16px`, desktop `24px`. Internal section spacing `spacing/section-gap` (24px).

  All 18 page Sections must use this Symbol as their root wrapper.
- **Expected Result:** Every page has identical header structure, title typography, subtitle color, padding behavior, and action placement. No per-page layout drift.

### 2.5 Create Card Symbol with Padding Variants — P1
- **Audit ref:** F-013 (Medium: Arbitrary Padding Values — 50+ overrides with p-3 through p-8); DOCX §7.2 (Card Padding Fragmentation)
- **Issue:** Cards use 5 different padding values with no correlation to purpose; the `CardContent` base is overridden to `p-0` then re-padded arbitrarily.
- **Builder.io Action:** Update the existing Card Symbol (or create `Computis/Card`) with a `density` input (enum): `compact`, `standard`, `featured`.
  - `compact`: padding `spacing/card-compact` (12px) — for stat cards, dense data, sidebar items
  - `standard`: padding `spacing/card-standard` (16px) — default for all content cards
  - `featured`: padding `spacing/card-featured` (20px) — for hero cards, CTA cards, upload areas

  Border-radius: `radius/lg` (8px). Background: `color/card`. Border: `1px solid` `color/border`. Shadow: `shadow/xs`.

  No Section should apply custom padding via style overrides on Card blocks. All padding is controlled by the `density` input.
- **Expected Result:** Card padding is always one of three token-governed values; visual rhythm is consistent across all pages.

### 2.6 Create StatusBadge Symbol — P1
- **Audit ref:** F-011 (Medium: Inconsistent Status Color Implementation — 3 different patterns); DOCX §6.2 (Wallets hardcodes `getStatusColor()` returning raw classes)
- **Issue:** Status colors are implemented via semantic tokens in Badge, hardcoded inline classes on Wallets, and raw Tailwind classes in Transactions — three different approaches for the same concept.
- **Builder.io Action:** Create a Builder.io Symbol named `Computis/StatusBadge` with a `status` input (enum): `success`, `warning`, `error`, `info`, `neutral`.
  - Each status maps to the corresponding `color/{status}`, `color/{status}-bg`, `color/{status}-text` Design Tokens.
  - Border-radius: `radius/full` (pill shape). Font: `typography/overline`. Padding: `4px 8px`.

  All Wallet status indicators, Transaction classification badges, Dashboard anomaly flags, and any status display must use this Symbol — not inline color classes.
- **Expected Result:** Status colors are identical across Wallets, Transactions, Dashboard, and all other pages that display state.

---

## 3. Typography & Hierarchy

### 3.1 Standardize Page Title Style — P0
- **Audit ref:** F-005 (High: text-gray-900 vs text-foreground on h1); F-006 (High: Dashboard uses text-xl, others use text-2xl); DOCX §5.1 (Three page title patterns)
- **Issue:** Dashboard uses `text-xl sm:text-2xl text-gray-900`, Wallets uses `text-2xl text-gray-900`, all other pages use `text-2xl text-foreground`. None use the design token typography scale.
- **Builder.io Action:** In every page Section, the page title Text block must use: font-size bound to `typography/display-sm` (20px, weight 700, letter-spacing -0.02em), color bound to `color/foreground`. Do NOT use `text-gray-900` (hardcoded, breaks dark mode) or responsive size stepping (`text-xl sm:text-2xl`). The PageLayout Symbol (directive 2.4) enforces this — all pages use the Symbol.
- **Expected Result:** All 18 page titles render at identical size and color, adapting correctly in dark mode.

### 3.2 Standardize Page Subtitle Style — P0
- **Audit ref:** F-007 (High: Subtitle Color Fragmentation — text-gray-500 vs text-muted-foreground); DOCX §5.1 (Two color approaches)
- **Issue:** Page subtitles use `text-gray-500` (Dashboard, Wallets) vs `text-muted-foreground` (other pages), with one instance adding an explicit `mt-1` margin.
- **Builder.io Action:** In every page Section, the subtitle Text block must use: font-size bound to `typography/body-md`, color bound to `color/muted-foreground`. Margin-top between title and subtitle is handled by the PageLayout Symbol's internal `4px` spacing — no per-instance margin overrides. Do NOT use `text-gray-500`.
- **Expected Result:** All subtitles use the semantic token, enabling dark mode and future theme changes without per-page edits.

### 3.3 Remove Competing clamp() Typography System — P0
- **Audit ref:** F-010 (High: Conflicting CSS Typography Scaling Systems); DOCX §5.2 (clamp() on h1-h4 conflicts with token system)
- **Issue:** Global CSS applies `clamp(1.75rem, 1.2rem + 1.2vw, 2.25rem)` to `h1` elements (28–36px range), overriding the 18px design token. The root `html` font-size also uses `clamp(16px, 0.8vw + 12px, 18px)`, making all rem values unpredictable.
- **Builder.io Action:** In the global CSS imported by Builder.io, remove lines 893–912 (`h1`–`h4` clamp rules) and line 894 (root `html` clamp). Set `html { font-size: 16px }` as a fixed base. All responsive typography is handled per-block via Builder.io Responsive Styles bound to Design Tokens — NOT via global clamp() rules.
- **Expected Result:** Design token rem values resolve to predictable pixel values at all viewport widths. `typography/heading-lg` always renders at exactly 18px.

### 3.4 Map All Body Text to Token Scale — P1
- **Audit ref:** F-003 (Critical: 410 instances of `text-sm`, 163 of `text-xs` bypassing tokens)
- **Issue:** Body text defaults to hardcoded `text-sm` (14px) across 410 instances instead of the `typography/body-md` token.
- **Builder.io Action:** In all Builder.io Sections, every body-context Text block must set font-size via the Design Token binding `typography/body-md` (14px). Dense UI text (table cells, sidebar items, filter labels) uses `typography/body-sm` (13px). Small labels and captions use `typography/caption` (12px). Overlines use `typography/overline` (11px, uppercase). No Text block may use a raw size value.
- **Expected Result:** All body text is governed by the token system; a single token change updates 410+ text instances.

### 3.5 Fix Font Family Documentation Mismatch — P2
- **Audit ref:** F-017 (Low: DESIGN_SYSTEM.md says "DM Sans" but implementation uses "Noto Sans")
- **Issue:** Documentation references the wrong font family, causing developer confusion.
- **Builder.io Action:** In Builder.io's Design Token metadata and any exported documentation, declare the font stack as: `"Noto Sans", system-ui, sans-serif` for body text and `"JetBrains Mono", "Fira Code", monospace` for code/data contexts. Ensure all Text blocks in the Builder.io editor default to "Noto Sans".
- **Expected Result:** Builder.io-generated output and documentation reference the correct production font.

---

## 4. Color System & Theming

### 4.1 Replace All Hardcoded Primary Color References — P0
- **Audit ref:** F-004 (Critical: Systematic Bypass of Semantic Color Tokens); DOCX §6.2 (`bg-blue-600` in button.tsx, enhanced-button.tsx, dashboard-content.tsx)
- **Issue:** Default button variant and 6+ dashboard CTA buttons hardcode `bg-blue-600` / `hover:bg-blue-700` instead of the `color/primary` / `color/primary-hover` tokens.
- **Builder.io Action:** In the `Computis/Button` Symbol, the `variant=primary` background must bind to Design Token `color/primary`; hover state binds to `color/primary-hover`. In all Dashboard Sections, replace any Box or custom block using `background-color: #2563EB` (blue-600) with a `Computis/Button` Symbol instance set to `variant=primary`.
- **Expected Result:** Rebranding the primary color requires changing exactly one token value.

### 4.2 Replace All Hardcoded Success/Error/Warning Colors — P0
- **Audit ref:** F-004 (Critical); F-011 (Medium: Inconsistent Status Color Implementation); DOCX §6.2 (bg-green-600/500 should be bg-success, bg-red-500/600 should be bg-error)
- **Issue:** Success, error, and warning states use 3+ different raw color values across components: `bg-green-600`, `bg-green-500`, `bg-red-500`, `bg-red-600`, `bg-yellow-500`.
- **Builder.io Action:** In every Symbol and Section:
  - Any block with green background (success context) binds to `color/success`
  - Any block with red background (error/destructive context) binds to `color/error` or `color/destructive`
  - Any block with yellow/amber background (warning context) binds to `color/warning`
  - Status text on colored backgrounds binds to the corresponding `color/{status}-text` token
  - Status container backgrounds bind to `color/{status}-bg`

  Specifically update: `Computis/Button` success/warning variants, all StatusBadge instances, Transaction classification progress bars, Loading States error display, and Notification badge backgrounds.
- **Expected Result:** All semantic colors render from tokens; no raw green/red/yellow hex values remain in any Builder.io block.

### 4.3 Replace All Hardcoded Foreground/Muted Text Colors — P1
- **Audit ref:** F-005 (High: text-gray-900 vs text-foreground); F-007 (High: text-gray-500 vs text-muted-foreground)
- **Issue:** Dashboard and Wallets use `text-gray-900` (hardcoded) for headings and `text-gray-500` for subtitles while other pages use semantic tokens. Gray-900 will not adapt to dark mode.
- **Builder.io Action:** In Dashboard and Wallets Sections, update every Text block's color property: headings bind to `color/foreground`, subtitles/descriptions bind to `color/muted-foreground`. Search for any remaining `#111827` (gray-900 hex) or `#6B7280` (gray-500 hex) across all Sections and rebind to tokens.
- **Expected Result:** Dark mode will correctly render light text on dark backgrounds across all pages including Dashboard and Wallets.

---

## 5. Layout & Spacing

### 5.1 Standardize Page Content Padding — P0
- **Audit ref:** F-009 (High: Page Content Padding Inconsistency — 3 patterns); DOCX §7.1, §8 (Dashboard p-4 sm:p-6, most pages p-6, Rule Engine p-4)
- **Issue:** Page content padding varies between `16px`, `24px`, and responsive `16px → 24px` with no standard pattern, causing horizontal alignment shifts during navigation.
- **Builder.io Action:** The `Computis/PageLayout` Symbol (directive 2.4) enforces unified padding via Responsive Styles on both the title bar Box and the content area Box:
  - **Mobile** (< 768px): padding `spacing/4` (16px)
  - **Desktop** (≥ 768px): padding `spacing/6` (24px)

  No individual page Section may override these padding values. Content-area internal vertical spacing between child blocks: `spacing/section-gap` (24px).
- **Expected Result:** Content alignment is identical across all 18 pages at all viewport sizes; no horizontal jumps during navigation.

### 5.2 Standardize Page Header Structure — P1
- **Audit ref:** DOCX §8 (Page Header Inconsistencies — Dashboard uses flex-col with no actions, Settings uses flex-between with 2 buttons, Wallets uses flex-between with 2 buttons, Rule Engine uses different padding)
- **Issue:** Page headers have 4 different layout structures (flex-col, flex-between with various action counts, different paddings).
- **Builder.io Action:** All page Sections must use the `Computis/PageLayout` Symbol which enforces a Columns block: left column (title + subtitle stacked vertically) and right column (actions slot, right-aligned, vertically centered). Pages without header actions (Dashboard) leave the actions slot empty — the layout remains structurally identical. Pages with tabs place the `Computis/Tabs` Symbol in the `tabBar` slot below the title row.
- **Expected Result:** Consistent header grid structure across all pages; actions always right-aligned at the same vertical position.

### 5.3 Enforce Card Padding Tokens — P1
- **Audit ref:** F-013 (Medium: Arbitrary Padding Values — 50+ overrides with p-3 through p-8)
- **Issue:** CardContent is frequently overridden with `className='p-0'` then re-padded with arbitrary values; 5 different padding values in use.
- **Builder.io Action:** In all Sections, every Card block must use the `Computis/Card` Symbol with its `density` input set to `compact`, `standard`, or `featured` (directive 2.5). No inline padding overrides on Card child blocks. Mapping:
  - Stat cards (Wallets overview, Dashboard KPIs): `compact` (12px)
  - Content cards (Transactions table wrapper, Settings form groups): `standard` (16px)
  - Hero/CTA cards (Upload area, Wallet Ingestion dropzone): `featured` (20px)
- **Expected Result:** Card internal spacing is always one of three governed values; visual rhythm is consistent.

### 5.4 Standardize Section Spacing — P2
- **Audit ref:** DOCX §7.2 (spacing values p-3 through p-8 with no correlation); §12.4 (Recommended space-y-6 for section spacing)
- **Issue:** Vertical spacing between content sections varies arbitrarily.
- **Builder.io Action:** Between sibling content blocks within a page Section, set gap/margin using `spacing/section-gap` (24px). Within cards, internal element spacing uses `spacing/3` (12px) for tight groups and `spacing/4` (16px) for distinct sub-sections. Apply via Box block `gap` or `margin-bottom` bound to Design Tokens.
- **Expected Result:** Consistent vertical rhythm across all page content areas.

---

## 6. Responsive Behavior

### 6.1 Remove Unused Custom Breakpoints — P2
- **Audit ref:** F-020 (Low: Breakpoint System Mismatch — `ipad` 834px and `ipad-landscape` 1194px never used)
- **Issue:** Three custom Tailwind breakpoints are defined but never referenced in any component, creating dead configuration.
- **Builder.io Action:** In Builder.io's Responsive Styles configuration, define exactly three breakpoints: `mobile` (default / < 768px), `tablet` (768px–1023px), `desktop` (≥ 1024px). Do NOT add `834px` or `1194px` breakpoints. If a Builder.io content model references a breakpoint, it must be one of these three.
- **Expected Result:** Clean breakpoint system with no unused phantom breakpoints; all responsive behavior predictable.

### 6.2 Apply Responsive Styles to PageLayout — P0
- **Audit ref:** F-009 (High: Dashboard uses responsive padding, others use fixed); F-010 (High: clamp() conflicts)
- **Issue:** Only Dashboard uses responsive padding (`p-4 sm:p-6`); all other pages use a fixed value, and global clamp() rules create unpredictable sizing.
- **Builder.io Action:** The `Computis/PageLayout` Symbol applies Builder.io Responsive Styles:
  - **Mobile**: title font-size `typography/heading-lg` (18px), content padding `spacing/4` (16px), section gap `spacing/4` (16px)
  - **Desktop**: title font-size `typography/display-sm` (20px), content padding `spacing/6` (24px), section gap `spacing/6` (24px)

  No global CSS clamp() rules are permitted. All responsive scaling is per-Symbol via Builder.io's native Responsive Styles system.
- **Expected Result:** Typography and spacing scale smoothly via Builder.io's responsive system; no CSS specificity conflicts.

---

## 7. Interaction States & Accessibility

### 7.1 Enforce Focus Ring on All Interactive Elements — P0
- **Audit ref:** F-008 (High: Raw HTML Buttons lack focus rings — WCAG 2.4.7 failure); DOCX §10 (Focus ring: Button has ring-offset-2, raw buttons have none, EnhancedButton adds active:scale-95)
- **Issue:** Six raw dashboard buttons have no keyboard focus indicator, failing WCAG 2.4.7. The two button components have different focus ring implementations.
- **Builder.io Action:** In every Symbol that wraps an interactive element (`Computis/Button`, `Computis/Input`, `Computis/Tabs` triggers, Select triggers, Checkbox, Switch), set a consistent focus-visible style:
  - `outline: 2px solid` bound to `color/primary`
  - `outline-offset: 2px`
  - `border-radius` matching the element's `radius/*` token

  This must be applied at the Symbol level so it cannot be overridden or omitted per-instance. All raw `<button>` elements in the Dashboard Section must be replaced with `Computis/Button` Symbol instances.
- **Expected Result:** Every interactive element shows a visible, consistent focus ring on keyboard navigation; WCAG 2.4.7 compliance across all pages.

### 7.2 Unify Button Transition and Active State — P1
- **Audit ref:** F-015 (Medium: Button Transition Properties Differ — 3 patterns)
- **Issue:** Button uses `transition-colors` only; EnhancedButton uses `transition-all 200ms` with `active:scale-95` and `hover:shadow-md`; raw buttons use `transition-colors`.
- **Builder.io Action:** The `Computis/Button` Symbol defines a single transition spec:
  - Transition: `all 200ms ease`
  - Hover: box-shadow changes to `shadow/sm`
  - Active: `transform: scale(0.98)` (slightly subtler than the previous 0.95)
  - Disabled: `opacity: 0.5`, no hover/active effects

  These are baked into the Symbol's base styles and cannot be overridden per-instance.
- **Expected Result:** All buttons across the platform provide identical hover and press feedback.

### 7.3 Standardize Disabled State Handling — P1
- **Audit ref:** DOCX §3.3 (Raw HTML buttons lack disabled states); §10 (Loading states: EnhancedButton has Loader2 spinner, standard Button has none)
- **Issue:** Disabled and loading states exist only in EnhancedButton, not in the base Button or raw `<button>` elements.
- **Builder.io Action:** The `Computis/Button` Symbol's `disabled` and `loading` inputs control:
  - `disabled=true`: `opacity: 0.5`, `pointer-events: none`, `aria-disabled="true"`
  - `loading=true`: displays a Loader2 spinner icon (16px, animated), disables click, shows `loadingText` if provided

  These behaviors are part of the Symbol definition — not optional per-instance features.
- **Expected Result:** Every button, including former raw HTML buttons, correctly handles disabled and loading states.

### 7.4 Add Loading State to Dashboard Content — P2
- **Audit ref:** DOCX §10 (Dashboard uses `opacity-50` on entire content area for loading)
- **Issue:** Dashboard applies `opacity-50` to the full content area during loading, rather than using proper skeleton or spinner patterns.
- **Builder.io Action:** Replace the Dashboard content area's loading state (currently an `opacity: 0.5` style toggle) with Skeleton placeholder blocks from the Loading States Custom Component. The `Computis/PageLayout` Symbol includes a `loading` boolean input that, when true, renders a Skeleton overlay inside the content slot instead of reducing opacity.
- **Expected Result:** Loading state shows structured placeholder content (skeleton cards, skeleton rows) instead of a dimmed live UI.

---

## 8. Iconography

### 8.1 Standardize Icon Sizing Per Context — P1
- **Audit ref:** F-014 (Medium: Inconsistent Icon Sizing — h-3.5, h-4, h-5, and unsized)
- **Issue:** Icons use 4 different sizes with no documented mapping: 14px in wallet status, 16px in button actions, 20px in card headers, 24px (unsized default) in notifications.
- **Builder.io Action:** Establish icon sizing rules bound to `sizing/icon-*` Design Tokens. In all Symbols and Sections:
  - Icons inside Buttons and inline with body text: `sizing/icon-md` (16px)
  - Icons as status indicators in tight spaces (badges, wallet status pills): `sizing/icon-sm` (14px)
  - Icons as card section headers or standalone decorative: `sizing/icon-lg` (20px)
  - No icon may be unsized (falling back to 24px default). Every Lucide icon block must have explicit `width` and `height` set.

  In the `Computis/StatusBadge` Symbol, the icon slot enforces `sizing/icon-sm`. In the `Computis/Button` Symbol, leftIcon/rightIcon slots enforce `sizing/icon-md`. In Card headers, icon blocks use `sizing/icon-lg`.
- **Expected Result:** Icon sizes are predictable and contextually appropriate; no accidental 24px icons in tight layouts.

---

## 9. Governance & Documentation

### 9.1 Establish Token Usage Enforcement in Builder.io — P1
- **Audit ref:** DOCX §13 Phase 4 (ESLint rule to flag hardcoded sizes/colors; PR review checklist); Recommendations §5.3 Governance
- **Issue:** After fixing current inconsistencies, there is no mechanism to prevent regression — developers could reintroduce hardcoded values.
- **Builder.io Action:** In the Builder.io Visual Editor, configure the workspace's Content Model schema to require Design Token bindings for `font-size`, `color`, `background-color`, `padding`, `margin`, `border-radius`, and `box-shadow` properties. Add a note in the Builder.io workspace README: "All styling properties must reference a Design Token. Raw hex, px, or rem values are prohibited. If a new value is needed, add it to the token system first."
- **Expected Result:** Builder.io becomes the enforcement layer for design system compliance; token bypass requires deliberate override.

### 9.2 Create Builder.io Component Documentation — P2
- **Audit ref:** DOCX §13 Phase 4 item 16 (Add Storybook documentation for all unified components)
- **Issue:** No centralized documentation of how each Symbol should be configured.
- **Builder.io Action:** For each Symbol (`Computis/Button`, `Computis/Input`, `Computis/Tabs`, `Computis/Card`, `Computis/PageLayout`, `Computis/StatusBadge`), add a Builder.io Content entry of type "Documentation" showing: all input options with descriptions, visual examples of each variant, and the Design Token bindings each variant references.
- **Expected Result:** Designers and developers can reference in-platform documentation before creating new pages, reducing the chance of variant misuse.

---

## Ambiguous Findings

### A.1 "Loading States" Component Architecture — Clarification Needed
- **Audit ref:** DOCX §10 (Loading: EnhancedButton has Loader2 spinner; standard Button has none; Dashboard uses opacity-50); Markdown F-004 mentions `loading-states.tsx` uses `bg-red-500` hardcoded
- **Issue:** The `loading-states.tsx` file contains multiple loading patterns (TableLoadingSkeleton, CardLoadingSkeleton, DashboardCardsLoading, ErrorState) but the audit does not specify whether each should be a Builder.io Symbol or a Custom Component, nor does it prescribe specific token bindings for skeleton element colors. Additionally, the ErrorState component uses hardcoded `bg-red-500` and `bg-red-600` for its error display, but it's unclear if this is purely a color token issue or if the entire error UI pattern needs redesign.
- **Clarification needed:** (1) Should each loading skeleton pattern become a separate Builder.io Symbol, or a single Symbol with a `variant` input? (2) What color tokens should skeleton placeholder elements use — `color/muted` or a dedicated `color/skeleton` token?

### A.2 Sidebar and Header — Exclusion Scope
- **Audit ref:** Appendix Component Inventory lists Sidebar and Header as "Uses Tokens: Yes, Issues Found: —"
- **Issue:** Both audit documents mark the Sidebar (`dashboard/sidebar.tsx`) and Header (`dashboard/header.tsx`) as already compliant with no issues. However, the DOCX §8 page header matrix and the global CSS analysis reveal significant responsive positioning logic (fixed header, sheet overlay sidebar) that interacts with the page layout system. It's unclear whether these components should be registered as Builder.io Symbols or left as Custom Components outside the Builder.io visual editing flow.
- **Clarification needed:** Should the Sidebar and Header be converted to Builder.io Symbols (enabling visual editing), or remain as registered Custom Components (code-only, not editable in Builder.io Visual Editor)?

### A.3 Chart Custom Components — Token Binding Depth
- **Audit ref:** F-019 (hex chart colors); F-004 (dashboard chart components use raw Tailwind)
- **Issue:** The audit identifies color token bypass in chart/animation components but does not detail the internal structure of `enhanced-pie-charts.tsx`, `animated-mini-chart.tsx`, or Recharts-based chart blocks. It's unclear how deeply Builder.io Design Tokens can penetrate into third-party chart library configurations (e.g., Recharts `fill` properties, Chart.js dataset colors).
- **Clarification needed:** Should chart components pass Design Token values as props into Recharts/Chart.js configurations, or should a wrapper Custom Component handle the token-to-hex conversion at render time?
