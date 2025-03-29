import React from 'react';
import styled from 'styled-components/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/AppNavigator';
import Button from '../components/common/Button';
import { AppTheme } from '../styles/theme';

interface StyledProps {
  theme: AppTheme;
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props: StyledProps) => props.theme.colors.background};
  padding: ${(props: StyledProps) => props.theme.spacing.large}px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${(props: StyledProps) => props.theme.colors.text};
  font-family: ${(props: StyledProps) => props.theme.fonts.regular};
  margin-bottom: ${(props: StyledProps) => props.theme.spacing.medium}px;
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