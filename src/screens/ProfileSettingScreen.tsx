import React from 'react';
import { View, Text, Alert } from 'react-native';
import styled from 'styled-components/native';
import { signOut } from '../services/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/common/Button';
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
  justify-content: center;
  align-items: center;
  padding-top: 80px;
`;

const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
`;

type ProfileSettingsProps = StackScreenProps<RootStackParamList, 'ProfileSettings'>;

const ProfileSettingScreen: React.FC<ProfileSettingsProps> = ({ navigation }) => {
  const handleSignOut = async () => {
    try {
      await signOut();
      // No manual navigation; AppNavigator handles it
      Alert.alert('Success', 'Signed out successfully!');
    } catch (error: any) {
      Alert.alert('Error', 'Sign-Out Failed: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <Container>
      <TopBar>
        <LogoText>Aurora Baby</LogoText>
        <ProfileIcon onPress={() => navigation.navigate('ProfileSettings')}>
          <IconText>P</IconText>
        </ProfileIcon>
      </TopBar>
      <Content>
        <Title>Profile Settings</Title>
        <Button text="Sign Out" onPress={handleSignOut} />
      </Content>
    </Container>
  );
};

export default ProfileSettingScreen;