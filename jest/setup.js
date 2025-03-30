// jest/setup.js
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Polyfill setImmediate and clearImmediate for jsdom
global.setImmediate = setTimeout;
global.clearImmediate = clearTimeout;

// Mock Expo globals
global.expo = {
  uuidv4: () => 'mock-uuid-v4',
  uuidv5: () => 'mock-uuid-v5',
};

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock Google Sign-In
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn().mockResolvedValue(true),
    signIn: jest.fn().mockResolvedValue({ data: { idToken: 'mock-token' } }),
  },
}));