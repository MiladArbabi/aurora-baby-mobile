import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { DefaultTheme } from 'styled-components/native';
import BottomNav from '../components/common/BottomNav';
import Svg, { Circle, Line } from 'react-native-svg';

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

const MiniNavbar = styled.View`
  flex-direction: row;
  padding: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.small}px;
`;

const ToggleButton = styled.TouchableOpacity`
  padding: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.small}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.tertiaryAccent};
  margin-right: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.small}px;
  border-radius: 8px;
`;

const ToggleText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.contrastText};
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.sizes.small}px;
`;

const TrackerContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CLOCK_RADIUS = 150;
const CENTER = CLOCK_RADIUS + 10;

type CareScreenProps = StackScreenProps<RootStackParamList, 'Care'>;

const CareScreen: React.FC<CareScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [daysView, setDaysView] = useState(1);
  const [showRadial, setShowRadial] = useState(false);
  const [feedLogged, setFeedLogged] = useState(false);

  const handleToggleDays = (days: number) => setDaysView(days);
  const handleLongPress = () => {
    setShowRadial(true);
    console.log('Long press detected');
  };
  const handleFeedPress = () => {
    setShowRadial(false);
    setFeedLogged(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Container>
        <TopNav>
          <MiniNavbar>
            <ToggleButton testID="multi-day-toggle-2" onPress={() => handleToggleDays(2)}>
              <ToggleText>2-day</ToggleText>
            </ToggleButton>
            <ToggleButton testID="multi-day-toggle-3" onPress={() => handleToggleDays(3)}>
              <ToggleText>3-day</ToggleText>
            </ToggleButton>
          </MiniNavbar>
          <View />
          <View />
        </TopNav>
        <TrackerContainer>
          <Svg width={CENTER * 2} height={CENTER * 2} testID="tracker-ring" onLongPress={handleLongPress}>
            {/* Outer Ring (Today) */}
            <Circle
              cx={CENTER}
              cy={CENTER}
              r={CLOCK_RADIUS}
              stroke={theme.colors.primary}
              strokeWidth="10"
              fill="transparent"
            />
            {/* Inner Rings (Multi-day) */}
            {daysView >= 2 && (
              <Circle
                cx={CENTER}
                cy={CENTER}
                r={CLOCK_RADIUS - 20}
                stroke={theme.colors.muted}
                strokeWidth="10"
                fill="transparent"
                testID="tracker-ring-2"
              />
            )}
            {daysView >= 3 && (
              <Circle
                cx={CENTER}
                cy={CENTER}
                r={CLOCK_RADIUS - 40}
                stroke={theme.colors.muted}
                strokeWidth="10"
                fill="transparent"
                testID="tracker-ring-3"
              />
            )}
            {/* Hour Ticks (12) */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
              const x1 = CENTER + Math.cos(angle) * (CLOCK_RADIUS - 12);
              const y1 = CENTER + Math.sin(angle) * (CLOCK_RADIUS - 12);
              const x2 = CENTER + Math.cos(angle) * CLOCK_RADIUS;
              const y2 = CENTER + Math.sin(angle) * CLOCK_RADIUS;
              return (
                <Line
                  key={`hour-${i}`}
                  testID="hour-tick"
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={theme.colors.accent}
                  strokeWidth="2"
                />
              );
            })}
            {/* Minute Ticks (48, every 15 minutes) */}
            {Array.from({ length: 48 }).map((_, i) => {
              const angle = (i / 48) * 2 * Math.PI - Math.PI / 2;
              const x1 = CENTER + Math.cos(angle) * (CLOCK_RADIUS - 6);
              const y1 = CENTER + Math.sin(angle) * (CLOCK_RADIUS - 6);
              const x2 = CENTER + Math.cos(angle) * CLOCK_RADIUS;
              const y2 = CENTER + Math.sin(angle) * CLOCK_RADIUS;
              return (
                <Line
                  key={`minute-${i}`}
                  testID="minute-tick"
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={theme.colors.secondaryAccent}
                  strokeWidth="1"
                />
              );
            })}
          </Svg>
          {showRadial && (
            <View testID="radial-menu" style={{ position: 'absolute', width: 100, height: 100, backgroundColor: theme.colors.accent }}>
              <TouchableOpacity testID="radial-feed" onPress={handleFeedPress} />
            </View>
          )}
          {feedLogged && (
            <View testID="feed-arc" style={{ position: 'absolute', width: 50, height: 50, backgroundColor: theme.colors.secondaryAccent }} />
          )}
        </TrackerContainer>
        <BottomNav navigation={navigation} activeScreen="Care" />
      </Container>
    </SafeAreaView>
  );
};

export default CareScreen;