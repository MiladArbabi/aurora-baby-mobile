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

  it('shows email button and hides Other options on click', () => {
    const { getByText, queryByText } = render(<AuthScreen />);
    expect(queryByText('Continue with Email')).toBeNull();
    fireEvent.press(getByText('Other options'));
    expect(getByText('Continue with Email')).toBeTruthy();
    expect(queryByText('Other options')).toBeNull();
  });

  it('renders footer text', () => {
    const { getByText } = render(<AuthScreen />);
    expect(getByText(/By continuing, you agree to the Terms of Service and Privacy Policy/)).toBeTruthy();
  });
});