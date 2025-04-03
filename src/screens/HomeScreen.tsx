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
  height: 60px;
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
  font-size: 16px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.contrastText};
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.regular};
  margin-left: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.small}px;
`;

const Avatar = styled.TouchableOpacity`
  width: 40px;
  height: 50px;
`;

const Card = styled.TouchableOpacity`
  width: 300px;
  height: 200px;
  margin-vertical: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.medium}px;
  border-radius: 25px;
  overflow: hidden;
`;

const CardImage = styled.ImageBackground`
  flex: 1;
  justify-content: space-between;
`;

const Title = styled.Text<{ color: string }>`
  font-size: 24px;
  color: ${({ color }: { color: string }) => color};
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.regular};
  text-align: left;
  margin: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.large}px;
`;

const HeadlineContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const Headline = styled.Text`
  font-size: 30px;
  color: #FFFFFF;
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.regular};
  text-align: center;
`;

const Subtext = styled.Text<{ color: string }>`
  font-size: 18px;
  color: ${({ color }: { color: string }) => color || '#FFFFFF'};
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.regular};
  text-align: center;
  margin-bottom: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.small}px;
`;

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

interface CardItem {
  id: string;
  title: string;
  titleColor: string;
  headline: string;
  subtext: string;
  subtextColor: string;
  image: any;
  onPress: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const cardData: CardItem[] = [
    {
      id: 'harmony',
      title: 'HARMONY',
      titleColor: '#E9DAFA',
      headline: 'Sweet Moments, Shared Stories',
      subtext: 'Find calm and connection in gentle stories',
      subtextColor: '#FFFFFF',
      image: require('../assets/png/harmonycardbackground1.png'),
      onPress: () => navigation.navigate('Harmony'),
    },
    {
      id: 'care',
      title: 'CARE',
      titleColor: '#ACCED7',
      headline: 'Your Baby’s Journey Simplified',
      subtext: 'Easy tracking for a confident parenting experience',
      subtextColor: '#B8FFF8',
      image: require('../assets/png/carecardbackground1.png'),
      onPress: () => navigation.navigate('Care'),
    },
    {
      id: 'wonder',
      title: 'WONDER WORLD',
      titleColor: '#F9B9B1',
      headline: 'Spark Their Little Imagination',
      subtext: 'Magical AR/VR adventures for curious baby minds',
      subtextColor: '#FFFFFF',
      image: require('../assets/png/wondercardbackground1.png'),
      onPress: () => navigation.navigate('Wonder'),
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
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          {cardData.map((item) => (
            <Card key={item.id} testID={`home-card-${item.id}`} onPress={item.onPress}>
              <CardImage source={item.image}>
                <Title color={item.titleColor}>{item.title}</Title>
                <HeadlineContainer>
                  <Headline>{item.headline}</Headline>
                  <Subtext color={item.subtextColor}>{item.subtext}</Subtext>
                </HeadlineContainer>
              </CardImage>
            </Card>
          ))}
        </View>
        <BottomNav navigation={navigation} activeScreen="Home" />
      </Container>
    </SafeAreaView>
  );
};

export default HomeScreen;