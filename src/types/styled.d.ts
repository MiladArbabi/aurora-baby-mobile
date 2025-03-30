import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      accent: string;
      text: string;
      contrastText: string; // Added for mode-adaptive contrast
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
    mode: 'light' | 'dark';
  }
}