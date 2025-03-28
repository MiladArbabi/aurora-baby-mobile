import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { RootTabParamList } from '../../navigation/AppNavigator';
import { colors, fonts, spacing } from '../../styles/theme';

const Tab = createBottomTabNavigator<RootTabParamList>();

const renderWithNavigation = () => {
  return render(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="ProfileSettings" component={() => <></>} />
        <Tab.Screen name="Harmony" component={() => <></>} />
        <Tab.Screen name="Care" component={() => <></>} />
        <Tab.Screen name="Wonder" component={() => <></>} />
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
        color: colors.text,
        fontFamily: fonts.regular,
      });
      console.log('Profile Icon Styles:', profileIcon.props.style); // Debug
      expect(profileIcon.props.style).toMatchObject({
        backgroundColor: colors.accent,
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
      console.log('Carousel Item 1 Styles:', getByTestId('carousel-item-1').props.style); // Debug
      expect(getByTestId('carousel-item-1').props.style).toMatchObject({
        backgroundColor: colors.secondary,
        borderTopLeftRadius: spacing.medium,
        borderTopRightRadius: spacing.medium,
        borderBottomLeftRadius: spacing.medium,
        borderBottomRightRadius: spacing.medium,
      });
    }, { timeout: 2000 });
  });

  it('renders themed buttons', async () => {
    const { getByTestId } = renderWithNavigation();
    await waitFor(() => {
      const careButton = getByTestId('care-button');
      const wonderButton = getByTestId('wonder-button');
      expect(careButton.props.style).toMatchObject({
        backgroundColor: colors.primary,
        paddingTop: spacing.small,
        paddingRight: spacing.medium,
      });
      expect(wonderButton.props.style).toMatchObject({
        backgroundColor: colors.primary,
        paddingTop: spacing.small,
        paddingRight: spacing.medium,
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
    const { getByTestId } = render(<HomeScreen navigation={navigation} route={route} />);
    await fireEvent.press(getByTestId('care-button'));
    expect(mockNavigate).toHaveBeenCalledWith('Care');
  });
});