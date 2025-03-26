import { render, fireEvent } from '@testing-library/react-native';
import AuthScreen from '../../screens/AuthScreen';

describe('AuthScreen', () => {
  it('renders logo and subtext', () => {
    const { getByText } = render(<AuthScreen />);
    expect(getByText('Aurora Baby')).toBeTruthy();
    expect(getByText('Harmony, care and wonder')).toBeTruthy();
  });

  it('renders three social buttons and Other options', () => {
    const { getByText } = render(<AuthScreen />);
    expect(getByText('Continue with Facebook')).toBeTruthy();
    expect(getByText('Continue with Google')).toBeTruthy();
    expect(getByText('Continue with Apple')).toBeTruthy();
    expect(getByText('Other options')).toBeTruthy();
  });

  it('shows email/password inputs and hides Other options on click', () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<AuthScreen />);
    expect(queryByText('Login')).toBeNull();
    fireEvent.press(getByText('Other options'));
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(queryByText('Other options')).toBeNull();
  });

  it('renders footer text', () => {
    const { getByText } = render(<AuthScreen />);
    expect(getByText(/By continuing, you agree to the Terms of Service and Privacy Policy/)).toBeTruthy();
  });

  it('triggers Google sign-in/signup on button press', async () => {
    const mockGoogleSignIn = jest.fn();
    const { getByText } = render(<AuthScreen onGoogleSignIn={mockGoogleSignIn} />);
    await fireEvent.press(getByText('Continue with Google'));
    expect(mockGoogleSignIn).toHaveBeenCalled();
  });

  it('triggers email sign-in/signup on button press', async () => {
    const mockEmailSignIn = jest.fn();
    const { getByText, getByPlaceholderText } = render(<AuthScreen onEmailSignIn={mockEmailSignIn} />);
    fireEvent.press(getByText('Other options'));
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    await fireEvent.press(getByText('Login'));
    expect(mockEmailSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});