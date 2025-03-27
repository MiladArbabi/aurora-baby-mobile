import React from 'react';
import styled from 'styled-components/native';
import { colors, fonts, spacing } from '../../styles/theme';

interface ButtonProps {
  text: string;
  onPress?: () => void;
}

const StyledButton = styled.TouchableOpacity`
  padding: ${spacing.small}px ${spacing.medium}px; /* 8px vertical, 16px horizontal */
  background-color: ${colors.primary}; /* #B3A5C4 */
  border-radius: ${spacing.small}px; /* 8px */
`;

const StyledText = styled.Text`
  color: ${colors.background}; /* #E9DAFA */
  font-family: ${fonts.regular}; /* Edrosa */
  text-align: center;
`;

const Button: React.FC<ButtonProps> = ({ text, onPress }) => {
  if (!text || typeof text !== 'string') {
    throw new Error('Button requires a valid text prop');
  }
  return (
    <StyledButton testID="styled-button" onPress={onPress}>
      <StyledText>{text}</StyledText>
    </StyledButton>
  );
};

export default Button;