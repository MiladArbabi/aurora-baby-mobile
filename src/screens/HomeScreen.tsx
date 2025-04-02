import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { DefaultTheme } from 'styled-components/native';

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
  width: 270px;
  height: 475px;
  margin-horizontal: 12.5px;
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

const GradientOverlay = styled.View`
  height: 145px;
  border-radius: 0 0 25px 25px;
  background-color: rgba(0, 0, 0, 0.5); /* Placeholder until gradient lib added */
`;

const SecondaryCard = styled.TouchableOpacity`
  width: 125px;
  height: 125px;
  margin-horizontal: 8px;
  border-radius: 25px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  elevation: 4;
  shadow-color: #000000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  overflow: hidden;
`;

const SecondaryCardImage = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  padding: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.medium}px;
`;

const SecondaryText = styled.Text`
  font-size: 14px;
  color: #FFFFFF;
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.regular};
  text-align: left;
`;

const BottomNav = styled.View`
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  gap: 30px;
  border-radius: 50px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.contrastText};
  position: absolute;
  bottom: 10px;
  left: 25%;
`;

const NavIcon = styled.TouchableOpacity``;

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

interface CarouselItem {
  id: string;
  title: string;
  titleColor: string;
  headline: string;
  subtext: string;
  subtextColor: string;
  image: any;
  gradient: string;
  onPress: () => void;
}

interface SecondaryCarouselItem {
  id: string;
  text: string;
  image: any;
  onPress: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const carouselData: CarouselItem[] = [
    {
      id: 'harmony',
      title: 'HARMONY',
      titleColor: '#E9DAFA',
      headline: 'Sweet Moments, Shared Stories',
      subtext: 'Find calm and connection in gentle stories',
      subtextColor: '#FFFFFF',
      image: require('../assets/png/harmonycardbackground1.png'),
      gradient: 'rgba(0, 0, 0, 0.5)',
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
      gradient: 'rgba(0, 0, 0, 0.5)',
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
      gradient: 'rgba(0, 0, 0, 0.5)',
      onPress: () => navigation.navigate('Wonder'),
    },
  ];

  const secondaryCarouselData: SecondaryCarouselItem[] = [
    {
      id: 'harmony',
      text: 'Create Your Own Story',
      image: require('../assets/png/harmonycardbackground2.png'),
      onPress: () => navigation.navigate('Harmony'),
    },
    {
      id: 'care',
      text: 'New Baby Tracking Input',
      image: require('../assets/png/carecardbackground2.png'),
      onPress: () => navigation.navigate('Care'),
    },
    {
      id: 'wonder',
      text: 'Play AR/VR Game',
      image: require('../assets/png/wondercardbackground2.png'),
      onPress: () => navigation.navigate('Wonder'),
    },
  ];

  return (
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
      <FlatList
        data={carouselData}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          height: 475,
          marginVertical: 16,
        }}
        renderItem={({ item }: { item: CarouselItem }) => (
          <Card testID={`main-carousel-${item.id}`} onPress={item.onPress}>
            <CardImage source={item.image}>
              <Title color={item.titleColor}>{item.title}</Title>
              <HeadlineContainer>
                <Headline>{item.headline}</Headline>
                <Subtext color={item.subtextColor}>{item.subtext}</Subtext>
              </HeadlineContainer>
              <GradientOverlay />
            </CardImage>
          </Card>
        )}
        keyExtractor={(item: CarouselItem) => item.id}
        initialScrollIndex={0}
        getItemLayout={(data: ArrayLike<CarouselItem> | null | undefined, index: number) => ({
          length: 270 + 25,
          offset: (270 + 25) * index,
          index,
        })}
      />
      <FlatList
        data={secondaryCarouselData}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          height: 128,
          marginVertical: 16,
        }}
        renderItem={({ item }: { item: SecondaryCarouselItem }) => (
          <SecondaryCard testID={`secondary-carousel-${item.id}`} onPress={item.onPress}>
            <SecondaryCardImage source={item.image}>
              <SecondaryText>{item.text}</SecondaryText>
            </SecondaryCardImage>
          </SecondaryCard>
        )}
        keyExtractor={(item: SecondaryCarouselItem) => item.id}
        getItemLayout={(data: ArrayLike<SecondaryCarouselItem> | null | undefined, index: number) => ({
          length: 338 + 16,
          offset: (338 + 16) * index,
          index,
        })}
      />
      <BottomNav style={{ transform: [{ translateX: -50 }] }}>
        <NavIcon active={true} testID="bottom-nav-home">
          <Image
            source={require('../assets/png/homeicon.png')}
            style={{ width: 50, height: 50, tintColor: theme.colors.background }}
          />
        </NavIcon>
        <NavIcon testID="bottom-nav-harmony" onPress={() => navigation.navigate('Harmony')}>
          <Image
            source={require('../assets/png/harmonyicon.png')}
            style={{ width: 50, height: 35, tintColor: theme.colors.primary }}
          />
        </NavIcon>
        <NavIcon testID="bottom-nav-care" onPress={() => navigation.navigate('Care')}>
          <Image
            source={require('../assets/png/careicon.png')}
            style={{ width: 43, height: 35, tintColor: theme.colors.primary }}
          />
        </NavIcon>
        <NavIcon testID="bottom-nav-wonder" onPress={() => navigation.navigate('Wonder')}>
          <Image
            source={require('../assets/png/wondericon.png')}
            style={{ width: 40, height: 38, tintColor: theme.colors.primary }}
          />
        </NavIcon>
      </BottomNav>
    </Container>
  );
};

export default HomeScreen;