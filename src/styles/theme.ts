import { Theme } from '@rneui/themed';

export const colors = {
  // Light Mode
  primary: '#00A0A0', // Teal (adjusted for contrast)
  background: '#FFFFFF', // White
  secondaryBackground: '#FFF5EB', // Soft Peach
  accent: '#FFD1B3', // Peach
  secondaryAccent: '#E6E1F4', // Light Lavender
  tertiaryAccent: '#A4B9CC', // Dusty Blue
  text: '#453F4E', // Dark Lavender for light mode text
  contrastText: '#453F4E', // Dark Lavender
  border: '#D3C8E5', // Softer Lavender
  highlight: '#FFB6C1', // Light Pink
  muted: '#A9A9A9', // Gray
  aiGenerated: '#FFD700', // Sunny Gold

  // Dark Mode
  darkPrimary: '#008080', // Teal
  darkBackground: '#2F2346', // Dark Lavender (adjusted for contrast)
  darkAccent: '#FFD1B3', // Peach
  darkText: '#E9DAFA', // Light Lavender for dark mode text
  darkContrastText: '#E9DAFA', // Light Lavender
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
  miniCardWidth: 100, // For optimization/self-care cards
  miniCardHeight: 200,
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

export const darkTheme: Theme = {
  colors: {
    primary: colors.darkPrimary,
    background: colors.darkBackground,
  },
  spacing: {
    xs: spacing.xsmall,
    sm: spacing.small,
    md: spacing.medium,
    lg: spacing.large,
    xl: spacing.xlarge,
  },
  mode: 'dark',
};