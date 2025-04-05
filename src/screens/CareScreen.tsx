import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { DefaultTheme } from 'styled-components/native';
import BottomNav from '../components/common/BottomNav';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import * as d3 from 'd3-shape';

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

const RadialMenu = styled.View`
  position: absolute;
  width: 150px;
  height: 150px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.accent};
  border-radius: 75px;
  justify-content: center;
  align-items: center;
`;

const RadialButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const RadialButtonText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.contrastText};
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.sizes.body}px;
`;

const CLOCK_RADIUS = 150;
const CENTER = CLOCK_RADIUS + 10;
const ARC_WIDTH = 20;

type CareScreenProps = StackScreenProps<RootStackParamList, 'Care'>;

const CareScreen: React.FC<CareScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [daysView, setDaysView] = useState(1);
  const [showRadial, setShowRadial] = useState(false);
  const [events, setEvents] = useState<{ type: string; start: number; end: number }[]>([]);

  const handleToggleDays = (days: number) => setDaysView(days);
  const handleLongPress = () => setShowRadial(true);
  const handleEventPress = (type: string) => {
    setShowRadial(false);
    const now = new Date().getHours() + new Date().getMinutes() / 60;
    setEvents([...events, { type, start: now, end: now + 0.5 }]); // 30-min default duration
  };

  const createArc = (start: number, end: number, color: string) => {
    const arcGenerator = d3.arc()
      .innerRadius(CLOCK_RADIUS - ARC_WIDTH)
      .outerRadius(CLOCK_RADIUS)
      .startAngle((start / 24) * 2 * Math.PI - Math.PI / 2)
      .endAngle((end / 24) * 2 * Math.PI - Math.PI / 2);
    const arcPath = arcGenerator({} as any); // Pass an empty object as data
    return <Path d={arcPath!} fill={color} />;
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
            {/* Event Arcs */}
            {events.map((event, index) => {
              const color = event.type === 'feed' ? theme.colors.primary :
                            event.type === 'sleep' ? theme.colors.darkAccent :
                            theme.colors.secondaryAccent;
              const testID = `${event.type}-arc`;
              return <Path key={index} testID={testID} d={createArc(event.start, event.end, color).props.d} fill={color} />;
            })}
          </Svg>
          {showRadial && (
            <RadialMenu testID="radial-menu">
              <RadialButton testID="radial-feed" onPress={() => handleEventPress('feed')} style={{ top: 10 }}>
                <RadialButtonText>F</RadialButtonText>
              </RadialButton>
              <RadialButton testID="radial-sleep" onPress={() => handleEventPress('sleep')} style={{ bottom: 10 }}>
                <RadialButtonText>S</RadialButtonText>
              </RadialButton>
              <RadialButton testID="radial-diaper" onPress={() => handleEventPress('diaper')} style={{ left: 10 }}>
                <RadialButtonText>D</RadialButtonText>
              </RadialButton>
            </RadialMenu>
          )}
        </TrackerContainer>
        <BottomNav navigation={navigation} activeScreen="Care" />
      </Container>
    </SafeAreaView>
  );
};

export default CareScreen;