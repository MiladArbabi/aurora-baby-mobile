import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import AppNavigator from './src/navigation/AppNavigator';
import { rneThemeBase, theme } from './src/styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={rneThemeBase}>
      <StyledThemeProvider theme={theme}>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
        </NavigationContainer>
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

export default App;