import React from 'react';
import { render } from '@testing-library/react-native';
import Button from '../../components/common/Button';

describe('Button', () => {
  it('renders with the provided text and styled background', () => {
    try {
      const { getByText, getByTestId } = render(<Button text="Click Me" />);
      const buttonText = getByText('Click Me'); // StyledText
      const button = getByTestId('styled-button'); // StyledButton
      expect(buttonText).toBeTruthy();

      // Debug styles
      //console.log('Text style:', buttonText.props.style);
      //console.log('Button style:', button.props.style);

      // Test StyledText styles
      expect(buttonText.props.style).toMatchObject({
        color: '#FFFFFF',
        textAlign: 'center'
      });

      // Test StyledButton styles
      expect(button.props.style).toMatchObject({
        backgroundColor: '#007AFF',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Button rendering failed: ${errorMessage}`);
    }
  });
});