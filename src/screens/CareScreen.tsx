import React from 'react';
import styled from 'styled-components/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/AppNavigator';
import Button from '../components/common/Button';
import { AppTheme } from '../styles/theme'; // Import theme type

const Container = styled.View`
  flex: 1;
  background-color: ${(props: { theme: AppTheme }) => props.theme.colors.background};
  padding: ${(props: { theme: AppTheme }) => props.theme.spacing.large}px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${(props: { theme: AppTheme }) => props.theme.colors.text};
  font-family: ${(props: { theme: AppTheme }) => props.theme.fonts.regular};
  margin-bottom: ${(props: { theme: AppTheme }) => props.theme.spacing.medium}px;
`;

type CareScreenProps = BottomTabScreenProps<RootTabParamList, 'Care'>;

const CareScreen: React.FC<CareScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <Title testID="care-title">Care</Title>
      <Button
        testID="back-button"
        text="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </Container>
  );
};

export default CareScreen;