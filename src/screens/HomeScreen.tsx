import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootTabParamList } from '../navigation/AppNavigator';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const TopBar = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20px;
  background-color: rgba(255, 255, 255, 0.8);
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

const CarouselContainer = styled.View`
  height: 200px;
  margin-vertical: 10px;
`;

const CarouselItem = styled.TouchableOpacity`
  width: 300px;
  margin-horizontal: 10px;
  background-color: #F0F4F8;
  border-radius: 10px;
  padding: 20px;
`;

const Card = styled.TouchableOpacity`
  width: 90%;
  margin-vertical: 10px;
  align-self: center;
  background-color: #F0F4F8;
  border-radius: 10px;
  padding: 20px;
`;

const CardText = styled.Text`
  font-size: 16px;
  color: #333;
`;

type HomeScreenProps = StackScreenProps<RootTabParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const carouselData = [
    { id: '1', title: 'Featured Story', action: () => navigation.navigate('Harmony') },
    { id: '2', title: 'Create Your Story', action: () => navigation.navigate('Harmony') },
  ];

  return (
    <Container>
      <TopBar>
        <LogoText>Aurora Baby</LogoText>
        <ProfileIcon onPress={() => navigation.navigate('ProfileSettings')}>
          <IconText>P</IconText>
        </ProfileIcon>
      </TopBar>
      <CarouselContainer>
        <FlatList
          data={carouselData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CarouselItem onPress={item.action}>
              <Text>{item.title}</Text>
            </CarouselItem>
          )}
          keyExtractor={item => item.id}
        />
      </CarouselContainer>
      <Card onPress={() => navigation.navigate('Care')}>
        <CardText>Track Your Baby's Growth & Well-being</CardText>
      </Card>
      <Card onPress={() => navigation.navigate('Wonder')}>
        <CardText>Explore Interactive AR & VR Experiences</CardText>
      </Card>
    </Container>
  );
};

export default HomeScreen;