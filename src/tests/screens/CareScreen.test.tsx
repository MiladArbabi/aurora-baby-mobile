import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import CareScreen from '../../screens/CareScreen';
import { rneThemeBase, theme } from '../../styles/theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { DefaultTheme } from 'styled-components/native';

describe('CareScreen', () => {
  const mockNavigation: StackNavigationProp<RootStackParamList, 'Care'> = {
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

  const mockRoute: RouteProp<RootStackParamList, 'Care'> = {
    key: 'Care-123',
    name: 'Care',
    params: undefined,
  };

  const renderWithNavigation = () =>
    render(
      <ThemeProvider theme={rneThemeBase}>
        <StyledThemeProvider theme={theme as DefaultTheme}>
          <NavigationContainer>
            <CareScreen navigation={mockNavigation} route={mockRoute} />
          </NavigationContainer>
        </StyledThemeProvider>
      </ThemeProvider>
    );

  it('renders circular tracker with 24-hour ring', () => {
    const { getByTestId } = renderWithNavigation();
    expect(getByTestId('tracker-ring')).toBeTruthy();
  });

  it('shows radial menu on tap and hold', async () => {
    const { getByTestId } = renderWithNavigation();
    fireEvent(getByTestId('tracker-ring'), 'longPress');
    await waitFor(() => {
      expect(getByTestId('radial-menu')).toBeTruthy();
    });
  });

  it('logs feed event on radial menu selection', async () => {
    const { getByTestId } = renderWithNavigation();
    fireEvent(getByTestId('tracker-ring'), 'longPress');
    await waitFor(() => expect(getByTestId('radial-menu')).toBeTruthy());
    fireEvent.press(getByTestId('radial-feed'));
    await waitFor(() => {
      expect(getByTestId('feed-arc')).toBeTruthy();
    }, { timeout: 2000 });
  });

  it('renders mini-navbar with multi-day toggle buttons', () => {
    const { getByTestId } = renderWithNavigation();
    expect(getByTestId('multi-day-toggle-2')).toBeTruthy();
    expect(getByTestId('multi-day-toggle-3')).toBeTruthy();
  });

  it('shows inner ring on 2-day toggle press', async () => {
    const { getByTestId } = renderWithNavigation();
    fireEvent.press(getByTestId('multi-day-toggle-2'));
    await waitFor(() => {
      expect(getByTestId('tracker-ring-2')).toBeTruthy();
    });
  });

  it('renders hour ticks on tracker', () => {
    const { getAllByTestId } = renderWithNavigation();
    const hourTicks = getAllByTestId('hour-tick');
    expect(hourTicks.length).toBe(12); // 12 hour ticks
  });

  it('renders minute ticks on tracker', () => {
    const { getAllByTestId } = renderWithNavigation();
    const minuteTicks = getAllByTestId('minute-tick');
    expect(minuteTicks.length).toBe(48); // 15-minute intervals
  });

  it('logs sleep event arc on radial menu selection', async () => {
    const { getByTestId } = renderWithNavigation();
    fireEvent(getByTestId('tracker-ring'), 'longPress');
    await waitFor(() => expect(getByTestId('radial-menu')).toBeTruthy());
    fireEvent.press(getByTestId('radial-sleep'));
    await waitFor(() => {
      expect(getByTestId('sleep-arc')).toBeTruthy();
    }, { timeout: 2000 });
  });

  it('logs diaper event arc on radial menu selection', async () => {
    const { getByTestId } = renderWithNavigation();
    fireEvent(getByTestId('tracker-ring'), 'longPress');
    await waitFor(() => expect(getByTestId('radial-menu')).toBeTruthy());
    fireEvent.press(getByTestId('radial-diaper'));
    await waitFor(() => {
      expect(getByTestId('diaper-arc')).toBeTruthy();
    }, { timeout: 2000 });
  });

  it('renders feed suggestion arc after multiple feed events', async () => {
    const { getByTestId } = renderWithNavigation();
    fireEvent(getByTestId('tracker-ring'), 'longPress');
    await waitFor(() => expect(getByTestId('radial-menu')).toBeTruthy());
    fireEvent.press(getByTestId('radial-feed')); // Log first feed
    await waitFor(() => expect(getByTestId('feed-arc')).toBeTruthy());
    fireEvent(getByTestId('tracker-ring'), 'longPress');
    await waitFor(() => expect(getByTestId('radial-menu')).toBeTruthy());
    fireEvent.press(getByTestId('radial-feed')); // Log second feed
    await waitFor(() => {
      expect(getByTestId('feed-suggestion')).toBeTruthy(); // Expect suggestion
    }, { timeout: 2000 });
  });

  it('renders sleep suggestion arc after multiple sleep events', async () => {
    const { getByTestId } = renderWithNavigation();
    fireEvent(getByTestId('tracker-ring'), 'longPress');
    await waitFor(() => expect(getByTestId('radial-menu')).toBeTruthy());
    fireEvent.press(getByTestId('radial-sleep')); // Log first sleep
    await waitFor(() => expect(getByTestId('sleep-arc')).toBeTruthy());
    fireEvent(getByTestId('tracker-ring'), 'longPress');
    await waitFor(() => expect(getByTestId('radial-menu')).toBeTruthy());
    fireEvent.press(getByTestId('radial-sleep')); // Log second sleep
    await waitFor(() => {
      expect(getByTestId('sleep-suggestion')).toBeTruthy(); // Expect suggestion
    }, { timeout: 2000 });
  });

  it('renders optimization card below tracker', () => {
    const { getByTestId } = renderWithNavigation();
    expect(getByTestId('optimization-card')).toBeTruthy();
  });

  it('renders self-care card below tracker', () => {
    const { getByTestId } = renderWithNavigation();
    expect(getByTestId('self-care-card')).toBeTruthy();
  });
});