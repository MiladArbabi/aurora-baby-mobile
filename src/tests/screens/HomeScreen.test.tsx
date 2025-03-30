import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../screens/HomeScreen';
import { ThemeProvider } from '@rneui/themed';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { rneThemeBase, theme } from '../../styles/theme';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { RootTabParamList } from '../../navigation/AppNavigator';

describe('HomeScreen', () => {
  const mockNavigation: BottomTabNavigationProp<RootTabParamList, 'Home'> = {
    navigate: jest.fn(),
    getState: jest.fn(),
    dispatch: jest.fn(),
    addListener: jest.fn(() => () => {}),
    canGoBack: jest.fn(),
    getId: jest.fn(),
    getParent: jest.fn(),
    goBack: jest.fn(),
    isFocused: jest.fn(),
    jumpTo: jest.fn(),
    removeListener: jest.fn(),
    reset: jest.fn(),
    setOptions: jest.fn(),
    setParams: jest.fn(),
    navigateDeprecated: jest.fn(),
    preload: jest.fn(),
    setStateForNextRouteNamesChange: jest.fn(),
  };

  const mockRoute: RouteProp<RootTabParamList, 'Home'> = {
    key: 'Home-123',
    name: 'Home',
    params: undefined,
  };

  const renderWithNavigation = () => {
    return render(
      <ThemeProvider theme={rneThemeBase as any}>
        <StyledThemeProvider theme={theme}>
          <NavigationContainer>
            <HomeScreen navigation={mockNavigation} route={mockRoute} />
          </NavigationContainer>
        </StyledThemeProvider>
      </ThemeProvider>
    );
  };

  it('renders top bar with logo and profile icon', async () => {
    const { getByText, getByTestId } = renderWithNavigation();
    await waitFor(() => {
      expect(getByText('Aurora Baby')).toBeTruthy();
      expect(getByTestId('profile-icon')).toBeTruthy();
    });
  });

  it('renders Figma-styled top bar with updated colors and typography', async () => {
    const { getByText, getByTestId } = renderWithNavigation();
    await waitFor(() => {
      const logo = getByText('Aurora Baby');
      const profileIcon = getByTestId('profile-icon');
      console.log('Logo styles:', logo.props.style);
      console.log('ProfileIcon styles:', profileIcon.props.style);
      expect(logo.props.style).toMatchObject({
        fontSize: 24,
        color: theme.colors.text, // '#453F4E'
        fontFamily: theme.fonts.regular, // 'Edrosa'
      });
      expect(profileIcon.props.style).toMatchObject({
        backgroundColor: theme.colors.accent, // '#F9B9B1'
        borderTopLeftRadius: 20, // Match flattened output
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
      });
    });
  });
});