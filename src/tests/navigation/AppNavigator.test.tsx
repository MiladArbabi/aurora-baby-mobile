import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { AppNavigator } from '../../navigation/AppNavigator';
import { rneThemeBase, theme } from '../../styles/theme';
import { DefaultTheme } from 'styled-components/native';

// Mock Firebase
jest.mock('../../services/firebase', () => ({
  auth: {},
  checkAuthState: jest.fn(() => Promise.resolve({ email: 'test@example.com' })),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback({ email: 'test@example.com' });
    return jest.fn();
  }),
}));

// Mock expo-modules-core to suppress LegacyEventEmitter errors
jest.mock('expo-modules-core', () => ({
  EventEmitter: jest.fn(() => ({
    addListener: jest.fn(() => ({ remove: jest.fn() })),
    removeAllListeners: jest.fn(),
  })),
}));

describe('AppNavigator', () => {
  it('starts at Home screen when authenticated', async () => {
    const { findByText } = render(
      <ThemeProvider theme={rneThemeBase}>
        <StyledThemeProvider theme={theme as DefaultTheme}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </StyledThemeProvider>
      </ThemeProvider>
    );
    const homeText = await waitFor(
      () => findByText('Aurora Baby'), // Updated to match HomeScreen content
      { timeout: 2000 }
    );
    expect(homeText).toBeTruthy();
  });
});