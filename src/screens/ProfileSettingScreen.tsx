import React from 'react';
import { View, Text, Alert } from 'react-native';
import styled from 'styled-components/native';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/common/Button';
import { StackScreenProps } from '@react-navigation/stack';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
`;

type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
  ProfileSettings: undefined;
};

type ProfileSettingsProps = StackScreenProps<RootStackParamList, 'ProfileSettings'>;

const ProfileSettingScreen: React.FC<ProfileSettingsProps> = ({ navigation }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Auth');
      Alert.alert('Success', 'Signed out successfully!');
    } catch (error: any) {
      Alert.alert('Error', 'Sign-Out Failed: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <Container>
      <Title>Profile Settings</Title>
      <Button text="Sign Out" onPress={handleSignOut} />
    </Container>
  );
};

export default ProfileSettingScreen;