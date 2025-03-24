import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Button from '../components/common/Button';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SocialButton = styled(Button)`
  margin-top: 10px;
  background-color: #007AFF; /* Default blue, can be customized per provider */
`;

interface AuthScreenProps {
  onSignIn?: (email: string, password: string) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailAuth = () => {
    if (onSignIn) {
      onSignIn(email, password);
    }
  };

  return (
    <Container>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button text="Sign In / Sign Up" onPress={handleEmailAuth} />
      <SocialButton text="Sign in with Gmail" onPress={() => {}} />
      <SocialButton text="Sign in with Facebook" onPress={() => {}} />
      <SocialButton text="Sign in with Apple" onPress={() => {}} />
    </Container>
  );
};

export default AuthScreen;