import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/AppNavigator';
import { colors, fonts, spacing } from '../styles/theme';
import Button from '../components/common/Button';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const TopBar = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${spacing.large}px;
  background-color: ${colors.background};
`;

const LogoText = styled.Text`
  font-size: 24px;
  color: ${colors.text};
  font-family: ${fonts.regular};
`;

const ProfileIcon = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.accent};
  justify-content: center;
  align-items: center;
`;

const IconText = styled.Text`
  color: ${colors.background};
  font-size: 18px;
  font-family: ${fonts.regular};
`;

const CarouselContainer = styled.View`
  height: 200px;
  margin-vertical: ${spacing.medium}px;
`;

const CarouselItem = styled.TouchableOpacity`
  width: 300px;
  margin-horizontal: ${spacing.medium}px;
  background-color: ${colors.secondary};
  border-radius: ${spacing.medium}px;
  padding: ${spacing.large}px;
`;

const CarouselText = styled.Text`
  font-size: 16px;
  color: ${colors.text};
  font-family: ${fonts.regular};
`;

type HomeScreenProps = BottomTabScreenProps<RootTabParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const carouselData = [
    { id: '1', title: 'Featured Story', action: () => navigation.navigate('Harmony') },
    { id: '2', title: 'Create Your Story', action: () => navigation.navigate('Harmony') },
  ];

  return (
    <Container>
      <TopBar testID="top-bar">
        <LogoText>Aurora Baby</LogoText>
        <ProfileIcon testID="profile-icon" onPress={() => navigation.navigate('ProfileSettings')}>
          <IconText>P</IconText>
        </ProfileIcon>
      </TopBar>
      <CarouselContainer>
        <FlatList
          data={carouselData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CarouselItem testID={`carousel-item-${item.id}`} onPress={item.action}>
              <CarouselText>{item.title}</CarouselText>
            </CarouselItem>
          )}
          keyExtractor={item => item.id}
        />
      </CarouselContainer>
      <Button testID="care-button" text="Track Your Baby's Growth & Well-being" onPress={() => navigation.navigate('Care')} />
      <Button testID="wonder-button" text="Explore Interactive AR & VR Experiences" onPress={() => navigation.navigate('Wonder')} />
    </Container>
  );
};

export default HomeScreen;