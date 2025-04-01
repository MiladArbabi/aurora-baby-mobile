
- **Changes**:
  - Updated features to reflect skip button (Issue #37) and navigation structure.
  - Added font styling note.
  - Included test status (15 passing) and dependency installation step.
  - Noted web as diagnostic with pending background fix (Issue #36).

---

### Step 2: Update `error-log.md`

**Updated `error-log.md`:**
```markdown
# Error Log for Aurora Baby Mobile

This document tracks recurring errors, their causes, and resolutions to streamline development.

## Table of Contents
- [Multiple Elements with Same Text](#multiple-elements-with-same-text)
- [TypeScript Navigation Prop Mismatch](#typescript-navigation-prop-mismatch)
- [TestID Not Found](#testid-not-found)
- [React UMD Global Error](#react-umd-global-error)
- [`act()` Causing Unmounted Test Renderer Issues](#act-causing-unmounted-test-renderer-issues)
- [Duplicate `NavigationContainer` Rendering Issues](#duplicate-navigationcontainer-rendering-issues)
- [TypeScript Theme Type Mismatch](#typescript-theme-type-mismatch)

## Multiple Elements with Same Text
- **Error**: `Found multiple elements with text: <text>` (e.g., Jest `getByText` fails).
- **Cause**: Duplicate text in UI (e.g., screen title and tab label).
- **Resolution**: Use `testID` on the specific element and query with `getByTestId` instead of `getByText`.
- **Example**: `HarmonyScreen.test.tsx` fix (commit `fix: add testID to HarmonyScreen title to resolve multiple text matches`).
- **Date**: March 28, 2025

## TypeScript Navigation Prop Mismatch
- **Error**: `Type '{ navigate: jest.Mock; }' is not assignable to type 'BottomTabNavigationProp<...>'`.
- **Cause**: Incomplete mock of `navigation` prop missing required methods (e.g., `dispatch`, `reset`).
- **Resolution**: Provide a full mock of `BottomTabNavigationProp` with all required methods.
- **Example**: `HarmonyScreen.test.tsx` fix (commit `fix: update HarmonyScreen test with full BottomTabNavigationProp mock`).
- **Date**: March 28, 2025

## TestID Not Found
- **Error**: `Unable to find an element with testID: <id>` (e.g., Jest `getByTestId` fails).
- **Cause**: `testID` not passed or applied correctly in the component.
- **Resolution**: Ensure `testID` is defined in the component and passed in the test render.
- **Example**: `Button.test.tsx` fix (commit `fix: resolve Button testID issues`).
- **Date**: March 28, 2025

## React UMD Global Error
- **Error**: `TS2686: 'React' refers to a UMD global, but the current file is a module`.
- **Cause**: Using `React` (e.g., `jest.spyOn(React, 'useState')`) without importing it in a module.
- **Resolution**: Add `import React from 'react'` to the test file.
- **Example**: `AuthScreen.test.tsx` fix (commit `fix: add React import to AuthScreen.test.tsx to resolve TS2686 error`).
- **Date**: March 28, 2025

## `act()` Causing Unmounted Test Renderer Issues
- **Error**: `Can't access .root on unmounted test renderer` (e.g., in `HomeScreen.test.tsx` and `AppNavigator.test.tsx`).
- **Cause**: Using `act()` from `@testing-library/react-native` to wrap async operations led to premature unmounting due to timing mismatches or unhandled side effects from hooks like `useThemeMode` or navigation animations.
- **Resolution**: Removed `act()` and relied on `waitFor` to handle async stability, mocked `useThemeMode` to eliminate side effects, and simplified test setups.
- **Example**: `HomeScreen.test.tsx` fix (commit `fix: remove act() and stabilize tests with waitFor`), `AppNavigator.test.tsx` fix (commit `fix: stabilize HomeScreen navigation test with useThemeMode mock`).
- **Date**: March 28, 2025
- **Lesson**: Avoid `act()` unless necessary for state updates; prefer `waitFor` and mock hooks to prevent side effects.

## Duplicate `NavigationContainer` Rendering Issues
- **Error**: Rendering failures on Android and web (e.g., blank screens, navigation errors).
- **Cause**: Both `App.tsx` and `AppNavigator.tsx` included `NavigationContainer`, creating conflicting navigation contexts.
- **Resolution**: Moved `NavigationContainer` to `App.tsx` (root) and removed it from `AppNavigator.tsx`, updated `AppNavigator.test.tsx` to include it in test setup.
- **Example**: `App.tsx` and `AppNavigator.tsx` fix (commit `fix: remove duplicate NavigationContainer and document act() and navigation issues`), `AppNavigator.test.tsx` fix (commit `fix: add NavigationContainer to AppNavigator.test.tsx after removing it from AppNavigator`).
- **Date**: March 28, 2025
- **Lesson**: Place `NavigationContainer` at the top level (e.g., `App.tsx`) and avoid duplicating it in child navigators; update test setups accordingly.

## TypeScript Theme Type Mismatch
- **Error**: `TS2322: Type '{ colors: ...; spacing: ...; mode: string; }' is not assignable to type 'Theme'. Type 'string' is not assignable to type 'ThemeMode'`.
- **Cause**: `rneThemeBase` in `theme.js` used `mode: string`, incompatible with `@rneui/themed`’s `ThemeMode` (`'light' | 'dark' | 'system'`). Type inference failed despite `styled.d.ts` overrides due to JavaScript file limitations.
- **Resolution**: Renamed `theme.js` to `theme.ts`, added TypeScript typing with `as const` and explicit `Theme` type from `@rneui/themed`, aligning `mode` with `ThemeMode`.
- **Example**: `theme.ts` fix (commit `fix: convert theme.js to theme.ts for TypeScript type assertions (Issue #35)`), updated imports in `App.tsx`, `AuthScreen.test.tsx`, `HomeScreen.test.tsx`.
- **Date**: March 31, 2025
- **Lesson**: Use `.ts` files for TypeScript type assertions; avoid duplicate type definitions by leveraging package types directly.