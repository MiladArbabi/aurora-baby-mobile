import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const WonderScreen = () => (
  <Container>
    <Text>Wonder Screen</Text>
  </Container>
);

export default WonderScreen;