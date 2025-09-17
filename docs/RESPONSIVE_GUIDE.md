# Responsive Design & Interaction Guide

This document describes the breakpoints, utilities, and interaction patterns implemented in this project.

## Breakpoints

Tailwind defaults (kept):

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

Custom screens (tailwind.config.ts):

- ipad: 834px (iPad Pro 11" portrait)
- ipad-landscape: 1194px (iPad Pro 11" landscape)
- desktop: 1920px (Full HD+ / 2K entry)

Device helpers (client/lib/responsive-utils.ts):

- deviceBreakpoints: { ipadPortrait: 834, ipadLandscape: 1194, desktop: 1920 }
- useViewportKind(): "mobile" | "tablet-portrait" | "tablet-landscape" | "desktop" | "desktop-2k"

## Fluid Typography

Global fluid sizes are defined in client/global.css using clamp():

- h1..h4 scale between tablet and desktop
- html root uses clamp to scale rem-based sizes

## Layout Utilities

Use helpers from client/lib/responsive-utils.ts:

- responsiveGridClasses, responsiveSpacing, responsiveFlex, responsiveForm
- getResponsiveContainer(), responsiveClass()

Example:

```tsx
<div className={responsiveGridClasses.dashboard}>{/* children */}</div>
```

## Touch Targets & Interactions

- Buttons and icon buttons meet 44x44 minimum (client/components/ui/button.tsx)
- Inputs meet 44px min height (client/components/ui/input.tsx)
- Utilities in client/global.css:
  - .touch-target (min 44x44)
  - .touch-pan (touch-action: pan-x pan-y pinch-zoom)
  - .interactive (hover/active feedback across pointers)
- Gesture hooks (client/hooks/use-gestures.ts):
  - useSwipe(ref, { onSwipe })
  - usePinch(ref, { onPinch })

Usage example:

```tsx
import { useRef, useEffect } from "react";
import { useSwipe, usePinch } from "@/hooks/use-gestures";

const ref = useRef<HTMLDivElement>(null);
useSwipe(ref, { onSwipe: (dir) => console.log(dir) });
usePinch(ref, { onPinch: (scale) => console.log(scale) });

return <div ref={ref} className="touch-pan" />;
```

## Media Scaling

Global rules (client/global.css):

- img, picture, video, canvas, svg { max-width: 100%; height: auto; }
- .media-fluid utility for explicit use

## Accessibility

- Focus rings via Tailwind focus-visible utilities (see responsive-utils focusClasses)
- Minimum touch targets achieved across core components
- Reduced motion respected via motion-reduce classes

## Performance Notes

- Transitions are short (200ms) and respect reduced motion
- Gesture listeners are passive and cleaned up on unmount
