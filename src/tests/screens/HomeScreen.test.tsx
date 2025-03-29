import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { RootTabParamList } from '../../navigation/AppNavigator';
import { ThemeProvider } from '@rneui/themed';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { rneThemeBase, theme } from '../../styles/theme';

// Mock useThemeMode to eliminate side effects
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

// Dummy components to avoid inline functions
const DummyScreen = () => null;

const Tab = createBottomTabNavigator<RootTabParamList>();

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider theme={rneThemeBase}>
      <StyledThemeProvider theme={theme}>
        {component}
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

const renderWithNavigation = () => {
  return renderWithTheme(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="ProfileSettings" component={DummyScreen} />
        <Tab.Screen name="Harmony" component={DummyScreen} />
        <Tab.Screen name="Care" component={DummyScreen} />
        <Tab.Screen name="Wonder" component={DummyScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

describe('HomeScreen', () => {
  it('renders top bar with logo and profile icon', async () => {
    const { getByText, getByTestId } = renderWithNavigation();
    await waitFor(() => {
      const logo = getByText('Aurora Baby');
      const profileIcon = getByTestId('profile-icon');
      expect(logo).toBeTruthy();
      expect(logo.props.style).toMatchObject({
        color: theme.colors.text,
        fontFamily: theme.fonts.regular,
      });
      expect(profileIcon.props.style).toMatchObject({
        backgroundColor: theme.colors.accent,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      });
    }, { timeout: 2000 });
  });

  it('renders carousel with themed items', async () => {
    const { getByText, getByTestId } = renderWithNavigation();
    await waitFor(() => {
      const featuredStory = getByText('Featured Story');
      const createStory = getByText('Create Your Story');
      expect(featuredStory).toBeTruthy();
      expect(createStory).toBeTruthy();
      expect(getByTestId('carousel-item-1').props.style).toMatchObject({
        backgroundColor: theme.colors.secondary,
        borderTopLeftRadius: theme.spacing.medium,
        borderTopRightRadius: theme.spacing.medium,
        borderBottomLeftRadius: theme.spacing.medium,
        borderBottomRightRadius: theme.spacing.medium,
      });
    }, { timeout: 2000 });
  });

  it('renders themed buttons', async () => {
    const { getByTestId } = renderWithNavigation();
    await waitFor(() => {
      const careButton = getByTestId('care-button');
      const wonderButton = getByTestId('wonder-button');
      const themeToggle = getByTestId('theme-toggle');
      expect(careButton.props.style).toMatchObject({
        backgroundColor: theme.colors.primary,
        paddingTop: theme.spacing.small,
        paddingRight: theme.spacing.medium,
      });
      expect(wonderButton.props.style).toMatchObject({
        backgroundColor: theme.colors.primary,
        paddingTop: theme.spacing.small,
        paddingRight: theme.spacing.medium,
      });
      expect(themeToggle.props.style).toMatchObject({
        backgroundColor: theme.colors.primary,
        paddingTop: theme.spacing.small,
        paddingRight: theme.spacing.medium,
      });
    }, { timeout: 2000 });
  });

  it('navigates to Care screen on button press', async () => {
    const mockNavigate = jest.fn();
    const navigation: BottomTabNavigationProp<RootTabParamList, 'Home'> = {
      navigate: mockNavigate,
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
    const route: RouteProp<RootTabParamList, 'Home'> = {
      key: 'Home-123',
      name: 'Home',
      params: undefined,
    };

    // Render and wait for stability
    const { getByTestId, debug } = renderWithTheme(
      <HomeScreen navigation={navigation} route={route} />
    );

    // Debug to inspect the rendered output
    // Uncomment to see the DOM state before interaction
    // debug();

    // Wait for the button to be available
    await waitFor(() => {
      const careButton = getByTestId('care-button');
      expect(careButton).toBeTruthy();
    }, { timeout: 2000 });

    // Fire the event and wait for completion
    fireEvent.press(getByTestId('care-button'));

    // Wait for navigation to be called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Care');
    }, { timeout: 1000 });
  });
});