import React from 'react';
import { render } from '@testing-library/react-native';
import AppNavigator from '../../navigation/AppNavigator';

describe('AppNavigator', () => {
  it('navigates to HomeScreen', () => {
    const { getByTestId } = render(<AppNavigator />);
    expect(getByTestId('home-title')).toBeTruthy();
  });
});