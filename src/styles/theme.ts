import { Theme } from '@rneui/themed';

export const colors = {
  primary: '#B3A5C4', // Lavender
  secondary: '#B3A5C4', // Lavender
  background: '#E9DAFA', // Light Lavender
  accent: '#B3A5C4', // Lavender
  text: '#E9DAFA', // Light Lavender for light mode
  contrastText: '#453F4E', // Dark Lavender for contrast in light mode
  border: '#D3C8E5', // Softer Lavender
  highlight: '#FFB6C1', // Light Pink
  muted: '#A9A9A9', // Gray
  aiGenerated: '#FFDE33',
} as const;

export const fonts = {
  regular: 'Edrosa',
  bold: 'Edrosa',
  inter: 'Inter-Regular',
  sizes: {
    title: 24,
    headline: 30,
    subtext: 18,  
    body: 16,
    small: 12,
  },
} as const;

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xsmall: 4,
} as const;

export const sizes = {
  cardWidth: 300,
  cardHeight: 200,
  topNavHeight: 60,
  bottomNavHeight: 50, 
} as const;

export const theme = {
  colors,
  fonts,
  spacing,
  sizes, 
  mode: 'light',
} as const;

export const rneThemeBase: Theme = {
  colors: {
    primary: colors.primary,
    background: colors.background,
  },
  spacing: {
    xs: spacing.xsmall,
    sm: spacing.small,
    md: spacing.medium,
    lg: spacing.large,
    xl: spacing.xlarge,
  },
  mode: 'light',
};