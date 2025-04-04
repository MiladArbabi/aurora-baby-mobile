import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@rneui/themed';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { useFonts } from 'expo-font';
import AppNavigator from './src/navigation/AppNavigator';
import { rneThemeBase, theme } from './src/styles/theme';
import LoadingSpinner from './src/components/common/LoadingSpinner';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Edrosa': require('./src/assets/fonts/Edrosa.otf'),
  });
  console.log('Fonts loaded:', fontsLoaded);

  if (!fontsLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider theme={rneThemeBase as any}>
      <StyledThemeProvider theme={theme}>
        <AppNavigator />
        <StatusBar style="auto" />
      </StyledThemeProvider>
    </ThemeProvider>
  );
}