import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { DefaultTheme } from 'styled-components/native';
import BottomNav from '../components/common/BottomNav';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
`;

const TopNav = styled.View`
  height: ${({ theme }: { theme: DefaultTheme }) => theme.sizes.topNavHeight}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }: { theme: DefaultTheme }) => theme.spacing.large}px;
`;

const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.Image`
  width: 40px;
  height: 40px;
`;

const LogoText = styled.Text`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.sizes.body}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.contrastText};
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.regular};
  margin-left: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.small}px;
`;

const Avatar = styled.TouchableOpacity`
  width: 40px;
  height: 50px;
`;

const CardsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.large}px;
  padding-bottom: ${({ theme }: { theme: DefaultTheme }) => theme.sizes.bottomNavHeight + theme.spacing.xlarge}px;
`;

const Card = styled.TouchableOpacity`
  width: ${({ theme }: { theme: DefaultTheme }) => theme.sizes.cardWidth}px;
  height: ${({ theme }: { theme: DefaultTheme }) => theme.sizes.cardHeight}px;
  margin-vertical: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.medium}px;
  border-radius: 25px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

const CardTitle = styled.Text`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.sizes.title}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.contrastText};
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.regular};
  text-align: center;
`;

type HarmonyHomeScreenProps = StackScreenProps<RootStackParamList, 'Harmony'>;

interface CardItem {
  id: string;
  title: string;
  onPress: () => void;
}

const HarmonyHomeScreen: React.FC<HarmonyHomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const cardData: CardItem[] = [
    {
      id: 'play',
      title: 'Play a Story',
      onPress: () => navigation.navigate('StoryPlayer', { storyId: 'birk-freya-treehouse' }),
    },
    {
      id: 'create',
      title: 'Create Your Own Story',
      onPress: () => navigation.navigate('StoryPlayer', { storyId: 'mock-custom-story' }),
    },
    {
      id: 'explore',
      title: 'Explore the Forest',
      onPress: () => navigation.navigate('ForestMap'),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Container>
        <TopNav>
          <LogoContainer>
            <Logo source={require('../assets/png/colorlogo.png')} testID="top-nav-logo" />
            <LogoText testID="top-nav-text">Aurora Baby</LogoText>
          </LogoContainer>
          <Avatar
            testID="top-nav-avatar"
            onPress={() => navigation.navigate('ProfileSettings')}
          >
            <Image source={require('../assets/png/avatar.png')} style={{ width: 40, height: 50 }} />
          </Avatar>
        </TopNav>
        <CardsContainer>
          {cardData.map((item) => (
            <Card key={item.id} testID={`harmony-card-${item.id}`} onPress={item.onPress}>
              <CardTitle>{item.title}</CardTitle>
            </Card>
          ))}
        </CardsContainer>
        <BottomNav navigation={navigation} activeScreen="Harmony" />
      </Container>
    </SafeAreaView>
  );
};

export default HarmonyHomeScreen;