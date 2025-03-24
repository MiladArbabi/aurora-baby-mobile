import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AuthScreen from '../../screens/AuthScreen';

describe('AuthScreen', () => {
  it('renders email, Gmail, Facebook, and Apple ID options', () => {
    const { getByText, getByPlaceholderText } = render(<AuthScreen />);
    
    // Email input fields
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign In / Sign Up')).toBeTruthy();

    // Social login buttons
    expect(getByText('Sign in with Gmail')).toBeTruthy();
    expect(getByText('Sign in with Facebook')).toBeTruthy();
    expect(getByText('Sign in with Apple')).toBeTruthy();
  });

  it('triggers email sign-in/signup on button press', () => {
    const mockSignIn = jest.fn();
    const { getByText, getByPlaceholderText } = render(<AuthScreen onSignIn={mockSignIn} />);
    
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Sign In / Sign Up'));
    
    expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});