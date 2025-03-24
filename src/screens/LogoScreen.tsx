import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Video from 'react-native-video';

type RootStackParamList = {
  Logo: undefined;
  AppNavigator: undefined;
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

interface LogoScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Logo'>;
}

const LogoScreen: React.FC<LogoScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('AppNavigator');
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigation]);

  // Fallback to static image if video fails
  try {
    return (
      <Container>
        <Video
          source={require('../assets/logo-animation.mp4')}
          style={{ width: 300, height: 300 }}
          resizeMode="contain"
          muted
          repeat={false}
          onEnd={() => navigation.replace('AppNavigator')}
          testID="logo-video"
          onError={(e) => console.error('Video error:', e)}
        />
      </Container>
    );
  } catch (e) {
    console.error('Video load failed:', e);
    return (
      <Container>
        <Image
          source={require('../assets/icon.png')} // Fallback image
          style={{ width: 300, height: 300 }}
          testID="logo-image"
        />
      </Container>
    );
  }
};

export default LogoScreen;