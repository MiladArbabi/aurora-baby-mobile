import { render } from '@testing-library/react-native';
import HomeScreen from '../../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const renderWithNavigation = () => {
  return render(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProfileSettings" component={() => <></>} />
        <Stack.Screen name="Harmony" component={() => <></>} />
        <Stack.Screen name="Care" component={() => <></>} />
        <Stack.Screen name="Wonder" component={() => <></>} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe('HomeScreen', () => {
  it('renders Harmony button', () => {
    const { getByText } = renderWithNavigation();
    expect(getByText('Harmony')).toBeTruthy();
  });
});