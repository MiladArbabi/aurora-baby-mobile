import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import Button from '../components/common/Button';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const HomeScreen = () => {
  return (
    <Container>
      <Button text="Harmony" />
      <Button text="Care" />
      <Button text="Wonder" />
    </Container>
  );
};

export default HomeScreen;