import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { DefaultTheme } from 'styled-components/native';
import BottomNav from '../components/common/BottomNav';

const screenWidth = Dimensions.get('window').width;
const secondaryCardWidth = screenWidth * 0.4; // 45% for two cards
const cardWidthWithMargin = 270 + 25; // Main card width + margin

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

const SecondaryCard = styled.TouchableOpacity`
  width: ${secondaryCardWidth}px;
  height: 140px;
  margin-horizontal: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.medium}px; /* ~16px */
  border-radius: 25px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  elevation: 4;
  shadow-color:${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
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

const CarouselWrapper = styled.View`
  margin-bottom: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.large}px; /* ~24px */
`;

const SecondaryCarouselWrapper = styled.View`
  margin-bottom: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.medium}px; /* ~16px */
`;

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

interface CarouselItem {
  id: string;
  title: string;
  titleColor: string;
  headline: string;
  subtext: string;
  subtextColor: string;
  image: any;
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

  const secondaryCarouselData: SecondaryCarouselItem[] = [
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

  const snapOffsets = carouselData.map((_, index) => {
    const offset = index * cardWidthWithMargin;
    const centerOffset = offset - (screenWidth - cardWidthWithMargin) / 2;
    return centerOffset > 0 ? centerOffset : 0;
  });

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
        <CarouselWrapper>
          <FlatList
            data={carouselData}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToOffsets={snapOffsets}
            decelerationRate="fast"
            initialScrollIndex={1} // Harmony starts centered
            style={{
              height: 475,
              marginVertical: theme.spacing.medium,
            }}
            renderItem={({ item }: { item: CarouselItem }) => (
              <Card testID={`main-carousel-${item.id}`} onPress={item.onPress}>
                <CardImage source={item.image}>
                  <Title color={item.titleColor}>{item.title}</Title>
                  <HeadlineContainer>
                    <Headline>{item.headline}</Headline>
                    <Subtext color={item.subtextColor}>{item.subtext}</Subtext>
                  </HeadlineContainer>
                </CardImage>
              </Card>
            )}
            keyExtractor={(item: CarouselItem) => item.id}
            getItemLayout={(data: ArrayLike<CarouselItem> | null | undefined, index: number) => ({
              length: cardWidthWithMargin,
              offset: cardWidthWithMargin * index,
              index,
            })}
          />
        </CarouselWrapper>
        <SecondaryCarouselWrapper>
          <FlatList
            data={secondaryCarouselData}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: theme.spacing.medium, // ~16px padding on sides
            }}
            style={{
              height: 140,
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
              length: secondaryCardWidth + 16,
              offset: (secondaryCardWidth + 16) * index,
              index,
            })}
          />
        </SecondaryCarouselWrapper>
        <BottomNav navigation={navigation} activeScreen="Home" />
      </Container>
    </SafeAreaView>
  );
};

export default HomeScreen;