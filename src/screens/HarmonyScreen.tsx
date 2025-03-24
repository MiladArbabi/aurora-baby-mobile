import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 10;
  justify-content: center;
  align-items: center;
`;

const HarmonyScreen = () => (
  <Container>
    <Text>Harmony Screen</Text>
  </Container>
);

export default HarmonyScreen;