import { createTheme } from '@rneui/themed';

// Define a custom colors interface instead of extending Colors
interface ExtendedColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  highlight: string;
}

// Base tokens
const baseColors = {
  lightLavender: '#E9DAFA',
  darkLavender: '#453F4E',
  primary: '#B3A5C4',
  secondary: '#ACCED7',
  accent: '#F9B9B1',
  highlight: '#FFD700',
};

export const fonts = {
  regular: 'Edrosa',
  bold: 'Edrosa-Bold',
  italic: 'Edrosa-Italic',
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

// Define explicit light and dark themes
export const lightTheme: ExtendedColors = {
  background: baseColors.lightLavender,
  text: baseColors.darkLavender,
  primary: baseColors.primary,
  secondary: baseColors.secondary,
  accent: baseColors.accent,
  highlight: baseColors.highlight,
};

export const darkTheme: ExtendedColors = {
  background: baseColors.darkLavender,
  text: baseColors.lightLavender,
  primary: baseColors.primary,
  secondary: baseColors.secondary,
  accent: baseColors.accent,
  highlight: baseColors.highlight,
};

// RNE base theme
export const rneThemeBase = createTheme({
  lightColors: lightTheme,
  darkColors: darkTheme,
  mode: 'light',
});

// Flattened theme for styled-components
export const theme: AppTheme = {
  colors: lightTheme, // Default to light theme
  fonts,
  spacing,
  mode: 'light', // Explicitly set to avoid undefined
};

// TypeScript support for styled-components
export interface AppTheme {
  colors: ExtendedColors;
  fonts: typeof fonts;
  spacing: typeof spacing;
  mode: 'light' | 'dark';
}

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}