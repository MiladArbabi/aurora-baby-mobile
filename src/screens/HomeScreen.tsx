import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/AppNavigator';
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

const MainCarousel = styled.FlatList`
  height: 475px;
  margin-vertical: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.medium}px;
`;

const Card = styled.TouchableOpacity`
  width: 270px;
  height: 475px;
  margin-horizontal: 12.5px; /* Half of 25px spacing */
  border-radius: 25px;
  overflow: hidden;
`;

const CardImage = styled.ImageBackground`
  flex: 1;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${({ color }: { color: string }) => color};
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.regular};
  text-align: left;
  margin: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.large}px;
  text-shadow: 3px 3px 0 ${({ theme }: { theme: DefaultTheme }) => theme.colors.contrastText};
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

const Subtext = styled.Text`
  font-size: 18px;
  color: ${({ color }: { color: string }) => color || '#FFFFFF'};
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.regular};
  text-align: center;
  text-shadow: 3px 3px 0 ${({ theme }: { theme: DefaultTheme }) => theme.colors.contrastText};
  margin-bottom: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.small}px;
`;

const GradientOverlay = styled.View`
  height: 145px;
  border-radius: 0 0 25px 25px;
`;

const SecondaryCarousel = styled.FlatList`
  height: 128px;
  margin-vertical: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.medium}px;
`;

const SecondaryCard = styled.TouchableOpacity`
  width: 338px;
  height: 128px;
  margin-horizontal: 8px;
  border-radius: 25px;
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  left: 50%;
`;

const NavIcon = styled.Image<{ active?: boolean }>`
  ${({ active }: { active?: boolean }) => (active ? `
    tint-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
  ` : `
    tint-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  `)}
`;

type HomeScreenProps = BottomTabScreenProps<RootTabParamList, 'Home'>;

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
  const carouselData: CarouselItem[] = [
    {
      id: 'harmony',
      title: 'HARMONY',
      titleColor: '#E9DAFA',
      headline: 'Sweet Moments, Shared Stories',
      subtext: 'Find calm and connection in gentle stories',
      subtextColor: '#FFFFFF',
      image: require('../assets/png/harmonycardbackground1.png'),
      gradient: 'linear-gradient(352deg, #000 12.75%, rgba(24, 2, 50, 0.50) 47.68%, rgba(222, 190, 241, 0.05) 86.15%)',
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
      gradient: 'linear-gradient(355deg, #000 8.54%, rgba(24, 2, 50, 0.50) 31.32%, rgba(222, 190, 241, 0.05) 88.68%)',
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
      gradient: 'linear-gradient(358deg, rgba(15, 11, 10, 0.75) 15.57%, rgba(129, 94, 89, 0.50) 76.05%, rgba(249, 185, 177, 0.25) 92.77%)',
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
      <MainCarousel
        data={carouselData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: { item: CarouselItem }) => (
          <Card testID={`main-carousel-${item.id}`} onPress={item.onPress}>
            <CardImage source={item.image}>
              <Title color={item.titleColor}>{item.title}</Title>
              <HeadlineContainer>
                <Headline>{item.headline}</Headline>
                <Subtext color={item.subtextColor}>{item.subtext}</Subtext>
              </HeadlineContainer>
              <GradientOverlay style={{ backgroundColor: item.gradient }} />
            </CardImage>
          </Card>
        )}
        keyExtractor={(item: CarouselItem) => item.id}
        initialScrollIndex={0}
        getItemLayout={(data: CarouselItem[] | null | undefined, index: number) => ({
          length: 270 + 25,
          offset: (270 + 25) * index,
          index,
        })}
      />
      <SecondaryCarousel
        data={secondaryCarouselData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: { item: SecondaryCarouselItem }) => (
          <SecondaryCard testID={`secondary-carousel-${item.id}`} onPress={item.onPress}>
            <SecondaryCardImage source={item.image}>
              <SecondaryText>{item.text}</SecondaryText>
            </SecondaryCardImage>
          </SecondaryCard>
        )}
        keyExtractor={(item: SecondaryCarouselItem) => item.id}
        getItemLayout={(data: SecondaryCarouselItem[] | null | undefined, index: number) => ({
          length: 338 + 16, // Card width + spacing
          offset: (338 + 16) * index,
          index,
        })}
      />
      <BottomNav style={{ transform: [{ translateX: -50 }] }}>
        <NavIcon
          source={require('../assets/png/homeicon.png')}
          style={{ width: 50, height: 50 }}
          active={true}
          testID="bottom-nav-home"
        />
        <NavIcon
          source={require('../assets/png/harmonyicon.png')}
          style={{ width: 50, height: 35 }}
          testID="bottom-nav-harmony"
          onPress={() => navigation.navigate('Harmony')}
        />
        <NavIcon
          source={require('../assets/png/careicon.png')}
          style={{ width: 43, height: 35 }}
          testID="bottom-nav-care"
          onPress={() => navigation.navigate('Care')}
        />
        <NavIcon
          source={require('../assets/png/wondericon.png')}
          style={{ width: 40, height: 38 }}
          testID="bottom-nav-wonder"
          onPress={() => navigation.navigate('Wonder')}
        />
      </BottomNav>
    </Container>
  );
};

export default HomeScreen;