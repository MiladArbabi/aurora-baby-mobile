import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import styled from 'styled-components/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Button from '../components/common/Button';
import { signInWithGoogle } from '../services/firebase';
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
  font-family: 'YourCustomFont'; /* Replace with Aurora Baby’s font */
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
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onGoogleSignIn }) => {
  const [showEmail, setShowEmail] = useState(false);

  GoogleSignin.configure({
    webClientId: Constants.expoConfig?.extra?.googleWebClientId || '450824864919-2f0636shfkbv7ivr4nhjloiljs5r6tc9.apps.googleusercontent.com',
  });

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;
      if (!idToken) throw new Error('No idToken in Google response');
      await signInWithGoogle(idToken);
      if (onGoogleSignIn) onGoogleSignIn();
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      Alert.alert('Error', 'Failed to sign in with Google: ' + (error.message || 'Unknown error'));
      throw error; // Re-throw to ensure test catches it
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
        {showEmail && <SocialButton text="Continue with Email" onPress={() => {}} />}
        {!showEmail && <OtherOptionsText onPress={() => setShowEmail(true)}>Other options</OtherOptionsText>}
      </ButtonContainer>
      <FooterText>
        By continuing, you agree to the <Text style={{ fontWeight: 'bold' }}>Terms of Service</Text> and <Text style={{ fontWeight: 'bold' }}>Privacy Policy</Text>
      </FooterText>
    </Container>
  );
};

export default AuthScreen;