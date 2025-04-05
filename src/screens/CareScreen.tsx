import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
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

const TrackerRing = styled.View`
  width: 300px;
  height: 300px;
  border-radius: 150px;
  border-width: 10px;
  border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  align-self: center;
  margin-top: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.large}px;
`;

const RadialMenu = styled.View`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.accent};
  align-self: center;
`;

const FeedArc = styled.View`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.secondaryAccent};
`;

type CareScreenProps = StackScreenProps<RootStackParamList, 'Care'>;

const CareScreen: React.FC<CareScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [showRadial, setShowRadial] = useState(false);
  const [feedLogged, setFeedLogged] = useState(false);

  const handleLongPress = () => setShowRadial(true);
  const handleFeedPress = () => {
    setShowRadial(false);
    setFeedLogged(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Container>
        <TrackerRing testID="tracker-ring" onLongPress={handleLongPress}>
          {feedLogged && <FeedArc testID="feed-arc" />}
        </TrackerRing>
        {showRadial && (
          <RadialMenu testID="radial-menu">
            <TouchableOpacity testID="radial-feed" onPress={handleFeedPress} />
          </RadialMenu>
        )}
        <BottomNav navigation={navigation} activeScreen="Care" />
      </Container>
    </SafeAreaView>
  );
};

export default CareScreen;