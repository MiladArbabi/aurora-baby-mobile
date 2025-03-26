import { render, fireEvent } from '@testing-library/react-native';
import AuthScreen from '../../screens/AuthScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const renderWithNavigation = () => {
  return render(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={() => <></>} />
        <Stack.Screen name="ProfileSettings" component={() => <></>} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe('AuthScreen', () => {
  it('renders logo and subtext', () => {
    const { getByText } = renderWithNavigation();
    expect(getByText('Aurora Baby')).toBeTruthy();
    expect(getByText('Harmony, care and wonder')).toBeTruthy();
  });

  it('renders three social buttons and Other options', () => {
    const { getByText } = renderWithNavigation();
    expect(getByText('Continue with Facebook')).toBeTruthy();
    expect(getByText('Continue with Google')).toBeTruthy();
    expect(getByText('Continue with Apple')).toBeTruthy();
    expect(getByText('Other options')).toBeTruthy();
  });

  it('shows email/password inputs and hides Other options on click', () => {
    const { getByText, getByPlaceholderText, queryByText } = renderWithNavigation();
    expect(queryByText('Sign In')).toBeNull();
    fireEvent.press(getByText('Other options'));
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(queryByText('Other options')).toBeNull();
  });

  it('renders footer text', () => {
    const { getByText } = renderWithNavigation();
    expect(getByText(/By continuing, you agree to the Terms of Service and Privacy Policy/)).toBeTruthy();
  });

  it('triggers Google sign-in/signup on button press', async () => {
    const { getByText } = renderWithNavigation();
    await fireEvent.press(getByText('Continue with Google'));
  });

  it('triggers email sign-in on button press', async () => {
    const { getByText, getByPlaceholderText } = renderWithNavigation();
    fireEvent.press(getByText('Other options'));
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    await fireEvent.press(getByText('Sign In'));
  });

  it('triggers email sign-up on button press', async () => {
    const { getByText, getByPlaceholderText } = renderWithNavigation();
    fireEvent.press(getByText('Other options'));
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    await fireEvent.press(getByText('Sign Up'));
  });
});