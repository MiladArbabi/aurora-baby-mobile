import React, { ReactNode } from 'react';

export const GestureHandlerRootView = React.forwardRef<any, { children: ReactNode }>(({ children }, _ref) => children);
export const PanGestureHandler = React.forwardRef<any, { children: ReactNode }>(({ children }, _ref) => children);

export default {
  install: jest.fn(),
};