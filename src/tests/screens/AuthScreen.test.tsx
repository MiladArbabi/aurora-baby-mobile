import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AuthScreen from '../../screens/AuthScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../navigation/AppNavigator';
import * as firebase from '../../services/firebase';

jest.mock('../../services/firebase', () => ({
  ...jest.requireActual('../../services/firebase'),
  signInWithGoogle: jest.fn(() => Promise.resolve({ email: 'test@example.com', uid: 'mock-uid', getIdToken: jest.fn().mockResolvedValue('mock-token') })),
  signInWithEmail: jest.fn(() => Promise.resolve({ email: 'test@example.com', uid: 'mock-uid', getIdToken: jest.fn().mockResolvedValue('mock-token') })),
  signUpWithEmail: jest.fn(() => Promise.resolve({ email: 'test@example.com', uid: 'mock-uid', getIdToken: jest.fn().mockResolvedValue('mock-token') })),
}));

const Tab = createBottomTabNavigator<RootTabParamList>();

const EmptyScreen = () => <></>;

const renderWithNavigation = () => {
  return render(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Auth" component={AuthScreen} />
        <Tab.Screen name="Home" component={EmptyScreen} />
        <Tab.Screen name="ProfileSettings" component={EmptyScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

describe('AuthScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset useState for showEmail
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, jest.fn()]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders logo and subtext', async () => {
    const { getByText } = renderWithNavigation();
    await waitFor(() => {
      expect(getByText('Aurora Baby')).toBeTruthy();
      expect(getByText('Harmony, care and wonder')).toBeTruthy();
    }, { timeout: 2000 });
  });

  it('renders three social buttons and Other options', async () => {
    const { getByText } = renderWithNavigation();
    await waitFor(() => {
      expect(getByText('Continue with Facebook')).toBeTruthy();
      expect(getByText('Continue with Google')).toBeTruthy();
      expect(getByText('Continue with Apple')).toBeTruthy();
      expect(getByText('Other options')).toBeTruthy();
    }, { timeout: 2000 });
  });

  it('shows email/password inputs and hides Other options on click', async () => {
    const { getByText, getByPlaceholderText, queryByText } = renderWithNavigation();
    await waitFor(() => {
      expect(queryByText('Sign In')).toBeNull();
      fireEvent.press(getByText('Other options'));
      expect(getByPlaceholderText('Email')).toBeTruthy();
      expect(getByPlaceholderText('Password')).toBeTruthy();
      expect(getByText('Sign In')).toBeTruthy();
      expect(getByText('Sign Up')).toBeTruthy();
      expect(queryByText('Other options')).toBeNull();
    }, { timeout: 2000 });
  });

  it('renders footer text', async () => {
    const { getByText } = renderWithNavigation();
    await waitFor(() => {
      expect(getByText(/By continuing, you agree to the Terms of Service and Privacy Policy/)).toBeTruthy();
    }, { timeout: 2000 });
  });

  it('triggers Google sign-in/signup on button press', async () => {
    const { getByText } = renderWithNavigation();
    await waitFor(() => {
      fireEvent.press(getByText('Continue with Google'));
      expect(firebase.signInWithGoogle).toHaveBeenCalled();
    }, { timeout: 2000 });
  });

  it('triggers email sign-in on button press', async () => {
    const { getByText, getByPlaceholderText } = renderWithNavigation();
    await waitFor(() => {
      fireEvent.press(getByText('Other options'));
      fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
      fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
      fireEvent.press(getByText('Sign In'));
      expect(firebase.signInWithEmail).toHaveBeenCalledWith('test@example.com', 'password123');
    }, { timeout: 2000 });
  });

  it('triggers email sign-up on button press', async () => {
    const { getByText, getByPlaceholderText } = renderWithNavigation();
    await waitFor(() => {
      fireEvent.press(getByText('Other options'));
      fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
      fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
      fireEvent.press(getByText('Sign Up'));
      expect(firebase.signUpWithEmail).toHaveBeenCalledWith('test@example.com', 'password123');
    }, { timeout: 2000 });
  });
});