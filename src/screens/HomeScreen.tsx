import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const TopBar = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.8);
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20px;
  z-index: 1000;
`;

const LogoText = styled.Text`
  font-size: 24px;
  color: #007AFF;
`;

const ProfileIcon = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #007AFF;
  justify-content: center;
  align-items: center;
`;

const IconText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

const Content = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  padding-top: 80px;
  padding-bottom: 40px;
`;

const Button = styled.TouchableOpacity`
  height: 20%;
  width: 80%;
  justify-content: center;
  align-items: center;
  margin-vertical: 10px;
  border-radius: 25px;
  margin-bottom: 15px;
`;

const ButtonText = styled.Text`
  color: #FFFFFF;
  text-align: center;
  font-size: 32px;
`;

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <TopBar>
        <LogoText>Aurora Baby</LogoText>
        <ProfileIcon onPress={() => navigation.navigate('ProfileSettings')}>
          <IconText>P</IconText>
        </ProfileIcon>
      </TopBar>
      <Content>
        <Button style={{ backgroundColor: '#d2b48c' }} onPress={() => navigation.navigate('Harmony')}>
          <ButtonText>Harmony</ButtonText>
        </Button>
        <Button style={{ backgroundColor: '#87ceeb' }} onPress={() => navigation.navigate('Care')}>
          <ButtonText>Care</ButtonText>
        </Button>
        <Button style={{ backgroundColor: '#191970', marginBottom: 75 }} onPress={() => navigation.navigate('Wonder')}>
          <ButtonText>Wonder</ButtonText>
        </Button>
      </Content>
    </Container>
  );
};

export default HomeScreen;