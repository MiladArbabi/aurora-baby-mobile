import React from 'react';
import { render } from '@testing-library/react-native';
import Button from '../../../components/common/Button';

describe('Button', () => {
  it('renders with the provided text', () => {
    try {
      const { getByText } = render(<Button text="Click Me" />);
      expect(getByText('Click Me')).toBeTruthy();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Button rendering failed: ${errorMessage}`);
    }
  });
});