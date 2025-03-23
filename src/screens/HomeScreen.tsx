import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Button from '../components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Correct import

type RootStackParamList = {
  Home: undefined;
  Harmony: undefined;
  Care: undefined;
  Wonder: undefined;
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <Container>
      <Button text="Harmony" onPress={() => navigation.navigate('Harmony')} />
      <Button text="Care" onPress={() => navigation.navigate('Care')} />
      <Button text="Wonder" onPress={() => navigation.navigate('Wonder')} />
    </Container>
  );
};

export default HomeScreen;