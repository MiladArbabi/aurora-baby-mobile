import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      accent: string;
      text: string;
      contrastText: string;
      border: string;
      highlight: string;
      muted: string;
    };
    fonts: {
      regular: string;
      bold: string;
      inter: string;
      sizes: {
        title: number;
        headline: number; // Added
        subtext: number;  // Added
        body: number;
        small: number;
      };
    };
    spacing: {
      small: number;
      medium: number;
      large: number;
      xlarge: number;
      xsmall: number;
    };
    sizes: { // Added
      cardWidth: number;
      cardHeight: number;
      topNavHeight: number;
      bottomNavHeight: number;
    };
    mode: string;
  }
}

// Override @rneui/themed Theme type
declare module '@rneui/themed' {
  export type ThemeMode = 'light' | 'dark' | 'system';
  export interface ThemeSpacing {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  }
  export interface Theme {
    colors: {
      primary: string;
      background: string;
    };
    spacing: ThemeSpacing;
    mode: ThemeMode;
  }
  export const ThemeProvider: React.FC<{ theme: Theme; children: React.ReactNode }>;
}