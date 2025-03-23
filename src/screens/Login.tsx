import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const StyledInput = styled.TextInput`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 5px;
`;

const StyledButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #007AFF;
  border-radius: 5px;
`;

const StyledText = styled.Text`
  color: #FFFFFF;
  text-align: center;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {loggedIn ? (
        <Text>Welcome</Text>
      ) : (
        <>
          <StyledInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <StyledInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <StyledButton onPress={handleLogin}>
            <StyledText>Login</StyledText>
          </StyledButton>
        </>
      )}
    </View>
  );
};

export default Login;