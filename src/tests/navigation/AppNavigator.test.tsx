import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../../../App';

describe('AppNavigator', () => {
  it('starts at Home screen in dev mode', async () => {
    const { findByText } = render(<App />);
    const harmonyText = await findByText('Harmony', {}, { timeout: 2000 });
    expect(harmonyText).toBeTruthy();
  });
});