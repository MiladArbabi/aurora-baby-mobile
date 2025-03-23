import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import Login from '../../screens/Login';

describe('Login', () => {
  it('authenticates with email and password', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    await act(async () => {
      fireEvent.press(getByText('Login'));
    });
    await waitFor(() => expect(getByText('Welcome')).toBeTruthy());
  });
});