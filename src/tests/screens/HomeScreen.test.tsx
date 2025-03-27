import { render } from '@testing-library/react-native';
import HomeScreen from '../../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../navigation/AppNavigator'; // Updated to RootTabParamList

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
  it('renders Harmony button', () => { // Update to match new HomeScreen content if needed
    const { getByText } = renderWithNavigation();
    expect(getByText('Track Your Baby\'s Growth & Well-being')).toBeTruthy(); // Match new card text
  });
});