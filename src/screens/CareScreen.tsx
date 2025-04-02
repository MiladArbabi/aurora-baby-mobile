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

type CareScreenProps = StackScreenProps<RootStackParamList, 'Care'>;

const CareScreen: React.FC<CareScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <Title>Care Screen</Title>
      <BottomNav navigation={navigation} activeScreen="Care" />
    </Container>
  );
};

export default CareScreen;