// src/styles/theme.js
export const colors = {
  primary: '#B3A5C4', // Lavender
  secondary: '#ACCED7', // Dusty Blue
  background: '#E9DAFA', // Light Lavender
  accent: '#F9B9B1', // Peach
  text: '#453F4E', // Dark Lavender
  // Figma-inspired additions
  border: '#D3C8E5', // Softer Lavender
  highlight: '#FFB6C1', // Light Pink
  muted: '#A9A9A9', // Gray
};

export const fonts = {
  regular: 'Edrosa',
  bold: 'Edrosa',
  sizes: {
    title: 24,
    body: 16,
    small: 12,
  },
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xsmall: 4,
};

export const theme = {
  colors,
  fonts,
  spacing,
  mode: 'light',
};

export const rneThemeBase = {
  colors: {
    primary: colors.primary,
    background: colors.background,
  },
  mode: 'light'
};