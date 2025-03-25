import { render, fireEvent } from '@testing-library/react-native';
import AuthScreen from '../../screens/AuthScreen';

describe('AuthScreen', () => {
  it('renders animated Aurora Baby text and subtext', () => {
    const { getByText } = render(<AuthScreen />);
    expect(getByText('Aurora Baby')).toBeTruthy();
    expect(getByText('Harmony, care and wonder')).toBeTruthy();
  });

  it('renders three social buttons', () => {
    const { getByText } = render(<AuthScreen />);
    expect(getByText('Continue with Facebook')).toBeTruthy();
    expect(getByText('Continue with Google')).toBeTruthy();
    expect(getByText('Continue with Apple')).toBeTruthy();
  });

  it('shows Other options text', () => {
    const { getByText } = render(<AuthScreen />);
    expect(getByText('Other options')).toBeTruthy();
  });
});