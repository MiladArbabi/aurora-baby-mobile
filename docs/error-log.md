# Error Log for Aurora Baby Mobile

This document tracks recurring errors, their causes, and resolutions to streamline development.

## Table of Contents
- [Multiple Elements with Same Text](#multiple-elements-with-same-text)
- [TypeScript Navigation Prop Mismatch](#typescript-navigation-prop-mismatch)
- [TestID Not Found](#testid-not-found)
- [React UMD Global Error](#react-umd-global-error)

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