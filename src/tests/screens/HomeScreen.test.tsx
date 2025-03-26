import { render } from '@testing-library/react-native';
import HomeScreen from '../../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';  // Fixed path

const Stack = createStackNavigator<RootStackParamList>();

const renderWithNavigation = () => {
  return render(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettingScreen} />
        <Stack.Screen name="Harmony" component={HarmonyScreen} />
        <Stack.Screen name="Care" component={CareScreen} />
        <Stack.Screen name="Wonder" component={WonderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ProfileSettingScreen: React.FC = () => <></>;
const HarmonyScreen: React.FC = () => <></>;
const CareScreen: React.FC = () => <></>;
const WonderScreen: React.FC = () => <></>;

describe('HomeScreen', () => {
  it('renders Harmony button', () => {
    const { getByText } = renderWithNavigation();
    expect(getByText('Harmony')).toBeTruthy();
  });
});