import React from 'react';
import { render } from '@testing-library/react-native';
import AppNavigator from '../../navigation/AppNavigator';

describe('AppNavigator', () => {
  it('starts at Home screen in dev mode', () => {
    const { getByText } = render(<AppNavigator />);
    expect(getByText('Harmony')).toBeTruthy();
  });
});