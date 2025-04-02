import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { DefaultTheme } from 'styled-components/native';
import BottomNav from '../components/common/BottomNav';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.contrastText};
`;

type HarmonyScreenProps = StackScreenProps<RootStackParamList, 'Harmony'>;

const HarmonyScreen: React.FC<HarmonyScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <Title>Harmony Screen</Title>
      <BottomNav navigation={navigation} activeScreen="Harmony" />
    </Container>
  );
};

export default HarmonyScreen;