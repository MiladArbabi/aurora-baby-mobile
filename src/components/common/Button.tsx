import React from 'react';
import styled from 'styled-components/native';
import { colors, fonts, spacing } from '../../styles/theme';

interface ButtonProps {
  text: string;
  onPress?: () => void;
  testID?: string;
}

const StyledButton = styled.TouchableOpacity`
  padding: ${spacing.small}px ${spacing.medium}px;
  background-color: ${colors.primary};
  border-radius: ${spacing.small}px;
`;

const StyledText = styled.Text`
  color: ${colors.background};
  font-family: ${fonts.regular};
  text-align: center;
`;

const Button: React.FC<ButtonProps> = ({ text, onPress, testID }) => {
  if (!text || typeof text !== 'string') {
    throw new Error('Button requires a valid text prop');
  }
  return (
    <StyledButton testID={testID || 'styled-button'} onPress={onPress}>
      <StyledText>{text}</StyledText>
    </StyledButton>
  );
};

export default Button;