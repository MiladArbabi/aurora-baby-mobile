import React from 'react';
import styled from 'styled-components/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/AppNavigator';
import { colors, fonts, spacing } from '../styles/theme';
import Button from '../components/common/Button';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: ${spacing.large}px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${colors.text};
  font-family: ${fonts.regular};
  margin-bottom: ${spacing.medium}px;
`;

type WonderScreenProps = BottomTabScreenProps<RootTabParamList, 'Wonder'>;

const WonderScreen: React.FC<WonderScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <Title testID="wonder-title">Wonder</Title>
      <Button
        testID="back-button"
        text="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </Container>
  );
};

export default WonderScreen;