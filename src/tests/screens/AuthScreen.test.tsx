import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AuthScreen from '../../screens/AuthScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../navigation/AppNavigator';
import * as firebase from '../../services/firebase';
import { ThemeProvider } from '@rneui/themed';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { rneThemeBase, theme } from '../../styles/theme';
import { DefaultTheme } from 'styled-components/native';

jest.mock('../../services/firebase', () => ({
  ...jest.requireActual('../../services/firebase'),
  signInWithGoogle: jest.fn(() => Promise.resolve({ email: 'test@example.com', uid: 'mock-uid', getIdToken: jest.fn().mockResolvedValue('mock-token') })),
  signInWithEmail: jest.fn(() => Promise.resolve({ email: 'test@example.com', uid: 'mock-uid', getIdToken: jest.fn().mockResolvedValue('mock-token') })),
  signUpWithEmail: jest.fn(() => Promise.resolve({ email: 'test@example.com', uid: 'mock-uid', getIdToken: jest.fn().mockResolvedValue('mock-token') })),
}));

const Tab = createBottomTabNavigator<RootTabParamList>();

const EmptyScreen = () => <></>;

const renderWithNavigation = () => {
  const typedTheme: DefaultTheme = theme as DefaultTheme;
  return render(
    <ThemeProvider theme={rneThemeBase as any}>
      <StyledThemeProvider theme={typedTheme}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Auth" component={AuthScreen} />
            <Tab.Screen name="Home" component={EmptyScreen} />
            <Tab.Screen name="ProfileSettings" component={EmptyScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

describe('AuthScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, jest.fn()]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders logo and subtext', async () => {
    const { getByText } = renderWithNavigation();
    await waitFor(() => {
      expect(getByText('Aurora Baby')).toBeTruthy();
      expect(getByText('harmony, care and wonder')).toBeTruthy();
    }, { timeout: 2000 });
  });

  it('renders three social buttons and Other options', async () => {
    const { getByText } = renderWithNavigation();
    await waitFor(() => {
      expect(getByText('CONTINUE WITH FACEBOOK')).toBeTruthy();
      expect(getByText('CONTINUE WITH GOOGLE')).toBeTruthy();
      expect(getByText('CONTINUE WITH APPLE')).toBeTruthy();
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
    const { getByTestId } = renderWithNavigation();
    await waitFor(() => {
      expect(getByTestId('footer-text')).toBeTruthy();
    }, { timeout: 2000 });
  });

  it('triggers Google sign-in/signup on button press', async () => {
    const { getByTestId } = renderWithNavigation();
    await waitFor(() => {
      fireEvent.press(getByTestId('styled-button-google'));
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

  it('renders Figma-styled AuthScreen with updated design', async () => {
    const { getByText, getByTestId } = renderWithNavigation();
    await waitFor(() => {
      const container = getByTestId('auth-container');
      const logoImage = getByTestId('logo-image');
      const logoText = getByText('Aurora Baby');
      const subtext = getByText('harmony, care and wonder');
      const googleButton = getByTestId('styled-button-google');
      const facebookButton = getByTestId('styled-button-facebook');
      const appleButton = getByTestId('styled-button-apple');
      const otherOptions = getByText('Other options');
      const footer = getByTestId('footer-text');
      const skipButtonContainer = getByTestId('skip-button-container');

      expect(container.props.source).toEqual(require('../../assets/lightbackground.png'));
      expect(logoImage.props.source).toEqual(require('../../assets/colorlogo.png'));
      expect(logoImage.props.style).toMatchObject({ width: 125, height: 125 });
      expect(logoText.props.style).toMatchObject({
        fontSize: 36,
        color: '#453F4E', // Updated to Dark Lavender
        fontFamily: theme.fonts.regular, // 'Edrosa'
        textAlign: 'center',
      });
      expect(subtext.props.style).toMatchObject({
        fontSize: 16,
        color: theme.colors.muted, // '#A9A9A9'
        fontFamily: theme.fonts.regular,
      });
      expect(googleButton.props.style).toMatchObject({
        backgroundColor: theme.colors.primary, // '#B3A5C4'
        paddingTop: theme.spacing.small,
        paddingRight: theme.spacing.medium,
        paddingBottom: theme.spacing.small,
        paddingLeft: theme.spacing.medium,
        borderWidth: 1,
        borderColor: theme.colors.border, // '#D3C8E5'
        width: 325,
        height: 55,
      });
      expect(facebookButton.props.style).toMatchObject(googleButton.props.style);
      expect(appleButton.props.style).toMatchObject(googleButton.props.style);
      expect(otherOptions.props.style).toMatchObject({
        fontSize: 16,
        color: theme.colors.primary, // '#B3A5C4'
        fontFamily: theme.fonts.regular,
      });
      expect(footer.props.style).toMatchObject({
        fontSize: 10,
        color: '#453F4E', // Dark Lavender
        fontFamily: theme.fonts.inter, // 'Inter-Regular'
        textAlign: 'center',
      });
      expect(footer).toBeTruthy();
      expect(getByText('Terms of Service')).toBeTruthy();
      expect(getByText('Privacy Policy')).toBeTruthy();
      expect(skipButtonContainer.props.style).toMatchObject({
        backgroundColor: '#453F4E',
        paddingTop: theme.spacing.small,
        paddingRight: theme.spacing.medium,
        paddingBottom: theme.spacing.small,
        paddingLeft: theme.spacing.medium,
        position: 'absolute',
        top: theme.spacing.xlarge,
        right: theme.spacing.large,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
      });
      expect(getByText('SKIP').props.style).toMatchObject({
        fontSize: 16,
        color: theme.colors.background, // '#E9DAFA'
        fontFamily: theme.fonts.regular,
        textAlign: 'center',
      });
    }, { timeout: 2000 });
  });
});