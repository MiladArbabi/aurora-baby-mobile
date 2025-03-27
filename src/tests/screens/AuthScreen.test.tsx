import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AuthScreen from '../../screens/AuthScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../navigation/AppNavigator';

// Mock firebase module (already mocked in __mocks__/firebase.ts)
jest.mock('../../services/firebase');

const Tab = createBottomTabNavigator<RootTabParamList>();

const renderWithNavigation = () => {
  return render(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Auth" component={AuthScreen} />
        <Tab.Screen name="Home" component={() => <></>} />
        <Tab.Screen name="ProfileSettings" component={() => <></>} />
      </Tab.Navigator>
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
    const { signInWithGoogle } = require('../../services/firebase'); // Use mocked version
    await waitFor(() => fireEvent.press(getByText('Continue with Google')), { timeout: 2000 });
    expect(signInWithGoogle).toHaveBeenCalled();
  });

  it('triggers email sign-in on button press', async () => {
    const { getByText, getByPlaceholderText } = renderWithNavigation();
    const { signInWithEmail } = require('../../services/firebase'); // Use mocked version
    fireEvent.press(getByText('Other options'));
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    await waitFor(() => fireEvent.press(getByText('Sign In')), { timeout: 2000 });
    expect(signInWithEmail).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('triggers email sign-up on button press', async () => {
    const { getByText, getByPlaceholderText } = renderWithNavigation();
    const { signUpWithEmail } = require('../../services/firebase'); // Use mocked version
    fireEvent.press(getByText('Other options'));
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    await waitFor(() => fireEvent.press(getByText('Sign Up')), { timeout: 2000 });
    expect(signUpWithEmail).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});