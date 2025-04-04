import React from 'react';
import { View, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { DefaultTheme } from 'styled-components/native';
import BottomNav from '../components/common/BottomNav';
import Card from '../components/common/Card';
import { prebuiltStories } from '../data/stories';

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

type HarmonyHomeScreenProps = StackScreenProps<RootStackParamList, 'Harmony'>;

const HarmonyHomeScreen: React.FC<HarmonyHomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const cardData = [
    {
      testID: 'harmony-card-play',
      backgroundImage: require('../assets/png/characters/birkandfreya.png'),
      title: 'Play a Story',
      subtext: prebuiltStories[0].title,
      badges: [prebuiltStories[0].stemFocus, prebuiltStories[0].traitFocus],
      onPress: () => navigation.navigate('StoryPlayer', { storyId: prebuiltStories[0].id }),
    },
    {
      testID: 'harmony-card-create',
      backgroundImage: require('../assets/png/harmony/auroraforest.png'),
      title: 'Create Your Own Story',
      icon: require('../assets/png/icons/generative-ai.png'),
      onPress: () => navigation.navigate('StoryPlayer', { storyId: 'mock-custom-story' }),
    },
    {
      testID: 'harmony-card-explore',
      backgroundImage: require('../assets/png/harmony/auroraforestmap.png'),
      title: 'Explore the Forest',
      subtext: 'Discover the Aurora Forest',
      icon: require('../assets/png/icons/magnifying-glass.png'),
      onPress: () => navigation.navigate('ForestMap'),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Container>
        <TopNav>
          <LogoContainer>
            <Logo source={require('../assets/png/system/colorlogo.png')} testID="top-nav-logo" />
            <LogoText testID="top-nav-text">Aurora Baby</LogoText>
          </LogoContainer>
          <Avatar testID="top-nav-avatar" onPress={() => navigation.navigate('ProfileSettings')}>
            <Image source={require('../assets/png/icons/avatar.png')} style={{ width: 40, height: 50 }} />
          </Avatar>
        </TopNav>
        <CardsContainer>
          {cardData.map((card) => (
            <Card
              key={card.testID}
              testID={card.testID}
              backgroundImage={card.backgroundImage}
              title={card.title}
              subtext={card.subtext}
              badges={card.badges}
              icon={card.icon}
              onPress={card.onPress}
            />
          ))}
        </CardsContainer>
        <BottomNav navigation={navigation} activeScreen="Harmony" />
      </Container>
    </SafeAreaView>
  );
};

export default HarmonyHomeScreen;