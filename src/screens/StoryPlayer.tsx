import React from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { DefaultTheme } from 'styled-components/native';
import BottomNav from '../components/common/BottomNav';
import Card from '../components/common/Card';

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

type StoryPlayerProps = StackScreenProps<RootStackParamList, 'StoryPlayer'>;

const StoryPlayer: React.FC<StoryPlayerProps> = ({ navigation, route }) => {
  const theme = useTheme();
  const { storyId } = route.params || {};

  const cardData = [
    {
      testID: 'story-card-soothing',
      backgroundImage: require('../assets/png/characters/birkandfreya.png'),
      title: 'Soothing Storytime',
      onPress: () => navigation.navigate('StoryViewer', { storyId, mode: 'soothing' }),
    },
    {
      testID: 'story-card-choice',
      backgroundImage: require('../assets/png/harmony/harmonycardbackground1.png'),
      title: 'Make a Choice',
      onPress: () => navigation.navigate('StoryViewer', { storyId, mode: 'choice' }),
    },
    {
      testID: 'story-card-daily', // Updated testID
      backgroundImage: require('../assets/png/harmony/auroraforest.png'), // Example image
      title: 'Story of the Day', // Updated title
      onPress: () => navigation.navigate('StoryViewer', { storyId, mode: 'daily' }), // Updated mode
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
              onPress={card.onPress}
            />
          ))}
        </CardsContainer>
        <BottomNav navigation={navigation} activeScreen="Harmony" />
      </Container>
    </SafeAreaView>
  );
};

export default StoryPlayer;