# Tablet Responsiveness Testing Protocol

## Overview
This document outlines comprehensive testing procedures for tablet responsiveness (768px-1024px breakpoints) and layout stability in the Computis application.

## Device Testing Matrix

### iPad Devices (Safari)
- **iPad 9.7"** (768x1024)
  - Portrait: 768x1024
  - Landscape: 1024x768
- **iPad Pro 10.9"** (834x1194)
  - Portrait: 834x1194
  - Landscape: 1194x834
- **iPad Pro 12.9"** (1024x1366)
  - Portrait: 1024x1366
  - Landscape: 1366x1024

### Android Tablets (Chrome)
- **Samsung Galaxy Tab** (800x1280)
  - Portrait: 800x1280
  - Landscape: 1280x800
- **Generic 10" Tablet** (800x1280)
  - Portrait: 800x1280
  - Landscape: 1280x800

### Surface Devices (Edge/Chrome)
- **Surface Pro 7** (912x1368)
  - Portrait: 912x1368
  - Landscape: 1368x912

## Critical Test Scenarios

### 1. Header Positioning Tests

#### Test 1.1: Header Scroll Behavior
**Expected**: Header remains fixed at top during content scroll
**Steps**:
1. Open any page (Dashboard, Transactions, etc.)
2. Scroll content area down rapidly
3. Scroll back up
4. Observe header position

**Pass Criteria**:
- ✅ Header stays fixed at viewport top
- ✅ Header doesn't scroll with content
- ✅ No horizontal header movement
- ✅ Header z-index above all content

#### Test 1.2: Header-Sidebar Interaction
**Expected**: Header appears above sidebar on all tablet sizes
**Steps**:
1. Open sidebar (if collapsible)
2. Scroll page content
3. Interact with header elements
4. Close sidebar

**Pass Criteria**:
- ✅ Header visible above sidebar overlay
- ✅ No header clipping by sidebar
- ✅ Header remains interactive while sidebar open

### 2. Sticky Element Tests

#### Test 2.1: Page Title Sticky Behavior
**Expected**: Page titles stick to top of content area during scroll
**Steps**:
1. Navigate to Transactions page
2. Scroll down past page title
3. Scroll back up
4. Test on multiple pages

**Pass Criteria**:
- ✅ Page title sticks below header
- ✅ Title maintains correct z-index (below header)
- ✅ No jittering during scroll
- ✅ Smooth stick/unstick transitions

#### Test 2.2: Multiple Sticky Elements
**Expected**: Both header and page title stick properly
**Steps**:
1. Open page with sticky title
2. Scroll to trigger both sticky states
3. Scroll rapidly with touch

**Pass Criteria**:
- ✅ Both elements stick independently
- ✅ Correct stacking order maintained
- ✅ No layout shifts during scroll

### 3. Touch Interaction Tests

#### Test 3.1: Touch Scroll Performance
**Expected**: Smooth, native-feeling scroll on touch devices
**Steps**:
1. Use touch to scroll page rapidly
2. Perform momentum scroll (flick gesture)
3. Test overscroll behavior at top/bottom

**Pass Criteria**:
- ✅ Smooth 60fps scroll
- ✅ Momentum scroll works naturally
- ✅ Overscroll bounce contained to content area
- ✅ No horizontal scroll triggered

#### Test 3.2: Pinch-to-Zoom
**Expected**: Pinch-to-zoom works on content, not UI chrome
**Steps**:
1. Attempt pinch-to-zoom on content area
2. Attempt pinch-to-zoom on header
3. Attempt pinch-to-zoom on sidebar

**Pass Criteria**:
- ✅ Content allows zoom where appropriate
- ✅ UI chrome prevents zoom
- ✅ Layout doesn't break after zoom

### 4. Layout Stability Tests

#### Test 4.1: Horizontal Scroll Prevention
**Expected**: No inappropriate horizontal scrollbars
**Steps**:
1. Resize browser to tablet widths (768px, 834px, 1024px)
2. Test portrait and landscape orientations
3. Check all major pages

**Pass Criteria**:
- ✅ No horizontal scroll at 768px
- ✅ No horizontal scroll at 834px
- ✅ No horizontal scroll at 1024px
- ✅ Content properly constrains to viewport

#### Test 4.2: Orientation Change Stability
**Expected**: Layout adapts smoothly to orientation changes
**Steps**:
1. Start in portrait mode
2. Rotate to landscape
3. Rotate back to portrait
4. Check all elements repositioned correctly

**Pass Criteria**:
- ✅ No layout shifts or jumps
- ✅ Content reflows smoothly
- ✅ Sticky elements maintain position
- ✅ No console errors

### 5. Breakpoint Transition Tests

#### Test 5.1: Critical Breakpoint Behavior
**Expected**: Smooth transitions at 768px, 834px, 1024px breakpoints
**Steps**:
1. Resize browser slowly from 767px to 769px
2. Resize from 833px to 835px
3. Resize from 1023px to 1025px

