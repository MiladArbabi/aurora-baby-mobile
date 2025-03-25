import React from 'react';
import { render } from '@testing-library/react-native';
import AppNavigator from '../../navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';

describe('AppNavigator', () => {
  it('starts at Home screen in dev mode', async () => {
    const { findByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );
    const harmonyText = await findByText('Harmony', {}, { timeout: 2000 }); 
    expect(harmonyText).toBeTruthy();
  });
});