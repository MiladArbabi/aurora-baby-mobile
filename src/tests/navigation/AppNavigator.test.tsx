import React from 'react';
import { render } from '@testing-library/react-native';
import AppNavigator from '../../navigation/AppNavigator';

describe('AppNavigator', () => {
  it('starts at Login screen', () => {
    const { getByPlaceholderText } = render(<AppNavigator />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
  });
});