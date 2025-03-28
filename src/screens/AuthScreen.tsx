import React, { useState } from 'react';
import { View, Text, Alert, TextInput, Platform } from 'react-native';
import styled from 'styled-components/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Button from '../components/common/Button';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '../services/firebase';
import Constants from 'expo-constants';
import { StackScreenProps } from '@react-navigation/stack';
import { RootTabParamList } from '../navigation/AppNavigator';

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

type AuthScreenProps = StackScreenProps<RootTabParamList, 'Auth'>;

const AuthScreen: React.FC<AuthScreenProps> = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (Platform.OS !== 'web') {
    GoogleSignin.configure({
      webClientId: Constants.expoConfig?.extra?.googleWebClientId || '450824864919-2f0636shfkbv7ivr4nhjloiljs5r6tc9.apps.googleusercontent.com',
    });
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      Alert.alert('Error', 'Google Sign-In Failed: ' + (error.message || 'Unknown error'));
    }
  };

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmail(email, password);
    } catch (error: any) {
      Alert.alert('Sign-In Error', error.message || 'Unknown error');
    }
  };

  const handleEmailSignUp = async () => {
    try {
      await signUpWithEmail(email, password);
      Alert.alert('Success', 'Account created successfully!');
    } catch (error: any) {
      Alert.alert('Sign-Up Error', error.message || 'Unknown error');
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
            <SocialButton text="Sign In" onPress={handleEmailSignIn} />
            <SocialButton text="Sign Up" onPress={handleEmailSignUp} />
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