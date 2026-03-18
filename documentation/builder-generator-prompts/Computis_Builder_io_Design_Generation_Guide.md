# Builder.io Design Generation Guide — Computis

## Assumptions

| Assumption | Value |
|---|---|
| **Builder.io plan tier** | Growth or Enterprise with Custom Components, Design Tokens, and Responsive Breakpoint support enabled |
| **Component architecture** | Hybrid: Builder.io Symbols for shared layout primitives (PageHeader, CardShell, StatusBadge); Custom Components registered from React codebase for interactive elements (Button, Input, Tabs, DataTable) via `@builder.io/react` `Builder.registerComponent()` |
| **Design token system** | Builder.io Design Tokens configured under Space Settings → Design Tokens, mapped 1:1 from the `global.css` CSS custom properties (e.g., `--primary`, `--font-size-body-md`, `--space-4`). Tokens referenced in Builder blocks via the `var(--token-name)` pattern in style bindings |
| **Responsive breakpoints** | Three breakpoints configured in Builder.io Space Settings: **Mobile** (< 768px), **Tablet** (768px–1023px), **Desktop** (≥ 1024px). No `ipad` / `ipad-landscape` custom breakpoints — those are dead code per audit finding F-020 |
| **CSS framework** | Tailwind CSS utility classes applied via Custom Component props; Builder.io style panel used for layout/spacing overrides on Sections and Boxes |
| **Font loading** | Noto Sans (primary) and JetBrains Mono (monospace) loaded via Google Fonts integration in Builder.io Space Settings → Custom Fonts |

---

## How to Use This Guide

This guide is structured as a set of discrete, copy-pasteable directives organized by design category. To use it with Builder.io's design generator:

1. **Per-page regeneration:** Copy the relevant category section (e.g., "Layout & Spacing") along with the global "Design Tokens" section, and paste both into the Builder.io Visual Editor's AI prompt or Content generation prompt when creating or editing a page.
2. **Symbol updates:** For directives targeting Symbols (PageHeader, CardShell, StatusBadge, etc.), open the Symbol in isolation, paste the relevant directive into the AI prompt, and publish the Symbol — all instances inherit the fix automatically.
3. **Batch migration:** For high-frequency directives (typography token replacement, color token replacement), use Builder.io's bulk content API or the Visual Editor's "Find and Replace" across content entries referencing the stale values.

---

## Design Tokens — Global Foundation

### DT-001: Register the Canonical Design Token Set in Builder.io — P0

- **Audit ref:** F-003 (typography token bypass, 99:1 ratio), F-004 (color token bypass, 80+ instances), Recommendations §5.1–5.4
- **Issue:** The design token system defined in `global.css` is not enforced in Builder.io content; builders can enter arbitrary values, re-introducing hardcoded sizes and colors.
- **Builder.io Action:** In **Space Settings → Design Tokens**, register the following token groups. These become the only selectable values in the Builder.io style panel for any content created or edited in this space.

  **Typography tokens:**
  | Token Name | CSS Variable | Value |
  |---|---|---|
  | `display-lg` | `--font-size-display-lg` | `1.5rem` (24px) |
  | `display-sm` | `--font-size-display-sm` | `1.25rem` (20px) |
  | `heading-lg` | `--font-size-heading-lg` | `1.125rem` (18px) |
  | `heading-md` | `--font-size-heading-md` | `1rem` (16px) |
  | `heading-sm` | `--font-size-heading-sm` | `0.875rem` (14px) |
  | `body-lg` | `--font-size-body-lg` | `0.9375rem` (15px) |
  | `body-md` | `--font-size-body-md` | `0.875rem` (14px) |
  | `body-sm` | `--font-size-body-sm` | `0.8125rem` (13px) |
  | `caption` | `--font-size-caption` | `0.75rem` (12px) |
  | `overline` | `--font-size-overline` | `0.6875rem` (11px) |

  **Color tokens (primary):**
  | Token Name | CSS Variable | HSL Value |
  |---|---|---|
  | `primary` | `--primary` | `218 91% 45%` |
  | `primary-hover` | `--primary-hover` | `218 91% 40%` |
  | `primary-light` | `--primary-light` | `213 97% 87%` |
  | `foreground` | `--foreground` | `0 0% 10%` |
  | `muted-foreground` | `--muted-foreground` | `215.4 16.3% 46.9%` |
  | `background` | `--background` | `0 0% 97%` |
  | `card` | `--card` | `0 0% 100%` |
  | `border` | `--border` | `214.3 31.8% 91.4%` |

  **Color tokens (semantic status) — use ONLY this set, not `--status-*`:**
  | Token Name | CSS Variable | HSL Value |
  |---|---|---|
  | `success` | `--success` | `142 76% 36%` |
  | `success-bg` | `--success-bg` | `138 76% 87%` |
  | `success-text` | `--success-text` | `142 71% 20%` |
  | `warning` | `--warning` | `32 95% 38%` |
  | `warning-bg` | `--warning-bg` | `48 96% 89%` |
  | `warning-text` | `--warning-text` | `32 95% 27%` |
  | `error` | `--error` | `0 84% 60%` |
  | `error-bg` | `--error-bg` | `0 86% 93%` |
  | `error-text` | `--error-text` | `0 71% 30%` |
  | `info` | `--info` | `201 96% 32%` |
  | `info-bg` | `--info-bg` | `199 89% 94%` |
  | `info-text` | `--info-text` | `201 96% 26%` |

  **Spacing tokens:**
  | Token Name | CSS Variable | Value |
  |---|---|---|
  | `space-2` | `--space-2` | `0.5rem` (8px) |
  | `space-3` | `--space-3` | `0.75rem` (12px) |
  | `space-4` | `--space-4` | `1rem` (16px) |
  | `space-6` | `--space-6` | `1.5rem` (24px) |
  | `card-padding-compact` | `--card-padding-compact` | `0.75rem` (12px) |
  | `card-padding-standard` | `--card-padding-standard` | `1rem` (16px) |
  | `card-padding-featured` | `--card-padding-featured` | `1.25rem` (20px) |

  **Border radius tokens:**
  | Token Name | CSS Variable | Value |
  |---|---|---|
  | `radius-sm` | `--radius-sm` | `0.25rem` (4px) |
  | `radius-md` | `--radius-md` | `0.375rem` (6px) |
  | `radius-lg` | `--radius-lg` | `0.5rem` (8px) |
  | `radius-xl` | `--radius-xl` | `0.75rem` (12px) |

  **Component sizing tokens:**
  | Token Name | CSS Variable | Value |
  |---|---|---|
  | `button-height-sm` | `--button-height-sm` | `2rem` (32px) |
  | `button-height-md` | `--button-height-md` | `2.25rem` (36px) |
  | `button-height-lg` | `--button-height-lg` | `2.75rem` (44px) |
  | `input-height-sm` | `--input-height-sm` | `2rem` (32px) |
  | `input-height-md` | `--input-height-md` | `2.25rem` (36px) |
  | `input-height-lg` | `--input-height-lg` | `2.75rem` (44px) |

