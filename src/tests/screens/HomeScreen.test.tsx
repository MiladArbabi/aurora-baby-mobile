import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import HomeScreen from '../../screens/HomeScreen';
import { rneThemeBase, theme } from '../../styles/theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { DefaultTheme } from 'styled-components/native';

describe('HomeScreen', () => {
  const mockNavigation: StackNavigationProp<RootStackParamList, 'Home'> = {
    navigate: jest.fn(),
    getState: jest.fn(),
    dispatch: jest.fn(),
    addListener: jest.fn(() => () => {}),
    canGoBack: jest.fn(),
    getId: jest.fn(),
    getParent: jest.fn(),
    goBack: jest.fn(),
    isFocused: jest.fn(),
    removeListener: jest.fn(),
    reset: jest.fn(),
    setOptions: jest.fn(),
    setParams: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    pop: jest.fn(),
    popTo: jest.fn(),
    popToTop: jest.fn(),
    navigateDeprecated: jest.fn(),
    preload: jest.fn(),
    setStateForNextRouteNamesChange: jest.fn(),
  };

  const mockRoute: RouteProp<RootStackParamList, 'Home'> = {
    key: 'Home-123',
    name: 'Home',
    params: undefined,
  };

  const renderWithNavigation = () =>
    render(
      <ThemeProvider theme={rneThemeBase}>
        <StyledThemeProvider theme={theme as DefaultTheme}>
          <NavigationContainer>
            <HomeScreen navigation={mockNavigation} route={mockRoute} />
          </NavigationContainer>
        </StyledThemeProvider>
      </ThemeProvider>
    );

  it('renders top nav with logo, text, and avatar', async () => {
    const { getByTestId, getByText } = renderWithNavigation();
    await waitFor(() => {
      expect(getByTestId('top-nav-logo')).toBeTruthy();
      expect(getByText('Aurora Baby')).toBeTruthy();
      expect(getByTestId('top-nav-avatar')).toBeTruthy();
    });
  });

  it('renders three static vertical cards for Harmony, Care, and Wonder', async () => {
    const { getByTestId, getByText } = renderWithNavigation();
    await waitFor(() => {
      expect(getByTestId('home-card-harmony')).toBeTruthy();
      expect(getByText('HARMONY')).toBeTruthy();
      expect(getByText('Sweet Moments, Shared Stories')).toBeTruthy();
      expect(getByText('Find calm and connection in gentle stories')).toBeTruthy();

      expect(getByTestId('home-card-care')).toBeTruthy();
      expect(getByText('CARE')).toBeTruthy();
      expect(getByText('Your Baby’s Journey Simplified')).toBeTruthy();
      expect(getByText('Easy tracking for a confident parenting experience')).toBeTruthy();

      expect(getByTestId('home-card-wonder')).toBeTruthy();
      expect(getByText('WONDER WORLD')).toBeTruthy();
      expect(getByText('Spark Their Little Imagination')).toBeTruthy();
      expect(getByText('Magical AR/VR adventures for curious baby minds')).toBeTruthy();
    });
  });

  it('navigates to Harmony when Harmony card is pressed', async () => {
    const { getByTestId } = renderWithNavigation();
    await waitFor(() => {
      fireEvent.press(getByTestId('home-card-harmony'));
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Harmony');
    });
  });

  it('renders bottom nav with all icons', async () => {
    const { getByTestId } = renderWithNavigation();
    await waitFor(() => {
      expect(getByTestId('bottom-nav-home')).toBeTruthy();
      expect(getByTestId('bottom-nav-harmony')).toBeTruthy();
      expect(getByTestId('bottom-nav-care')).toBeTruthy();
      expect(getByTestId('bottom-nav-wonder')).toBeTruthy();
    });
  });
});