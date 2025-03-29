import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../../navigation/AppNavigator';
import { ThemeProvider } from '@rneui/themed';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { rneThemeBase, theme } from '../../styles/theme';
import * as firebase from '../../services/firebase';
import { useThemeMode } from '@rneui/themed';

jest.mock('../../services/firebase', () => ({
  checkAuthState: jest.fn(),
}));

jest.mock('@rneui/themed', () => {
  const original = jest.requireActual('@rneui/themed');
  return {
    ...original,
    useThemeMode: jest.fn(() => ({
      mode: 'light',
      setMode: jest.fn(),
    })),
  };
});

describe('AppNavigator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts at Home screen when authenticated', async () => {
    (firebase.checkAuthState as jest.Mock).mockResolvedValue({ uid: 'mock-uid' });
    const { getByText } = render(
      <ThemeProvider theme={rneThemeBase}>
        <StyledThemeProvider theme={theme}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </StyledThemeProvider>
      </ThemeProvider>
    );
    await waitFor(() => {
      expect(getByText("Track Your Baby's Growth & Well-being")).toBeTruthy();
    }, { timeout: 2000 });
  });

  it('starts at Auth screen when not authenticated', async () => {
    (firebase.checkAuthState as jest.Mock).mockResolvedValue(null);
    const { getByText } = render(
      <ThemeProvider theme={rneThemeBase}>
        <StyledThemeProvider theme={theme}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </StyledThemeProvider>
      </ThemeProvider>
    );
    await waitFor(() => {
      expect(getByText('Aurora Baby')).toBeTruthy();
    }, { timeout: 2000 });
  });
});