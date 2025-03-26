# Aurora Baby Mobile

A mobile app for parents and babies, built with Expo and React Native, focusing on harmony, care, and wonder.

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: `@react-navigation/native`, `@react-navigation/stack`
- **Authentication**: Firebase Auth
- **Secure Storage**: `expo-secure-store` (for auth token persistence across Web, Android, iOS)
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Styling**: `styled-components/native`
- **Testing**: Jest, `@testing-library/react-native`
- **Config Management**: `app.config.js` (Expo dynamic config)
- **Dependencies**:
  - `firebase`: For authentication and backend services
  - `@react-native-google-signin/google-signin`: Google Sign-In for mobile
  - `expo-constants`: Access app config
  - `expo-secure-store`: Secure token storage

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   npx expo install expo-secure-store