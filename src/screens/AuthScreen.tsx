import React, { useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Button from '../components/common/Button';

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`;

const LogoText = styled(Animated.Text)`
  font-size: 48px;
  font-family: 'YourCustomFont'; /* Replace with Aurora Baby’s font */
  color: #007AFF;
  text-align: center;
`;

const Subtext = styled(Animated.Text)`
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

const AuthScreen: React.FC = () => {
  const logoPosition = useSharedValue(0);
  const subtextOpacity = useSharedValue(0);

  useEffect(() => {
    logoPosition.value = withTiming(10, { duration: 1000, easing: Easing.inOut(Easing.ease) });
    subtextOpacity.value = withTiming(1, { duration: 2000 });
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: logoPosition.value }],
  }), [logoPosition]);

  const subtextStyle = useAnimatedStyle(() => ({
    opacity: subtextOpacity.value,
  }), [subtextOpacity]);

  return (
    <Container>
      <View>
        <LogoText style={logoStyle}>Aurora Baby</LogoText>
        <Subtext style={subtextStyle}>Harmony, care and wonder</Subtext>
      </View>
      <ButtonContainer>
        <SocialButton text="Continue with Facebook" onPress={() => {}} />
        <SocialButton text="Continue with Google" onPress={() => {}} />
        <SocialButton text="Continue with Apple" onPress={() => {}} />
        <OtherOptionsText>Other options</OtherOptionsText>
      </ButtonContainer>
    </Container>
  );
};

export default AuthScreen;