import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../../screens/HomeScreen';

describe('HomeScreen', () => {
  it('displays Harmony, Care, and Wonder buttons', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Harmony')).toBeTruthy();
    expect(getByText('Care')).toBeTruthy();
    expect(getByText('Wonder')).toBeTruthy();
  });
});