**Pass Criteria**:
- ✅ Layout changes smoothly at each breakpoint
- ✅ No broken layouts in between breakpoints
- ✅ No flash of unstyled content
- ✅ All elements visible and functional

### 6. Browser-Specific Tests

#### Safari iOS/iPadOS Specific
**Test 6.1: Address Bar Hide/Show**
**Steps**:
1. Scroll down to hide Safari address bar
2. Scroll up to reveal address bar
3. Check layout stability

**Pass Criteria**:
- ✅ Layout doesn't shift when address bar hides
- ✅ min-h-screen handles viewport changes correctly
- ✅ Sticky elements maintain position

#### Chrome Android Specific
**Test 6.2: Chrome UI Toolbar**
**Steps**:
1. Scroll to hide Chrome toolbar
2. Scroll to reveal toolbar
3. Check for layout jumps

**Pass Criteria**:
- ✅ No layout shifts with toolbar changes
- ✅ Content area adjusts smoothly

## Accessibility Testing on Tablets

### Touch Target Size
**Expected**: All interactive elements meet 44x44px minimum
**Steps**:
1. Test all buttons, links, form inputs
2. Measure using browser dev tools
3. Test with touch on actual device

**Pass Criteria**:
- ✅ All buttons ≥ 44x44px
- ✅ All links ≥ 44x44px
- ✅ All form controls ≥ 44x44px

### Focus States
**Expected**: Clear focus indicators for keyboard navigation
**Steps**:
1. Use external keyboard with tablet
2. Tab through all interactive elements
3. Check focus visibility

**Pass Criteria**:
- ✅ Focus indicators visible on all elements
- ✅ Focus order logical
- ✅ No focus traps

## Performance Testing

### Frame Rate During Scroll
**Expected**: Maintain 60fps during scroll operations
**Steps**:
1. Open Chrome DevTools Performance tab
2. Record while scrolling page
3. Check for layout thrashing

**Pass Criteria**:
- ✅ Consistent 60fps frame rate
- ✅ No layout recalculations during scroll
- ✅ No forced synchronous layouts

## Regression Testing Checklist

After any layout changes, verify:
- [ ] Header remains sticky on all pages
- [ ] Page titles stick correctly
- [ ] No horizontal scrollbars appear
- [ ] Touch scroll feels smooth and native
- [ ] All breakpoints work correctly
- [ ] Orientation changes handled smoothly
- [ ] Z-index stacking order correct
- [ ] All interactive elements are touch-friendly
- [ ] Performance remains at 60fps

## Common Issues and Solutions

### Issue: Sticky elements not sticking
**Cause**: Parent container has `overflow: hidden` or `height: 0`
**Solution**: Change to `min-height: 0` or remove overflow constraints

### Issue: Header scrolls with content
**Cause**: Header in wrong DOM position or parent has overflow
**Solution**: Ensure header is direct child of scroll container with `position: sticky`

### Issue: Horizontal scrollbar appears
**Cause**: Child element width exceeds parent container
**Solution**: Add `max-w-full overflow-x-hidden` to parent containers

### Issue: Layout jumps on scroll
**Cause**: Using `svh` units with dynamic browser UI
**Solution**: Replace `svh` with `vh` or `screen` for stability

## Browser DevTools Testing

### Chrome DevTools - Device Mode
1. Open DevTools (F12)
2. Click Device Toolbar icon (Ctrl+Shift+M)
3. Select device from dropdown or set custom dimensions
4. Test both portrait and landscape

### Safari Web Inspector - Responsive Design Mode
1. Open Web Inspector (Cmd+Opt+I)
2. Click Responsive Design Mode (Cmd+Opt+R)
3. Select iPad device or custom size
4. Toggle orientation

### Firefox Responsive Design Mode
1. Open Developer Tools (F12)
2. Click Responsive Design Mode (Ctrl+Shift+M)
3. Select tablet preset or custom dimensions
4. Rotate device orientation

## Automated Testing Scripts

### Playwright Tablet Test Example
```javascript
// tablet-scroll.spec.ts
import { test, expect } from '@playwright/test';

test('header remains sticky on tablet scroll', async ({ page }) => {
  await page.setViewportSize({ width: 834, height: 1194 }); // iPad Pro 10.9"
  await page.goto('/transactions');
  
  const header = page.locator('.app-header');
  const initialPosition = await header.boundingBox();
  
  // Scroll down
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(300);
  
  const scrolledPosition = await header.boundingBox();
  
  // Header should stay at top
  expect(scrolledPosition?.y).toBe(initialPosition?.y);
});
```

## Sign-off Checklist

Before deploying tablet layout changes:
- [ ] All device tests passed
- [ ] All touch interaction tests passed
- [ ] All orientation tests passed
- [ ] Performance benchmarks met
- [ ] Accessibility requirements met
- [ ] No console errors or warnings
- [ ] Cross-browser testing complete
- [ ] Real device testing complete

## Contact for Issues

For layout issues or test failures:
- File issue in project tracker
- Tag with `tablet-layout` label
- Include device, browser, and viewport size
- Attach screenshots/screen recordings
