import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Polyfill setImmediate and clearImmediate for jsdom
global.setImmediate = setTimeout;
global.clearImmediate = clearTimeout;

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn().mockResolvedValue(true),
    signIn: jest.fn().mockResolvedValue({ data: { idToken: 'mock-token' } }),
  },
}));