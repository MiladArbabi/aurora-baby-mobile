import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '../../navigation/AppNavigator';

// Mock Firebase
jest.mock('../../services/firebase', () => ({
  auth: {},
  checkAuthState: jest.fn(() => Promise.resolve({ email: 'test@example.com' })),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback({ email: 'test@example.com' });
    return jest.fn();
  }),
}));

// Mock expo-modules-core to suppress LegacyEventEmitter errors
jest.mock('expo-modules-core', () => ({
  EventEmitter: jest.fn(() => ({
    addListener: jest.fn(() => ({ remove: jest.fn() })),
    removeAllListeners: jest.fn(),
  })),
}));

describe('AppNavigator', () => {
  it('starts at Home screen when authenticated', async () => {
    const { findByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );
    const homeText = await waitFor(
      () => findByText("Track Your Baby's Growth & Well-being"),
      { timeout: 2000 }
    );
    expect(homeText).toBeTruthy();
  });
});