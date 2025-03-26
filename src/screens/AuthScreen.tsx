import React, { useState } from 'react';
import { View, Text, Alert, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Button from '../components/common/Button';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '../services/firebase';
import Constants from 'expo-constants';

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`;

const LogoText = styled.Text`
  font-size: 48px;
  font-family: 'YourCustomFont';
  color: #007AFF;
  text-align: center;
`;

const Subtext = styled.Text`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-top: 10px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
`;

const SocialButton = styled(Button)`
  width: 100%;
  margin-bottom: 15px;
  background-color: #007AFF;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const OtherOptionsText = styled.Text`
  font-size: 14px;
  color: #888;
  text-decoration-line: underline;
`;

const FooterText = styled.Text`
  font-size: 12px;
  color: #888;
  text-align: center;
`;

interface AuthScreenProps {
  onGoogleSignIn?: () => void;
  onEmailSignIn?: (email: string, password: string) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onGoogleSignIn, onEmailSignIn }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  GoogleSignin.configure({
    webClientId: Constants.expoConfig?.extra?.googleWebClientId || '450824864919-2f0636shfkbv7ivr4nhjloiljs5r6tc9.apps.googleusercontent.com',
  });

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;
      if (!idToken) throw new Error('No idToken');
      await signInWithGoogle(idToken);
      if (onGoogleSignIn) onGoogleSignIn();
    } catch (error: any) {
      Alert.alert('Error', 'Google Sign-In Failed: ' + (error.message || 'Unknown error'));
    }
  };

  const handleEmailAuth = async () => {
    try {
      await signInWithEmail(email, password); // Try sign-in first
      if (onEmailSignIn) onEmailSignIn(email, password);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        await signUpWithEmail(email, password); // Sign up if user doesn’t exist
        if (onEmailSignIn) onEmailSignIn(email, password);
      } else {
        Alert.alert('Error', 'Email Auth Failed: ' + (error.message || 'Unknown error'));
      }
    }
  };

  return (
    <Container>
      <View>
        <LogoText>Aurora Baby</LogoText>
        <Subtext>Harmony, care and wonder</Subtext>
      </View>
      <ButtonContainer>
        <SocialButton text="Continue with Facebook" onPress={() => {}} />
        <SocialButton text="Continue with Google" onPress={handleGoogleSignIn} />
        <SocialButton text="Continue with Apple" onPress={() => {}} />
        {showEmail && (
          <>
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
            <SocialButton text="Login" onPress={handleEmailAuth} />
          </>
        )}
        {!showEmail && <OtherOptionsText onPress={() => setShowEmail(true)}>Other options</OtherOptionsText>}
      </ButtonContainer>
      <FooterText>
        By continuing, you agree to the <Text style={{ fontWeight: 'bold' }}>Terms of Service</Text> and <Text style={{ fontWeight: 'bold' }}>Privacy Policy</Text>
      </FooterText>
    </Container>
  );
};

export default AuthScreen;