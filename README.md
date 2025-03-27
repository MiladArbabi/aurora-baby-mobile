# Aurora Baby Mobile

A cross-platform mobile application designed to bring harmony, care, and wonder to users. Built with modern technologies, it supports Android, iOS (in progress), and Web, featuring seamless authentication and a responsive UI.

## Features
- **Authentication**: Email/password and Google sign-in with persistence across app restarts.
- **Navigation**: Top bar with clickable profile settings and sign-out functionality.
- **Screens**: Home, Profile Settings, Harmony, Care, and Wonder (placeholders for future content).
- **Cross-Platform**: Works on Android and Web, with iOS support planned.

## Tech Stack
- **Framework**: React Native with Expo (SDK 52.0.0)
- **Authentication**: Firebase Authentication
- **Storage**: AsyncStorage for credential persistence (Note: Plaintext passwords stored temporarily; SecureStore planned for production)
- **Navigation**: React Navigation (Stack Navigator)
- **Styling**: Styled Components
- **Testing**: Jest with React Native Testing Library
- **Build Tools**: Expo CLI, TypeScript
- **Platforms**: Android, Web (iOS in progress)

## Getting Started
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MiladArbabi/aurora-baby-mobile.git
   cd aurora-baby-mobile