import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import LogoScreen from '../../screens/LogoScreen';
import { NavigationContainer } from '@react-navigation/native';

jest.useFakeTimers();

describe('LogoScreen', () => {
  it('displays logo animation for 3-4 seconds then navigates', () => {
    const navigate = jest.fn();
    const { queryByTestId } = render(
      <NavigationContainer>
        <LogoScreen navigation={{ replace: navigate } as any} />
      </NavigationContainer>
    );
    expect(queryByTestId('logo-video')).toBeTruthy();
    jest.advanceTimersByTime(4000);
    expect(queryByTestId('logo-video')).toBeNull();
    expect(navigate).toHaveBeenCalledWith('AppNavigator');
  }, 10000);
});

// Mock react-native-video
jest.mock('react-native-video', () => {
  return ({ testID, onEnd }: { testID: string; onEnd: () => void }) => {
    setTimeout(onEnd, 0);
    return <View testID={testID} />;
  };
});

// Mock the .mp4 file
jest.mock('../assets/logo-animation.mp4', () => 'mock-video-path');