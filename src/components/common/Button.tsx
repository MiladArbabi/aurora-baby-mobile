import React from 'react';
import styled from 'styled-components/native';
import { AppTheme } from '../../styles/theme';

interface ButtonProps {
  text: string;
  onPress?: () => void;
  testID?: string;
}

interface StyledProps {
  theme: AppTheme;
}

const StyledButton = styled.TouchableOpacity`
  padding: ${(props: StyledProps) => props.theme.spacing.small}px ${(props: StyledProps) => props.theme.spacing.medium}px;
  background-color: ${(props: StyledProps) => props.theme.colors.primary};
  border-radius: ${(props: StyledProps) => props.theme.spacing.small}px;
`;

const StyledText = styled.Text`
  color: ${(props: StyledProps) => props.theme.colors.background};
  font-family: ${(props: StyledProps) => props.theme.fonts.regular};
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