import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CareScreen from '../../screens/CareScreen';
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
        <Tab.Screen name="Care" component={CareScreen} />
        <Tab.Screen name="Home" component={() => <></>} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

describe('CareScreen', () => {
  it('renders title and button with themed styles', async () => {
    const { getByText, getByTestId } = renderWithNavigation();
    await waitFor(() => {
      const title = getByTestId('care-title'); // We’ll add this testID
      const button = getByTestId('back-button');
      expect(title).toBeTruthy();
      expect(title.props.style).toMatchObject({
        color: colors.text,
        fontFamily: fonts.regular,
        fontSize: 24,
      });
      expect(button.props.style).toMatchObject({
        backgroundColor: colors.primary,
        paddingTop: spacing.small,
        paddingRight: spacing.medium,
      });
    }, { timeout: 2000 });
  });

  it('navigates to Home on button press', () => {
    const mockNavigate = jest.fn();
    const navigation: BottomTabNavigationProp<RootTabParamList, 'Care'> = {
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
    const route: RouteProp<RootTabParamList, 'Care'> = {
      key: 'Care-123',
      name: 'Care',
      params: undefined,
    };
    const { getByTestId } = render(
      <CareScreen navigation={navigation} route={route} />
    );
    fireEvent.press(getByTestId('back-button'));
    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });
});