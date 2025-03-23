import React from 'react';
import { render } from '@testing-library/react-native';
import Button from '../../../components/common/Button';

describe('Button', () => {
  it('renders with the provided text and styled background', () => {
    try {
      const { getByText } = render(<Button text="Click Me" />);
      const buttonText = getByText('Click Me');
      expect(buttonText).toBeTruthy();
      const button = buttonText.parent; // StyledButton (TouchableOpacity)
      console.log('Button style:', button.props.style); // Debug
      expect(button.props.style).toMatchObject({
        color: '#FFFFFF',
        textAlign: 'center',
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Button rendering failed: ${errorMessage}`);
    }
  });
});