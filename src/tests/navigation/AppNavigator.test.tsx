import React from 'react';
import { render } from '@testing-library/react-native';
import AppNavigator from '../../navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';

describe('AppNavigator', () => {
  it('starts at Home screen in dev mode', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );
    expect(getByText('Harmony')).toBeTruthy();
  });
});