- **Expected Result:** The Builder.io style panel constrains all typography, color, spacing, radius, and component sizing selections to the registered token set. Arbitrary pixel/hex values are not selectable unless a builder explicitly switches to custom input, creating a deliberate friction barrier against token bypass.

---

### DT-002: Remove Duplicate Status Color Token Set — P1

- **Audit ref:** F-018 (duplicate status color token sets), DOCX §6.1, §12.3
- **Issue:** Two parallel status color systems exist in `global.css` — `--success/--warning/--error/--info` and `--status-success/--status-warning/--status-error/--status-info` — with a conflicting warning value (`38%` vs `44%` lightness).
- **Builder.io Action:** In the Custom Code section of the Builder.io Space Settings (or in the project's `global.css` before Builder ingestion), delete the `--status-*` token block (lines 147–151 of `global.css`). Register only the semantic set (`--success`, `--warning`, `--error`, `--info` with `-bg` and `-text` variants) in Builder.io Design Tokens per DT-001. Standardize the warning value to `32 95% 38%` (the higher-contrast variant).
- **Expected Result:** A single status color token set exists. Any Builder.io content referencing status colors resolves to one consistent value per semantic state.

---

### DT-003: Remove Hex Color Overrides for Animated Components — P2

- **Audit ref:** F-019 (mixed CSS format for color values), DOCX §6.3
- **Issue:** Seven `--*-500` hex color variables (`--blue-500: #3b82f6`, `--green-500: #10b981`, etc.) in `global.css` lines 161–167 conflict with the HSL-based chart tokens (`--chart-blue`, `--chart-green`, etc.), producing two different blues for the same semantic context.
- **Builder.io Action:** In the project's `global.css`, delete lines 161–167 containing the hex color block. In any Custom Component registered for chart rendering (animated-mini-chart, enhanced-pie-charts), update color references from `var(--blue-500)` to `hsl(var(--chart-blue))`. In Builder.io Design Tokens, register only the `chart-*` HSL token set from lines 153–158.
- **Expected Result:** All chart and animation components reference a single set of HSL-formatted chart color tokens. No hex-vs-HSL color conflicts remain.

---

### DT-004: Set Canonical Font Family in Builder.io — P2

- **Audit ref:** F-017 (font family declaration vs documentation mismatch), DOCX §12.2
- **Issue:** Documentation says "DM Sans" but the implementation uses "Noto Sans". Builder.io content generators may produce output with the wrong font if the Space is not explicitly configured.
- **Builder.io Action:** In **Space Settings → Custom Fonts**, add `Noto Sans` (weights 400, 500, 600, 700) and `JetBrains Mono` (weight 400, 500) via Google Fonts. Set `Noto Sans` as the default sans-serif font for all text blocks. Set `JetBrains Mono` as the monospace font for code/data display blocks. Remove any reference to "DM Sans" from Builder content models or default styles.
- **Expected Result:** Every text Block generated or edited in Builder.io defaults to Noto Sans. Monospace contexts (transaction hashes, amounts) render in JetBrains Mono. No DM Sans references persist.

---

## Component Consistency

### CC-001: Consolidate to a Single Button Custom Component — P0

- **Audit ref:** F-001 (duplicate button systems), F-008 (raw HTML buttons), F-015 (transition differences), DOCX §3.1, §3.3, §12.1
- **Issue:** Three button implementations coexist — `Button`, `EnhancedButton`, and raw `<button>` elements — with conflicting heights (36px vs 40px), colors (`bg-success` vs `bg-green-600`), transitions, active states, and border radii (rounded-md vs rounded-lg).
- **Builder.io Action:** Register a single `ComputisButton` Custom Component via `Builder.registerComponent()` with the following props exposed in the Builder.io Visual Editor:

  | Prop | Type | Options | Default |
  |---|---|---|---|
  | `variant` | enum | `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `success`, `warning` | `default` |
  | `size` | enum | `sm`, `md`, `lg`, `icon` | `md` |
  | `loading` | boolean | — | `false` |
  | `disabled` | boolean | — | `false` |
  | `leftIcon` | string (Lucide icon name) | — | `null` |
  | `rightIcon` | string (Lucide icon name) | — | `null` |
  | `fullWidth` | boolean | — | `false` |

  **Enforce these style constants in the component implementation (not overridable from Builder):**
  - Height: `var(--button-height-sm)` / `var(--button-height-md)` / `var(--button-height-lg)` per size prop
  - Border radius: `var(--radius-md)` (6px) — all variants, all sizes
  - Default variant color: `hsl(var(--primary))` background, `hsl(var(--primary-hover))` on hover
  - Success variant: `hsl(var(--success))` background (not `bg-green-600`)
  - Warning variant: `hsl(var(--warning))` background, white text (not `bg-yellow-500 text-black`)
  - Focus: `ring-2 ring-ring ring-offset-2` on all variants
  - Transition: `transition-all duration-200` with `hover:shadow-sm` and `active:scale-[0.98]`
  - Loading state: Loader2 spinner from lucide-react, `cursor-not-allowed`, `opacity-50`

  Delete `enhanced-button.tsx`. Replace all 6 raw `<button>` elements in `dashboard-content.tsx` (lines 163, 206, 247, 580, 623, 664) with `<ComputisButton>` instances.
- **Expected Result:** One button component renders identically across all Builder.io content. Heights, colors, radii, focus rings, and transitions are locked to design tokens. The Builder.io Visual Editor exposes only the variant/size/state props — builders cannot accidentally introduce a fourth button pattern.

---

### CC-002: Consolidate to a Single Input Custom Component — P0

- **Audit ref:** F-002 (duplicate input systems), DOCX §3.2, §12.1
- **Issue:** `Input` (token-based, 22 lines, no validation UI) and `EnhancedInput` (hardcoded sizing, 303 lines, includes validation states) coexist. Forms on Settings use `Input`; other pages may use `EnhancedInput`, creating height and style mismatches.
- **Builder.io Action:** Register a single `ComputisInput` Custom Component with these props:

  | Prop | Type | Options | Default |
  |---|---|---|---|
  | `size` | enum | `sm`, `md`, `lg` | `md` |
  | `variant` | enum | `default`, `error`, `success`, `warning` | `default` |
  | `label` | string | — | `null` |
  | `description` | string | — | `null` |
  | `errorMessage` | string | — | `null` |
  | `leftIcon` | string (Lucide icon name) | — | `null` |
  | `showPasswordToggle` | boolean | — | `false` |
  | `required` | boolean | — | `false` |

  **Enforce these style constants:**
  - Height: `var(--input-height-sm)` / `var(--input-height-md)` / `var(--input-height-lg)` per size prop
  - Font size: `var(--font-size-body-md)` (14px)
  - Border radius: `var(--radius-md)` (6px)
  - Error border: `hsl(var(--error))` (not `border-red-500`)
  - Success border: `hsl(var(--success))` (not `border-green-500`)
  - Warning border: `hsl(var(--warning))` (not `border-yellow-500`)
  - Focus ring: `ring-2 ring-ring ring-offset-2`

  Delete `enhanced-input.tsx` after migration.
- **Expected Result:** All form fields across Builder.io content use one component with consistent token-based heights, validation colors, and focus states.

---

### CC-003: Define Tab Component Variants as Symbols — P1

- **Audit ref:** F-012 (tabs overridden at page level), DOCX §9, §12.5
- **Issue:** The base Tabs component is overridden to produce 4 visually distinct patterns across Dashboard (pill tabs, underline tabs), Settings (segmented grid), and Gain/Loss (standard shadcn).
- **Builder.io Action:** Create three Builder.io Symbols for intentional tab variants, each wrapping the Radix Tabs primitive with locked styles:

  **Symbol: `TabsPill`** (for role/mode selection)
  - TabsList: `height: 44px`, `border-radius: var(--radius-lg)`, `background: hsl(var(--gray-100))`, `padding: 4px`
  - TabsTrigger active state: `background: hsl(var(--card))`, `color: hsl(var(--foreground))`, `box-shadow: var(--shadow-sm)`
  - Use on: Dashboard role selector

  **Symbol: `TabsUnderline`** (for content sections)
  - TabsList: `height: auto`, `padding: 0`, `background: transparent`, `border-bottom: 1px solid hsl(var(--border))`
  - TabsTrigger active state: `border-bottom: 2px solid hsl(var(--accent))`, `color: hsl(var(--foreground))`
  - Active indicator color: `hsl(var(--accent))` — the gold/yellow (#D4AF37), not hardcoded `border-yellow-400`
  - Use on: Dashboard content tabs, Gain/Loss, IRS-8949

  **Symbol: `TabsSegmented`** (for settings/config)
  - TabsList: `display: grid`, `grid-template-columns: repeat(auto, 1fr)`, `width: 100%`
  - TabsTrigger: standard shadcn active/inactive states
  - Use on: Settings tabs

  Remove all per-page className overrides on TabsList and TabsTrigger in Builder.io content. Reference the appropriate Symbol instead.
- **Expected Result:** Tabs render in exactly 3 approved visual patterns. Adding tabs to a new page requires selecting one of the three Symbols — no inline style overrides needed.

---

### CC-004: Register a StatusBadge Symbol — P1

- **Audit ref:** F-011 (inconsistent status color implementation), DOCX §6.2
- **Issue:** Status indicators use three different color approaches: Badge component with tokens, Wallets with hardcoded inline classes, and Transactions with raw Tailwind classes.
- **Builder.io Action:** Create a Builder.io Symbol `StatusBadge` wrapping the Badge component with a locked `variant` prop. The Symbol's Content Binding maps a `status` string input to the correct Badge variant:

  | `status` value | Badge `variant` prop | Resolved colors (via tokens) |
  |---|---|---|
  | `success` / `connected` | `success` | bg: `hsl(var(--success-bg))`, text: `hsl(var(--success-text))` |
  | `warning` / `syncing` / `pending` | `warning` | bg: `hsl(var(--warning-bg))`, text: `hsl(var(--warning-text))` |
  | `error` / `disconnected` / `failed` | `error` | bg: `hsl(var(--error-bg))`, text: `hsl(var(--error-text))` |
  | `info` / `processing` | `info` | bg: `hsl(var(--info-bg))`, text: `hsl(var(--info-text))` |
  | `default` / `neutral` | `neutral` | bg: `hsl(var(--gray-100))`, text: `hsl(var(--gray-700))` |

  Replace the `getStatusColor()` helper function in `wallets-content.tsx` with a `StatusBadge` Symbol instance. Replace inline hardcoded status classes in `transaction-details-modal.tsx`, `classification-insights.tsx`, and `anomaly-flags.tsx` with the same Symbol.
- **Expected Result:** All status indicators across every page resolve to the same semantic token colors through a single Symbol. Changing `--success` in Design Tokens updates every status badge simultaneously.

---

## Typography & Hierarchy

### TH-001: Replace All Hardcoded Typography Sizes with Token References — P0

- **Audit ref:** F-003 (99% of typography bypasses token system), DOCX §4, §12.2
- **Issue:** 597 instances of hardcoded `text-sm`, `text-xs`, and `text-base` exist versus 6 design token usages. The token system is effectively dead.
- **Builder.io Action:** In every Builder.io content entry and Custom Component, apply the following replacements. When editing in the Visual Editor, select the text element and change the font-size in the Style panel to the corresponding Design Token (not a raw pixel value):

  | Hardcoded class | Replace with token class | Builder.io Style Panel value |
  |---|---|---|
  | `text-sm` (body text context) | `text-body-md` | Token: `body-md` (14px) |
  | `text-sm font-semibold` (card title context) | `text-heading-sm` | Token: `heading-sm` (14px, weight 500) |
  | `text-xs` (caption/label context) | `text-caption` | Token: `caption` (12px) |
  | `text-xs` (dense UI context) | `text-body-sm` | Token: `body-sm` (13px) |
  | `text-xs uppercase` | `text-overline` | Token: `overline` (11px, uppercase, weight 500) |
  | `text-base` | `text-body-lg` | Token: `body-lg` (15px) |
  | `text-lg` (section heading context) | `text-heading-md` | Token: `heading-md` (16px, weight 600) |
  | `text-xl` / `text-2xl` (page title context) | `text-heading-lg` | Token: `heading-lg` (18px, weight 600) |
  | `text-2xl font-bold` (page title context) | `text-display-sm` | Token: `display-sm` (20px, weight 700) |

  For Custom Components registered via `Builder.registerComponent()`, update the component's internal className strings to use the token utility classes. Do not allow the Builder.io style panel to override font-size on these registered components — lock the typography tier via the component's `noWrap` or style-locking configuration.
- **Expected Result:** Changing `--font-size-body-md` in Design Tokens updates all body text across the entire platform. Token adoption rate rises from 1% to ~95%+.

---

### TH-002: Standardize Page Title to a Unified Symbol — P0

- **Audit ref:** F-005 (page title color inconsistency), F-006 (dashboard title size deviation), DOCX §5.1
- **Issue:** Page titles use 3 patterns: Dashboard (`text-xl sm:text-2xl text-gray-900`), Wallets (`text-2xl text-gray-900`), and all others (`text-2xl text-foreground`). None use the design token classes.
- **Builder.io Action:** Create a Builder.io Symbol `PageHeader` with the following locked structure:

  ```
  Section (page-titlebar class)
    Box (padding: 16px mobile / 24px tablet+desktop — via Responsive Styles)
      Box (flex-direction: row, justify-content: space-between, align-items: center)
        Box (flex-direction: column, gap: 4px)
          Text block — "title" slot
            font-size: var(--font-size-heading-lg) → 18px
            font-weight: 600
            color: hsl(var(--foreground))  ← NOT text-gray-900
          Text block — "subtitle" slot
            font-size: var(--font-size-body-md) → 14px
            color: hsl(var(--muted-foreground))  ← NOT text-gray-500
        Box — "actions" slot (flex-direction: row, gap: 12px)
          [ComputisButton instances inserted per page]
  ```

  The Symbol exposes `title` (text), `subtitle` (text), and `actions` (slot for child blocks) as editable fields. Typography and colors are locked to tokens and not editable in the Visual Editor.

  Replace the custom header markup on all 18 audited pages with this Symbol. For Dashboard specifically: remove the responsive `text-xl sm:text-2xl` pattern and the `text-gray-900` color; replace with the Symbol which uses a fixed `heading-lg` token at all breakpoints.
- **Expected Result:** All page titles render at `heading-lg` (18px) in `foreground` color. Subtitles render in `body-md` in `muted-foreground`. Header layout (with actions slot) is consistent across all pages. Dark mode works correctly on Dashboard and Wallets — no black-on-black text.

---

### TH-003: Remove Global clamp() Typography Overrides — P0

- **Audit ref:** F-010 (conflicting CSS typography scaling systems), DOCX §5.2, §12.6
- **Issue:** `global.css` lines 897–912 apply `clamp()`-based responsive sizing to all `h1`–`h4` elements, competing with Tailwind utility classes and making design tokens produce unpredictable sizes across viewports. The root `html` font-size also uses `clamp(16px, 0.8vw + 12px, 18px)`, shifting all rem values.
- **Builder.io Action:** In the project's `global.css` (or the Builder.io Space Settings → Custom Code → Head section), remove the following CSS rules entirely:

  - `h1 { font-size: clamp(1.75rem, 1.2rem + 1.2vw, 2.25rem); ... }`
  - `h2 { font-size: clamp(1.5rem, 1.1rem + 0.9vw, 1.875rem); ... }`
  - `h3 { font-size: clamp(1.25rem, 1rem + 0.6vw, 1.5rem); ... }`
  - `h4 { font-size: clamp(1.125rem, 0.95rem + 0.4vw, 1.25rem); ... }`
  - `html { font-size: clamp(16px, 0.8vw + 12px, 18px); }`

  Replace with a fixed root: `html { font-size: 16px; }`. All responsive typography adjustments should happen at the component level via Builder.io's Responsive Styles panel (per-breakpoint token selection), not via global `clamp()`.
- **Expected Result:** `1rem` equals `16px` at every viewport width. Design token values are deterministic — `var(--font-size-body-md)` always resolves to exactly `14px`, not a viewport-dependent value.

---

## Color System

### CS-001: Replace All Hardcoded Primary Color References — P0

- **Audit ref:** F-004 (systematic bypass of semantic color tokens), DOCX §6.2
- **Issue:** `bg-blue-600` / `hover:bg-blue-700` is used in `button.tsx`, `enhanced-button.tsx`, `dashboard-content.tsx`, and `enhanced-dashboard-cards.tsx` instead of the `--primary` / `--primary-hover` tokens.
- **Builder.io Action:** In every Custom Component and Builder.io content block where a button or CTA surface color is set:
  - Replace any `background-color` value of `#2563eb`, `rgb(37, 99, 235)`, or Tailwind class `bg-blue-600` → set to Design Token `primary` → resolves to `hsl(218 91% 45%)` = `#0B5ED7`
  - Replace hover state `bg-blue-700` → Design Token `primary-hover` → resolves to `hsl(218 91% 40%)`
  - In Custom Components: change `bg-blue-600 hover:bg-blue-700` to `bg-primary hover:bg-primary-hover` in the component className

  Applies to: `ComputisButton` default variant (CC-001), any `Box` block used as a CTA surface, `dashboard-content.tsx` raw buttons (all 6 instances).
- **Expected Result:** Changing the `--primary` Design Token value updates every primary-colored surface across the entire platform in one action.

---

### CS-002: Replace All Hardcoded Status Color References — P0

- **Audit ref:** F-004 (color bypass), F-011 (inconsistent status colors), DOCX §6.2
- **Issue:** Success uses `bg-green-600`, `bg-green-500`, `text-green-600`; error uses `bg-red-500`, `bg-red-600`; warning uses `bg-yellow-500` — all hardcoded instead of using `--success`, `--error`, `--warning` tokens.
- **Builder.io Action:** Across all Builder.io content and Custom Components:

  | Hardcoded | Replace with (Tailwind class) | Design Token reference |
  |---|---|---|
  | `bg-green-600`, `bg-green-500` | `bg-success` | `hsl(var(--success))` |
  | `bg-green-50`, `bg-green-100` | `bg-success-soft` | `hsl(var(--success-bg))` |
  | `text-green-600`, `text-green-800` | `text-success` / `text-success-text` | `hsl(var(--success-text))` |
  | `bg-red-500`, `bg-red-600` | `bg-error` / `bg-destructive` | `hsl(var(--error))` |
  | `bg-red-50`, `bg-red-100` | `bg-error-soft` | `hsl(var(--error-bg))` |
  | `text-red-600`, `text-red-800` | `text-error` / `text-error-text` | `hsl(var(--error-text))` |
  | `bg-yellow-500` | `bg-warning` | `hsl(var(--warning))` |
  | `bg-yellow-100`, `bg-yellow-50` | `bg-warning-soft` | `hsl(var(--warning-bg))` |
  | `text-yellow-600`, `text-yellow-800` | `text-warning` / `text-warning-text` | `hsl(var(--warning-text))` |
  | `bg-blue-50`, `bg-blue-100` | `bg-info-soft` | `hsl(var(--info-bg))` |
  | `text-blue-600` | `text-info` | `hsl(var(--info))` |

  Affected files: `enhanced-button.tsx`, `loading-states.tsx`, `notifications-dropdown.tsx`, `classification-insights.tsx`, `transaction-details-modal.tsx`, `wallets-content.tsx`, `dashboard-content.tsx`.
- **Expected Result:** All status colors resolve through the semantic token layer. Theming or dark mode changes propagate automatically.

---

### CS-003: Replace Hardcoded Text Colors on Headings and Subtitles — P0

- **Audit ref:** F-005 (page title color: `text-gray-900` vs `text-foreground`), F-007 (subtitle: `text-gray-500` vs `text-muted-foreground`)
- **Issue:** Dashboard and Wallets pages use `text-gray-900` for titles and `text-gray-500` for subtitles — hardcoded values that break dark mode.
- **Builder.io Action:** In every Builder.io content entry and the `PageHeader` Symbol (TH-002):
  - All `<h1>` / page title Text blocks: set `color` in Style panel to Design Token `foreground` → `hsl(var(--foreground))`. Remove any class or inline style containing `text-gray-900`.
  - All subtitle/description Text blocks: set `color` to Design Token `muted-foreground` → `hsl(var(--muted-foreground))`. Remove any class or inline style containing `text-gray-500`.
  - For Wallets page specifically: remove the `mt-1` explicit margin on the subtitle and rely on the `PageHeader` Symbol's built-in `gap: 4px` between title and subtitle.
- **Expected Result:** All page titles and subtitles adapt to dark mode. No `text-gray-900` or `text-gray-500` classes remain in any Builder.io-managed content.

---

## Layout & Spacing

### LS-001: Standardize Page Content Padding via Responsive Styles — P0

- **Audit ref:** F-009 (page content padding inconsistency), DOCX §7.1, §8
- **Issue:** Page padding alternates between `p-4 sm:p-6` (Dashboard), `p-6` (most pages), and `p-4` (Rule Engine), creating content alignment jumps between pages.
- **Builder.io Action:** In the `PageHeader` Symbol (TH-002) and in a new `PageContent` Symbol (a Box wrapper for the main content area below the header):

  **PageHeader Symbol inner Box** — Responsive Styles:
  | Breakpoint | Padding |
  |---|---|
  | Mobile (< 768px) | `16px` all sides (token: `space-4`) |
  | Tablet (≥ 768px) | `24px` all sides (token: `space-6`) |
  | Desktop (≥ 1024px) | `24px` all sides (token: `space-6`) |

  **PageContent Symbol (new)** — a Box with identical responsive padding and `space-y: 24px` (token: `space-6`) for child section spacing.

  Apply this Symbol as the wrapper for every page's main content area. Remove per-page padding overrides. Specifically:
  - Dashboard: replace `p-4 sm:p-6` with the Symbol
  - Transactions, Settings, Gain/Loss, etc.: replace fixed `p-6` with the Symbol
  - Rule Engine: replace `p-4` with the Symbol
- **Expected Result:** Every page has identical padding at every breakpoint. Content alignment is perfectly consistent when navigating between pages.

---

### LS-002: Standardize Card Internal Padding via Token Tiers — P1

- **Audit ref:** F-013 (arbitrary padding values across cards), DOCX §7.2
- **Issue:** Five different padding values (`p-3`, `p-4`, `p-5`, `p-6`, `p-8`) are used on cards with no correlation to card purpose. The three defined tokens (`compact`, `standard`, `featured`) are used only in the base Card component and overridden everywhere.
- **Builder.io Action:** In Builder.io, enforce card padding through three Card Symbol variants (or a single Card Custom Component with a `density` prop):

  | Card tier | Padding token | Value | Use when |
  |---|---|---|---|
  | `compact` | `var(--card-padding-compact)` | `12px` | Stat cards, KPI tiles, dense data summaries |
  | `standard` | `var(--card-padding-standard)` | `16px` | Default for most cards (transaction details, settings sections, form groups) |
  | `featured` | `var(--card-padding-featured)` | `20px` | Hero cards, CTA cards, empty states, onboarding prompts |

  Eliminate all `p-5` (20px is close to `featured` — use `featured`), `p-6` (24px — not a card token, use `standard` or `featured`), and `p-8` (32px — excessive, use `featured`). In the Builder.io Visual Editor, lock card padding to these three tokens by setting the Card Symbol's padding field to "Design Token only" mode.

  Specific replacements:
  - Wallet stat cards (`p-4`): change to `compact`
  - Dashboard stat cards (`p-6`): change to `standard`
  - Upload area (`p-8`): change to `featured`
  - Transaction insights (`p-5`): change to `featured`
- **Expected Result:** All cards use one of exactly three padding tiers. Visual rhythm is predictable and consistent across all pages.

---

### LS-003: Create a PageLayout Wrapper Symbol — P1

- **Audit ref:** F-009 (padding inconsistency), DOCX §8 (page header inconsistencies), §12.4
- **Issue:** Each page implements its own header + content structure with varying padding, layout direction (flex-col vs flex-between), and action button placement.
- **Builder.io Action:** Create a Builder.io Symbol `PageLayout` that composes the `PageHeader` (TH-002) and `PageContent` (LS-001) Symbols into a single enforced page structure:

  ```
  Box (class: "app-content")
    Symbol: PageHeader
      inputs: title, subtitle, actions (slot)
    Symbol: PageContent
      children: [page-specific content blocks]
  ```

  The `PageLayout` Symbol exposes these editable inputs:
  - `title` (string, required)
  - `subtitle` (string, optional)
  - `actions` (slot — accepts ComputisButton children)
  - `headerExtra` (slot — accepts Tabs Symbols for pages like Dashboard/Settings that embed navigation in the header)

  Apply this Symbol as the root wrapper on all 18 audited pages. Page-specific content is inserted into the `children` slot.
- **Expected Result:** Adding a new page requires only inserting a `PageLayout` Symbol and filling in the slots. Layout structure, padding, typography, and color are automatically correct.

---

## Responsive Behavior

### RB-001: Align Builder.io Breakpoints with CSS Implementation — P1

- **Audit ref:** F-020 (breakpoint system mismatch), DOCX §5.2
- **Issue:** Tailwind config defines unused custom breakpoints (`ipad: 834px`, `ipad-landscape: 1194px`), while CSS media queries use `767px`, `768px`, `1024px`, and `1920px`. The unused breakpoints create confusion.
- **Builder.io Action:** In **Builder.io Space Settings → Responsive Breakpoints**, configure exactly three breakpoints matching the CSS implementation:

  | Breakpoint name | Width range | Matches CSS |
  |---|---|---|
  | Mobile | < 768px | `max-width: 767px` queries |
  | Tablet | 768px – 1023px | `min-width: 768px` queries |
  | Desktop | ≥ 1024px | `min-width: 1024px` queries |

  Do NOT add breakpoints for `834px` or `1194px`. In the project's `tailwind.config.ts`, remove the unused `ipad` and `ipad-landscape` screen definitions to prevent developers from referencing dead breakpoints. The `desktop: 1920px` max-width media query for ultra-wide centering can remain as a CSS-only concern outside Builder.io.
- **Expected Result:** Builder.io's responsive preview and per-breakpoint style overrides align exactly with the CSS media queries. No phantom breakpoints exist.

---

### RB-002: Enforce Consistent Responsive Padding via Symbols — P1

- **Audit ref:** F-009 (padding inconsistency between pages at different viewports), DOCX §7.1
- **Issue:** Dashboard uses responsive padding (`p-4 sm:p-6`), most pages use fixed `p-6`, and Rule Engine uses `p-4` — visible alignment shifts when navigating.
- **Builder.io Action:** This is resolved by LS-001 (PageContent Symbol with responsive styles). Additionally, in the Builder.io Visual Editor, when setting padding on any Section or Box block that sits inside PageContent, use only the Design Token `space-4` (16px) or `space-6` (24px) — do not enter arbitrary pixel values. For sub-section cards within PageContent, padding is governed by LS-002 (card tier tokens).
- **Expected Result:** Padding is responsive (16px mobile, 24px tablet+), consistent across all pages, and governed entirely by Design Tokens + Responsive Styles.

---

## Visual Design & Polish

### VD-001: Standardize Border Radius per Element Type — P1

- **Audit ref:** F-016 (mixed border radius values)
- **Issue:** Buttons use `rounded-md` (6px), cards use `rounded-lg` (8px), raw buttons use `rounded-lg` (8px), and tab containers mix both. The Tailwind config incorrectly maps both `xs` and `sm` to `--radius-sm`.
- **Builder.io Action:** Enforce these radius assignments in all Custom Components and Symbols:

  | Element type | Radius token | Value | Builder.io Style Panel |
  |---|---|---|---|
  | Buttons (all variants) | `var(--radius-md)` | 6px | Token: `radius-md` |
  | Input fields | `var(--radius-md)` | 6px | Token: `radius-md` |
  | Cards | `var(--radius-lg)` | 8px | Token: `radius-lg` |
  | Modals / Dialogs | `var(--radius-lg)` | 8px | Token: `radius-lg` |
  | Badges / Pills | `9999px` (full) | `rounded-full` | Hardcode in Badge component |
  | Tab containers (pill variant) | `var(--radius-lg)` | 8px | Token: `radius-lg` |
  | Tooltips / Popovers | `var(--radius-md)` | 6px | Token: `radius-md` |

  Fix the Tailwind config: change `xs: "var(--radius-sm)"` to `xs: "2px"` or remove the `xs` key entirely to avoid the `xs === sm` collision.
- **Expected Result:** Every interactive element uses a predictable, token-driven border radius. Buttons and inputs share `radius-md`; cards and modals share `radius-lg`.

---

### VD-002: Standardize Icon Sizing per Context — P1

- **Audit ref:** F-014 (inconsistent icon sizing)
- **Issue:** Four different icon sizes used across similar contexts — `h-3.5 w-3.5` (wallets status), `h-4 w-4` (buttons/headers), `h-5 w-5` (card headers), and implicit 24px default (notifications).
- **Builder.io Action:** Define icon size tiers and enforce via Custom Component props and Symbol configurations:

  | Context | Size class | Pixel value | Use in |
  |---|---|---|---|
  | Inline within buttons and form elements | `h-4 w-4` | 16px | ComputisButton `leftIcon`/`rightIcon`, filter buttons, action buttons |
  | Card / section headers | `h-4 w-4` | 16px | Settings card titles, section headers (change from `h-5 w-5`) |
  | Status indicators (badges, pills) | `h-3.5 w-3.5` | 14px | StatusBadge Symbol internal icon |
  | Standalone decorative / empty states | `h-5 w-5` | 20px | Empty state illustrations, feature cards |

  In the `ComputisButton` Custom Component (CC-001), lock the `[&_svg]` selector to `size-4` (16px). In the `StatusBadge` Symbol (CC-004), lock the internal icon to `h-3.5 w-3.5`. Never use the Lucide default (24px) without an explicit size class.
- **Expected Result:** Icons in similar contexts are the same size across all pages. No icon "jumping" between sections.

---

## Interaction States

### IS-001: Unify Button Transition and Active State Behavior — P1

- **Audit ref:** F-015 (button transition differences)
- **Issue:** Three different transition/active patterns: `transition-colors` with no press feedback (Button), `transition-all duration-200` with `active:scale-95` and `hover:shadow-md` (EnhancedButton), and `transition-colors` with no feedback (raw buttons).
- **Builder.io Action:** In the unified `ComputisButton` Custom Component (CC-001), set these interaction styles as non-overridable constants:

  ```css
  transition: all 200ms ease;
  &:hover { box-shadow: var(--shadow-sm); }
  &:active { transform: scale(0.98); }
  &:focus-visible { outline: none; ring: 2px solid hsl(var(--ring)); ring-offset: 2px; }
  &:disabled { opacity: 0.5; pointer-events: none; }
  ```

  The `active:scale(0.98)` is subtler than the previous `active:scale-95` (which was visually aggressive). `hover:shadow-sm` replaces `hover:shadow-md` for a more refined feel. These values are not exposed in Builder.io's style panel — they are locked inside the Custom Component.
- **Expected Result:** Every button across the platform has identical hover elevation, press feedback, focus ring, and disabled state. The behavior is consistent regardless of which page the button appears on.

---

### IS-002: Ensure Focus Ring on All Interactive Elements — P0

- **Audit ref:** F-008 (raw HTML buttons lack focus rings — WCAG 2.4.7), DOCX §3.3, §10
- **Issue:** Dashboard's 6 raw `<button>` elements and any Builder.io-generated `<a>` or `<button>` blocks lack `focus-visible` styles, failing WCAG 2.4.7 (Focus Visible).
- **Builder.io Action:** In **Builder.io Space Settings → Custom Code → Global CSS** (or the project's `global.css`), add a global focus rule that applies to all interactive elements:

  ```css
  :focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring));
  }
  ```

  This provides a universal focus ring with background-color offset (for visibility on any surface) using the `--ring` token (`hsl(218 91% 45%)`). Additionally, confirm that all Custom Components (ComputisButton, ComputisInput, Tabs Symbols) include `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` in their base className.
- **Expected Result:** Every focusable element on the platform shows a visible, token-colored focus ring when navigated via keyboard. WCAG 2.4.7 compliance is achieved.

---

## Accessibility

### A-001: Replace Raw HTML Buttons with Accessible Custom Component — P0

- **Audit ref:** F-008 (6 raw `<button>` elements in dashboard lacking focus, disabled, and aria support), DOCX §3.3
- **Issue:** Raw `<button>` elements in `dashboard-content.tsx` lack `aria-label`, `disabled` handling, and visible focus indicators.
- **Builder.io Action:** Replace all 6 raw `<button>` instances (dashboard-content.tsx lines 163, 206, 247, 580, 623, 664) with `ComputisButton` Custom Component blocks in Builder.io. The Custom Component implementation must include:
  - `aria-disabled={isDisabled}` when `loading` or `disabled` prop is true
  - `aria-describedby` linked to tooltip content when `tooltip` prop is provided
  - `role="button"` (implicit on `<button>`, but enforced if `asChild` renders an `<a>`)
  - Visible focus ring per IS-002

  In the Builder.io Visual Editor, these raw buttons should be replaced by dragging a `ComputisButton` block from the Components panel, setting the `variant`, `size`, and text label, and using a Content Binding or `onClick` Action for the click handler.
- **Expected Result:** All CTAs on the dashboard are fully keyboard-accessible with proper ARIA attributes, focus rings, and disabled states.

---

### A-002: Enforce Minimum Touch Target Size on Mobile — P1

- **Audit ref:** DOCX §10 (focus ring and interaction gaps), CSS lines 1273–1279 (44px minimum touch target)
- **Issue:** While `global.css` defines a 44px minimum touch target for table elements on mobile, no equivalent rule exists for buttons in cards, filters, or action bars.
- **Builder.io Action:** In the `ComputisButton` Custom Component (CC-001), add a CSS rule:

  ```css
  @media (max-width: 767px) {
    min-width: 44px;
    min-height: 44px;
  }
  ```

  In Builder.io Responsive Styles for the Mobile breakpoint, ensure any clickable Box or link block has `min-height: 44px` and `min-width: 44px`. This should be a default in the `PageContent` Symbol's child layout rules.
- **Expected Result:** All interactive elements meet WCAG 2.5.5 (Target Size) on mobile viewports.

---

## Governance & Documentation

### GV-001: Lock Custom Component Styles Against Builder Override — P1

- **Audit ref:** F-003 (token bypass), F-004 (color bypass), DOCX §12.1 (governance), §13 Phase 4
- **Issue:** Even with tokens registered, builders can enter arbitrary pixel/hex values in the Builder.io Style panel, re-introducing the same inconsistencies the audit identified.
- **Builder.io Action:** For each registered Custom Component (`ComputisButton`, `ComputisInput`, `StatusBadge`), configure the `Builder.registerComponent()` call with `override: false` on style-locked properties. Use the `hideStyleTab: true` option (or `canHaveChildren: false` where applicable) to prevent style panel overrides on components where all visual properties are governed by props.

  Alternatively, if using Builder.io's Component-level style restrictions, set the following as "not editable" in the Visual Editor:
  - `font-size` (governed by token tier via component variant)
  - `color` (governed by variant prop)
  - `background-color` (governed by variant prop)
  - `border-radius` (locked per element type)
  - `height` (locked per size prop)

  Builders can still adjust `margin` and `width`/layout properties to place components in the grid.
- **Expected Result:** A builder in the Visual Editor can change a button's `variant` and `size` props but cannot override its height, color, radius, or font size. The design system is structurally enforced, not just documented.

---

### GV-002: Sync Design System Documentation with Implementation — P2

- **Audit ref:** F-017 (font family mismatch in DESIGN_SYSTEM.md), DOCX §12.2
- **Issue:** `DESIGN_SYSTEM.md` references "DM Sans" while the codebase uses "Noto Sans". Documentation drift misleads developers.
- **Builder.io Action:** Update the `DESIGN_SYSTEM.md` file in the repository to match all token values registered in Builder.io Design Tokens. Specifically:
  - Replace all references to "DM Sans" with "Noto Sans"
  - Add a section documenting the three Tab variants (CC-003)
  - Add a section documenting the PageLayout Symbol structure (LS-003)
  - Add a note that all design tokens are the source of truth and are managed in Builder.io Space Settings → Design Tokens

  Optionally, generate the documentation from the Builder.io token definitions using the Builder.io Content API to ensure it stays in sync.
- **Expected Result:** The design system documentation matches the running implementation and the Builder.io token configuration with zero discrepancies.

---

## Ambiguous Findings

### AMB-001: Loading State Standardization

- **Audit ref:** DOCX §10 (loading states: EnhancedButton has Loader2 spinner, Button has none, Dashboard uses opacity-50)
- **Ambiguity:** The audit identifies three loading patterns but does not specify which is canonical. The markdown audit's recommendation adds `loading` prop to the consolidated button (CC-001), but does not address the Dashboard's full-page `opacity-50` loading overlay or the separate `loading-states.tsx` component that uses hardcoded `bg-red-500` for error states.
- **Clarification needed:** Should the `PageContent` Symbol include a built-in loading overlay (skeleton + opacity reduction)? Should the `loading-states.tsx` error state use `bg-error` token? Is a full-screen loading pattern needed as a separate Symbol, or is per-component loading (button spinners, table skeletons) sufficient?

---

### AMB-002: Dark Mode Token Completeness

- **Audit ref:** F-005 (text-gray-900 breaks dark mode), F-007 (text-gray-500 breaks dark mode), global.css `.dark` class (lines 182–223)
- **Ambiguity:** The audit identifies that hardcoded gray values break dark mode, but the `.dark` class definition in `global.css` only redefines base tokens (background, foreground, card, etc.) and does not redefine `--success-bg`, `--warning-bg`, `--error-bg`, `--info-bg`, or the `--gray-*` scale for dark mode. If dark mode is implemented, these status background tokens may have insufficient contrast on dark surfaces.
- **Clarification needed:** Should the Builder.io Design Token registration include a complete dark-mode token override set? The current `.dark` class definitions appear incomplete — are dark-mode tokens in scope for this implementation, or is dark mode a future phase?

---

### AMB-003: Chart Component Token Migration Scope

- **Audit ref:** F-019 (hex vs HSL color conflict), DT-003 in this guide
- **Ambiguity:** The audit identifies 7 hex color variables used by "animated chart components" but does not enumerate exactly which chart components or which Builder.io content entries use them. The `animated-mini-chart.tsx` and `enhanced-pie-charts.tsx` files are referenced, but it is unclear whether these are rendered via Builder.io content or are purely code-driven Custom Components.
- **Clarification needed:** Are chart components managed as Builder.io content (editable in the Visual Editor) or purely as registered Custom Components? This determines whether the color migration happens in Builder.io Design Tokens (if content-managed) or purely in the React codebase (if code-driven).
