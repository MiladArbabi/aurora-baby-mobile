# Aurora Baby Mobile

A cross-platform mobile application designed to bring harmony, care, and wonder to users. Built with modern technologies, it supports Android, iOS (in progress), and Web, featuring seamless authentication and a responsive UI.

## Features
- **Authentication**: Email/password and Google sign-in with persistence across app restarts. Includes a "Skip" option for unauthenticated access to freemium features (in progress, Issue #37).
- **Navigation**: Bottom tab navigator with Home, Profile Settings, Harmony, Care, and Wonder screens, plus a top bar with clickable profile settings and sign-out functionality.
- **Screens**: 
  - **Home**: Main landing screen (refinement in progress).
  - **Profile Settings**: User settings and sign-out.
  - **Harmony, Care, Wonder**: Placeholder screens for future content.
  - **Auth**: Login screen with social buttons and email option.
- **Cross-Platform**: Fully functional on Android, diagnostic support on Web (background image rendering pending, Issue #36), iOS support planned.
- **Styling**: Custom Edrosa font applied consistently across platforms.

## Tech Stack
- **Framework**: React Native with Expo (SDK 52.0.0)
- **Authentication**: Firebase Authentication
- **Storage**: AsyncStorage for credential persistence (Note: Plaintext passwords stored temporarily; SecureStore planned for production)
- **Navigation**: React Navigation (Bottom Tab and Stack Navigators)
- **Styling**: Styled Components with TypeScript-typed themes
- **Testing**: Jest with React Native Testing Library (15 tests passing)
- **Build Tools**: Expo CLI, TypeScript
- **Platforms**: Android, Web (iOS in progress)

## Getting Started
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MiladArbabi/aurora-baby-mobile.git
   cd aurora-baby-mobile