import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import Button from '../components/common/Button';

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

const AuthScreen: React.FC = () => {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <Container>
      <View>
        <LogoText>Aurora Baby</LogoText>
        <Subtext>Harmony, care and wonder</Subtext>
      </View>
      <ButtonContainer>
        <SocialButton text="Continue with Facebook" onPress={() => {}} />
        <SocialButton text="Continue with Google" onPress={() => {}} />
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