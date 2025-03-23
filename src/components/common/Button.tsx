import React from 'react';
import styled from 'styled-components/native';

interface ButtonProps {
  text: string;
}

const StyledButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #007AFF;
  border-radius: 5px;
`;

const StyledText = styled.Text`
  color: #FFFFFF;
  text-align: center;
`;

const Button: React.FC<ButtonProps> = ({ text }) => {
  if (!text || typeof text !== 'string') {
    throw new Error('Button requires a valid text prop');
  }
  return (
    <StyledButton>
      <StyledText>{text}</StyledText>
    </StyledButton>
  );
};

export default Button;